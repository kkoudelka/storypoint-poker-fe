import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Board = {
  __typename?: 'Board';
  code: Scalars['String']['output'];
  created: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  status: BoardStatus;
  ticket?: Maybe<Scalars['String']['output']>;
  ticketTimer?: Maybe<Scalars['DateTime']['output']>;
  title: Scalars['String']['output'];
  userVotes: Array<UserVote>;
};

export enum BoardStatus {
  Results = 'RESULTS',
  Voting = 'VOTING'
}

export type Mutation = {
  __typename?: 'Mutation';
  changeAdminStatus: Scalars['Boolean']['output'];
  changeBoardStatus: Scalars['Boolean']['output'];
  changeDisplayName: Scalars['Boolean']['output'];
  changeStatus: Scalars['Boolean']['output'];
  changeVote: Scalars['Boolean']['output'];
  createBoard: Board;
  joinBoard: Scalars['Boolean']['output'];
  removeUserFromBoard: Scalars['Boolean']['output'];
  resetVotes: Scalars['Boolean']['output'];
  updateBoardTicket: Scalars['Boolean']['output'];
};


export type MutationChangeAdminStatusArgs = {
  admin: Scalars['Boolean']['input'];
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationChangeBoardStatusArgs = {
  code: Scalars['String']['input'];
  status: BoardStatus;
};


export type MutationChangeDisplayNameArgs = {
  displayName: Scalars['String']['input'];
};


export type MutationChangeStatusArgs = {
  code: Scalars['String']['input'];
  status: UserBoardStatus;
};


export type MutationChangeVoteArgs = {
  code: Scalars['String']['input'];
  vote?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateBoardArgs = {
  title: Scalars['String']['input'];
};


export type MutationJoinBoardArgs = {
  code: Scalars['String']['input'];
};


export type MutationRemoveUserFromBoardArgs = {
  code: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationResetVotesArgs = {
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
};


export type MutationUpdateBoardTicketArgs = {
  code: Scalars['String']['input'];
  ticket?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  board?: Maybe<Board>;
  boards: Array<Board>;
};


export type QueryBoardArgs = {
  code: Scalars['String']['input'];
};

export type Subscription = {
  __typename?: 'Subscription';
  boardUpdate: Board;
};


export type SubscriptionBoardUpdateArgs = {
  code: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  created: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export enum UserBoardStatus {
  Idle = 'IDLE',
  Offline = 'OFFLINE',
  Online = 'ONLINE'
}

export type UserVote = {
  __typename?: 'UserVote';
  admin: Scalars['Boolean']['output'];
  board: Board;
  created: Scalars['DateTime']['output'];
  id: Scalars['Float']['output'];
  lastUpdate: Scalars['DateTime']['output'];
  online: Scalars['Boolean']['output'];
  status: UserBoardStatus;
  user: User;
  vote?: Maybe<Scalars['String']['output']>;
};

export type JoinBoardMutationVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type JoinBoardMutation = { __typename?: 'Mutation', joinBoard: boolean };

export type ChangeBoardStatusMutationVariables = Exact<{
  code: Scalars['String']['input'];
  status: BoardStatus;
}>;


export type ChangeBoardStatusMutation = { __typename?: 'Mutation', changeBoardStatus: boolean };

export type CreateBoardMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateBoardMutation = { __typename?: 'Mutation', createBoard: { __typename?: 'Board', id: number, code: string } };

export type UpdateTicketMutationVariables = Exact<{
  code: Scalars['String']['input'];
  ticket?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateTicketMutation = { __typename?: 'Mutation', updateBoardTicket: boolean };

export type UpdateUserBoardStatusMutationVariables = Exact<{
  code: Scalars['String']['input'];
  status: UserBoardStatus;
}>;


export type UpdateUserBoardStatusMutation = { __typename?: 'Mutation', changeStatus: boolean };

export type ChangeAdminStatusMutationVariables = Exact<{
  code: Scalars['String']['input'];
  admin: Scalars['Boolean']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ChangeAdminStatusMutation = { __typename?: 'Mutation', changeAdminStatus: boolean };

export type UpdateVoteMutationVariables = Exact<{
  code: Scalars['String']['input'];
  vote?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateVoteMutation = { __typename?: 'Mutation', changeVote: boolean };

export type ResetVotesMutationVariables = Exact<{
  code: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type ResetVotesMutation = { __typename?: 'Mutation', resetVotes: boolean };

export type RemoveUserFromBoardMutationVariables = Exact<{
  code: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
}>;


export type RemoveUserFromBoardMutation = { __typename?: 'Mutation', removeUserFromBoard: boolean };

export type ChangeDisplayNameMutationVariables = Exact<{
  displayName: Scalars['String']['input'];
}>;


export type ChangeDisplayNameMutation = { __typename?: 'Mutation', changeDisplayName: boolean };

export type GetBoardsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBoardsQuery = { __typename?: 'Query', boards: Array<{ __typename?: 'Board', id: number, code: string, title: string, lastUpdate: any }> };

export type BoardDetailQueryVariables = Exact<{
  boardCode: Scalars['String']['input'];
}>;


export type BoardDetailQuery = { __typename?: 'Query', board?: { __typename?: 'Board', id: number, title: string, status: BoardStatus, ticket?: string | null, ticketTimer?: any | null, userVotes: Array<{ __typename?: 'UserVote', status: UserBoardStatus, vote?: string | null, admin: boolean, user: { __typename?: 'User', id: number, username: string, email: string } }> } | null };

export type BoardUpdateSubscriptionVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type BoardUpdateSubscription = { __typename?: 'Subscription', boardUpdate: { __typename?: 'Board', id: number, title: string, status: BoardStatus, ticket?: string | null, ticketTimer?: any | null, userVotes: Array<{ __typename?: 'UserVote', status: UserBoardStatus, vote?: string | null, admin: boolean, user: { __typename?: 'User', id: number, username: string, email: string } }> } };


export const JoinBoardDocument = gql`
    mutation JoinBoard($code: String!) {
  joinBoard(code: $code)
}
    `;
export type JoinBoardMutationFn = Apollo.MutationFunction<JoinBoardMutation, JoinBoardMutationVariables>;

/**
 * __useJoinBoardMutation__
 *
 * To run a mutation, you first call `useJoinBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinBoardMutation, { data, loading, error }] = useJoinBoardMutation({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useJoinBoardMutation(baseOptions?: Apollo.MutationHookOptions<JoinBoardMutation, JoinBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinBoardMutation, JoinBoardMutationVariables>(JoinBoardDocument, options);
      }
export type JoinBoardMutationHookResult = ReturnType<typeof useJoinBoardMutation>;
export type JoinBoardMutationResult = Apollo.MutationResult<JoinBoardMutation>;
export type JoinBoardMutationOptions = Apollo.BaseMutationOptions<JoinBoardMutation, JoinBoardMutationVariables>;
export const ChangeBoardStatusDocument = gql`
    mutation ChangeBoardStatus($code: String!, $status: BoardStatus!) {
  changeBoardStatus(code: $code, status: $status)
}
    `;
export type ChangeBoardStatusMutationFn = Apollo.MutationFunction<ChangeBoardStatusMutation, ChangeBoardStatusMutationVariables>;

/**
 * __useChangeBoardStatusMutation__
 *
 * To run a mutation, you first call `useChangeBoardStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeBoardStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeBoardStatusMutation, { data, loading, error }] = useChangeBoardStatusMutation({
 *   variables: {
 *      code: // value for 'code'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useChangeBoardStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeBoardStatusMutation, ChangeBoardStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeBoardStatusMutation, ChangeBoardStatusMutationVariables>(ChangeBoardStatusDocument, options);
      }
export type ChangeBoardStatusMutationHookResult = ReturnType<typeof useChangeBoardStatusMutation>;
export type ChangeBoardStatusMutationResult = Apollo.MutationResult<ChangeBoardStatusMutation>;
export type ChangeBoardStatusMutationOptions = Apollo.BaseMutationOptions<ChangeBoardStatusMutation, ChangeBoardStatusMutationVariables>;
export const CreateBoardDocument = gql`
    mutation CreateBoard($title: String!) {
  createBoard(title: $title) {
    id
    code
  }
}
    `;
export type CreateBoardMutationFn = Apollo.MutationFunction<CreateBoardMutation, CreateBoardMutationVariables>;

/**
 * __useCreateBoardMutation__
 *
 * To run a mutation, you first call `useCreateBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBoardMutation, { data, loading, error }] = useCreateBoardMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateBoardMutation(baseOptions?: Apollo.MutationHookOptions<CreateBoardMutation, CreateBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBoardMutation, CreateBoardMutationVariables>(CreateBoardDocument, options);
      }
export type CreateBoardMutationHookResult = ReturnType<typeof useCreateBoardMutation>;
export type CreateBoardMutationResult = Apollo.MutationResult<CreateBoardMutation>;
export type CreateBoardMutationOptions = Apollo.BaseMutationOptions<CreateBoardMutation, CreateBoardMutationVariables>;
export const UpdateTicketDocument = gql`
    mutation UpdateTicket($code: String!, $ticket: String) {
  updateBoardTicket(code: $code, ticket: $ticket)
}
    `;
export type UpdateTicketMutationFn = Apollo.MutationFunction<UpdateTicketMutation, UpdateTicketMutationVariables>;

/**
 * __useUpdateTicketMutation__
 *
 * To run a mutation, you first call `useUpdateTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTicketMutation, { data, loading, error }] = useUpdateTicketMutation({
 *   variables: {
 *      code: // value for 'code'
 *      ticket: // value for 'ticket'
 *   },
 * });
 */
export function useUpdateTicketMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTicketMutation, UpdateTicketMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTicketMutation, UpdateTicketMutationVariables>(UpdateTicketDocument, options);
      }
export type UpdateTicketMutationHookResult = ReturnType<typeof useUpdateTicketMutation>;
export type UpdateTicketMutationResult = Apollo.MutationResult<UpdateTicketMutation>;
export type UpdateTicketMutationOptions = Apollo.BaseMutationOptions<UpdateTicketMutation, UpdateTicketMutationVariables>;
export const UpdateUserBoardStatusDocument = gql`
    mutation UpdateUserBoardStatus($code: String!, $status: UserBoardStatus!) {
  changeStatus(code: $code, status: $status)
}
    `;
export type UpdateUserBoardStatusMutationFn = Apollo.MutationFunction<UpdateUserBoardStatusMutation, UpdateUserBoardStatusMutationVariables>;

/**
 * __useUpdateUserBoardStatusMutation__
 *
 * To run a mutation, you first call `useUpdateUserBoardStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserBoardStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserBoardStatusMutation, { data, loading, error }] = useUpdateUserBoardStatusMutation({
 *   variables: {
 *      code: // value for 'code'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateUserBoardStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserBoardStatusMutation, UpdateUserBoardStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserBoardStatusMutation, UpdateUserBoardStatusMutationVariables>(UpdateUserBoardStatusDocument, options);
      }
export type UpdateUserBoardStatusMutationHookResult = ReturnType<typeof useUpdateUserBoardStatusMutation>;
export type UpdateUserBoardStatusMutationResult = Apollo.MutationResult<UpdateUserBoardStatusMutation>;
export type UpdateUserBoardStatusMutationOptions = Apollo.BaseMutationOptions<UpdateUserBoardStatusMutation, UpdateUserBoardStatusMutationVariables>;
export const ChangeAdminStatusDocument = gql`
    mutation ChangeAdminStatus($code: String!, $admin: Boolean!, $userId: Int) {
  changeAdminStatus(code: $code, admin: $admin, userId: $userId)
}
    `;
export type ChangeAdminStatusMutationFn = Apollo.MutationFunction<ChangeAdminStatusMutation, ChangeAdminStatusMutationVariables>;

/**
 * __useChangeAdminStatusMutation__
 *
 * To run a mutation, you first call `useChangeAdminStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeAdminStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeAdminStatusMutation, { data, loading, error }] = useChangeAdminStatusMutation({
 *   variables: {
 *      code: // value for 'code'
 *      admin: // value for 'admin'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useChangeAdminStatusMutation(baseOptions?: Apollo.MutationHookOptions<ChangeAdminStatusMutation, ChangeAdminStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeAdminStatusMutation, ChangeAdminStatusMutationVariables>(ChangeAdminStatusDocument, options);
      }
export type ChangeAdminStatusMutationHookResult = ReturnType<typeof useChangeAdminStatusMutation>;
export type ChangeAdminStatusMutationResult = Apollo.MutationResult<ChangeAdminStatusMutation>;
export type ChangeAdminStatusMutationOptions = Apollo.BaseMutationOptions<ChangeAdminStatusMutation, ChangeAdminStatusMutationVariables>;
export const UpdateVoteDocument = gql`
    mutation UpdateVote($code: String!, $vote: String) {
  changeVote(code: $code, vote: $vote)
}
    `;
export type UpdateVoteMutationFn = Apollo.MutationFunction<UpdateVoteMutation, UpdateVoteMutationVariables>;

/**
 * __useUpdateVoteMutation__
 *
 * To run a mutation, you first call `useUpdateVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVoteMutation, { data, loading, error }] = useUpdateVoteMutation({
 *   variables: {
 *      code: // value for 'code'
 *      vote: // value for 'vote'
 *   },
 * });
 */
export function useUpdateVoteMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVoteMutation, UpdateVoteMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVoteMutation, UpdateVoteMutationVariables>(UpdateVoteDocument, options);
      }
export type UpdateVoteMutationHookResult = ReturnType<typeof useUpdateVoteMutation>;
export type UpdateVoteMutationResult = Apollo.MutationResult<UpdateVoteMutation>;
export type UpdateVoteMutationOptions = Apollo.BaseMutationOptions<UpdateVoteMutation, UpdateVoteMutationVariables>;
export const ResetVotesDocument = gql`
    mutation ResetVotes($code: String!, $userId: Int) {
  resetVotes(code: $code, userId: $userId)
}
    `;
export type ResetVotesMutationFn = Apollo.MutationFunction<ResetVotesMutation, ResetVotesMutationVariables>;

/**
 * __useResetVotesMutation__
 *
 * To run a mutation, you first call `useResetVotesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetVotesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetVotesMutation, { data, loading, error }] = useResetVotesMutation({
 *   variables: {
 *      code: // value for 'code'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useResetVotesMutation(baseOptions?: Apollo.MutationHookOptions<ResetVotesMutation, ResetVotesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetVotesMutation, ResetVotesMutationVariables>(ResetVotesDocument, options);
      }
export type ResetVotesMutationHookResult = ReturnType<typeof useResetVotesMutation>;
export type ResetVotesMutationResult = Apollo.MutationResult<ResetVotesMutation>;
export type ResetVotesMutationOptions = Apollo.BaseMutationOptions<ResetVotesMutation, ResetVotesMutationVariables>;
export const RemoveUserFromBoardDocument = gql`
    mutation RemoveUserFromBoard($code: String!, $userId: Int!) {
  removeUserFromBoard(code: $code, userId: $userId)
}
    `;
export type RemoveUserFromBoardMutationFn = Apollo.MutationFunction<RemoveUserFromBoardMutation, RemoveUserFromBoardMutationVariables>;

/**
 * __useRemoveUserFromBoardMutation__
 *
 * To run a mutation, you first call `useRemoveUserFromBoardMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserFromBoardMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserFromBoardMutation, { data, loading, error }] = useRemoveUserFromBoardMutation({
 *   variables: {
 *      code: // value for 'code'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useRemoveUserFromBoardMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserFromBoardMutation, RemoveUserFromBoardMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserFromBoardMutation, RemoveUserFromBoardMutationVariables>(RemoveUserFromBoardDocument, options);
      }
export type RemoveUserFromBoardMutationHookResult = ReturnType<typeof useRemoveUserFromBoardMutation>;
export type RemoveUserFromBoardMutationResult = Apollo.MutationResult<RemoveUserFromBoardMutation>;
export type RemoveUserFromBoardMutationOptions = Apollo.BaseMutationOptions<RemoveUserFromBoardMutation, RemoveUserFromBoardMutationVariables>;
export const ChangeDisplayNameDocument = gql`
    mutation ChangeDisplayName($displayName: String!) {
  changeDisplayName(displayName: $displayName)
}
    `;
export type ChangeDisplayNameMutationFn = Apollo.MutationFunction<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>;

/**
 * __useChangeDisplayNameMutation__
 *
 * To run a mutation, you first call `useChangeDisplayNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeDisplayNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeDisplayNameMutation, { data, loading, error }] = useChangeDisplayNameMutation({
 *   variables: {
 *      displayName: // value for 'displayName'
 *   },
 * });
 */
export function useChangeDisplayNameMutation(baseOptions?: Apollo.MutationHookOptions<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>(ChangeDisplayNameDocument, options);
      }
export type ChangeDisplayNameMutationHookResult = ReturnType<typeof useChangeDisplayNameMutation>;
export type ChangeDisplayNameMutationResult = Apollo.MutationResult<ChangeDisplayNameMutation>;
export type ChangeDisplayNameMutationOptions = Apollo.BaseMutationOptions<ChangeDisplayNameMutation, ChangeDisplayNameMutationVariables>;
export const GetBoardsDocument = gql`
    query GetBoards {
  boards {
    id
    code
    title
    lastUpdate
  }
}
    `;

/**
 * __useGetBoardsQuery__
 *
 * To run a query within a React component, call `useGetBoardsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBoardsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBoardsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBoardsQuery(baseOptions?: Apollo.QueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
      }
export function useGetBoardsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBoardsQuery, GetBoardsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBoardsQuery, GetBoardsQueryVariables>(GetBoardsDocument, options);
        }
export type GetBoardsQueryHookResult = ReturnType<typeof useGetBoardsQuery>;
export type GetBoardsLazyQueryHookResult = ReturnType<typeof useGetBoardsLazyQuery>;
export type GetBoardsQueryResult = Apollo.QueryResult<GetBoardsQuery, GetBoardsQueryVariables>;
export const BoardDetailDocument = gql`
    query BoardDetail($boardCode: String!) {
  board(code: $boardCode) {
    id
    title
    status
    ticket
    ticketTimer
    userVotes {
      user {
        id
        username
        email
      }
      status
      vote
      admin
    }
  }
}
    `;

/**
 * __useBoardDetailQuery__
 *
 * To run a query within a React component, call `useBoardDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useBoardDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardDetailQuery({
 *   variables: {
 *      boardCode: // value for 'boardCode'
 *   },
 * });
 */
export function useBoardDetailQuery(baseOptions: Apollo.QueryHookOptions<BoardDetailQuery, BoardDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BoardDetailQuery, BoardDetailQueryVariables>(BoardDetailDocument, options);
      }
export function useBoardDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BoardDetailQuery, BoardDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BoardDetailQuery, BoardDetailQueryVariables>(BoardDetailDocument, options);
        }
export type BoardDetailQueryHookResult = ReturnType<typeof useBoardDetailQuery>;
export type BoardDetailLazyQueryHookResult = ReturnType<typeof useBoardDetailLazyQuery>;
export type BoardDetailQueryResult = Apollo.QueryResult<BoardDetailQuery, BoardDetailQueryVariables>;
export const BoardUpdateDocument = gql`
    subscription BoardUpdate($code: String!) {
  boardUpdate(code: $code) {
    id
    title
    status
    ticket
    ticketTimer
    userVotes {
      user {
        id
        username
        email
      }
      status
      vote
      admin
    }
  }
}
    `;

/**
 * __useBoardUpdateSubscription__
 *
 * To run a query within a React component, call `useBoardUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useBoardUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBoardUpdateSubscription({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useBoardUpdateSubscription(baseOptions: Apollo.SubscriptionHookOptions<BoardUpdateSubscription, BoardUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<BoardUpdateSubscription, BoardUpdateSubscriptionVariables>(BoardUpdateDocument, options);
      }
export type BoardUpdateSubscriptionHookResult = ReturnType<typeof useBoardUpdateSubscription>;
export type BoardUpdateSubscriptionResult = Apollo.SubscriptionResult<BoardUpdateSubscription>;