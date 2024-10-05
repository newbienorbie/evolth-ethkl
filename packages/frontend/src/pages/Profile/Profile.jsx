import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Profile.styles.css";
import UserProfile from "../../components/UserProfile/UserProfile";

const Profile = () => {
  return (
    <div className='profile-page'>
      <div className='sidebar-container'>
        {" "}
        <Sidebar />
      </div>
      <div className='profile-content'>
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;
