import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import { cacheExchange } from "@urql/exchange-graphcache";
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { LoginMutation, LogoutMutation, MeDocument, MeQuery, RegisterMutation } from '../generated/graphql';
import theme from '../theme';
import { betterUpdateQuery } from '../utils/betterUpdateQuery';

 
function MyApp({ Component, pageProps }: any) {
  return ( 
      <ThemeProvider theme={theme}>
     
        <CSSReset />
        <Component {...pageProps} />
     
      </ThemeProvider>
  )
}

export default MyApp