const Button = ({ children, className, click, disabled }) => {
  return (
    <div>
      <button
        disabled={disabled || false} // disabled prop'u doğrudan burada kullanılıyor
        onClick={click} // click prop'u doğrudan burada kullanılıyor
        className={`w-20 h-10 justify-center items-center text-[16px] ${className}`}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
