import React, { useEffect, useState } from 'react';
import { getPath } from '../../api/paths';
import ResourceItem from '../Resources/ResourceItem';
import CertificateGenerator from '../Certificates/CertificateGenerator';

export default function PathViewer({ pathId }) {
  const [path, setPath] = useState(null);
  useEffect(() => { getPath(pathId).then(r=>setPath(r.data)); }, [pathId]);

  if (!path) return <p>Loading...</p>;
  return (
    <div>
      <h2>{path.title}</h2>
      <p>{path.description}</p>
      <ResourceItem pathId={pathId} />
      <CertificateGenerator userName="Demo User" pathTitle={path.title} />
    </div>
  );
}
