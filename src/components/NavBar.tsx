import {Box, Flex, Link, Button} from '@chakra-ui/core';
import NextLink from "next/link";
import {useMeQuery, useLoginMutation, useLogoutMutation} from "../generated/graphql"
import { isServer } from '../utils/isServer';
interface NavBarProps{}


export const NavBar: React.FC<NavBarProps> = ({}) =>{
    const [{fetching: logoutFetching},logout] = useLogoutMutation();
    const [{data, fetching}] = useMeQuery({
        pause: isServer(),
    }
    );
    let body = null
    //data loading
    if(fetching){

    //user not logged in 
    }else if(!data?.me){
        body = (
            <>
            <NextLink href = "/login">
                <Link color = 'white' mr = {3}>login</Link>
            </NextLink>
            <NextLink href = '/register'>
            <Link color = 'white'>register</Link>
            </NextLink>
        </>
        )
    //user is logged in 
    }else{
       body = (
        <Flex>
            <Box color = 'white' mr = {5}>{data.me.username}</Box>
            <Button 
            onClick={() =>{
                logout();
            }}
            isLoading={logoutFetching}
            variant = "link">logout</Button>
        </Flex>
       );
       
    }
    return (
        <Flex zIndex = {2} position = "sticky" top = {0} bg = 'black' p = {4}>
            <Box ml = "auto">{body}</Box> 
        </Flex>
        
    );
};