import { gql } from '@apollo/client';

// TODO: finish and update the query

export const GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            savedBooks {
                # _id
                authors
                description
                title
                bookId
                image
                link
            }
        }
    }
`;