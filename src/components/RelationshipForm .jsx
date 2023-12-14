import React, { useEffect, useState } from 'react';
import { URL } from '../utils/consts';

const RelationshipForm = ({ persons, projects, onSubmit }) => {
  const [selectedPerson, setSelectedPerson] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedPerson, selectedProject, role);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <p className="h3"> Add employee to project:</p>
      <div className="form-group">
        <label htmlFor="personSelect">Person:</label>
        <select
          style={{ width: '350px' }}
          className="form-control"
          id="personSelect"
          value={selectedPerson}
          onChange={(e) => setSelectedPerson(e.target.value)}
        >
          <option value="">Select Person</option>
          {persons.map((person) => (
            <option key={person.id} value={person.properties.name}>
              {person.properties.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="projectSelect">Project:</label>
        <select
          style={{ width: '350px' }}
          className="form-control"
          id="projectSelect"
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
        >
          <option value="">Select Project</option>
          {projects.map((project) => (
            <option key={project.id} value={project.properties.title}>
              {project.properties.title}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="roleInput">Role:</label>
        <input
          style={{ width: '350px' }}
          type="text"
          className="form-control"
          id="roleInput"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add Relationship
      </button>
    </form>
  );
};

export default RelationshipForm;
