import gql from 'graphql-tag'
import { USER_FRAGMENT } from '../fragment/fragment.graphql';

export const ADMIN_LOGIN = gql`
    mutation login($input: LoginInput!) {
        login(input: $input) {
            ...on UserWithToken {
                token
                user {
                    ...UserFragment
                }
            }
            ...on InvalidCredentialsError {
                errorCode
                message
            }
        }
    }
    ${USER_FRAGMENT}
`;

export const QUERY_ME = gql`
    query me {
        me {
            ...UserFragment
        }
    }
    ${USER_FRAGMENT}
`;