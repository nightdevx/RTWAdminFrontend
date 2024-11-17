import { useState, useEffect, useRef } from "react";

const DropdownBox = ({ options = [], onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    setSelectedOptions(selected || []);
  }, [selected]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.title === option.title
    );
    let newSelectedOptions;
    if (isSelected) {
      newSelectedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption.title !== option.title
      );
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  const handleRemove = (option) => {
    const newSelectedOptions = selectedOptions.filter(
      (selectedOption) => selectedOption.title !== option.title
    );
    setSelectedOptions(newSelectedOptions);
    onSelect(newSelectedOptions);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={handleToggle}
        className="inline-flex justify-center 3xl:w-[495px] 2xl:w-[397px] rounded-md border border-gray-300 shadow-sm px-10 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
      >
        {selectedOptions.length > 0
          ? selectedOptions.map((option) => option.title).join(", ")
          : "Select options"}
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-y-auto">
          <input
            type="text"
            placeholder="Search Question Package"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-hoverrtw"
          />
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    selectedOptions.some(
                      (selectedOption) => selectedOption.title === option.title
                    )
                      ? "bg-gray-200"
                      : ""
                  }`}
                >
                  {option.title}
                  {selectedOptions.some(
                    (selectedOption) => selectedOption.title === option.title
                  ) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option);
                      }}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      X
                    </button>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-700">
                No options available
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownBox;
