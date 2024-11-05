import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleData = () => {
    axios
      .post("http://localhost:3001/createUser", { name, age })
      .then((response) => {
        console.log(response);
        setName("");
        setAge("");
        setUsers((prevUsers) => [...prevUsers, { name, age }]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="flex gap-4">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-2"
        />
        <input
          type="text"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 p-2 rounded-md mb-2"
        />
        <button
          onClick={handleData}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          Create User
        </button>
      </div>

      <br />
      {users?.map((user, index) => (
        <div key={index} className="bg-gray-100 p-2 rounded-md mb-2 shadow-md">
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <h3 className="text-md">{user.age} years old</h3>
          <button
            onClick={() => handleDelete(user._id)}
            className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition"
          >
            Delete User
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
