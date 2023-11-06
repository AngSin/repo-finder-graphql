import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Repo Finder
        </Typography>
        <Button
          onClick={() => navigate("/")}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Search
        </Button>
        <Button
          onClick={() => navigate("/favorites")}
          sx={{ my: 2, color: "white", display: "block" }}
        >
          Favorites
        </Button>
      </Toolbar>
    </AppBar>
  );
};
