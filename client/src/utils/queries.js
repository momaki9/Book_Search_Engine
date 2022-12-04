import { gql } from '@apollo/client';

// TODO: finish and update the query

export const GET_ME = gql`
    query me {
        User {
            _id
            username
        }
    }
`;