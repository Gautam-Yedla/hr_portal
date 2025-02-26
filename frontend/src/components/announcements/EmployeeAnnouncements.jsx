import React, { useEffect, useState } from 'react';
import { fetchAnnouncements } from '../../utils/AnnouncementHelper';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';

const EmployeeAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
      setLoading(false);
    };
    loadAnnouncements();
  }, []);

  if (loading) return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        📢 Announcements
      </Typography>

      <Grid container spacing={3}>
        {announcements.length ? (
          announcements.map((ann) => (
            <Grid item xs={12} sm={6} md={4} key={ann._id}>
              <Card sx={{ minHeight: 150, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6">{ann.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {ann.description.substring(0, 100)}...
                  </Typography>
                  <Typography variant="caption" display="block" mt={1}>
                    📅 Created on: {new Date(ann.createdAt).toLocaleDateString()}
                  </Typography>
                  {ann.expiryDate && (
                    <Typography variant="caption" color="error">
                      ⏰ Expires: {new Date(ann.expiryDate).toLocaleDateString()}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1">No announcements available.</Typography>
        )}
      </Grid>
    </div>
  );
};

export default EmployeeAnnouncements;
