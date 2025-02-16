import {Wrapper } from '../components/Wrapper'
import { Formik, Form } from 'formik';
import login from './login';
import { toErrorMap } from '../utils/toErrorMap';
import { InputField } from '../components/InputField';
import { Box, Flex, Link, Button } from '@chakra-ui/core';
import {useCreatePostMutation, useMeQuery} from "../generated/graphql";
import {useRouter} from "next/router";
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
import { useEffect } from 'react';
import { useIsAuth } from '../utils/useIsAuth';

const CreatePost: React.FC<{}> = ({}) => {
    //const [{data, fetching}] = useMeQuery();
    const router = useRouter();
    useIsAuth();
    const [, createPost] = useCreatePostMutation();
    return(
        
        <Layout variant = 'small'>
        <Formik 

        initialValues = {{title: "", text: ""}}
        onSubmit = {async (values) => {
            const {error} = await  createPost({input: values});
            if(!error){
                router.push("/")
            }
           
        }}
        > 

        {({isSubmitting}) => (
            <Form>
                <InputField 
                    name = 'title'
                    placeholder = "title"
                    label = "Title"
                />
                <Box mt = {4}>
                    <InputField
                        textarea
                        name = "text"
                        placeholder = "text..."
                        label = "Body"
                       
                    />
                </Box>
               
                <Button 
                    mt = {4} 
                    type = 'submit' 
                    isLoading = {isSubmitting}
                    variantColor = "teal"
                > create post
                
                </Button>
                
            </Form>
        )}
        </Formik>
            
        </Layout>
    )
}

export default withUrqlClient(createUrqlClient)(CreatePost);
