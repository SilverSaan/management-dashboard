"use client";
import {
  Box,
  Typography,
  Button,
  FormControl,
  TextField,
  Avatar,
  Input,
  styled,
} from "@mui/material";
import React, { useState } from "react";



export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    authKey: "",
    discordId: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null); // Image preview URL

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      // Generate a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.authKey || !formData.discordId || !image) {
      alert("All fields are required, including the image.");
      return;
    }

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("auth_key", formData.authKey);
    formDataObj.append("bot_discord_id", formData.discordId);
    formDataObj.append("image", image);
    formDataObj.append("owner_id", "1");

    try {
      const response = await fetch("http://localhost:3001/bots", {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        alert("Bot registered successfully!");
      } else {
        const errorData = await response.json();
        alert(`Failed to register bot: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <Box sx={{ paddingLeft: "2%", paddingRight: "5%", paddingTop: "2%" }}>
      <Typography variant="h2">New Bot</Typography>

      <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "2rem",
        width: "50%"
      }}>
        {/* Left Side: Form Fields */}
        <Box sx={{ flex: 1 }}>
          <FormControl sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <TextField
              id="name"
              label="Bot Name"
              variant="outlined"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              id="authKey"
              label="Authentication Key"
              variant="outlined"
              name="authKey"
              value={formData.authKey}
              onChange={handleInputChange}
            />
            <TextField
              id="discordId"
              label="Discord ID"
              variant="outlined"
              name="discordId"
              value={formData.discordId}
              onChange={handleInputChange}
            />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" sx={{ marginTop: "1rem" }}>
            Register Bot
          </Button>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Avatar
            src={preview || ""}
            alt="Bot Avatar"
            sx={{
              width: 120,
              height: 120,
              marginBottom: "1rem",
              border: "1px solid #ccc",
            }}
          />
          <Input
            type="file"
            onChange={handleFileChange}
            inputProps={{ accept: "image/*" }}
            sx={{
              display: "none",
            }}
            id="upload-button"
          />
          <label htmlFor="upload-button">
            <Button variant="outlined" component="span">
              Upload Image
            </Button>
          </label>
        </Box>
      </Box>
    </Box>
  );
}
