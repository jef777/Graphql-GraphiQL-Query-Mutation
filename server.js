const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const { graphql } = require('graphql');
const app = express();

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
  } = require('graphql');


  const posts = [
    {
    id: 1,
    title: "sunt aut facere repellat provident",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum "
    },
    {
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores "
    },
    {
    id: 3,
    title: "ea molestias quasi exercitationem ",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus"
    },
    {
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum "
    },
    {
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis "
    },
    {
    id: 6,
    title: "dolorem eum magni quia",
    body: "ut aspernatur corporis harum nihil quis provident sequi mollitia nobis aliquid "
    },
    {
    id: 7,
    title: "magnam facilis autem",
    body: "dolore placeat quibusdam ea quo vitae magni quis enim qui quis quo nemo aut"
    }
  ]

  const comments = [
    {
    postId: 1,
    id: 1,
    name: "Eliseo",
    email: "Eliseo@gardner.biz",
    comment: "laudantium enim quasi est quidem magnam voluptate ipsam eos tempora quo"
    },
    {
    postId: 1,
    id: 2,
    name: "Jayne_Kuhic",
    email: "Jayne_Kuhic@sydney.com",
    comment: "est natus enim nihil est dolore omnis voluptatem numquam et omnis occaecati quod "
    },
    {
    postId: 4,
    id: 3,
    name: "Nikita",
    email: "Nikita@garfield.biz",
    comment: "quia molestiae reprehenderit quasi aspernatur aut expedita occaecati aliquam eveniet "
    },
    {
    postId: 10,
    id: 4,
    name: "Lew",
    email: "Lew@alysha.tv",
    comment: "non et atque occaecati deserunt quas accusantium unde odit nobis qui voluptatem quia"
    },
    {
    postId: 8,
    id: 5,
    name: "Hayden",
    email: "Hayden@althea.biz",
    comment: "harum non quasi et ratione tempore iure ex voluptates"
    },
    {
    postId: 2,
    id: 6,
    name: "Presley",
    email: "Presley.Mueller@myrl.com",
    comment: "doloribus at sed quis culpa deserunt consectetur qui praesentium"
    },
    {
    postId: 5,
    id: 7,
    name: "Dallas",
    email: "Dallas@ole.me",
    comment: "maiores sed dolores similique labore et inventore et quasi "
    },
    {
    postId: 5,
    id: 8,
    name: "Mallory_Kunze",
    email: "Mallory_Kunze@marie.org",
    comment: "ut voluptatem corrupti velit ad "
    },
    {
    postId: 2,
    id: 9,
    name: "Meghan_Littel",
    email: "Meghan_Littel@rene.us",
    comment: "sapiente assumenda molestiae atque adipisci laborum"
    },
    {
    postId: 9,
    id: 10,
    name: "Carmen_Keeling",
    email: "Carmen_Keeling@caroline.name",
    comment: "voluptate iusto quis nobis reprehenderit ipsum amet nulla quia"
    },
    {
    postId: 3,
    id: 11,
    name: "Veronica_Goodwin",
    email: "Veronica_Goodwin@timmothy.net",
    comment: "ut dolorum nostrum id quia aut est fuga est inventore vel eligendi"
    },
    {
    postId: 6,
    id: 12,
    name: "Oswald",
    email: "Oswald.Vandervort@leanne.org",
    comment: "expedita maiores dignissimos facilis ipsum est rem est fugit velite"
    },
    {
    postId: 3,
    id: 13,
    name: "Kariane",
    email: "Kariane@jadyn.tv",
    comment: "fuga eos qui dolor rerum inventore corporis exercitationem corporis cupiditate"
    },
    {
    postId: 7,
    id: 14,
    name: "Nathan",
    email: "Nathan@solon.io",
    comment: "vel quae voluptas qui exercitationem voluptatibus unde"
    },

  ]


const PostType = new GraphQLObjectType({
    name: 'Post',
    description: 'represents a comment owned by post',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        title: { type: GraphQLNonNull(GraphQLString) },
        body: { type: GraphQLNonNull(GraphQLString) },
        comments: {
            type: new GraphQLList(CommentType),
            resolve: (post) => {
                return comments.filter((comment) => comment.postId === post.id)
            }
        },
    })
})

const CommentType = new GraphQLObjectType({
    name: 'comment',
    description: 'Comment post',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        comment: { type: GraphQLNonNull(GraphQLString) },
        postId: { type: GraphQLNonNull(GraphQLInt) },
        post: {
            type: PostType,
            resolve: (comment) => {
                return posts.find(post => post.id === comment.postId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'query',
    description: 'Root Query for the posts',
    fields: () => ({
        posts: {
            type: new GraphQLList(PostType),
            description: 'A list of all posts',
            resolve: () => posts,
        },
        comments: {
            type: new GraphQLList(CommentType),
            description: 'A list of all comments',
            resolve: () => comments,
        },
        comment: {
            type: CommentType,
            description: 'A single comment',
            args: {
                id: { type: GraphQLInt}
            },
            resolve: (parent, args) => comments.find(comment => comment.id === args.id)
        },
        post: {
            type: PostType,
            description: 'A single Post',
            args: {
                id: { type: GraphQLInt}
            },
            resolve: (parent, args) => posts.find(post => post.id === args.id)
        },
    }),
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root mutation',
    fields: () => ({
        addNewComment: {
            type: CommentType,
            description: 'Add a new comment',
            args: {
                name: {type: GraphQLNonNull(GraphQLString)},
                postId: {type: GraphQLNonNull(GraphQLInt)}
            },
            resolve: (parent, args) => {
                const comment = {
                    id: comments.length + 1,
                    name: args.name,
                    postId: args.postId
                };
                comments.push(comment)
                return comment;
            }
        },
        addNewPost: {
            type: PostType,
            description: 'Add a new comment post',
            args: {
                name: {type: GraphQLNonNull(GraphQLString)}
            },
            resolve: (parent, args) => {
                const post = {
                    id: posts.length + 1,
                    name: args.name,
                };
                posts.push(post)
                return post;
            }
        },

    })
})


const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
})

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}))

app.listen(5000, () => console.log('server running on port 5000'))