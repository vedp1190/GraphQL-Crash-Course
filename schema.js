export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: String!
        platform: [String!]! #This is an array of strings
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        #Single Review Query. This is a Query Variable: (id: ID!)
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        deleteGame(id: ID!): [Game]
        addGame(game: AddGameInput): Game
        updateGame(id: ID!, edits: EditGameInput!): Game
    }
    # A input type that mutation can use as a single argument
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    #For the update mutation, we don't need to require all the fields 
    input EditGameInput {
        title: String
        platform: [String]
    }
`