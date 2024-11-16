const Input = ({
  placeholder = "",
  onChange,
  value,
  className,
  maxLength,
  type,
}) => {
  return (
    <div>
      <input
        type={type || "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className={`w-[300px] h-[20px] px-[17px] py-[15px] rounded-[10px] justify-start items-center inline-flex text-[16px] font-normal border border-black focus:outline-none ${className}`}
        maxLength={maxLength}
      />
    </div>
  );
};

export default Input;
