import React, { useState } from 'react';
import { createPath } from '../../api/paths'; // Axios request for creating path
import { addResource } from '../../api/resources'; // Axios request for adding resources

const CreatePathAndResourcesForm = () => {
  // States for creating path
  const [pathTitle, setPathTitle] = useState('');
  const [pathDescription, setPathDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  
  // States for creating resources
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('');
  const [resourceUrl, setResourceUrl] = useState('');
  const [resourceDescription, setResourceDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [resourceOrder, setResourceOrder] = useState('');

  const [pathId, setPathId] = useState(null); // Store pathId after creation

  // Handle path creation
  const handleCreatePath = async (e) => {
    e.preventDefault();

    const newPath = {
      title: pathTitle,
      description: pathDescription,
      is_public: isPublic,
    };

    try {
      const response = await createPath(newPath); // Make API call to create path
      setPathId(response.data.id); // Set the returned path ID
      alert('Learning Path Created Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error creating learning path');
    }
  };

  // Handle resource creation
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
      const response = await addResource(newResource); // Make API call to add resource
      alert('Resource added successfully!');
      clearResourceForm(); // Clear resource form fields
    } catch (err) {
      console.error(err);
      alert('Error adding resource');
    }
  };

  // Clear resource form fields
  const clearResourceForm = () => {
    setResourceTitle('');
    setResourceType('');
    setResourceUrl('');
    setResourceDescription('');
    setEstimatedTime('');
    setResourceOrder('');
  };

  return (
    <div>
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
