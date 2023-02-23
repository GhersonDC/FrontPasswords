/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPassword = /* GraphQL */ `
  query GetPassword($id: ID!) {
    getPassword(id: $id) {
      id
      password
      link
      description
      createdAt
      updatedAt
    }
  }
`;
export const listPasswords = /* GraphQL */ `
  query ListPasswords(
    $filter: ModelPasswordFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPasswords(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        password
        link
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
