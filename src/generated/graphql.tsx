import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  backofficeFolders: Array<BackofficeFolder>;
  backofficeFolder?: Maybe<BackofficeFolder>;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryBackofficeFolderArgs = {
  id: Scalars['String'];
};

export type BackofficeFolder = {
  __typename?: 'BackofficeFolder';
  id: Scalars['String'];
  title: Scalars['String'];
  creatorId: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBackofficeFolder: BackofficeFolderResponse;
  updateBackofficeFolder?: Maybe<BackofficeFolder>;
  deleteBackofficeFolder: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateBackofficeFolderArgs = {
  input: BackofficeFolderInput;
};


export type MutationUpdateBackofficeFolderArgs = {
  title?: Maybe<Scalars['String']>;
  id: Scalars['String'];
};


export type MutationDeleteBackofficeFolderArgs = {
  id: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UsernameEmailPasswordInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type BackofficeFolderResponse = {
  __typename?: 'BackofficeFolderResponse';
  errors?: Maybe<Array<BackofficeFolderError>>;
  backofficeFolder?: Maybe<BackofficeFolder>;
};

export type BackofficeFolderError = {
  __typename?: 'BackofficeFolderError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type BackofficeFolderInput = {
  title: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UsernameEmailPasswordInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type UserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type CreateBackofficeFolderMutationVariables = Exact<{
  input: BackofficeFolderInput;
}>;


export type CreateBackofficeFolderMutation = (
  { __typename?: 'Mutation' }
  & { createBackofficeFolder: (
    { __typename?: 'BackofficeFolderResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'BackofficeFolderError' }
      & Pick<BackofficeFolderError, 'field' | 'message'>
    )>>, backofficeFolder?: Maybe<(
      { __typename?: 'BackofficeFolder' }
      & Pick<BackofficeFolder, 'id' | 'creatorId' | 'title' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & ErrorFragment
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type BackofficeFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type BackofficeFoldersQuery = (
  { __typename?: 'Query' }
  & { backofficeFolders: Array<(
    { __typename?: 'BackofficeFolder' }
    & Pick<BackofficeFolder, 'id' | 'title' | 'creatorId' | 'createdAt' | 'updatedAt'>
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'username'>
  )> }
);

export const ErrorFragmentDoc = gql`
    fragment Error on FieldError {
  field
  message
}
    `;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  username
}
    `;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    errors {
      ...Error
    }
    user {
      ...User
    }
  }
}
    ${ErrorFragmentDoc}
${UserFragmentDoc}`;

export function useChangePasswordMutation() {
  return Urql.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument);
};
export const CreateBackofficeFolderDocument = gql`
    mutation CreateBackofficeFolder($input: BackofficeFolderInput!) {
  createBackofficeFolder(input: $input) {
    errors {
      field
      message
    }
    backofficeFolder {
      id
      creatorId
      title
      createdAt
      updatedAt
    }
  }
}
    `;

export function useCreateBackofficeFolderMutation() {
  return Urql.useMutation<CreateBackofficeFolderMutation, CreateBackofficeFolderMutationVariables>(CreateBackofficeFolderDocument);
};
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;

export function useForgotPasswordMutation() {
  return Urql.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      ...Error
    }
    user {
      ...User
    }
  }
}
    ${ErrorFragmentDoc}
${UserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const BackofficeFoldersDocument = gql`
    query backofficeFolders {
  backofficeFolders {
    id
    title
    creatorId
    createdAt
    updatedAt
  }
}
    `;

export function useBackofficeFoldersQuery(options: Omit<Urql.UseQueryArgs<BackofficeFoldersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BackofficeFoldersQuery>({ query: BackofficeFoldersDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    username
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};