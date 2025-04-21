// src/contexts/UserContext.js
import React, { createContext, useContext, useState } from 'react';

// Create a context for the user role
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('learner'); // Default role

  const setRole = (role) => setUserRole(role); // Function to update user role

  return (
    <UserContext.Provider value={{ userRole, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => useContext(UserContext);
