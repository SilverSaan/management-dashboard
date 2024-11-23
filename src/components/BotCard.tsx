"use client"; 
import { Avatar, Card, CardContent, CardHeader, Typography, Box, CardActionArea } from '@mui/material';
import { red, green, grey, purple } from '@mui/material/colors';
import * as React from 'react';

interface BotCardProps {
    botName: string;
    online: boolean;
  }

export default function BotCard({botName, online}: BotCardProps) {
  // Placeholder status for the bot; this can be dynamic in the future.
  const isOnline = online;

  return (
    <Card>
    <CardActionArea>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[200] }} aria-label="bot">
            Ki
          </Avatar>
        }
        title={botName}
        action={
          <Box display="flex" alignItems="center" gap={1}>
            {/* Status indicator */}
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: isOnline ? green[500] : grey[500],
              }}
            />
            <Typography variant="body2" sx={{ color: isOnline ? green[500] : grey[500], display: { xs: 'none', sm: 'block' } }}>
              {isOnline ? 'Online' : 'Offline'}
            </Typography>
          </Box>
        }
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Test
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
