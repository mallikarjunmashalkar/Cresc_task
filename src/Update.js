import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "./userReduser";

const Update = () => {
  const { id } = useParams();
  const users = useSelector((state) => state.users);
  const existUser = users.filter((f) => f.id == id);
  const { item } = existUser[0];
  const [uitem, setUitem] = useState(item);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: id,
        item: uitem,
      })
    );
    navigate("/");
  };
  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-secondary text-white p-5">
        <h2>Update Items</h2>

        <form>
          <div>
            <label>Item</label>
            <input
              type="text"
              name="item"
              className="form-control"
              placeholder="enter item"
              value={uitem}
              onChange={(e) => setUitem(e.target.value)}
            />
          </div>
          <br />
          <button className="btn btn-info" onClick={handleUpdate}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Update;
