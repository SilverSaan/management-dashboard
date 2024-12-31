"use client"; 
import { Avatar, Card, CardContent, CardHeader, Typography, Box, CardActionArea } from '@mui/material';
import { red, green, grey, purple } from '@mui/material/colors';
import * as React from 'react';
import { useRouter } from 'next/navigation';

interface BotCardProps {
    botName: string;
    online: boolean;
    lastUpdate: string;
    botId: number;
  }

export default function BotCard({botName, online, lastUpdate, botId}: BotCardProps) {
  // Placeholder status for the bot; this can be dynamic in the future.
  const isOnline = online;
  const router = useRouter()


  return (
    <Card>
    <CardActionArea onClick={() => {router.push(`/bot/${botId}`) }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: purple[200] }} aria-label="bot">
            {botName.charAt(0)}
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
          Updated at {lastUpdate}
        </Typography>
      </CardContent>
      </CardActionArea>
    </Card>
  );
}
