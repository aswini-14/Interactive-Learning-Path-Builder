import React, { useEffect, useState } from 'react';
import { getPath } from '../../api/paths';
import { getProgress } from '../../api/progress';
import ResourceItem from '../Resources/ResourceItem';
import CertificateGenerator from '../Certificates/CertificateGenerator';
import styles from './PathViewer.module.css';

export default function PathViewer({ pathId }) {
  const [path, setPath] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPath(pathId).then(r => {
      setPath(r.data);
      setTotalResources(r.data.resources?.length || 0);
    });

    getProgress(pathId).then(data => {
      const completedResources = data.completedResources || [];
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
      setCompletedCount(completedResources.length);
      setTotalResources(data.totalResources);
    }).catch(console.error);
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

      <ResourceItem pathId={pathId} onComplete={refreshProgress} />
      <CertificateGenerator pathId={pathId} />
    </div>
  );
}
