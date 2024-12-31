"use client"; 
import * as React from 'react';
import BotCard from './BotCard';
import { Box, Button, Container, Fade} from '@mui/material';
import Grid from '@mui/material/Grid2';
import {Bot} from '@/types'


interface BotCardsProps {
  bots: Bot[]; // Updated to accept a list of bots
}

export default function BotCards({ bots }: BotCardsProps) {
  return (
    <Box sx={{ marginTop: "10px" }}>
      <Grid container spacing={2}>
        {bots.map((bot) => (
          <Fade in={true} timeout={500} key={`bot-card-${bot.id}-fade`}>
            <Grid size={4}  key={`bot-card-${bot.id}`} minWidth={142}>
              <BotCard 
                botName={bot.name} 
                online={bot.botStatus === 'online'} 
                lastUpdate={bot.lastUpdate} 
                botId={bot.id}
              />
            </Grid>
          </Fade>
        ))}
      </Grid>
    </Box>
  );
}