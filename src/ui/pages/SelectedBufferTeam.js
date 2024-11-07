import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap';

export default function SelectedBufferTeam({ team, modal, selectedTeamsArr, restoreHandler }) {

  return (
    <>
      <div className='pb-2 d-flex justify-content-end border border-top-0 border-start-0 border-end-0 py-3 px-2'>
        <input
          type='search'
          placeholder='Search here...'
          className='rounded px-2 border-1'
        // value={searchTerm}
        // onChange={handleSearch}
        />
      </div>
      <div>
        <p className='fw-bold p-2 border border-top-0 border-start-0 border-end-0'>Selected Buffer Team</p>
        <Table className='border border-1'>

          <tbody>
            {
              selectedTeamsArr?.map((e, i) => {
                return (
                  <tr key={e.id} style={{ cursor: "move" }}>
                    <td>
                      <img
                        src={e?.teamImage}
                        alt="not found"
                        width={60}
                      />
                    </td>
                    <td>{e.teamName}</td>
                    <td>
                      <Button color="danger" className="me-2" onClick={() => restoreHandler(e.id)}>Remove</Button>
                    </td>

                  </tr>
                );
              })
            }
          </tbody>
        </Table>
      </div>
    </>

  )
}
