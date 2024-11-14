import React from 'react'
import { Button, Modal, Box, Typography } from '@mui/material';
import SelectedBufferTeam from '../pages/SelectedBufferTeam';
import DeselectedBufferTeam from '../pages/DeselectedBufferTeam';


export default function ConfigureTeamModel({ modals, toggle, handleRemove, getTeamHandler, modalHandler, searchTerm, handleSearch, handleCheckboxChange, selectedTeams, selectedTeamHandler, selectedTeamsArr, restoreHandler, addOneTeamHandler, configureTeamHandler, deSearchTerm, setDeSearchTerm, teamFLag, getTeamFlag, deSelectedTeamsArr }) {
  return (
    <Modal open={modals} onClose={toggle}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Buffer Teams
        </Typography>
        <Box sx={{ display: 'flex', width: '100%', gap: 2 }}>
          <Box sx={{ width: '50%', border: '1px solid #ddd', p: 2 }}>
            <DeselectedBufferTeam handleRemove={handleRemove} getTeamHandler={getTeamHandler} modalHandler={modalHandler} searchTerm={searchTerm} handleSearch={handleSearch} handleCheckboxChange={handleCheckboxChange} selectedTeams={selectedTeams} selectedTeamHandler={selectedTeamHandler} addOneTeamHandler={addOneTeamHandler} selectedTeamsArr={selectedTeamsArr} teamFLag={teamFLag} getTeamFlag={getTeamFlag} deSelectedTeamsArr={deSelectedTeamsArr} />
          </Box>
          <Box sx={{ width: '50%', border: '1px solid #ddd', p: 2 }}>
            <SelectedBufferTeam selectedTeamsArr={selectedTeamsArr} restoreHandler={restoreHandler} deSearchTerm={deSearchTerm} setDeSearchTerm={setDeSearchTerm} />
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={configureTeamHandler}>
            Save
          </Button>
          <Button variant="outlined" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>

  )
}
