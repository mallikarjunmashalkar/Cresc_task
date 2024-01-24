import React, { useState } from "react";
import { addUser } from "./userReduser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Create = () => {
  const [item, setItem] = useState("");

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const navigate = useNavigate();

  const handleAdd = (e) => {
    e.preventDefault();
    const isItemExist = users.some((user) => user.item === item);

    if (isItemExist) {
      toast.warn(`${item} already exist!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      dispatch(addUser({ id: users.length + 1, item }));
      navigate("/");
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2>Add New Items</h2>

        <form>
          <div>
            <label>Item</label>
            <input
              type="text"
              name="item"
              className="form-control"
              placeholder="enter item"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <br />
          <button className="btn btn-info" onClick={handleAdd}>
            Submit
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default Create;
