import React, { useEffect, useState } from 'react';
import { URL } from '../utils/consts';
import RelationshipForm from './RelationshipForm ';

const addProject = async (title, setProject) => {
  try {
    const response = await fetch(`${URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    if (response.status === 201) {
      fetchDataAndSetProjects(setProject);
    } else {
      console.error('Error adding project:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding project:', error);
  }
};

const deleteProject = async (id, setProjects) => {
  const response = await fetch(`${URL}/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  fetchDataAndSetProjects(setProjects);
};

const removePersonFromProject = async (
  personName,
  projectTitle,
  setProjects
) => {
  try {
    const response = await fetch(`${URL}/relationships/remove`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ personName, projectTitle }),
    });

    if (response.status === 200) {
      fetchDataAndSetProjects(setProjects);
    } else {
      console.error('Error removing person from project:', response.statusText);
    }
  } catch (error) {
    console.error('Error removing person from project:', error);
  }
};

const fetchDataAndSetProjects = async (setProjects) => {
  try {
    const response = await fetch(`${URL}/projects`);
    const data = await response.json();
    setProjects(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const fetchDataAndSetPersons = async (setPersons) => {
  try {
    const response = await fetch(`${URL}/employees`);
    const data = await response.json();
    setPersons(data);
  } catch (error) {
    console.error('Error fetching persons:', error);
  }
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [persons, setPersons] = useState([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const [editedId, setEditedId] = useState('');
  const [showSucces, setShowSuccess] = useState(false);

  useEffect(() => {
    fetchDataAndSetProjects(setProjects);
    fetchDataAndSetPersons(setPersons);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/projects/${editedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editedTitle }),
      });

      if (response.status === 200) {
        setShowSuccess(true);

        fetchDataAndSetProjects(setProjects);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        console.error('Error updating employee1:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleAddRelationship = async (personName, projectTitle, role) => {
    try {
      const response = await fetch(`${URL}/relationships`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personName, projectTitle, role }),
      });

      if (response.status === 201) {
        fetchDataAndSetProjects(setProjects);
      } else {
        console.error('Error adding relationship:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding relationship:', error);
    }
  };

  const handleAddProject = () => {
    if (newProjectName.trim() !== '') {
      addProject(newProjectName, setProjects);
      setNewProjectName('');
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ color: 'black' }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit project data
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="modal-body">
                  <label>
                    Title:
                    <input
                      className="ml-4"
                      type="text"
                      value={editedTitle || ''}
                      onChange={(e) => setEditedTitle(e.target.value)}
                    />
                  </label>
                </div>
                {showSucces && (
                  <div className="h6" style={{ color: 'green' }}>
                    Data saved
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary "
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <p className="h3 mb-4">Projects</p>
      <div className="d-flex flex-wrap justify-content-around align-items-start">
        {projects.map((project) => (
          <div
            className="card bg-primary mx-4 my-4"
            style={{ width: '35rem' }}
            key={project.id}
          >
            <div className="card-body">
              <div className="d-flex ">
                <h5 className="card-title w-50">{project.properties.title}</h5>
                <button
                  type="button"
                  className="btn btn-info mr-2"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setEditedTitle(project.properties.title);
                    setEditedId(project.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger w-25"
                  onClick={() => deleteProject(project.id, setProjects)}
                >
                  Delete Project
                </button>
              </div>
              <div className="card-header mt-4 bg-secondary">Employees:</div>
              <ul className="list-group list-group-flush bg-secondary">
                {project.persons.map((person, index) => (
                  <li className="list-group-item bg-secondary ml-3" key={index}>
                    <b>{person.role}: </b>
                    {person.name}

                    <button
                      className="btn btn-danger ml-2"
                      onClick={() =>
                        removePersonFromProject(
                          person.name,
                          project.properties.title,
                          setProjects
                        )
                      }
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <p className="h3"> Add new project:</p>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          style={{ width: '350px' }}
          placeholder="Enter project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddProject}>
          Add Project
        </button>
      </div>
      <RelationshipForm
        persons={persons}
        projects={projects}
        onSubmit={handleAddRelationship}
      />
    </>
  );
};

export default Projects;
