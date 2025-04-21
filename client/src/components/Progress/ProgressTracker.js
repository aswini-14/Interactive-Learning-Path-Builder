import React, { useState } from 'react';
import { updateProgress } from '../../api/progress';

export default function ProgressTracker({resourceId}) {
  const [done, setDone] = useState(false);

  const markDone = () => {
    updateProgress(resourceId).then(() => setDone(true));
  };

  return (
    <button onClick={markDone} disabled={done}>
      {done ? 'Completed ✅' : 'Mark Complete'}
    </button>
  );
}
