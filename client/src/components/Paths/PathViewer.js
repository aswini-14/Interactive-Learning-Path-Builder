import React, { useEffect, useState } from 'react';
import { getPath } from '../../api/paths';
import { getProgress } from '../../api/progress';
import ResourceItem from '../Resources/ResourceItem';
import CertificateGenerator from '../Certificates/CertificateGenerator';

export default function PathViewer({ pathId }) {
  const [path, setPath] = useState(null);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalResources, setTotalResources] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch path details
    getPath(pathId).then(r => {
      setPath(r.data);
      setTotalResources(r.data.resources?.length || 0);  // Assuming resources are in `r.data.resources`
    });

    // Fetch progress data initially
    getProgress(pathId).then(data => {
      console.log("Progress API response:", data);
      const completedResources = data.completedResources || [];
      setCompletedCount(completedResources.length);  // Set completed count based on the length of completedResources
      setTotalResources(data.totalResources);  // Ensure total resources are updated from the API
      setLoading(false);
    }).catch(error => {
      console.error('Error fetching progress:', error);
      setLoading(false);
    });
  }, [pathId]);

  const refreshProgress = () => {
    // Check if refreshProgress is being triggered
    console.log("refreshProgress function called");

    // Optimistic update: increment completed count by 1
    setCompletedCount(prev => prev + 1);

    // Re-fetch progress data after completing a resource
    getProgress(pathId).then(data => {
      console.log("Progress data after refresh:", data);
      const completedResources = data.completedResources || [];
      setCompletedCount(completedResources.length);  // Set completed count based on the latest API response
      setTotalResources(data.totalResources);  // Ensure total resources are updated from the API
    }).catch(error => {
      console.error('Error refreshing progress:', error);
    });
  };

  // Handle loading state
  if (loading) return <p>Loading...</p>;

  // Calculate progress percentage based on completed and total resources
  const progress = totalResources > 0 ? (completedCount / totalResources) * 100 : 0;

  return (
    <div>
      <h2>{path.title}</h2>
      <p>{path.description}</p>

      {/* Progress Bar */}
      <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '5px', marginBottom: '20px' }}>
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: 'green',
            height: '20px',
            borderRadius: '5px',
          }}
        ></div>
      </div>
      <p>{progress.toFixed(2)}% Completed</p>

      {/* Resources and Certificate */}
      <ResourceItem pathId={pathId} onComplete={refreshProgress} />
      <CertificateGenerator pathId={pathId} />
    </div>
  );
}
