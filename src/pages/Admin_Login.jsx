import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/user.store";
import imgRemoteTechBackground from "../assets/images/remote-tech-work.jpg";
import imgRemoteTechLogo from "../assets/images/remote-tech-logo.png";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Göz ikonu için

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Şifre görünürlüğü kontrolü
  const { error, login } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    if (localStorage.getItem("user")) {
      navigate("/admin");
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed "
        style={{ backgroundImage: `url(${imgRemoteTechBackground})` }}
      >
      </div>
      <div className="relative z-10 w-1/3 bg-white bg-opacity-60 p-5 rounded-2yxl shadow-xl shadow-gray-500 justify-center items-center flex rounded-3xl">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center">
            <img src={imgRemoteTechLogo} className="w-full 2xl:w-1/2" />
          </div>
          <div className="mb-4 mt-10 w-full">
            <label className="block text-gray-700 text-xl">Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-80 px-3 py-3 border-b-2 border-rtw text-gray-900 bg-transparent outline-none transition-all duration-300 ease-in-out focus:border-hoverrtw placeholder-transparent focus:bg-hoverrtw/10"
            />
          </div>
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-xl">Password:</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-80 px-3 py-3 border-b-2 border-rtw text-gray-900 bg-transparent outline-none transition-all duration-300 ease-in-out focus:border-hoverrtw placeholder-transparent focus:bg-hoverrtw/10"
            />
            {/* Göz ikonu */}
            <div
              className="absolute inset-y-0 right-3 top-7 flex items-center cursor-pointer px-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={24} className="text-rtw" />
              ) : (
                <AiFillEye size={24} className="text-gray-500" />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#3daaa3] text-white py-2 rounded-lg hover:bg-hoverrtw transition-colors duration-300 "
          >
            Login
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
