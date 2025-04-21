import React, { useState } from 'react';
import { createPath } from '../../api/paths';
import { addResource } from '../../api/resources';
import styles from './PathBuilder.module.css';

const CreatePathAndResourcesForm = () => {
  const [pathTitle, setPathTitle] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [resourceOrder, setResourceOrder] = useState('');

  const [pathId, setPathId] = useState(null);

  const handleCreatePath = async (e) => {
    e.preventDefault();

    const newPath = {
      title: pathTitle,
      description: pathDescription,
      is_public: isPublic,
    };

    try {
      const response = await createPath(newPath);
      setPathId(response.data.id);
      alert('Learning Path Created Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating learning path');
    }
  };

  const handleAddResource = async (e) => {
    e.preventDefault();

    if (!pathId) {
      alert('Please create a learning path first!');
      return;
    }

    const newResource = {
      path_id: pathId,
      type: resourceType,
      title: resourceTitle,
      url: resourceUrl,
      description: resourceDescription,
      estimated_time: estimatedTime,
      resource_order: resourceOrder,
    };

    try {
      const response = await addResource(newResource);
      alert('Resource added successfully!');
      console.log(response.data);
      clearResourceForm();
    } catch (err) {
      console.error(err);
      alert('Error adding resource');
    }
  };

  const clearResourceForm = () => {
    setResourceTitle('');
    setResourceType('');
    setResourceUrl('');
    setResourceDescription('');
    setEstimatedTime('');
    setResourceOrder('');
  };

  return (
    <div className={styles['path-builder-container']}>
      <h2>Create Learning Path</h2>
      <form onSubmit={handleCreatePath}>
        <label>
          Path Title:
          <input type="text" value={pathTitle} onChange={(e) => setPathTitle(e.target.value)} required />
        </label>
        <label>
          Path Description:
          <input type="text" value={pathDescription} onChange={(e) => setPathDescription(e.target.value)} required />
        </label>
        <label>
          Public:
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
        </label>
        <button type="submit">Create Path</button>
      </form>

      {pathId && (
        <>
          <h2>Add Resource to Path</h2>
          <form onSubmit={handleAddResource}>
            <label>
              Resource Title:
              <input type="text" value={resourceTitle} onChange={(e) => setResourceTitle(e.target.value)} required />
            </label>
            <label>
              Resource Type:
              <input type="text" value={resourceType} onChange={(e) => setResourceType(e.target.value)} required />
            </label>
            <label>
              Resource URL:
              <input type="url" value={resourceUrl} onChange={(e) => setResourceUrl(e.target.value)} required />
            </label>
            <label>
              Resource Description:
              <input type="text" value={resourceDescription} onChange={(e) => setResourceDescription(e.target.value)} required />
            </label>
            <label>
              Estimated Time:
              <input type="number" value={estimatedTime} onChange={(e) => setEstimatedTime(e.target.value)} required />
            </label>
            <label>
              Resource Order:
              <input type="number" value={resourceOrder} onChange={(e) => setResourceOrder(e.target.value)} required />
            </label>
            <button type="submit">Add Resource</button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreatePathAndResourcesForm;
