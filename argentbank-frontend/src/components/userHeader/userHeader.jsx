import "./userHeader.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApiService from "../../services/apiServices";
import { setUser } from "../../store/userSlice";

function UserHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEdit = () => {
    setFirstName("");
    setLastName("");
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  const handleSave = async () => {
    try {
      const updatedUser = await ApiService.updateProfile(
        token,
        firstName,
        lastName,
      );

      dispatch(setUser(updatedUser));
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <div className="user-header">
      <h1 className="welcome-title">Welcome back</h1>
      {!isEditing ? (
        <>
          <h2 className="user-text">
            {user?.firstName} {user?.lastName}!
          </h2>
          <button className="edit-button" onClick={handleEdit}>
            Edit Name
          </button>
        </>
      ) : (
        <div className="edit-container">
          <div className="edit-inputs">
            <input
              type="text"
              value={firstName}
              placeholder={user?.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              value={lastName}
              placeholder={user?.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div className="edit-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserHeader;
