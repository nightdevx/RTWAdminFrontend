const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-rtw drop-shadow-lg animate-pulse mb-5">
        Remote Tech
      </h1>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-rtw"></div>
    </div>
  );
};

export default Spinner;
