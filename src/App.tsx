import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";
import { FavoritesPage } from "./components/FavoritesPage";
import { ApolloProvider } from "@apollo/client";
import { SearchPage } from "./components/SearchPage";
import Container from "@mui/material/Container";
import apolloClient from "./utils/api";
import { Navbar } from "./components/Navbar";

const App: React.FC = () => (
  <ApolloProvider client={apolloClient}>
    <FavoritesProvider>
      <Router>
        <Navbar />
        <Container sx={{ marginTop: "24px" }}>
          <Routes>
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </Container>
      </Router>
    </FavoritesProvider>
  </ApolloProvider>
);

export default App;
