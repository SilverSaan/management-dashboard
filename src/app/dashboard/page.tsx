// src/app/dashboard/page.tsx
"use client" 
import BotCards from '@/components/BotCards';
import { Container, Typography, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import {Bot} from '@/types'


export default function Dashboard() {
  const [bots, setBots] = useState<Bot[] | null>(null);
  const [botStats, setBotStats] = useState(null);
  const [refreshStat, raiseStat] = useState(1)

  const Refresh = () => {
    raiseStat(refreshStat+1);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      raiseStat((prev) => prev + 1);
    }, 30000);

    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, []);


  useEffect(() => {
    // Fetch all bots from the Elysia API
    fetch('http://localhost:3001/bots')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch bots');
        }
        return response.json();
      })
      .then((data: Bot[]) => setBots(data))
      .catch((error) => {
        console.error('Error fetching bots:', error);
        setBots(null); // Ensure state is reset on error
      });
  }, [refreshStat]);


  return (
    <Box sx={{ paddingLeft: '5%', paddingRight: '5%', paddingTop: '2%' }}>
      <Typography variant="h3" component="h1">
        Arc Guild Bot Dashboard
      </Typography>
      <Button variant="contained" onClick={Refresh}>
        Refresh Bots
      </Button>
      <Typography>
        Total Bots: {bots ? bots.length : "Loading..."}
      </Typography>

      <BotCards bots={bots || []}/>
  </Box>

  );
}
