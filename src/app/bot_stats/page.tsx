// src/app/dashboard/page.tsx
"use client" 
import BotCards from '@/components/BotCards';
import { Container, Typography, Button, Box, Avatar, styled, IconButton } from '@mui/material';
import { purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';

import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import PowerIcon from '@mui/icons-material/PowerSettingsNew';
import React from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#838383',
    color: '#838383',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function BotPage() {

  const [botStatus, setBotStatus] = React.useState(false)

  function changeColor(){
    setBotStatus(!botStatus)
  }

  return (
    <Box sx={{ paddingLeft: '2%', paddingRight: '5%', paddingTop: '2%' }}>

    <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center', // Align items vertically in the center
          justifyContent: 'space-between', // Space between bot info and power button
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <StyledBadge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
          >
            <Avatar sx={{ bgcolor: purple[200] }} aria-label="bot">
              T
            </Avatar>
          </StyledBadge>
          <Typography variant="h4" sx={{ paddingLeft: '10px' }}>
            Test Bot Name
          </Typography>
        </Box>

        <IconButton color='primary' sx={{ 
          backgroundImage: botStatus ? 'linear-gradient(to right, #a00c00, red)': 'linear-gradient(to right, #07c300, #087d00)', // Gradient background
          color: 'white', // Ensure the icon color is visible
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)', // Optional shadow for better aesthetics
          borderRadius: '50%', // Circular button
          padding: 1, // Add padding for visual appeal
          '&:hover': {
            backgroundImage: botStatus? 'linear-gradient(to right, red, #a00c00)':'linear-gradient(to right, #087d00, #07c300)', // Reverse gradient on hover
          },
        }}
        onClick={changeColor}>
          <PowerIcon fontSize='large' />
        </IconButton>
      </Box>
    </Box>

  );
}
