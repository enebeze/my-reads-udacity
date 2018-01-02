import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjavpk1j5421h0122ovb0kch3'
});

const Client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

export default Client;