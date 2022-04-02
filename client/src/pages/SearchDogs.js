import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  Col,
  Form,
  Button,
  Card,
  CardColumns,
} from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { SAVE_DOG } from '../utils/mutations';
import { savedDogIds, getSavedDogIds } from '../utils/localStorage';
import Auth from '../utils/auth';
const SearchDogs = () => {
  // create state for holding returned google api data
  const [searchedDogs, setSearchedDogs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved dogId values
  const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());
  const [savedDog, { error }] = useMutation(SAVE_DOG);
  // set up useEffect hook to save `savedDogIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => savedDogIds(savedDogIds);
  });
  // create method to search for dogs and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!searchInput) {
      return false;
    }
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchInput}`
      );
      if (!response.ok) {
        throw new Error('something went wrong!');
      }
      const { items } = await response.json();
      const dogData = items.map((dog) => {
        if (!dog.attributes.spayed_neutered) {
          return {dogId: dog.id,
            dogName: dog.name,
            breeds: dog.breeds.primary,
            age: dog.age,
            description: dog.description,
            gender: dog.gender,
            shots: dog.attributes.shots_current,
            photos: dog.photos?.medium || '',
    
            email: dog.contact.email,
            phone: dog.contact.phone,
            address: dog.contact.address.address1,
            city: dog.contact.address.city,
            state: dog.contact.address.state,
            postcode: dog.contact.address.postcode}      
        }
        
      });
      setSearchedDogs(dogData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };
  // create function to handle saving a dog to our database
  const handleSaveDog = async (dogId) => {
    // find the dog in `searchedDogs` state by the matching id
    const dogToSave = searchedDogs.find((dog) => dog.dogId === dogId);
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await savedDog({
        variables: { dogData: { ...dogToSave } },
      });
      console.log(savedDogIds);
      setSavedDogIds([...savedDogIds, dogToSave.dogId]);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Search for Dogs !</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a dog"
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {searchedDogs.length
            ? `Viewing ${searchedDogs.length} results:`
            : 'Search for a dog to begin'}
        </h2>
        <CardColumns>
          {searchedDogs.map((dog) => {
            return (
              <Card key={dog.dogId} border="dark">
                {dog.image ? (
                  <Card.Img
                    src={dog.image}
                    alt={`The cover for ${dog.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{dog.name}</Card.Title>
                  <p className="small">Authors: {dog.breed}</p>
                  <Card.Text>{dog.description}</Card.Text>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedDogIds?.some(
                        (savedId) => savedId === dog.dogId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveDog(dog.dogId)}
                    >
                      {savedDogIds?.some((savedId) => savedId === dog.dogId)
                        ? 'Dog Already Saved!'
                        : 'Save This Dog!'}
                    </Button>
                  )}
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default SearchDogs;