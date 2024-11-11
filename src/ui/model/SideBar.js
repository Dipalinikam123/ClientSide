import React, { useEffect } from 'react';
import { NavLink } from "react-router-dom";

export default function SideBar() {
 
  return (
    <div style={{
      width: '250px',
      minHeight: '100vh',
      backgroundColor: '#282c34',
      padding: '1rem',
      boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      color: 'white'
    }}>
      <h5 style={{ marginBottom: '1.5rem' }}>Sidebar</h5>
      <hr />

      <nav className='d-flex flex-column gap-3 mt-5'>
        <NavLink active to="/configuration-buffer-team" className='text-light text-decoration-none border border-top-0 border-start-0 border-end-0 pb-2'>
          Configure Buffer Team
        </NavLink>
        <NavLink to="/master-buffer-team" className='text-light text-decoration-none border border-top-0 border-start-0 border-end-0 pb-2' >
          Master Buffer Team
        </NavLink>

      </nav>
    </div>
  );
}
