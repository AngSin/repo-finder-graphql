import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from "react";
import { Favorite } from "../types/favorite";
import { Repository } from "../types/github";

interface FavoritesContextType {
  favorites: Favorite[];
  addFavorite: (repo: Repository) => void;
  removeFavorite: (id: string) => void;
  updateRating: (id: string, rating: number) => void;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  updateRating: () => {},
});

export const FavoritesProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  const addFavorite = (repo: Repository) => {
    setFavorites((prevFavorites) => [...prevFavorites, { ...repo, rating: 0 }]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((repo) => repo.id !== id),
    );
  };

  const updateRating = (id: string, rating: number) => {
    setFavorites((prevFavorites) =>
      prevFavorites.map((repo) =>
        repo.id === id ? { ...repo, rating } : repo,
      ),
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, updateRating }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
