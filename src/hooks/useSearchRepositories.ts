import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import {
  Repository,
  SearchRepositoryResult,
  SearchRepositoriesVariables,
} from "../types/github";

export const SEARCH_REPOSITORIES = gql`
  query SearchRepositories($searchTerm: String!) {
    search(query: $searchTerm, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            description
            stargazerCount
          }
        }
      }
    }
  }
`;

export const useSearchRepositories = (searchTerm: string) => {
  const { data, loading, error } = useQuery<
    SearchRepositoryResult,
    SearchRepositoriesVariables
  >(SEARCH_REPOSITORIES, {
    variables: { searchTerm },
    skip: searchTerm.length < 3,
  });

  const repositories: Repository[] =
    data?.search.edges.map((edge) => edge.node) ?? [];

  return {
    repositories,
    loading,
    error,
  };
};
