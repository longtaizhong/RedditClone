import "reflect-metadata";
import{ MikroORM } from "@mikro-orm/core";
import{ __prod__ } from "./constants";
import { Post} from "./entities/Post";
import microConfig from "./mikro-orm.config";
import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";


const main = async () => {

    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver, PostResolver],
            validate: false
        }),
        context: () => ({em: orm.em})
    });

    apolloServer.applyMiddleware({ app});

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    });
    // const post = orm.em.create(Post, {title: 'my first post3'});
    // await orm.em.persistAndFlush(post);
    
    // const posts = await orm.em.find(Post, {});
    // console.log(posts);
    
};

main().catch((err) =>{
    console.error(err);
});
