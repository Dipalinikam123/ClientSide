import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap';

export default function DeselectedBufferTeam({ team, getTeam, modal, modalHandler, searchTerm, handleSearch, handleCheckboxChange, selectedTeams, selectedTeamHandler, addOneTeamHandler,deSelectedTeamsArr,teamFLag}) {
  const [index, setIndex] = useState(null)
  useEffect(() => {
    getTeam();
  }, [modal]);

  const handleCheckboxChange1 = (id) => {
    setIndex(id)
    handleCheckboxChange(id)
    
  }
  return (
    <>
      <div className='pb-2 d-flex justify-content-between border border-top-0 border-start-0 border-end-0 py-3 px-2'>
        <input
          type='search'
          placeholder='Search here...'
          className='rounded px-2 border-1 '
          value={searchTerm}
          onChange={handleSearch}
        />
        {
          selectedTeams?.includes(index) && <button className='bg-success rounded border-0 text-light' onClick={selectedTeamHandler}>Add Selected Team {selectedTeams?.length} </button>
        }
        <button onClick={() => modalHandler()} className='bg-success rounded border-0 text-light'>Create Team</button>
      </div>
      <div>
        <p className='fw-bold p-2 border border-top-0 border-start-0 border-end-0'>Master Buffer Team</p>
        <Table className=''>
          <tbody>
            {
            // ( teamFLag? deSelectedTeamsArr : team)?.map((e, i) => {
            team?.map((e, i) => {
                return (
                  <tr key={i}>
                    <td><input
                      type="checkbox"
                      checked={selectedTeams?.includes(e?.id)}
                      onChange={() => handleCheckboxChange1(e?.id)}
                    /></td>
                    <td>
                      <img
                        src={e?.teamImage}
                        alt="not found"
                        width={60}
                      />
                    </td>
                    <td>{e.teamName}</td>
                    <td>
                      {
                        !selectedTeams?.includes(e?.id) && <Button color="primary" className="me-2" onClick={() => addOneTeamHandler(e.id)}>Add</Button>
                      }

                    </td>
                    {/* <td>
                    <Button color="danger" onClick={() => handleRemove(e.id)}>Remove</Button>
                  </td> */}
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
