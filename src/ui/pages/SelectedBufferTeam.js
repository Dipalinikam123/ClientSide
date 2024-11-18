import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export default function SelectedBufferTeam({ selectedTeamsArr, restoreHandler, deSearchTerm, setDeSearchTerm }) {
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
    // console.log('-----draggedTeam', draggedTeam)
    updatedTeams.splice(index, 0, draggedTeam);

    setTeams(updatedTeams);
  };

  return (
    <>
      <div className='pb-2 d-flex justify-content-end border border-top-0 border-start-0 border-end-0 py-3 px-2'>
        <TextField
          type='search'
          id="outlined-basic"
          label='Search here...'
          variant="outlined"
          value={deSearchTerm}
          onChange={(e) => setDeSearchTerm(e?.target.value)}
          size="small"
        />
      </div>
      <div>
        <p className='fw-bold p-2 border border-top-0 border-start-0 border-end-0'>Selected Buffer Team</p>
        <TableContainer component={Paper}>
        <Table >
          <TableBody>
            {teams?.map((e, index) => (
              <TableRow
                key={e.id}
                style={{ cursor: 'move' }}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <TableCell>
                  <img
                    src={e?.teamImage}
                    alt="not found"
                    width={60}
                    height={50}
                  />
                </TableCell>
                <TableCell className='text-capitalize'>{e.teamName}</TableCell>
                <TableCell>
                  <Button size="small" variant="contained" color="error" onClick={() => restoreHandler(e.id)}>Remove</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </TableContainer>
      </div>
    </>
  );
}
