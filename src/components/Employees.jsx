import React, { useEffect, useState } from 'react';
import { URL } from '../utils/consts';
import { Modal } from 'bootstrap';

const deleteUser = async (id, setEmployees) => {
  const response = await fetch(`${URL}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  fetchDataAndSetPersons(setEmployees);
};

const addEmployee = async (name, setEmployees) => {
  try {
    const response = await fetch(`${URL}/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });

    if (response.status === 201) {
      fetchDataAndSetPersons(setEmployees);
    } else {
      console.error('Error adding employee:', response.statusText);
    }
  } catch (error) {
    console.error('Error adding employee:', error);
  }
};

const fetchDataAndSetPersons = async (setEmployees) => {
  try {
    const response = await fetch(`${URL}/employees`);
    const data = await response.json();
    setEmployees(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployeeName, setNewEmployeeName] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedId, setEditedId] = useState('');
  const [showSucces, setShowSuccess] = useState(false);

  const handleAddEmployee = () => {
    if (newEmployeeName.trim() !== '') {
      addEmployee(newEmployeeName, setEmployees);
      setNewEmployeeName('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/employees/${editedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ editedName }),
      });

      if (response.status === 200) {
        setShowSuccess(true);
        fetchDataAndSetPersons(setEmployees);
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

  useEffect(() => {
    fetchDataAndSetPersons(setEmployees);
  }, []);

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
                Edit employee data
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
                    Name:
                    <input
                      className="ml-4"
                      type="text"
                      value={editedName}
                      onChange={(e) => setEditedName(e.target.value)}
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
      <p className="h3"> Add employee:</p>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          style={{ width: '350px' }}
          placeholder="Enter employee name"
          value={newEmployeeName}
          onChange={(e) => setNewEmployeeName(e.target.value)}
        />
        <button className="btn btn-success mt-2" onClick={handleAddEmployee}>
          Add Employee
        </button>
      </div>
      <p className="h3 mb-4">Employees</p>
      <ul className="list-group">
        {employees.map((employee) => (
          <>
            <div className="">
              <li className="list-group-item list-group-item-primary  w-50">
                {employee.properties.name}
                <button
                  type="button"
                  className="btn btn-primary ml-5"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  onClick={() => {
                    setEditedName(employee.properties.name);
                    setEditedId(employee.id);
                  }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-3"
                  onClick={() => deleteUser(employee.id, setEmployees)}
                >
                  Delete
                </button>
              </li>
            </div>
          </>
        ))}
      </ul>
    </>
  );
};
export default Employees;
