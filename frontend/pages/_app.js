import { ApolloProvider } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import NextHead from '../components/NextHead';
import client from '../apollo-client';

const App = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <NextHead />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default App;
