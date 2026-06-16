"use client";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Alert,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Bot name is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/bots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, owner_id: "1" }),
      });

      const data = await response.json();

      if (response.ok) {
        setGeneratedKey(data.authKey);
      } else {
        setError(data.message ?? "Failed to register bot.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedKey) return;
    navigator.clipboard.writeText(generatedKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Box sx={{ paddingLeft: "2%", paddingRight: "5%", paddingTop: "2%" }}>
      <Typography variant="h2">New Bot</Typography>

      {!generatedKey ? (
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "30%" }}
        >
          <FormControl>
            <TextField
              label="Bot Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          {error && <Alert severity="error">{error}</Alert>}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register Bot"}
          </Button>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", width: "40%" }}>
          <Alert severity="success">
            Bot registered! Copy the authentication key below and paste it into your bot's <code>.env</code>. You won't see it again.
          </Alert>

          <TextField
            label="Authentication Key"
            value={generatedKey}
            fullWidth
            InputProps={{
              readOnly: true,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleCopy}>
                    <ContentCopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {copied && <Alert severity="info">Copied to clipboard!</Alert>}

          <Button
            variant="outlined"
            onClick={() => { setGeneratedKey(null); setName(""); }}
          >
            Register Another Bot
          </Button>
        </Box>
      )}
    </Box>
  );
}