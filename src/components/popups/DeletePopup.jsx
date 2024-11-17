import Button from "../../components/Buttons/Button";

const uDeletePopup = ({ isOpen, onConfirm, onCancel, error }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 shadow-lg shadow-gray-500 rounded-xl z-50">
        <h2 className="text-lg font-bold">
          Are you sure you want to delete the selected packages?
        </h2>

        {error && <p className="text-red-600">{error}</p>}
        <div className="flex justify-end mt-4">
          {" "}
          <Button click={onCancel} className="mr-2 bg-gray-300 hover:bg-gray-400 rounded-md">
            Cancel
          </Button>
          <Button
            click={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white rounded-md"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
