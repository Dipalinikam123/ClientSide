import React, { useEffect } from 'react';
import { Button, Table } from 'reactstrap';

import './BufferTeam.css';

export default function BufferTeam({ getTeam, modal, masterTeam, editTeam, handleRemove, searchTerm, handleSearch, modalHandler,masterBufferTeamsArr }) {

  // console.log('--team', masterTeam)
  useEffect(() => {
    getTeam();
  }, [modal]);

  return (
    <div className='d-flex flex-column px-5' style={{width:'85%',maxHeight: '100vh', overflowY: 'auto'}}>
      <div className='d-flex justify-content-between py-3 px-2'>
        <Button onClick={()=>modalHandler()} className='bg-success'>Create Team</Button>
        <input
          type='search'
          placeholder='Search here...'
          className='rounded px-2'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <Table className='border border-1'>
        <thead className="table-dark">
          <tr>
            <th></th>
            <th>Image</th>
            <th>Team Name</th>
            <th></th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {
            masterBufferTeamsArr.map((e, i) => {
              return (
                <tr key={i}>
                  <td></td>
                  <td>
                    <img
                      src={e?.teamImage}
                      alt="not found"
                      width={60}
                      height={50}
                    />
                  </td>
                  <td className='text-capitalize'>{e.teamName}</td>
                  <td></td>
                  <td>
                    <Button color="primary" className="me-2" onClick={() => editTeam(e, e.id)}>Edit</Button>
                  </td>
                  <td>
                    <Button color="danger" onClick={() => handleRemove(e.id)}>Remove</Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </div>
  );
}
