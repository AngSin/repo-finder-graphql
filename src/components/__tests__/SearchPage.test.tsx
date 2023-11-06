import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPage } from "../SearchPage";
import * as hooks from "../../hooks/useSearchRepositories";
import * as favoritesContext from "../../context/FavoritesContext";

jest.mock("../../hooks/useSearchRepositories");
jest.mock("../../context/FavoritesContext");

describe("SearchPage", () => {
  const mockRepositories = [
    {
      id: "1",
      name: "repo1",
      description: "Description for repo1",
    },
    {
      id: "2",
      name: "repo2",
      description: "Description for repo2",
    },
  ];

  const useSearchRepositoriesMock = hooks.useSearchRepositories as jest.Mock;
  const useFavoritesMock = favoritesContext.useFavorites as jest.Mock;

  beforeEach(() => {
    useSearchRepositoriesMock.mockReturnValue({
      repositories: mockRepositories,
      loading: false,
    });
    useFavoritesMock.mockReturnValue({
      favorites: [],
      addFavorite: jest.fn(),
      removeFavorite: jest.fn(),
    });
  });

  it("renders search input and repository items", async () => {
    render(<SearchPage />);

    expect(screen.getByLabelText(/search repositories/i)).toBeInTheDocument();

    for (const repo of mockRepositories) {
      expect(screen.getByText(repo.name)).toBeInTheDocument();
      expect(screen.getByText(repo.description)).toBeInTheDocument();
    }
  });

  it("allows users to type in search input", () => {
    render(<SearchPage />);

    const searchInput = screen.getByLabelText(/search repositories/i);
    fireEvent.change(searchInput, { target: { value: "test" } });

    expect(searchInput).toHaveValue("test");
  });

  it("displays a loading indicator when loading is true", () => {
    useSearchRepositoriesMock.mockReturnValueOnce({
      repositories: [],
      loading: true,
    });

    render(<SearchPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("calls addFavorite when clicking on the favorite button for a non-favorite repo", () => {
    const { addFavorite } = useFavoritesMock();
    render(<SearchPage />);

    const favoriteButtons = screen.getAllByRole("button");
    fireEvent.click(favoriteButtons[0]);

    expect(addFavorite).toHaveBeenCalledWith(mockRepositories[0]);
  });
});
