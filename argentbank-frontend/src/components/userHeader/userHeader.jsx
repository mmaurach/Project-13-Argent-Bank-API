import "./userHeader.scss";

function UserHeader({ firstName, lastName }) {
  return (
    <div className="user-header">
      <h1>
        Welcome back
        <br />
        {firstName} {lastName}!
      </h1>
      <button className="edit-button">Edit Name</button>
    </div>
  );
}

export default UserHeader;
