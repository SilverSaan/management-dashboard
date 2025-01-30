"use client"
// app/bot/[id]/page.tsx
import React, { useEffect, useState } from 'react';
import { use } from "react";


import axios from 'axios';
import { Box, Typography, Paper, Button } from '@mui/material';

interface Bot {
  id: number;
  name: string;
  botStatus: 'online' | 'offline';
  lastUpdate: string;
  createdAt: string;
}

const BotDetails = ({ params }: { params: Promise<{ id: string }>}) => {
  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);  // Access the id directly from params

  const fetchBotDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/bots/${id}`);
      setBot(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bot details:', error);
      setError('Error fetching bot details. Please try again later.');
      setLoading(false);
    }
  };

  // Fetch data initially and set interval to update every 5 seconds
  useEffect(() => {
    fetchBotDetails();
    const interval = setInterval(fetchBotDetails, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [id]);

  // If loading, show loading message
  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" align="center">
          Loading bot details...
        </Typography>
      </Box>
    );
  }

  // If there's an error
  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error" align="center">
          {error}
        </Typography>
      </Box>
    );
  }

  // If bot data is available
  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Text Content */}
          <Box sx={{ flex: 1, paddingRight: 2 }}>
            <Typography variant="h4">{bot?.name}</Typography>
            <Typography variant="h6" color={bot?.botStatus === 'online' ? 'green' : 'red'}>
              {bot?.botStatus === 'online' ? 'Online' : 'Offline'}
            </Typography>
  
            <Typography variant="body1">
              <strong>Last Update:</strong> {new Date(bot?.lastUpdate || '').toLocaleString()}
            </Typography>
  
            <Typography variant="body1">
              <strong>Joined Infrastructure at:</strong> {new Date(bot?.createdAt || '').toLocaleString()}
            </Typography>
          </Box>
  
          {/* Image Content */}
          <Box
            sx={{
              height: 'auto',
              marginLeft: 2,
              borderRadius: '8px', // Optional for rounded corners
            }} 
          >
            {/* Button to turn off bot */}
            <Button variant="contained" color="secondary">
              Turn off
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );  
};

export default BotDetails;
