import React, { useEffect, useState } from 'react';
import { getResources } from '../../api/resources';
import ProgressTracker from '../Progress/ProgressTracker';

export default function ResourceItem({ pathId, onComplete }) {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    getResources(pathId).then(r => setResources(r.data));
  }, [pathId]);

  return (
    <div>
      {resources.map(r => (
        <div key={r.id}>
          <h4>{r.title}</h4>
          <p>{r.description}</p>

          {/* Only the ProgressTracker button will handle completion now */}
          <ProgressTracker resourceId={r.id} onComplete={onComplete} />
        </div>
      ))}
    </div>
  );
}
