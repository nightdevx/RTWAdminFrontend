const UsersMails = ({ data }) => {
  return (
    <div className="py-2 w-full min-h-[60px] bg-white justify-center items-center flex hover:bg-[#eefaf9] hover:cursor-pointer border border-b-gray-300">
      <div className="w-[10%] h-full items-center flex text-[20px] text-gray-500 justify-center ml-4">
        <input
          type="checkbox"
          className="w-4 h-4 rounded-full border border-gray-400 checked:bg-red-600 checked:border-transparent flex justify-center items-center"
          style={{ appearance: "none" }}
        />
      </div>
      <div className="w-[50%] h-full ml-2 items-center flex text-[20px] text-gray-600 ml-5">
        {data?.mail}
      </div>
      <div className="w-[25%] h-10 items-center flex ml-1">
        {data?.mailStatus !== "not-sended" ? (
          <div className="w-auto text-[15px] text-green-600 p-1 rounded-xl border border-green-500 bg-green-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-green-500`}
            ></div>
            &nbsp; Sended
          </div>
        ) : (
          <div className="w-auto text-[15px] text-red-600 p-1 rounded-xl border border-red-500 bg-red-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-red-500`}
            ></div>
            &nbsp; Not sended
          </div>
        )}
      </div>
      <div className="w-[25%] h-10 items-center flex ml-1">
        {data?.interviewStatus !== "not-done" ? (
          <div className="w-auto text-[15px] text-green-600 p-1 rounded-xl border border-green-500 bg-green-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-green-500`}
            ></div>
            &nbsp; Done
          </div>
        ) : (
          <div className="w-auto text-[15px] text-red-600 p-1 rounded-xl border border-red-500 bg-red-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-red-500`}
            ></div>
            &nbsp; Not Done
          </div>
        )}
      </div>
      <div className="w-[25%] h-10 items-center flex ml-1">
        {data?.approvalStatus === "accepted" ? (
          <div className="w-auto text-[15px] text-green-600 p-1 rounded-xl border border-green-500 bg-green-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-green-500`}
            ></div>
            &nbsp; Accepted
          </div>
        ) : data?.approvalStatus === "rejected" ? (
          <div className="w-auto text-[15px] text-red-600 p-1 rounded-xl border border-red-500 bg-red-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-red-500`}
            ></div>
            &nbsp; Rejected
          </div>
        ) : (
          <div className="w-auto text-[15px] text-yellow-600 p-1 rounded-xl border border-yellow-500 bg-yellow-200 flex items-center">
            <div
              className={`top-2 left-2 w-3 h-3 rounded-full bg-yellow-500`}
            ></div>
            &nbsp; Waiting
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersMails;
