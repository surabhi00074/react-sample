import React, { useState, useMemo } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { useNavigate } from "react-router-dom";


const useSortableData = (users, config = null) => {
  const [sortConfig, setSortConfig] = useState(config);

  const [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    age: "",
  });

  const sortedUsers = useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);
  

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { users: sortedUsers, requestSort, sortConfig };
};
// const editRoute =
const Users = (props) => {
  const { users, requestSort, sortConfig } = useSortableData(props.users);
  const { editUser, deleteUser } = props;
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  let updateUsers = users.filter((user) => {
    return Object.keys(user).some((key) =>
      user[key]
        .toString()
        .toLowerCase()
        .includes(searchValue.toString().toLowerCase())
    );
  });

const editUserDetails =(user)=> {
  navigate("/edit", { state: { user: user } });
}
  return (
    <>
      <div
        style={{ maxWidth: "100%"}}
        className="container"
      >
          <table
            style={{ marginTop: "10px", maxWidth: "100%", marginLeft: "5px" }}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort("firstName")}
                    className={getClassNamesFor("firstName")}
                  >
                    First Name
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort("lastName")}
                    className={getClassNamesFor("lastName")}
                  >
                    Last Name
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort("age")}
                    className={getClassNamesFor("age")}
                  >
                    Age
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort("username")}
                    className={getClassNamesFor("username")}
                  >
                    Username
                  </button>
                </th>
                <th>
                  <button
                    type="button"
                    onClick={() => requestSort("email")}
                    className={getClassNamesFor("email")}
                  >
                    Email
                  </button>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {updateUsers.length > 0 ? (
                updateUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <img
                        src={user.image}
                        alt={user.firstName + " " + user.lastName}
                      />
                    </td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.age}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          editUser(user);
                          editUserDetails(user);
                        }}
                      >
                        
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        style={{ color: "#ce3f44" }}
                        aria-label="delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5}>No Users</td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </>
  );
};

export default Users;
