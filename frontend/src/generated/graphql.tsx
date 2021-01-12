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
  hello: Scalars['String'];
  courses: Array<CourseEntity>;
  course?: Maybe<CourseEntity>;
  me?: Maybe<UserResponse>;
};


export type QueryCourseArgs = {
  id: Scalars['Int'];
};

export type CourseEntity = {
  __typename?: 'CourseEntity';
  id: Scalars['Int'];
  title: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<UserEntity>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Int'];
  username: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCourse: CourseEntity;
  updateCourse?: Maybe<CourseEntity>;
  deleteCourse: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
};


export type MutationCreateCourseArgs = {
  title: Scalars['String'];
};


export type MutationUpdateCourseArgs = {
  title: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationDeleteCourseArgs = {
  id: Scalars['Int'];
};


export type MutationRegisterArgs = {
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type UsernamePasswordInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'createdAt' | 'updatedAt'>
    )> }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username' | 'createdAt' | 'updatedAt'>
    )> }
  )> }
);


export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors {
      field
      message
    }
    user {
      id
      username
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      username
      createdAt
      updatedAt
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};