import React, { useState } from 'react';
import { markProgress } from '../../api/progress';

export default function ProgressTracker({ resourceId, onComplete }) {
  const [done, setDone] = useState(false);

  const markDone = () => {
    markProgress(resourceId)
      .then(() => {
        console.log('Progress marked successfully');
        setDone(true);
        onComplete();  // Trigger the callback to refresh progress in PathViewer
      })
      .catch(error => {
        console.error('Error marking progress:', error);
      });
  };

  return (
    <button onClick={markDone} disabled={done}>
      {done ? 'Completed ✅' : 'Mark Complete'}
    </button>
  );
}
