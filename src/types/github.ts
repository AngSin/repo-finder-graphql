export type Repository = {
  id: string;
  name: string;
  description: string;
  stargazerCount: number;
};

export type SearchRepositoryResult = {
  search: {
    edges: Array<{
      node: Repository;
    }>;
  };
};

export type SearchRepositoriesVariables = {
  searchTerm: string;
};
