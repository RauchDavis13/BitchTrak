import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Homepage from './pages/Homepage';
import SearchDogs from './pages/SearchDogs';
import SavedDogs from './pages/SavedDogs';
import Navbar from './components/Navbar';
import SavedPets from './pages/Pets';
import AddPets from './components/AddPet';
// import petSchema from '../../server/models/Pet';

// import petSchema from '../../server/models/Pet';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
<<<<<<< HEAD
            <Route exact path="/" component={SavedPets} />
=======
            <Route exact path="/" component={Homepage} />
>>>>>>> f21d674e8f3d936cd11552882b5d7ad457480713
            <Route exact path="/addPets" component={AddPets} />
            <Route exact path="/searchDogs" component={SearchDogs} />
            <Route exact path="/savedDogs" component={SavedDogs} />
            <Route exact path="/savedPets" component={SavedPets} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
