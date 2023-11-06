import React from "react";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface RepositoryItemProps {
  name: string;
  description: string;
  id: string;
  onFavoriteToggle: () => void;
  isFavorite: boolean;
}

export const RepositoryItem = ({
  name,
  description,
  onFavoriteToggle,
  isFavorite,
}: RepositoryItemProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography color="textSecondary">{description}</Typography>
        <IconButton onClick={onFavoriteToggle}>
          {isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
        </IconButton>
      </CardContent>
    </Card>
  );
};
