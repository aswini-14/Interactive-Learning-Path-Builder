import React, { useState, useEffect } from 'react';
import { getUsers, updateUserRole, deleteUser } from '../../api/admin';
import { Link } from 'react-router-dom';
import PathList from '../Paths/PathList';  // Adjusted import path

import './AdminDashboard.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [showPaths, setShowPaths] = useState(false);  // State to toggle paths visibility

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  const togglePathsVisibility = () => {
    setShowPaths(!showPaths);  // Toggle the visibility of PathList component
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      {/* User Management Section */}
      <div className="section">
        <h3>User Management</h3>
        {loadingUsers ? (
          <p className="loading-message">Loading users...</p>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="creator">Creator</option>
                      <option value="learner">Learner</option>
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Learning Paths Section */}
      <div className="path-management">
        <h3>Learning Path Management</h3>
        <div className="button-group">
          <button onClick={togglePathsVisibility} className="view-paths-button">
            {showPaths ? 'Hide Learning Paths' : 'View All Learning Paths'}
          </button>
          <Link to="/paths/create" className="create-path-button">
            + Create New Path
          </Link>
        </div>

        {/* Conditionally render the PathList component */}
        {showPaths && <PathList />}
      </div>

    </div>
  );
};

export default AdminDashboard;
