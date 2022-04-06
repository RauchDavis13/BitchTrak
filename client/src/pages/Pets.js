import React, { useState } from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_PET } from '../utils/mutations';
import { removePetId } from '../utils/localStorage';
import Auth from '../utils/auth';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calender.css';
const SavedPets = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const [removePet, { error }] = useMutation(REMOVE_PET);
  const userData = data?.me || {};
  const [date, setDate] = useState(new Date());
  // function to add new pet to User
  const addPet = async () => {
    console.log('add pet clicked');
  };


  // create function that accepts the pet's mongo _id value as param and deletes the pet from the database
  const handleDeletePet = async (petId) => {
    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const { data } = await removePet({
        variables: { petId },
      });
      // upon success, remove pet's id from localStorage
      removePetId(petId);
    } catch (err) {
      console.error(err);
    }
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing {userData.username}'s pets!</h1>
          <h3 onClick={addPet}>Add a new pet</h3>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedPets?.length
            ? `Viewing ${userData.savedPets.length} saved ${userData.savedPets.length === 1 ? 'pet' : 'pets'
            }:`
            : 'You have no saved pets!'}
        </h2>
        {/* calendar start */}
        <div>
          <h1 className='text-center'>React Calendar with Range</h1>
          <div className='calendar-container'>
            <Calendar
              onChange={setDate}
              value={date}
              selectRange={true}
            />
          </div>
          {date.length > 0 ? (
            <p className='text-center'>
              <span className='bold'>Start:</span>{' '}
              {date[0].toDateString()}
              &nbsp;|&nbsp;
              <span className='bold'>End:</span> {date[1].toDateString()}
            </p>
          ) : (
            <p className='text-center'>
              <span className='bold'>Default selected date:</span>{' '}
              {date.toDateString()}
            </p>
          )}
        </div>

        <CardColumns>
          {userData.savedPets?.map((pet) => {
            return (
              <Card key={pet.petId} border="dark">

                {pet.image ? (
                  <Card.Img
                    src={pet.image}
                    alt={`The cover for ${pet.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{pet.petName}</Card.Title>
                  <p className="small">Breed: {pet.breed}</p>
                  <p className='small'>{pet.petName}'s Birthday: {pet.petBday} </p>
                  <p className='small'>{pet.petName}'s last heat {pet.lastHeat}</p>
                  <Card.Text>{pet.description}</Card.Text>

                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeletePet(pet.petId)}
                  >
                    Delete this Pet!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};
export default SavedPets;
