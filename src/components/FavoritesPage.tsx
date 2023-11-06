import { useFavorites } from "../context/FavoritesContext";
import { RepositoryItem } from "./RepositoryItem";
import { RepositoryRating } from "./Rating";

export const FavoritesPage = () => {
  const { favorites, removeFavorite, updateRating } = useFavorites();

  return (
    <div>
      <h2>My Favorites</h2>
      {favorites.map((repo) => (
        <div key={repo.id}>
          <RepositoryItem
            name={repo.name}
            description={repo.description}
            id={repo.id}
            onFavoriteToggle={() => removeFavorite(repo.id)}
            isFavorite={true}
          />
          {typeof repo.rating === "number" && (
            <RepositoryRating
              value={repo.rating}
              onChange={(newRating) => updateRating(repo.id, newRating)}
            />
          )}
        </div>
      ))}
    </div>
  );
};
