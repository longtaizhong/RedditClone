import { NavBar } from "../components/NavBar";
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from "../utils/createUrqlClient";
import { useLogoutMutation, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { Link, Stack, Box, Heading, Text, Flex, Button, Icon, IconButton} from "@chakra-ui/core";
import NextLink from "next/link";
import { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
    const [variables, setVariables] = useState({
        limit:15, 
        cursor: null as null | string});
    const [{data, fetching}] = usePostsQuery({
        variables,
            //limit: 10
    });

    if(!fetching && !data){
        return <div> query failed.</div>
    }

    return (
    <Layout>
        <Flex align= "center">
            <Heading> Reddit Clone Project</Heading>
            <NextLink href = "/create-post">
            <Link ml = "auto">create post</Link>
            </NextLink>
        </Flex>
        <br/>
        {!data && fetching  ? (
        <div>loading...</div>
        ): (
            <Stack spacing = {8}>
            {data!.posts.posts.map((p) => (
            <Flex key= {p.id} p = {5} shadow = "md" borderWidth = "1px">
                <UpdootSection post = {p}/>
               
                <Box>
                    <Heading fontSize = "xl"> {p.title}</Heading>
                    <Text>posted by {p.creator.username}</Text>
                    <Text mt = {4}>{p.textSnippet}</Text>
                </Box>
            </Flex>
            ))}
            </Stack>
    )}
    {data && data.posts.hasMore ? (
    <Flex>
    <Button onClick = {() => {
        setVariables({
            limit: variables.limit, 
            cursor: data.posts.posts[data.posts.posts.length -1].createdAt,
        });
    }}
        isLoading = {fetching}
        m = "auto" 
        my = {8}>load more</Button>
    </Flex>
    ): null}
    </Layout>
   
    );
};
 
export default withUrqlClient(createUrqlClient, {ssr:true})(Index);