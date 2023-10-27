import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EditUserForm = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const { state } = useLocation();
  console.log(state);
  const [user, setUser] = useState(state.user);

  useEffect(() => {
    setUser(state.user);
  }, [state]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };
const updatedUser = (id,user) => {
    axios
    .put(`http://localhost:3000/users/${id}`, user)
    .then((response) => (response.status === 200 ? 
          navigate('/', { state: { isUpdated: true} }) : null));
}
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        updatedUser(user.id, user);
      }}
    >
      <div className="form-group">
        <h2>Edit User</h2>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          name="age"
          value={user.age}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={user.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <button className="modal-button">Update user</button>
    </form>
  );
};

export default EditUserForm;
