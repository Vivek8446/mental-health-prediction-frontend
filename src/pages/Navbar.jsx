
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import logoImage from '../assets/mental_health_logo.png'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleLinkClick = () => {
//     setIsMenuOpen(false); // Close the menu when a link is clicked
//   };

//   return (
//     <nav className="w-full py-3.5 px-6 md:px-12 flex justify-between items-center bg-slate-200 shadow-lg relative">
//       {/* Logo Section */}
//       <div className="flex items-center">
//         {/* <img src={logoImage} alt="Brand Logo" className="h-12 w-12 mr-2 rounded-full " /> */}
//         <img
//   src={logoImage}
//   alt="Brand Logo"
//   className="h-12 w-12 mr-2 rounded-full bg-white p-1 shadow-md"
// />

//       </div>

//       {/* Desktop Menu */}
//       <div className="hidden md:flex items-center gap-9">
//         <Link to="/" className="font-medium hover:text-purple-700 transition duration-300">HOME</Link>
//         <Link to="/about" className="font-medium hover:text-purple-700 transition duration-300">ABOUT US</Link>
//         <Link to="/services" className="font-medium hover:text-purple-700 transition duration-300">SERVICES</Link>
//         <Link to="/login" className="bg-purple-700 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-600  transition duration-300">
//           LOGIN
//         </Link>
//       </div>

//       {/* Mobile Menu Button */}
//       <button
//         className="md:hidden flex items-center focus:outline-none focus:ring-2 focus:ring-purple-400 p-2 rounded-md"
//         onClick={toggleMenu}
//         aria-label="Toggle menu"
//         aria-expanded={isMenuOpen}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//         </svg>
//       </button>

//       {/* Mobile Menu & Overlay */}
//       {isMenuOpen && (
//         <>
//           {/* Overlay */}
//           <div
//             className="fixed inset-0 bg-black opacity-40 z-40 transition-opacity duration-300"
//             onClick={toggleMenu}
//           ></div>

//           {/* Mobile Menu */}
//           <div className="absolute top-16 left-0 right-0 bg-white z-50 shadow-lg rounded-b-lg md:hidden transition-transform duration-300 transform scale-y-100 origin-top">
//             <div className="flex flex-col p-6 gap-4">
//               <Link to="/" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>HOME</Link>
//               <Link to="/about" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>ABOUT US</Link>
//               <Link to="/services" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>SERVICES</Link>
//               <Link to="/login" className="bg-purple-700 text-white px-6 py-2 rounded-md font-medium text-center hover:bg-purple-600 transition duration-300" onClick={handleLinkClick}>
//                 LOGIN
//               </Link>
//             </div>
//           </div>
//         </>
//       )}
//     </nav>
//   );
// };

// export default Navbar;



import { useState } from 'react';
import { Link } from 'react-router-dom';

const Logo = () => (
  <svg viewBox="12 -1 320 55" className="h-10 max-h-full w-auto">
    <path
      d="M30 10 C40 10, 45 20, 45 30 C45 40, 40 50, 30 50 C20 50, 15 40, 15 30 C15 20, 20 10, 30 10"
      fill="none"
      stroke="#9933FF"
      strokeWidth="2.5"
    />
    <path
      d="M20 30 L25 30 L28 20 L32 40 L35 30 L40 30"
      fill="none"
      stroke="#FF5500"
      strokeWidth="2"
    />
    <text
      x="55"
      y="39"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="24"
      fill="#9933FF"
    >
      MindGuard
    </text>
    <text
      x="186"
      y="39"
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fontSize="24"
      fill="#FF5500"
    >
      AI
    </text>
    <circle cx="220" cy="34" r="3" fill="#9933FF" />
    <circle cx="230" cy="34" r="3" fill="#9933FF" />
    <circle cx="240" cy="34" r="3" fill="#9933FF" />
  </svg>
);


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="w-full py-3.5 px-6 md:px-12 flex justify-between items-center bg-slate-200 shadow-lg relative">
      {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <Logo />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-9">
        <Link to="/" className="font-medium hover:text-purple-700 transition duration-300">
          HOME
        </Link>        
        <Link to="/services" className="font-medium hover:text-purple-700 transition duration-300">
          SERVICES
        </Link>
        <Link to="/about" className="font-medium hover:text-purple-700 transition duration-300">
          ABOUT US
        </Link>
        <Link to="/video-call" className="font-medium hover:text-purple-700 transition duration-300">
          VIDEO CALL
        </Link>
        <Link to="/login" className="bg-purple-700 text-white px-6 py-2 rounded-md font-medium hover:bg-purple-600 transition duration-300">
          LOGIN
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center focus:outline-none focus:ring-2 focus:ring-purple-400 p-2 rounded-md"
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Menu & Overlay */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40 z-40 transition-opacity duration-300"
            onClick={toggleMenu}
          />

          {/* Mobile Menu */}
          <div className="absolute top-16 left-0 right-0 bg-white z-50 shadow-lg rounded-b-lg md:hidden transition-transform duration-300 transform scale-y-100 origin-top">
            <div className="flex flex-col p-6 gap-4">
              <Link to="/" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>
                HOME
              </Link>
              <Link to="/about" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>
                ABOUT US
              </Link>
              <Link to="/services" className="font-medium py-3 hover:text-purple-700 transition duration-300" onClick={handleLinkClick}>
                SERVICES
              </Link>
              <Link to="/login" className="bg-purple-700 text-white px-6 py-2 rounded-md font-medium text-center hover:bg-purple-600 transition duration-300" onClick={handleLinkClick}>
                LOGIN
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
