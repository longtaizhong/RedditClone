import React from 'react';
import {Formik, Form, setNestedObjectValues} from "formik";  
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button, Link, Flex } from '@chakra-ui/core';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from "next/router"
import {withUrqlClient} from "next-urql"
import { createUrqlClient } from '../utils/createUrqlClient';
import NextLink from 'next/link'

interface registerProps{}




const Login: React.FC<{}> = ({ }) => {
    const router = useRouter();

    const [, login] = useLoginMutation();
    return (
        <Wrapper variant = 'small'>
       <Formik 

        initialValues = {{usernameOrEmail: "", password: ""}}
        onSubmit = {async (values, {setErrors}) => {
            const response = await login(values);
            if(response.data?.login.errors){
                //console.log("error detected");
                setErrors(toErrorMap(response.data.login.errors));
            }else if(response.data?.login.user){
                if(typeof router.query.next === "string"){
                    router.push(router.query.next);
                }else{
                //worked
                    router.push('/');
                }
            }
        }}
    > 

    

        {({isSubmitting}) => (
            <Form>
                <InputField 
                    name = 'usernameOrEmail'
                    placeholder = "usernameOrEmail"
                    label = "Username Or Email"
                />
                <Box mt = {4}>
                    <InputField
                        name = "password"
                        placeholder = "password"
                        label = "Password"
                        type = "password"
                    />
                </Box>
                
                <Flex mt = {2}> 
                <NextLink href = "/forgot-password">
                        <Link ml = "auto">forgot password?</Link>
                     </NextLink>
                </Flex>
                <Button 
                    mt = {4} 
                    type = 'submit' 
                    isLoading = {isSubmitting}
                    variantColor = "teal"
                > Login
                
                </Button>
                
            </Form>
        )}
      </Formik>

      </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login) 
