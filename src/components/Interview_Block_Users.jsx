import { useNavigate } from "react-router-dom";

const InterviewBlockUsers = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/manage-mails/${data._id}`);
  };

  return (
    <div
      className={`w-[20%] bg-white h-[100px] rounded-xl p-4 shadow-sm shadow-gray-500 ml-2 mr-2 hover:cursor-pointer hover:bg-açıkrtw relative border-t-4 ${
        data.isActive ? "border-rtw" : "border-rtw"
      }`}
    >
      <button className="w-full h-full" onClick={handleClick}>
        <h2 className="text-xl font-bold text-gray-800">
          {data?.interviewId.title}
        </h2>
      </button>
    </div>
  );
};

export default InterviewBlockUsers;
