import React, { useEffect, useState } from 'react';
import { getResources } from '../../api/resources';
import ProgressTracker from '../Progress/ProgressTracker';
import styles from './ResourceItem.module.css';

export default function ResourceItem({ pathId, completedResources = [], onComplete }) {  // Default to empty array
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources(pathId).then(r => setResources(r.data)); // Fetching resources
  }, [pathId]);

  return (
    <div className={styles['resource-container']}>
      {resources.map(r => {
        const isCompleted = completedResources.some(resource => resource.resource_id === r.id);

        return (
          <div key={r.id} className={styles['resource-card']}>
            <h4 className={styles['resource-title']}>{r.title}</h4>
            <p className={styles['resource-description']}>{r.description}</p>

            {/* Displaying resource type */}
            <p className={styles['resource-type']}>Type: {r.type}</p>

            {/* Displaying resource URL */}
            <p className={styles['resource-url']}>
              URL: <a href={r.url} target="_blank" rel="noopener noreferrer">{r.url}</a>
            </p>

            {/* Progress tracker */}
            <ProgressTracker resourceId={r.id} isCompleted={isCompleted} onComplete={onComplete} />
          </div>
        );
      })}
    </div>
  );
}
