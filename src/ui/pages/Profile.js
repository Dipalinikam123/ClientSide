import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Container } from '@mui/material';

export default function Profile({ getUserProfile, userProfile }) {
  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  return (
    <Container sx={{ mt: 5 }}>
      {/* Profile Details */}
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8} md={6}>
          <Card elevation={3}>
            <CardHeader title="Profile Details" />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Name:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">
                    {userProfile?.user?.firstName} {userProfile?.user?.lastName}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{userProfile?.user?.email}</Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="subtitle1" fontWeight="bold">Gender:</Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1">{userProfile?.user?.gender}</Typography>
                </Grid>

                {/* Additional fields can be added here as needed */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
