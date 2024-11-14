import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
// import { Close as CloseIcon } from '@mui/icons-material';

function AddTeam({ toggle, modal, createTeams, handleNameChange, handleImageChange, handleSubmit, buttonFlag, handleUpdate }) {
  return (
    <Dialog open={modal} onClose={toggle} maxWidth="sm" fullWidth>
      <DialogTitle>
        {buttonFlag ? 'Update Team' : 'Create Team'}
      </DialogTitle>

      <DialogContent dividers>
        <Box component="form">
          <TextField
            id="teamName"
            label="Team Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={createTeams.teamName}
            onChange={handleNameChange}
            size='small'
          />
          <Box mt={2} mb={2}>
            <Typography variant="body1">Team Image</Typography>
            <Button
              variant="contained"
              component="label"
              sx={{ mt: 1 }}
            >
              Upload Image
              <input
                type="file"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {createTeams.teamImage && (
              <Box mt={2}>
                <img
                  src={createTeams.teamImage instanceof File
                    ? URL.createObjectURL(createTeams.teamImage)
                    : createTeams.teamImage}
                  alt="Team"
                  width={70}
                  style={{ marginTop: '10px', borderRadius: '4px' }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        {buttonFlag ? (
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Add
          </Button>
        )}
        <Button variant="outlined" onClick={toggle} color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddTeam;
