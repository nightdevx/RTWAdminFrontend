import React, { useEffect, useState } from "react";
import checkPasswordStrength from "../../utils/passwordStrength"; // Adjust the import path as necessary
import useUserStore from "../../store/user.store";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

const CreateUserPopup = ({ onClose, data }) => {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useUserStore();

  useEffect(() => {
    if (data) {
      setName(data.username);
      setCompany(data.company);
      setEmail(data.email);
    }
  }, [data]);

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const userData = {
      name,
      company,
      email,
      password,
    };
    if (data) {
      // Update user
      // Call the update function from the store
    } else {
      register(userData);
    }

    onClose();
  };

  const getPasswordStrengthColor = (strength) => {
    switch (strength) {
      case "Weak":
        return "bg-red-500";
      case "Medium":
        return "bg-yellow-500";
      case "Strong":
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white w-[30%] rounded-lg shadow-lg relative">
        <div className="flex justify-between items-center bg-rtw text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold">Create User</h2>
          <button
            onClick={onClose}
            className="text-white text-xl font-bold hover:text-red-500"
          >
            X
          </button>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">İsim:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              />
            </div>
            {/* <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Şirket Adı:
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-lg font-medium mb-2">Şifre:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
                <div
                  className={`h-full ${getPasswordStrengthColor(
                    passwordStrength
                  )} rounded-full`}
                  style={{
                    width: `${
                      passwordStrength === "Weak"
                        ? "33%"
                        : passwordStrength === "Medium"
                        ? "66%"
                        : "100%"
                    }`,
                  }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">{passwordStrength}</span>
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">
                Şifreyi Onayla:
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hoverrtw"
              />
            </div>
            {error && (
              <div className="mb-4 text-red-500 font-medium">{error}</div>
            )}
            <div className="flex justify-end">
              {data ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-rtw text-white rounded hover:bg-hoverrtw rounded-xl ml-auto"
                >
                  Update
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-rtw text-white rounded hover:bg-hoverrtw rounded-xl ml-auto"
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPopup;
