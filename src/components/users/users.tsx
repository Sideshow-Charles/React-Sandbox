import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../users/users.css'

interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

const Users = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const response = await axios.get<User[]>('https://dummyjson.com/users')
                console.log(response);
                setUsers(response.data.users);
                setLoading(false)

            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        }
        getUsers()
    }, [])

    // Show loading message while data is being fetched
    if (loading) {
        return <p className="loading__message">Loading...</p>;
    }

    // Show error message if fetching users fails
    if (error) {
        return <p>{error}</p>;
    }
    return (
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
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>CTA</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Users;