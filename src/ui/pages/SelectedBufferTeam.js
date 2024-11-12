import React, { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';

export default function SelectedBufferTeam({ selectedTeamsArr, restoreHandler,  deSearchTerm, setDeSearchTerm }) {
  const [teams, setTeams] = useState(selectedTeamsArr);

  useEffect(() => {
    setTeams(selectedTeamsArr);
  }, [selectedTeamsArr]);

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('draggedIndex', index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData('draggedIndex');

    if (draggedIndex === index) return;

    const updatedTeams = [...teams];
    const draggedTeam = updatedTeams.splice(draggedIndex, 1)[0];
    console.log('-----draggedTeam', draggedTeam)
    updatedTeams.splice(index, 0, draggedTeam);

    setTeams(updatedTeams);
  };

  return (
    <>
      <div className='pb-2 d-flex justify-content-end border border-top-0 border-start-0 border-end-0 py-3 px-2'>
        <input
          type='search'
          placeholder='Search here...'
          className='rounded px-2 border-1'
          value={deSearchTerm}
          onChange={(e) => setDeSearchTerm(e?.target.value)}
        />
      </div>
      <div>
        <p className='fw-bold p-2 border border-top-0 border-start-0 border-end-0'>Selected Buffer Team</p>
        <Table className='border border-1'>
          <tbody>
            {teams?.map((e, index) => (
              <tr
                key={e.id}
                style={{ cursor: 'move' }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <td>
                  <img
                    src={e?.teamImage}
                    alt="not found"
                    width={60}
                    height={50}
                  />
                </td>
                <td className='text-capitalize'>{e.teamName}</td>
                <td>
                  <Button color="danger" className="me-2" onClick={() => restoreHandler(e.id)}>Remove</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}
