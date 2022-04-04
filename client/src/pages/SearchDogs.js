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
import { saveDogIds, getSavedDogIds } from '../utils/localStorage';
import Auth from '../utils/auth';
const SearchDogs = () => {
  // create state for holding returned google api data
  const [searchedDogs, setSearchedDogs] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState('');
  // create state to hold saved dogId values
  const [savedDogIds, setSavedDogIds] = useState(getSavedDogIds());
  const [saveDog, { error }] = useMutation(SAVE_DOG);
  // set up useEffect hook to save `savedDogIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveDogIds(savedDogIds);
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
        // if (!dog.attributes.spayed_neutered) {
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
        // }
        
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
      const { data } = await saveDog({
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
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your new dog profile!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="dogName">Dog Name</Form.Label>
          <Form.Control
            type="dogName"
            placeholder="Search for a dog by name"
            name="dogName"
            onChange={(e) => setSearchInput(e.target.value)}
            value={dogData.dogName}
          />
        </Form.Group>
   
        <Form.Group>
          <Form.Label htmlFor="breeds">Breed</Form.Label>
          <Form.Control
            type="breeds"
            placeholder="Search by Breed"
            name="breeds"
            onChange={(e) => setSearchInput(e.target.value)}
            value={dogData.breeds}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="age">Age</Form.Label>
          <Form.Control
            type="pureBreed"
            placeholder="Search by Age"
            name="age"
            onChange={(e) => setSearchInput(e.target.value)}
            value={dogData.age}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="gender">Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by Gender (Male/Female)"
            name="gender"
            onChange={(e) => setSearchInput(e.target.value)}
            value={dogData.gender}
          />
        </Form.Group>
        <Button
          // disabled={
          //   !(
          //     dogData.dogName &&
          //     dogData.breeds &&
          //     dogData.age  &&
          //     dogData.gemder &&
          //   )
          // }
          type="submit"
          variant="success"
         >
          Submit
        </Button>
      </Form>
    
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
                <h3>Name: {dog.dogName}</h3>
                {dog.photos ? (
                  <Card.Img
                    src={dog.photos}
                    alt={`The picture for ${dog.dogName}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  {/* <Card.Title>{dog.title}</Card.Title> */}
                  <p className="small">Breed: {dog.breeds}</p>
                  <p className="small">Breed: {dog.age}</p>
                  <p className="small">Breed: {dog.gender}</p>
                  <p className="small">Breed: {dog.breeds}</p>
                  <p className="small">Breed: {dog.shots}</p>
                  <Card.Text>{dog.description}</Card.Text>
                  <h4>Contact Info</h4>
                  <p className="small">Email: {dog.email}</p>
                  <p className="small">Phone: {dog.phone}</p> 
                  <p className="small">Address: {dog.address}</p>
                  <p className="small">City: {dog.city}</p>
                  <p className="small">State: {dog.state}</p>
                  <p className="small">Zip: {dog.postcode}</p>
                  {Auth.loggedIn() && (
                    <Button
                      disabled={savedDogIds?.some(
                        (savedId) => savedId === dog.dogId
                      )}
                      className="btn-block btn-info"
                      onClick={() => handleSaveDog(dog.dogId)}
                    >
                      {saveDogIds?.some((savedId) => savedId === dog.dogId)
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