import { useEffect, useState, useRef } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Button from "../components/Buttons/Button";
import Input from "../components/Inputs/Input";
import { AddQuestionPopup } from "../components/popups/AddQuestionPopup";
import useQuestionPackageStore from "../store/questionpackages.store";
import { useParams } from "react-router-dom";
import Question from "../components/Question";
import { FaSearch } from "react-icons/fa";

const Package = () => {
  const { id } = useParams();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [originalTitle, setOriginalTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [error, setError] = useState("");

  const {
    selectedPackage,
    getQuestionPackageById,
    updateQuestionPackage,
    deleteQuestions,
    loading,
    error: packageError,
  } = useQuestionPackageStore();

  // Fetch package data on component mount
  useEffect(() => {
    const fetchPackageData = async () => {
      await getQuestionPackageById(id);
    };

    fetchPackageData();
  }, [id, getQuestionPackageById]);

  // Update title and questions when package is selected
  useEffect(() => {
    if (selectedPackage) {
      setTitle(selectedPackage.title);
      setOriginalTitle(selectedPackage.title); // Set original title
      setQuestions(selectedPackage.questions); // Set questions in state
    }
  }, [selectedPackage]);

  const updateQuestionPackTitle = async () => {
    if (!title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    if (title === originalTitle) {
      setIsEditing(false);
      return;
    }

    const questionPackage = {
      id: selectedPackage._id,
      title: title,
    };

    const error = await updateQuestionPackage(questionPackage);
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleButtonClick = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const moveQuestion = (dragIndex, hoverIndex) => {
    const reorderedQuestions = [...questions];
    const [movedQuestion] = reorderedQuestions.splice(dragIndex, 1);
    reorderedQuestions.splice(hoverIndex, 0, movedQuestion);

    setQuestions(reorderedQuestions); // Update questions state to re-render
  };

  const DraggableQuestion = ({ question, index }) => {
    const ref = useRef(null);
    const [, drop] = useDrop({
      accept: "question",
      hover(item, monitor) {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        // Prevent replacing items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Dragging upwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging downwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Move the question
        moveQuestion(dragIndex, hoverIndex);
        item.index = hoverIndex; // Update the index for the dragged item
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: "question",
      item: () => ({ id: question._id, index }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    drag(drop(ref));

    return (
      <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
        <Question
          data={question}
          index={index + 1}
          onCheckboxChange={handleCheckboxChange}
          selected={selectedQuestions.includes(question._id)}
        />
      </div>
    );
  };

  const handleCheckboxChange = (questionId) => {
    setSelectedQuestions(
      (prev) =>
        prev.includes(questionId)
          ? prev.filter((id) => id !== questionId) // Kaldır
          : [...prev, questionId] // Ekle
    );
  };

  const handleDeleteClick = () => {
    if (selectedQuestions.length === 0) {
      return; // Eğer hiçbir soru seçilmediyse, işlem yapma
    }
    setIsDeletePopupOpen(true); // Silme popup'ını aç
  };

  const confirmDelete = async () => {
    await deleteQuestions(selectedQuestions);
    setSelectedQuestions([]); // Seçimleri temizle
    setIsDeletePopupOpen(false); // Popup'ı kapat
  };

  const cancelDelete = () => {
    setError(""); // Hata mesajını temizle
    setSelectedQuestions([]); // Seçimleri temizle
    setIsDeletePopupOpen(false); // Popup'ı kapat
  };

  const filteredQuestions = questions.filter((question) =>
    question.questionText
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim())
  );

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "alphabetical") {
      return a.questionText.localeCompare(b.questionText);
    } else if (sortBy === "time") {
      return a.questionTime - b.questionTime;
    } else {
      return 0;
    }
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full h-full flex flex-col">
        <div className="w-full min-h-20 bg-açıkrtw flex justify-between items-center">
          <div className="ml-10 w-80 flex items-center bg-rtw px-2 py-1 rounded-xl justify-between">
            {isEditing ? (
              <>
                <Input
                  className="w-full h-9 bg-rtw rounded-xl border-0 text-xl text-white"
                  placeholder="Package Title.."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Button
                  className={
                    "bg-hoverrtw text-white rounded-xl h-9 justify-center items-center"
                  }
                  click={() => {
                    updateQuestionPackTitle();
                  }}
                >
                  Save
                </Button>
                {error && <span className="text-red-500 ml-4">{error}</span>}
              </>
            ) : (
              <>
                <span className="text-xl text-white ml-4">
                  {selectedPackage?.title}
                </span>

                <Button
                  click={() => setIsEditing(true)}
                  className={
                    "bg-hoverrtw text-gray-800 px-6 rounded-xl h-9 justify-center items-center "
                  }
                >
                  <i className="fa-solid fa-pen-to-square text-white"></i>
                </Button>
              </>
            )}
          </div>

          <div className="justify-center items-center flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Questions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="rounded-lg w-80 px-2 py-2 focus:outline-none focus:ring-2 focus:ring-hoverrtw border border-gray-300 shadow-xl"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg w-60 px-2 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-hoverrtw shadow-xl"
              >
                <option value="default">Default</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="time">Time</option>
              </select>
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Button
              click={handleDeleteClick}
              className={
                "bg-red-300 text-red-800 font-bold rounded rounded-xl shadow-xl"
              }
            >
              Delete
            </Button>
            <Button
              className="text-white w-60 mr-10 bg-rtw hover:bg-hoverrtw font-bold rounded rounded-xl shadow-xl"
              click={handleButtonClick}
            >
              + Create Question
            </Button>
          </div>
        </div>

        <div className="w-full items-center 3xl:min-h-[85%] 2xl:min-h-[80%] bg-açıkrtw flex flex-col">
          <div className="w-[95%] min-h-[60px] bg-white rounded-tl-xl rounded-tr-xl justify-center items-center flex border border-gray-300 font-bold">
            <p className="w-[10%] h-full  items-center flex text-xl text-gray-600 mr-5">
              SELECT
            </p>
            <p className="w-[60%] h-full items-center flex text-xl text-gray-600 ">
              QUESTION NAME
            </p>
            <p className="w-[10%] h-full justify-center items-center flex text-xl text-gray-600">
              TIME
            </p>
            <p className="w-[10%] h-full justify-center items-center flex text-xl text-gray-600">
              ACTION
            </p>
          </div>
          <div className="w-[95%] items-center min-h-[90%] max-h-[90%] 2xl:min-h-[98%] rounded-bl-xl rounded-br-xl bg-white flex flex-col border border-gray-300 overflow-y-scroll">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="w-full h-full">
                {sortedQuestions.map((question, index) => (
                  <DraggableQuestion
                    key={question._id}
                    question={question}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {isPopupOpen && <AddQuestionPopup onClose={closePopup} />}

        {/* Silme Onayı Popup'ı */}
        {isDeletePopupOpen && (
          <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg shadow-gray-500 rounded-xl z-50">
              <h2 className="text-lg font-bold">
                Are you sure you want to delete the questions?
              </h2>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex justify-end mt-4">
                <Button
                  click={cancelDelete}
                  className="mr-2 bg-gray-500 text-white rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  click={confirmDelete}
                  className="bg-red-500 text-white rounded-xl"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default Package;
