import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser } from "./userReduser";
import Card from "react-bootstrap/Card";
import "bootstrap-icons/font/bootstrap-icons.css";

const Home = () => {
  const users = useSelector((state) => state.users);
  const [data, setData] = useState(users);
  const dispatch = useDispatch();
  const [serchBy, setSearchBy] = useState("");

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
    const updatedData = data.filter((user) => user.id !== id);
    setData(updatedData);
  };

  const filterData = data.filter(
    (name) =>
      name.id.toString().includes(serchBy.toString()) ||
      name.name.toLowerCase().includes(serchBy.toLocaleLowerCase())
  );

  const handleUp = (index) => {
    if (index > 0) {
      const updatedData = [...data];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index - 1];
      updatedData[index - 1] = temp;
      setData(updatedData);
    }
  };
  const handledown = (index) => {
    if (index < users.length - 1) {
      const updatedData = [...users];
      const temp = updatedData[index];
      updatedData[index] = updatedData[index + 1];
      updatedData[index + 1] = temp;
      setData(updatedData);
    }
  };

  const total = users.length;
  return (
    <div className="container w-50 mt-5 align-items-center ">
      <Card className="text-center">
        <Card.Header>
          <h2>To-Do List</h2>
        </Card.Header>
        <input
          type="text"
          name="item"
          className="form-control my-2 w-25 align-self-end"
          style={{ marginRight: "1rem" }}
          placeholder="Search item"
          value={serchBy}
          onChange={(e) => setSearchBy(e.target.value)}
        />
        <Card.Body>
          <Link
            to="/create"
            className="btn btn-success  d-flex  justify-content-center align-items-end"
          >
            {" "}
            Add - Item
          </Link>

          {filterData.length === 0 ? (
            <p>Item is Not Found</p>
          ) : (
            <table className="table my-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Item</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filterData.map((u, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{u.item}</td>
                      <td>
                        <Link
                          to={`/update/${u.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-sm btn-danger ms-2 "
                          onClick={() => handleDelete(u.id)}
                        >
                          Delete
                        </button>
                        <button
                          className="btn btn-sm btn-light ms-2"
                          onClick={() => handleUp(index)}
                        >
                          <i class="bi bi-caret-up-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-light ms-2"
                          onClick={() => handledown(index)}
                        >
                          <i class="bi bi-caret-down-fill"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </Card.Body>
        <h5>Total Item's: {total}</h5>
      </Card>
    </div>
  );
};

export default Home;
