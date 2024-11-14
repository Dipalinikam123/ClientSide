import React, { useEffect } from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function BufferTeam({ getTeam, modal, editTeam, handleRemove, searchTerm, handleSearch, modalHandler, masterBufferTeamsArr }) {

  useEffect(() => {
    getTeam();
  }, [modal]);

  return (
    <Box sx={{ width: '85%', maxHeight: '100vh', overflowY: 'auto', paddingX: 5, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 3, px: 2 }}>
        <Button variant="contained" color="success" onClick={modalHandler}>Create Team</Button>
        <TextField
          type='search'
          id="outlined-basic"
          label="Search here..."
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
        />
      </Box>
      
      {/* Table */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="buffer team table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography fontWeight="bold">Image</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Team Name</Typography>
              </TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Typography fontWeight="bold">Action</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Action</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {masterBufferTeamsArr.map((team, index) => (
              <TableRow key={index}>
                <TableCell></TableCell>
                <TableCell>
                  <img
                    src={team?.teamImage || 'placeholder.jpg'}
                    alt="Team"
                    width={60}
                    height={50}
                    style={{ objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell sx={{ textTransform: 'capitalize' }}>{team.teamName}</TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <Button variant="contained" color="success" size="small" onClick={() => editTeam(team, team.id)}>
                    Edit
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="error" size="small" onClick={() => handleRemove(team.id)}>
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
