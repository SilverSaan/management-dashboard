"use client"
import React, { useEffect, useState, useRef } from 'react';
import { use } from "react";
import axios from 'axios';
import { Box, Typography, Paper, Button, Card, CardContent, IconButton, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogTitle, Chip, DialogContent, DialogActions } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Command } from '@/types';

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

// --- Command History Dialog ---

const CommandHistoryDialog = ({
  command,
  onClose,
}: {
  command: Command | null;
  onClose: () => void;
}) => (
  <Dialog open={!!command} onClose={onClose} maxWidth="lg" fullWidth>
    <DialogTitle>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <code>/{command?.commandName}</code>
        <Chip label={`${command?.history.length} uses`} size="small" />
      </Box>
    </DialogTitle>
    <DialogContent>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Input</TableCell>
              <TableCell>Response</TableCell>
              <TableCell>Guild</TableCell>
              <TableCell>When</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {command?.history.map((h, i) => (
              <TableRow key={i}>
                <TableCell>{h.userNickname}</TableCell>
                <TableCell>
                  {h.requestMessage
                    ? <code>{h.requestMessage}</code>
                    : <Typography variant="caption" color="text.secondary">—</Typography>
                  }
                </TableCell>
                <TableCell sx={{ maxWidth: 300 }}>
                  <Typography variant="body2" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: 300,
                  }}>
                    {h.response}
                  </Typography>
                </TableCell>
                <TableCell>{h.guildName}</TableCell>
                <TableCell>{new Date(h.createdAt).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
  </Dialog>
);

// --- Commands Table ---

const CommandsTable = ({ commands }: { commands: Command[] }) => {
  const [selected, setSelected] = useState<Command | null>(null);

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>Commands</Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Command</TableCell>
              <TableCell>Total Uses</TableCell>
              <TableCell>First Seen</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {commands.map(cmd => (
              <TableRow key={cmd.commandName} hover>
                <TableCell><code>/{cmd.commandName}</code></TableCell>
                <TableCell>{cmd.history.length}</TableCell>
                <TableCell>{new Date(cmd.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="right">
                  <Button size="small" onClick={() => setSelected(cmd)}>
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CommandHistoryDialog command={selected} onClose={() => setSelected(null)} />
    </>
  );
};


const BotDetails = ({ params }: { params: Promise<{ id: string }> }) => {
  const [bot, setBot] = useState<Bot | null>(null);
  const [guilds, setGuilds] = useState<Guild[]>([]);
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = use(params);

  const fetchBotDetails = async () => {
    try {
      const [botRes, guildsRes, commandsRes] = await Promise.all([
        axios.get(`http://localhost:3001/bots/${id}`),
        axios.get(`http://localhost:3001/bots/${id}/guilds`),
        axios.get(`http://localhost:3001/bots/${id}/commands`),
      ]);
      setBot(botRes.data);
      setGuilds(guildsRes.data);
      setCommands(commandsRes.data);
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

  if (loading) return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" align="center">Loading bot details...</Typography>
    </Box>
  );

  if (error) return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h6" color="error" align="center">{error}</Typography>
    </Box>
  );

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
        {guilds.length > 0
          ? <GuildCarousel guilds={guilds} />
          : <Typography variant="body2" color="text.secondary">No servers connected yet.</Typography>
        }
      </Paper>

      <Paper elevation={3} sx={{ padding: 2, marginTop: 2 }}>
        {commands.length > 0
          ? <CommandsTable commands={commands} />
          : <Typography variant="body2" color="text.secondary">No commands used yet.</Typography>
        }
      </Paper>
    </Box>
  );
};

export default BotDetails;