import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';

const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';

export default function VideoCall() {
  const [socket, setSocket] = useState(null);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [peers, setPeers] = useState({});
  const [isJoined, setIsJoined] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [error, setError] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);

  const userVideo = useRef(null);
  const peersRef = useRef({});
  const streamRef = useRef();

  useEffect(() => {
    if (stream && userVideo.current) {
      userVideo.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    const newSocket = io(SERVER_URL, { withCredentials: true });
    setSocket(newSocket);

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket || !stream) return;

    socket.on('user-joined', ({ userId, userName }) => {
      console.log('User joined:', userName);
      const peer = createPeer(userId, socket.id, stream);
      peersRef.current[userId] = { peer, userName };
      setPeers(prevPeers => ({
        ...prevPeers,
        [userId]: { peer, userName, stream: null }
      }));
    });

    socket.on('incoming-call', ({ signal, from, name }) => {
      console.log('Incoming call from:', name);
      const peer = addPeer(signal, from, stream);
      peersRef.current[from] = { peer, userName: name };
      setPeers(prevPeers => ({
        ...prevPeers,
        [from]: { peer, userName: name, stream: null }
      }));
    });

    socket.on('call-accepted', ({ signal, from }) => {
      console.log('Call accepted from:', from);
      if (peersRef.current[from]) {
        peersRef.current[from].peer.signal(signal);
      }
    });

    socket.on('user-left', userId => {
      console.log('User left:', userId);
      if (peersRef.current[userId]) {
        peersRef.current[userId].peer.destroy();
        const newPeers = { ...peers };
        delete newPeers[userId];
        delete peersRef.current[userId];
        setPeers(newPeers);
      }
    });

    return () => {
      socket.off('user-joined');
      socket.off('incoming-call');
      socket.off('call-accepted');
      socket.off('user-left');
    };
  }, [socket, stream]);

  const createPeer = (target, caller, stream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('call-user', {
        userToCall: target,
        signalData: signal,
        from: caller,
        name: userName
      });
    });

    peer.on('stream', peerStream => {
      console.log(`Receiving stream from ${target}`);
      setPeers(prevPeers => {
        const updatedPeers = { ...prevPeers };
        updatedPeers[target] = { peer, userName, stream: peerStream };
        return updatedPeers;
      });
    });

    return peer;
  };

  const addPeer = (incomingSignal, caller, stream) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on('signal', signal => {
      socket.emit('answer-call', { signal, to: caller });
    });

    peer.on('stream', peerStream => {
      console.log(`Receiving stream from ${caller}`);
      setPeers(prevPeers => {
        const updatedPeers = { ...prevPeers };
        updatedPeers[caller] = { peer, userName, stream: peerStream };
        return updatedPeers;
      });
    });

    peer.signal(incomingSignal);
    return peer;
  };

  const joinRoom = async () => {
    if (!userName.trim() || !roomId.trim() || !socket) {
      setError('Please enter your name and room ID');
      return;
    }

    if (isInitializing) return;
    
    try {
      setError('');
      setIsInitializing(true);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      streamRef.current = mediaStream;
      setStream(mediaStream);
      
      socket.emit('join-room', { userName, roomId });
      setIsJoined(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      setError(err.name === 'NotAllowedError' 
        ? 'Please allow camera and microphone access'
        : 'Error accessing camera or microphone');
    } finally {
      setIsInitializing(false);
    }
  };

  const toggleMute = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      videoTrack.enabled = !videoTrack.enabled;
      setIsVideoOff(!videoTrack.enabled);
    }
  };

  return (
    <div className="min-h-screen p-8 mt-10">
      {!isJoined ? (
        <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md">
          <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
          {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
          <input
            type="text"
            placeholder="Your Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none"
          />
          <input
            type="text"
            placeholder="Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none"
          />
          <button
            onClick={joinRoom}
            disabled={!userName.trim() || !roomId.trim() || isInitializing}
            className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
          >
            {isInitializing ? 'Initializing...' : 'Join Room'}
          </button>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
              <video ref={userVideo} autoPlay playsInline muted className="w-full h-full object-cover" />
            </div>
            {Object.entries(peers).map(([peerId, { stream }]) => (
              <div key={peerId} className="relative bg-black rounded-lg overflow-hidden aspect-video">
                <video ref={ref => ref && stream && (ref.srcObject = stream)} autoPlay playsInline className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';

// export default function VideoCall() {
//   const [socket, setSocket] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [peers, setPeers] = useState({});
//   const [isJoined, setIsJoined] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [error, setError] = useState('');
//   const [isInitializing, setIsInitializing] = useState(false);

//   const userVideo = useRef(null);
//   const peersRef = useRef({});
//   const streamRef = useRef();

//   useEffect(() => {
//     if (stream && userVideo.current) {
//       userVideo.current.srcObject = stream;
//     }
//   }, [stream]);

//   useEffect(() => {
//     const newSocket = io(SERVER_URL, { withCredentials: true });
//     setSocket(newSocket);

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//       newSocket.close();
//     };
//   }, []);

//   useEffect(() => {
//     if (!socket || !stream) return;

//     socket.on('user-joined', ({ userId, userName }) => {
//       console.log('User joined:', userName);
//       const peer = createPeer(userId, socket.id, stream);
//       peersRef.current[userId] = { peer, userName };
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [userId]: { peer, userName, stream: null }
//       }));
//     });

//     socket.on('incoming-call', ({ signal, from, name }) => {
//       console.log('Incoming call from:', name);
//       const peer = addPeer(signal, from, stream);
//       peersRef.current[from] = { peer, userName: name };
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [from]: { peer, userName: name, stream: null }
//       }));
//     });

//     socket.on('call-accepted', ({ signal, from }) => {
//       console.log('Call accepted from:', from);
//       if (peersRef.current[from]) {
//         peersRef.current[from].peer.signal(signal);
//       }
//     });

//     socket.on('user-left', userId => {
//       console.log('User left:', userId);
//       if (peersRef.current[userId]) {
//         peersRef.current[userId].peer.destroy();
//         const newPeers = { ...peers };
//         delete newPeers[userId];
//         delete peersRef.current[userId];
//         setPeers(newPeers);
//       }
//     });

//     return () => {
//       socket.off('user-joined');
//       socket.off('incoming-call');
//       socket.off('call-accepted');
//       socket.off('user-left');
//     };
//   }, [socket, stream]);

//   const createPeer = (target, caller, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', signal => {
//       socket.emit('call-user', {
//         userToCall: target,
//         signalData: signal,
//         from: caller,
//         name: userName
//       });
//     });

//     peer.on('stream', peerStream => {
//       console.log(`Receiving stream from ${target}`);
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [target]: { peer, userName, stream: peerStream }
//       }));
//     });

//     return peer;
//   };

//   const addPeer = (incomingSignal, caller, stream) => {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', signal => {
//       socket.emit('answer-call', { signal, to: caller });
//     });

//     peer.on('stream', peerStream => {
//       console.log(`Receiving stream from ${caller}`);
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [caller]: { peer, userName, stream: peerStream }
//       }));
//     });

//     peer.signal(incomingSignal);
//     return peer;
//   };

//   const joinRoom = async () => {
//     if (!userName.trim() || !roomId.trim() || !socket) {
//       setError('Please enter your name and room ID');
//       return;
//     }

//     if (isInitializing) return;
    
//     try {
//       setError('');
//       setIsInitializing(true);
      
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       streamRef.current = mediaStream;
//       setStream(mediaStream);
      
//       socket.emit('join-room', { userName, roomId });
//       setIsJoined(true);
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//       setError(err.name === 'NotAllowedError' 
//         ? 'Please allow camera and microphone access'
//         : 'Error accessing camera or microphone');
//     } finally {
//       setIsInitializing(false);
//     }
//   };

//   const toggleMute = () => {
//     if (streamRef.current) {
//       const audioTrack = streamRef.current.getAudioTracks()[0];
//       audioTrack.enabled = !audioTrack.enabled;
//       setIsMuted(!audioTrack.enabled);
//     }
//   };

//   const toggleVideo = () => {
//     if (streamRef.current) {
//       const videoTrack = streamRef.current.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setIsVideoOff(!videoTrack.enabled);
//     }
//   };

//   return (
//     <div className="min-h-screen p-8 mt-10">
//       {!isJoined ? (
//         <div className="max-w-md mx-auto bg-white rounded-lg p-6 shadow-md">
//           <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
//           {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none"
//           />
//           <input
//             type="text"
//             placeholder="Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none"
//           />
//           <button
//             onClick={joinRoom}
//             disabled={!userName.trim() || !roomId.trim() || isInitializing}
//             className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
//           >
//             {isInitializing ? 'Initializing...' : 'Join Room'}
//           </button>
//         </div>
//       ) : (
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
//               <video ref={userVideo} autoPlay playsInline muted className="w-full h-full object-cover" />
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">{userName} (You)</div>
//             </div>
//             {Object.entries(peers).map(([peerId, { stream, userName }]) => (
//               <div key={peerId} className="relative bg-black rounded-lg overflow-hidden aspect-video">
//                 <video ref={ref => ref && stream && (ref.srcObject = stream)} autoPlay playsInline className="w-full h-full object-cover" />
//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">{userName}</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useRef, useState } from 'react';
// import { io } from 'socket.io-client';
// import Peer from 'simple-peer';

// const SERVER_URL = 'https://mental-health-prediction-video-call.onrender.com';

// export default function VideoCall() {
//   const [socket, setSocket] = useState(null);
//   const [stream, setStream] = useState(null);
//   const [userName, setUserName] = useState('');
//   const [roomId, setRoomId] = useState('');
//   const [peers, setPeers] = useState({});
//   const [isJoined, setIsJoined] = useState(false);
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const [error, setError] = useState('');
//   const [isInitializing, setIsInitializing] = useState(false);
  
//   const userVideo = useRef(null);
//   const peersRef = useRef({});
//   const streamRef = useRef();

//   // Handle setting up the video stream when component mounts and userVideo ref is available
//   useEffect(() => {
//     if (stream && userVideo.current) {
//       userVideo.current.srcObject = stream;
//     }
//   }, [stream, userVideo.current]);

//   // Initialize socket connection
//   useEffect(() => {
//     const newSocket = io(SERVER_URL, {
//       withCredentials: true
//     });
//     setSocket(newSocket);

//     return () => {
//       if (streamRef.current) {
//         streamRef.current.getTracks().forEach(track => track.stop());
//       }
//       newSocket.close();
//     };
//   }, []);

//   // Handle peer connections
//   useEffect(() => {
//     if (!socket || !stream) return;

//     socket.on('user-joined', ({ userId, userName }) => {
//       console.log('User joined:', userName);
//       const peer = createPeer(userId, socket.id, stream);
//       peersRef.current[userId] = { peer, userName };
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [userId]: { peer, userName }
//       }));
//     });

//     socket.on('incoming-call', ({ signal, from, name }) => {
//       console.log('Incoming call from:', name);
//       const peer = addPeer(signal, from, stream);
//       peersRef.current[from] = { peer, userName: name };
//       setPeers(prevPeers => ({
//         ...prevPeers,
//         [from]: { peer, userName: name }
//       }));
//     });

//     socket.on('call-accepted', ({ signal, from }) => {
//       console.log('Call accepted from:', from);
//       if (peersRef.current[from]) {
//         peersRef.current[from].peer.signal(signal);
//       }
//     });

//     socket.on('user-left', userId => {
//       console.log('User left:', userId);
//       if (peersRef.current[userId]) {
//         peersRef.current[userId].peer.destroy();
//         const newPeers = { ...peers };
//         delete newPeers[userId];
//         delete peersRef.current[userId];
//         setPeers(newPeers);
//       }
//     });

//     return () => {
//       socket.off('user-joined');
//       socket.off('incoming-call');
//       socket.off('call-accepted');
//       socket.off('user-left');
//     };
//   }, [socket, stream]);

//   const createPeer = (target, caller, stream) => {
//     const peer = new Peer({
//       initiator: true,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', signal => {
//       socket.emit('call-user', {
//         userToCall: target,
//         signalData: signal,
//         from: caller,
//         name: userName
//       });
//     });

//     return peer;
//   };

//   const addPeer = (incomingSignal, caller, stream) => {
//     const peer = new Peer({
//       initiator: false,
//       trickle: false,
//       stream,
//     });

//     peer.on('signal', signal => {
//       socket.emit('answer-call', { signal, to: caller });
//     });

//     peer.signal(incomingSignal);
//     return peer;
//   };

//   const joinRoom = async () => {
//     if (!userName.trim() || !roomId.trim() || !socket) {
//       setError('Please enter your name and room ID');
//       return;
//     }

//     if (isInitializing) return;
    
//     try {
//       setError('');
//       setIsInitializing(true);
      
//       const mediaStream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true
//       });
      
//       streamRef.current = mediaStream;
//       setStream(mediaStream);
      
//       socket.emit('join-room', { userName, roomId });
//       setIsJoined(true);
//     } catch (err) {
//       console.error('Error accessing media devices:', err);
//       setError(err.name === 'NotAllowedError' 
//         ? 'Please allow camera and microphone access'
//         : 'Error accessing camera or microphone');
//     } finally {
//       setIsInitializing(false);
//     }
//   };

//   const toggleMute = () => {
//     if (streamRef.current) {
//       const audioTrack = streamRef.current.getAudioTracks()[0];
//       audioTrack.enabled = !audioTrack.enabled;
//       setIsMuted(!audioTrack.enabled);
//     }
//   };

//   const toggleVideo = () => {
//     if (streamRef.current) {
//       const videoTrack = streamRef.current.getVideoTracks()[0];
//       videoTrack.enabled = !videoTrack.enabled;
//       setIsVideoOff(!videoTrack.enabled);
//     }
//   };

//   return (
//     <div className="min-h-screen  p-8 mt-10">
//       {!isJoined ? (
//         <div className="max-w-md mx-auto bg-white    rounded-lg p-6 shadow-md">
//           <h1 className="text-2xl font-bold text-purple-700 mb-6">Join Video Call</h1>
//           {error && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//               {error}
//             </div>
//           )}
//           <input
//             type="text"
//             placeholder="Your Name"
//             value={userName}
//             onChange={(e) => setUserName(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//           <input
//             type="text"
//             placeholder="Room ID"
//             value={roomId}
//             onChange={(e) => setRoomId(e.target.value)}
//             className="w-full mb-4 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500d"
//           />
//           <button
//             onClick={joinRoom}
//             disabled={!userName.trim() || !roomId.trim() || isInitializing}
//             className="w-full bg-purple-700 text-white font-bold p-2 rounded hover:bg-purple-600  disabled:bg-gray-400"
//           >
//             {isInitializing ? 'Initializing...' : 'Join Room'}
//           </button>
//         </div>
//       ) : (
//         <div className="max-w-6xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
//             <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
//               <video
//                 ref={userVideo}
//                 autoPlay
//                 playsInline
//                 muted
//                 className="w-full h-full object-cover"
//               />
//               <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                 {userName} (You)
//               </div>
//             </div>
//             {Object.entries(peers).map(([peerId, { peer, userName }]) => (
//               <div key={peerId} className="relative bg-black rounded-lg overflow-hidden aspect-video">
//                 <video
//                   ref={(ref) => {
//                     if (ref && peer.streams[0]) {
//                       ref.srcObject = peer.streams[0];
//                     }
//                   }}
//                   autoPlay
//                   playsInline
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
//                   {userName}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
//             <button
//               onClick={toggleMute}
//               className={`p-3 rounded-full ${
//                 isMuted ? 'bg-red-500' : 'bg-gray-700'
//               } text-white hover:opacity-90`}
//             >
//               {isMuted ? 'Unmute' : 'Mute'}
//             </button>
//             <button
//               onClick={toggleVideo}
//               className={`p-3 rounded-full ${
//                 isVideoOff ? 'bg-red-500' : 'bg-gray-700'
//               } text-white hover:opacity-90`}
//             >
//               {isVideoOff ? 'Start Video' : 'Stop Video'}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }