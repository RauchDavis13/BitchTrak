import React, { Component, useState } from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
  Carousel,
  Navbar,
  Nav,
  NavDropdown,
  Image
} from 'react-bootstrap';
// import { render } from 'react-dom';
import ParticlesBg from 'particles-bg';


import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import AppNavbar from '../components/Navbar';

const Homepage = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  if (loading) {
    return <h2>Fetching 🐾🐾🐾🐾🐾</h2>;
  }
  return (
    <>
      <Carousel fade className="pt-5 shawdow-5-strong" id="carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-circle pt-60px"
            src="https://user-images.githubusercontent.com/92537596/162086177-e6873481-c04d-40a0-8259-e33b77dcc1ea.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="900x500"
            className="d-block w-100 rounded-circle"
            src="https://user-images.githubusercontent.com/92537596/162113954-e9fa1106-563f-4413-b403-82adcb162dc4.jpeg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 rounded-circle"
            src="https://user-images.githubusercontent.com/92537596/162113770-bb19317d-cf68-488a-8c09-afdfe3963b6a.jpeg"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
      <div className="text-center pt-5">
      <h1 className="text-wrap">Heat Cycle Tracker</h1>
      <p>As a pet owner of a unspayed b***h 🫢😉, I will like to be able to track my dog heat cycle. As well as find potential mates for breeding. 
      </p>
      </div>
      <ParticlesBg type="circle" bg={{
        position: "absolute",
        zIndex:-1,
        top: 0,
        left: 0,
        height: 1000
      }} />
    </>
  );
};
export default Homepage;
