import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
    fragment UserFragment on User {
        _id
        firstName
        lastName
        username
        email
        phoneNumber
        avatarURL
        active
        countryCode
        currency
    }
`;