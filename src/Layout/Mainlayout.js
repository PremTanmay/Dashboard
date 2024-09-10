import React from 'react';
import Sidebar from './Sidebar';
import Taskpage from '../Pages/Taskpage'; // Adjust the path as needed
import Header from './Header'; // Adjust the import path if necessary

const Mainlayout = () => {
  return (
    <div className="flex font-serif text-sm font-normal">
      <Sidebar />
      <div className="flex flex-col px-4 ml-60"> {/* Adjust margin-left to match sidebar width */}
        <Header />
        <Taskpage />
      </div>
    </div>
  );
};

export default Mainlayout;
