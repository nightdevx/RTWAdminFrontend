const AdminName = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <h1 className="text-2xl ml-8 w-full text-black p-2 rounded-xl">
      <span className="font-Roboto">Hello, </span>
      <span className="font-Faculty Glyphic">
        {user?.username.toUpperCase()}
      </span>
    </h1>
  );
};
export default AdminName;
