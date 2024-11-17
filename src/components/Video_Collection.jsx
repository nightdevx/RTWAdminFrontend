import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { FaPlayCircle, FaVideoSlash } from "react-icons/fa"; // Play icon

const VideoCollection = ({ data, video }) => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handleVideoClick = () => {
    navigate(`/admin/interview/candidate-video/${data._id}`);
  };

  useEffect(() => {
    if (video) {
      setPreview(video.url);
    }
  }, [video]);

  const statusColor =
    data.status === "Waiting"
      ? "bg-yellow-500"
      : data.status === "Rejected"
      ? "bg-red-500"
      : "bg-green-500";

  return (
    <div
      className="min-w-[290px] max-w-[290px] min-h-[200px] max-h-[200px] bg-white border border-hoverrtw rounded-xl shadow-sm flex flex-col items-center justify-center relative hover:cursor-pointer hover:bg-açıkrtw"
      onClick={handleVideoClick}
    >
      <div
        className={`absolute top-2 left-2 w-3 h-3 rounded-full ${statusColor}`}
      ></div>

      <p className="text-center font-bold text-sm mb-4 text-hoverrtw">
        {data.firstName} {data.lastName}
      </p>

      <div className="w-full h-40 inset-0 bg-hoverrtw rounded-xl">
        {preview ? (
          <div className="rounded-xl absolute overflow-hidden">
            <ReactPlayer url={preview} height={"100%"} width={"100%"} />
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              <FaPlayCircle className="text-rtw text-4xl hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>
        ) : (
          <div className="absolute mt-7 inset-0 z-10 flex items-center justify-center">
            <FaVideoSlash className="text-rtw text-4xl hover:opacity-100 transition-opacity duration-300" />
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoCollection;
