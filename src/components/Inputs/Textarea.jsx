const Textarea = ({ placeholder = '', onChange, value, className, maxLength }) => {
  return (
      <div>
          <textarea
              placeholder={placeholder}
              onChange={onChange}
              value={value}
              className={`w-[300px] h-[100px] px-[17px] py-[15px] rounded-[10px] mt-[2%] justify-start items-center inline-flex text-[16px] font-normal border border-black focus:outline-none resize-none ${className}`} // resize-none eklendi
              maxLength={maxLength}
              style={{ overflow: 'hidden' }} // İçerik taşarsa kaydırma çubuğu olmaması için
          />
      </div>
  );
};

export default Textarea;
