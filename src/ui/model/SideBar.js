import React from 'react';
import { NavLink } from "react-router-dom";
import { Box, Typography, Divider, List, ListItem } from '@mui/material';

export default function SideBar() {
  return (
    <Box
      sx={{
        width: 250,
        minHeight: '100vh',
        backgroundColor: '#282c34',
        color: 'white',
        padding: 2,
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 3 }}>
        Sidebar
      </Typography>
      <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.2)' }} />

      <List sx={{ mt: 4 }}>
        <ListItem disablePadding>
          <NavLink
            to="/configuration-buffer-team"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : 'white',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: 8,
              display: 'block',
              width: '100%',
            })}
          >
            Configure Buffer Team
          </NavLink>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 1 }}>
          <NavLink
            to="/master-buffer-team"
            style={({ isActive }) => ({
              color: isActive ? '#61dafb' : 'white',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              paddingBottom: 8,
              display: 'block',
              width: '100%',
            })}
          >
            Master Buffer Team
          </NavLink>
        </ListItem>
      </List>
    </Box>
  );
}
