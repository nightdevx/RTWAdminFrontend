import { Link } from "react-router-dom";
import imgRemoteTechBackground from "../assets/images/remote-tech-work.jpg";

const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{
        backgroundImage: `url(${imgRemoteTechBackground})`,
        backgroundSize: "cover",
      }}
    >
      <div className="absolute top-10 text-center w-1/3 h-1/3 flex flex-col items-center justify-center bg-white rounded-3xl shadow-2xl opacity-40 transition-opacity hover:opacity-100 ">
        <h1 className="text-9xl font-bold text-rtw drop-shadow-lg animate-pulse ">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mt-2 text-rtw">
          Oops! Page Not Found
        </h2>
        <p className="text-lg md:text-xl text-black max-w-lg">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/admin"
          className="mt-6 px-8 py-3 text-lg font-semibold bg-rtw text-white rounded-lg shadow-md hover:bg-hoverrtw transition-transform transform hover:scale-105"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
