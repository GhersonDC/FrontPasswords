/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPassword = /* GraphQL */ `
  mutation CreatePassword(
    $input: CreatePasswordInput!
    $condition: ModelPasswordConditionInput
  ) {
    createPassword(input: $input, condition: $condition) {
      id
      password
      link
      description
      createdAt
      updatedAt
    }
  }
`;
export const updatePassword = /* GraphQL */ `
  mutation UpdatePassword(
    $input: UpdatePasswordInput!
    $condition: ModelPasswordConditionInput
  ) {
    updatePassword(input: $input, condition: $condition) {
      id
      password
      link
      description
      createdAt
      updatedAt
    }
  }
`;
export const deletePassword = /* GraphQL */ `
  mutation DeletePassword(
    $input: DeletePasswordInput!
    $condition: ModelPasswordConditionInput
  ) {
    deletePassword(input: $input, condition: $condition) {
      id
      password
      link
      description
      createdAt
      updatedAt
    }
  }
`;
