import React from 'react';
import {
    Jumbotron,
    Container,
    CardColumns,
    Card,
    Button,
    Carousel
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
                        src=""
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
                        src="homepage1.png/800x400?text=Second slide&bg=282c34"
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
                        src="holder.js/800x400?text=Third slide&bg=20232a"
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
