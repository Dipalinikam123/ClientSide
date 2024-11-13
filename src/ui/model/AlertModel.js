import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

export default function AlertModel({ alertModal, alertToggle, handleRemoveTeam }) {

  return (
    <Dialog 
      open={alertModal} 
      onClose={alertToggle}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ bgcolor: 'error.main', color: 'white' }}>
        <strong>Remove Team</strong>
      </DialogTitle>
      
      <DialogContent dividers>
        <Typography variant="body1" align="center" sx={{ fontSize: '1.1rem' }}>
          Are you sure you want to remove this team?
        </Typography>
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'space-between', px: 3 }}>
        <Button 
          variant="contained" 
          color="error" 
          onClick={handleRemoveTeam}
          sx={{ px: 4 }}
        >
          Remove
        </Button>
        <Button 
          variant="contained" 
          color="secondary" 
          onClick={alertToggle}
          sx={{ px: 4 }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
