import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import FranchiseList from "../../components/FranchiseList/FranchiseList";

const Franchise = () => {
  return (
    <div className='profile-page'>
      <div className='sidebar-container'>
        {" "}
        <Sidebar />
      </div>
      <div className='franchise-list'>
        <FranchiseList />
      </div>
    </div>
  );
};

export default Franchise;
