import { useEffect, useState } from "react";

const CandidateVideoCollection = ({ candidateData }) => {
  const [toggle, setToggle] = useState(false); // Toggle durumu için state

  const handleToggle = () => {
    setToggle(!toggle); // Toggle durumunu değiştir
  };

  useEffect(() => {
    // Video verileri burada yüklenebilir.
    console.log("Video verileri yüklendi", candidateData);
  }, []);

  const handleClose = () => {
    // Kapatma işlevi burada gerçekleştirilebilir.
    console.log("Kapatma butonuna basıldı");
  };

  return (
    <div className="relative flex w-[98%] h-[98%]">
      {/* Kapatma Butonu */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-0 text-gray-700 hover:text-red-500"
      >
        <i className="fas fa-times text-2xl hover:text-red-500 cursor-pointer hover:scale-125"></i>{" "}
        {/* X işareti */}
      </button>

      {/* Sol Kısım: Video */}
      <div className="w-3/5 flex flex-col h-full p-4">
        <h1 className="text-xl font-bold mb-3 ml-3">
          {/* {candidateData.firstName} {candidateData.lastName} */}
        </h1>
        <div className="relative w-full h-0 pb-[80%]">
          {" "}
          {/* 16:9 Aspect Ratio */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
            <button className="text-white text-8xl">
              <i className="fas fa-play-circle text-red-500"></i>
            </button>
          </div>
        </div>

        {/* Toggle ve Kaydet butonları */}
        <div className="flex justify-between items-center w-full mt-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={toggle}
              onChange={handleToggle}
              className="hidden"
            />
            <div
              className={`w-12 h-6 rounded-full ${
                toggle ? "bg-green-500" : "bg-red-500"
              } flex items-center p-1 transition-all duration-300`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform duration-300 ${
                  toggle ? "translate-x-6" : ""
                }`}
              ></div>
            </div>
            <span className="ml-2 font-medium">
              Status: {toggle ? "Onaylandı" : "Reddedildi"}
            </span>
          </label>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>

      {/* Sağ Kısım: Not Alanı */}
      <div className="w-2/5 h-[87%] flex flex-col bg-white p-4 mt-[3.9%] rounded-xl">
        <div className="h-[70%] w-full">
          <h1 className="text-xl font-bold">Aday Bilgileri</h1>
          <div className="flex justify-between mt-4">
            <div className="flex flex-col">
              <span className="font-semibold">Email:</span>
              {/* <span>{candidateData.email}</span> */}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Telefon:</span>
              {/* <span>{candidateData.phone}</span> */}
            </div>
          </div>
        </div>
        {/* Flex ve h-full ekleyerek aynı boyut sağlandı */}
        <div className="h-[10%] w-full">
          <h1 className="text-xl font-bold">Notlar</h1>
        </div>
        <div className="h-[20%] w-full">
          <textarea
            className="w-full h-full p-4 border border-gray-300 rounded resize-none" // resize-none ile boyutlandırmayı kapat
            placeholder="Not..."
            rows="10"
          />
        </div>
      </div>
    </div>
  );
};

export default CandidateVideoCollection;
