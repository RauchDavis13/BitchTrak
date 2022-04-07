import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { SAVE_PET } from "../utils/mutations";
import ParticlesBg from 'particles-bg'

import Auth from "../utils/auth";

const SavePetform = () => {
  // set initial form state
  const [petFormData, setPetFormData] = useState({
    petId: "",
    petName: "",
    breed: "",
    pureBreed: "",
    petDescription: "",
    image: "",
    petBDay: "",
    female: "",
    lastHeat: "",
  });

  console.log(petFormData);

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [savePet, { error }] = useMutation(SAVE_PET);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetFormData({ ...petFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await savePet({
        variables: { ...petFormData },
      });
      console.log(data);
      Auth.login(data.savePet.token);
    } catch (err) {
      console.error(err);
    }

    setPetFormData({
      petId: "",
      petName: "",
      breed: "",
      pureBreed: "",
      petDescription: "",
      image: "",
      petBDay: "",
      female: "",
      lastHeat: "",
    });
  };

  // const updatedSavedPets = () => {

  // };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="w-50 m-auto pt-3">
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="success"
        >
          Pet Added!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="petName"><h5>Pet Name</h5></Form.Label>
          <Form.Control
            type="petName"
            placeholder="Your new dog name"
            name="petName"
            onChange={handleInputChange}
            value={petFormData.petName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Pet name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="breed"><h5>Breed</h5></Form.Label>
          <Form.Control
            type="breed"
            placeholder="Your new dog's breed"
            name="breed"
            onChange={handleInputChange}
            value={petFormData.breed}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="purebreed"><h5>Pure Breed</h5></Form.Label>
          <Form.Control
            type="pureBreed"
            placeholder="Is your dog a pure breed (Y/N)"
            name="pureBreed"
            onChange={handleInputChange}
            value={petFormData.pureBreed}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="image"><h5>Load a Pic!</h5></Form.Label>
          <Form.Control
            type="file"
            placeholder="Your image"
            name="image"
            onChange={handleInputChange}
            value={petFormData.image}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="petBday"><h5>Birthday</h5></Form.Label>
          <Form.Control
            type="petBDay"
            placeholder="Your new dog's birthday"
            name="petBDay"
            onChange={handleInputChange}
            value={petFormData.petBDay}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="petDescription"><h5>Description</h5></Form.Label>
          <Form.Control
            type="petDescription"
            placeholder="Add some info about your new dog"
            name="petDescription"
            onChange={handleInputChange}
            value={petFormData.petDescription}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="female"><h5>Female</h5></Form.Label>
          <Form.Control
            type="female"
            placeholder="Is your new dog a female (Y/N)?"
            name="female"
            onChange={handleInputChange}
            value={petFormData.female}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="lastHeat"><h5>Heat</h5></Form.Label>
          <Form.Control
            type="lastHeat"
            placeholder="When was your dog's last heat?"
            name="lastHeat"
            onChange={handleInputChange}
            value={petFormData.lastHeat}
          />
        </Form.Group>

        <Button
          disabled={
            !(
              petFormData.petName
              // petFormData.breed &&
              // petFormData.pureBreed &&
              // petFormData.petDescription  &&
              // petFormData.image  &&
              // petFormData.petBDay  &&
              // petFormData.female  &&
              // petFormData.lastHeat
            )
          }
          type="submit"
          variant="light"
        >
          Submit
        </Button>
      </Form>
      <ParticlesBg type="circle" bg={{
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        bottom: 0,
        //height: 1000
      }} />
    </>
  );
};

export default SavePetform;
