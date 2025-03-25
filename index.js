import { ApolloServer } from "@apollo/server"
import { startStandaloneServer } from "@apollo/server/standalone"

//Import the local DB
import db from "./_db.js"
//types 
import { typeDefs } from "./schema.js"

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    },
    Review: {
        game(parent) {
            return db.games.find(game => game.id === parent.game_id)
        },
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id)
        }
    },
    Mutation: {
        deleteGame(_, args){
            db.games = db.games.filter(game => game.id !== args.id)
            return db.games
        },
        addGame(_, args){
            const newGame = {
                id: String(db.games.length + 1),
                title: args.game.title,
                platform: args.game.platform
            }
            db.games.push(newGame)
            return newGame
        },
        updateGame(_, args){
            const game = db.games.find(game => game.id === args.id)
            if(!game) return null
            //update the game's properties
            if(args.edits.title) game.title = args.edits.title
            if(args.edits.platform) game.platform = args.edits.platform
            return game
        }
    }
}

// server setup
const server = new ApolloServer({
  // typeDefs -- different types of data that can be queried
  // resolvers -- functions that are called to get the data
    typeDefs,
    resolvers
})



const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log("Server ready at port", 4000)