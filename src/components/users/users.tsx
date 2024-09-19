import React, { useEffect, useState } from "react";
import axios from "axios";
import "../users/users.css";

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  address: {
    city: string;
  };
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUserIndex, setSelectedUserIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get<User[]>("https://dummyjson.com/users");
        setUsers(response.data.users);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleOpenModal = (index: number) => {
    setSelectedUserIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserIndex(null);
  };

  const handleNextUser = () => {
    if (selectedUserIndex !== null && selectedUserIndex < users.length - 1) {
      setSelectedUserIndex((prev) => (prev !== null ? prev + 1 : 0));
    }
  };

  const handlePrevUser = () => {
    if (selectedUserIndex !== null && selectedUserIndex > 0) {
      setSelectedUserIndex((prev) => (prev !== null ? prev - 1 : 0));
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter users based on the search query
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchQuery) ||
    user.lastName.toLowerCase().includes(searchQuery) ||
    user.email.toLowerCase().includes(searchQuery)
  );

  // Show loading message while data is being fetched
  if (loading) {
    return <p className="loading__message">Loading...</p>;
  }

  // Show error message if fetching users fails
  if (error) {
    return <p>{error}</p>;
  }

  const selectedUser = selectedUserIndex !== null ? users[selectedUserIndex] : null;

  return (
    <div>
      {/* Search input field */}
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchQuery}
        onChange={handleSearch}
        className="search__input"
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleOpenModal(index)}>View Info</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {selectedUser.firstName} {selectedUser.lastName}
            </h2>
            <p><strong>Email:</strong> {selectedUser.email}</p>
            <p><strong>Phone:</strong> {selectedUser.phone}</p>
            <p><strong>Age:</strong> {selectedUser.age}</p>
            <p><strong>City:</strong> {selectedUser.address.city}</p>

            <div className="modal-actions">
              <button onClick={handlePrevUser} disabled={selectedUserIndex === 0}>
                Previous
              </button>
              <button onClick={handleNextUser} disabled={selectedUserIndex === users.length - 1}>
                Next
              </button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
