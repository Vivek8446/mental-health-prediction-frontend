const Login = () => {
    return (
      <div className="w-full max-w-md mx-auto px-6 py-16">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h1>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your password"
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Login;