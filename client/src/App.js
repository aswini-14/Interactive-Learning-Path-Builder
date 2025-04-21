import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Creator from './pages/Creator';
import Learner from './pages/Learner';
import Admin from './pages/Admin';
import PathViewer from './components/Paths/PathViewer';
import PathBuilder from './components/Paths/PathBuilder'; 
import { useParams } from 'react-router-dom';

function Protected({ children, roles }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}
function PathViewerWrapper() {
  const { id } = useParams();
  return <PathViewer pathId={id} />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/creator"
        element={<Protected roles={['creator']}><Creator /></Protected>}
      />
      <Route
        path="/learner"
        element={<Protected roles={['learner']}><Learner /></Protected>}
      />
      <Route
        path="/admin"
        element={<Protected roles={['admin']}><Admin /></Protected>}
      />
      <Route
        path="/paths"
        element={<Protected roles={['creator', 'admin']}><PathBuilder /></Protected>}
      />
      <Route
        path="/paths/:id"
        element={<Protected roles={['learner', 'creator', 'admin']}><PathViewerWrapper /></Protected>}
      />


    </Routes>
  );
}

export default App;
