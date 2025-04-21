import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';  // Import AuthContext
import { getPath } from '../../api/paths';
import { getProgress } from '../../api/progress';
import ResourceItem from '../Resources/ResourceItem';
import CertificateGenerator from '../Certificates/CertificateGenerator';
import styles from './PathViewer.module.css';

export default function PathViewer({ pathId }) {
  const [path, setPath] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [completedResources, setCompletedResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);  // Get user role from AuthContext

  useEffect(() => {
    // Fetch path details
    getPath(pathId).then(r => {
      setPath(r.data);
      setTotalResources(r.data.resources?.length || 0);
    });

    // Fetch progress for the learner
    getProgress(pathId).then(data => {
      const completedResources = data.completedResources || [];
      setCompletedResources(completedResources);
      setCompletedCount(completedResources.length);
      setTotalResources(data.totalResources);
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching progress:', error);
      setLoading(false);
    });
  }, [pathId]);

  const refreshProgress = () => {
    setCompletedCount(prev => prev + 1);
    getProgress(pathId).then(data => {
      const completedResources = data.completedResources || [];
      setCompletedResources(completedResources);
      setCompletedCount(completedResources.length);
      setTotalResources(data.totalResources);
    }).catch(console.error);
  };

  const handleBackButton = () => {
    // Navigate based on the user role from the AuthContext
    if (user && user.role === 'learner') {
      navigate('/learner');
    } else if (user && user.role === 'creator') {
      navigate('/creator');
    } else if (user && user.role === 'admin') {
      navigate('/admin');
    } else {
      console.error('User role not found, defaulting to home');
      navigate('/');
    }
  };

  if (loading) return <p>Loading...</p>;

  const progress = totalResources > 0 ? (completedCount / totalResources) * 100 : 0;

  return (
    <div className={styles['path-viewer']}>

      <h2 className={styles.title}>{path.title}</h2>
      <p className={styles.description}>{path.description}</p>

      <div className={styles['progress-container']}>
        <div className={styles['progress-bar']} style={{ width: `${progress}%` }}></div>
      </div>
      <p className={styles['progress-text']}>{progress.toFixed(2)}% Completed</p>

      {/* Resource items for learners */}
      <ResourceItem pathId={pathId} completedResources={completedResources} onComplete={refreshProgress} />

      {/* Show Certificate Generator if it's for learners */}
      {user && user.role === 'learner' && <CertificateGenerator pathId={pathId} />}

      {/* Show admin-specific actions for managing the path */}
      {user && user.role === 'admin' && (
        <div className={styles['admin-actions']}>
          <button className={styles['edit-button']} onClick={() => navigate(`/paths/edit/${pathId}`)}>
            Edit Path
          </button>
          <button className={styles['manage-resources-button']} onClick={() => navigate(`/paths/manage/${pathId}`)}>
            Manage Resources
          </button>
        </div>
      )}

      <button className={styles['back-button']} onClick={handleBackButton}>
        Back to Dashboard
      </button>
    </div>
  );
}
