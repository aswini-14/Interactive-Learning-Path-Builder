import React, { useEffect, useState } from 'react';
import { getResources } from '../../api/resources';
import ProgressTracker from '../Progress/ProgressTracker';
import styles from './ResourceItem.module.css';

export default function ResourceItem({ pathId, onComplete }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources(pathId).then(r => setResources(r.data));
  }, [pathId]);

  return (
    <div className={styles['resource-container']}>
      {resources.map(r => (
        <div key={r.id} className={styles['resource-card']}>
          <h4 className={styles['resource-title']}>{r.title}</h4>
          <p className={styles['resource-description']}>{r.description}</p>
          <ProgressTracker resourceId={r.id} onComplete={onComplete} />
        </div>
      ))}
    </div>
  );
}
