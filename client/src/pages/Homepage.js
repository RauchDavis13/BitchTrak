import React from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
    Carousel,
} from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_DOG } from '../utils/mutations';
import { removeDogId } from '../utils/localStorage';
import Auth from '../utils/auth';
const SavedDogs = () => {
    const { loading, data } = useQuery(QUERY_ME);
    const [removeDog, { error }] = useMutation(REMOVE_DOG);
    const userData = data?.me || {};
    // create function that accepts the dog's mongo _id value as param and deletes the dog from the database
    const handleDeleteDog = async (dogId) => {
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            const { data } = await removeDog({
                variables: { dogId },
            });
            // upon success, remove dog's id from localStorage
            removeDogId(dogId);
        } catch (err) {
            console.error(err);
        }
    };
    if (loading) {
        return <h2>LOADING...</h2>;
    }
    return (
        <>
            <Carousel fade>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/92537596/161655902-2cb8e195-a469-40e8-9558-f03ae43ca8bd.png"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/92537596/161657035-eee69036-909c-4eb3-be26-ec8cb91f8ab2.png"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://user-images.githubusercontent.com/92537596/161657145-a28134ff-aa30-4498-ae19-d92a041cdd97.png"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );
};
export default SavedDogs;
