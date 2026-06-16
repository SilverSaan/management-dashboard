"use client"
import React, { useEffect, useState, useRef } from 'react';
import { use } from "react";
import axios from 'axios';
import { Box, Typography, Paper, Button, Card, CardContent, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface Bot {
  id: number;
  name: string;
  botStatus: 'online' | 'offline';
  lastUpdate: string;
  createdAt: string;
}

interface Guild {
  guildId: number;
  guildDiscordId: string;
  guildName: string;
  joinedAt: string;
}

const GuildCarousel = ({ guilds }: { guilds: Guild[] }) => {
  const [index, setIndex] = useState(0);
  const visibleCount = 5;

  const prev = () => setIndex(i => Math.max(0, i - 1));
  const next = () => setIndex(i => Math.min(guilds.length - visibleCount, i + 1));

  const visible = guilds.slice(index, index + visibleCount);

  return (
    <Box sx={{ marginTop: 3 }}>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>Connected Servers</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={prev} disabled={index === 0}>
          <ChevronLeftIcon />
        </IconButton>

        <Box sx={{ display: 'flex', gap: 2, flex: 1, overflow: 'hidden' }}>
          {visible.map(guild => (
            <Card key={guild.guildDiscordId} sx={{ flex: 1, minWidth: 0 }}>
              <CardContent>
                <Typography variant="h6" noWrap>{guild.guildName}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  ID: {guild.guildDiscordId}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Joined: {new Date(guild.joinedAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>

        <IconButton onClick={next} disabled={index >= guilds.length - visibleCount}>
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ marginTop: 1, display: 'block' }}>
        {guilds.length} server{guilds.length !== 1 ? 's' : ''} total
      </Typography>
    </Box>
  );
};

const BotDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [bot, setBot] = useState<Bot | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);

  const fetchBotDetails = async () => {
    try {
      const [botRes, guildsRes] = await Promise.all([
        axios.get(`http://localhost:3001/bots/${id}`),
        axios.get(`http://localhost:3001/bots/${id}/guilds`),
      ]);
      setBot(botRes.data);
      setGuilds(guildsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching bot details:', error);
      setError('Error fetching bot details. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBotDetails();
    const interval = setInterval(fetchBotDetails, 5000);
    return () => clearInterval(interval);
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" align="center">Loading bot details...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="h6" color="error" align="center">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
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

          <Box>
            <Button variant="contained" color="secondary">Turn off</Button>
          </Box>
        </Box>

        
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        {guilds.length > 0 && <GuildCarousel guilds={guilds} />}
        {guilds.length === 0 && (
          <Typography variant="body2" color="text.secondary" sx={{ marginTop: 2 }}>
            No servers connected yet.
          </Typography>
        )}      
        </Paper>
    </Box>
  );
}
   

export default BotDetails;