import React, { useState } from "react";
import { useSearchRepositories } from "../hooks/useSearchRepositories";
import { useFavorites } from "../context/FavoritesContext";
import { RepositoryItem } from "./RepositoryItem";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import { Repository } from "../types/github";
import { useDebounce } from "../hooks/useDebounce";

export const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { repositories, loading, error } =
    useSearchRepositories(debouncedSearchTerm);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isFavorite = (id: string) => favorites.some((repo) => repo.id === id);

  const handleFavoriteToggle = (repo: Repository) => {
    if (isFavorite(repo.id)) {
      removeFavorite(repo.id);
    } else {
      addFavorite(repo);
    }
  };

  return (
    <div>
      <TextField
        label="Search Repositories"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "20px" }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        repositories.map((repo) => (
          <RepositoryItem
            key={repo.id}
            name={repo.name}
            description={repo.description}
            id={repo.id}
            onFavoriteToggle={() => handleFavoriteToggle(repo)}
            isFavorite={isFavorite(repo.id)}
          />
        ))
      )}
      {!!error && <div>{error.message}</div>}
    </div>
  );
};
