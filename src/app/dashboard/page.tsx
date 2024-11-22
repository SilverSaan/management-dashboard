// src/app/dashboard/page.tsx
"use client" 
import BotCards from '@/components/BotCards';
import { Container, Typography, Button, Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Dashboard() {
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
    // Fetch bot stats from the Elysia API
    fetch('http://localhost:3001/bot-stats')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then((data) => setBotStats(data))
      .catch((error) => {
        console.error('Error fetching bot stats:', error);
      });
  }, [refreshStat]);


  return (
    <><Box sx={{ paddingLeft: '5%', paddingRight:'5%', paddingTop: '2%' }}>
      <Typography variant="h3" component="h1">
        Arc Guild Bot Status
      </Typography>
      <Button variant="contained" color="secondary" onClick={Refresh}>
        Refresh Stats
      </Button>
      <Typography>
        Online Users: {botStats?botStats["onlineUsers"]: "N/A"}
      </Typography>
      <Typography>
        Number of Bots: {botStats? botStats["activeBots"]: "N/A"}

      </Typography>

      <BotCards 
      numberOfBotsAp={botStats? botStats["activeBots"]: 0}/>

    </Box></>

  );
}
