import React, { useState } from 'react';
import { markProgress } from '../../api/progress';
import styles from './ProgressTracker.module.css';

export default function ProgressTracker({ resourceId, onComplete, isCompleted }) {
  const [done, setDone] = useState(isCompleted);

  const markDone = () => {
    markProgress(resourceId)
      .then(() => {
        console.log('Progress marked successfully');
        setDone(true);
        onComplete(); // Refresh progress in PathViewer
      })
      .catch(error => {
        console.error('Error marking progress:', error);
      });
  };

  return (
    <button
      className={styles['mark-complete-btn']}
      onClick={markDone}
      disabled={done}
    >
      {done ? 'Completed ✅' : 'Mark Complete'}
    </button>
  );
}
