import React, { useState } from 'react';
// Does "import { Link }" do anything?
// import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../utils/mutations";
import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [addUser, { error }] = useMutation(ADD_USER);
  
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
      variables: {
        username: userFormData.username,
        email: userFormData.email,
        password: userFormData.password
      },
    });
    console.log(data);


    const token = data.addUser.token;
    Auth.login(token);

  } catch (err) {
    console.error('Error in handleFormSubmit:', err); // POST http:localhost:3000/graphql 400 (Bad Request)
    console.error('GraphQL response:', err.graphQLErrors); // GraphQL response: []
    setShowAlert(true);
    }  
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({
      ...userFormData,
      [name]: value
    });
  };

  const clearFormData = () => {
    setUserFormData({
      username: '',
      email: '',
      password: ''
    })
  }
  
  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your username'
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;


  // Comment out to see if SignupForm.jsx can work:
    // check if form has everything (as per react-bootstrap docs)
    // const form = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // }

    // try {
    //   const { data } = await addUser({ variables: {...userFormData },});

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }
      // const { token, user } = await response.json();
      // console.log(user);
      // Auth.login(data.addUser.token);

      // console.log(userFormData.username);


    // } catch (err) {
    //   console.error(err);
    //   setShowAlert(true);
    // }

    // setUserFormData({
    //   username: '',
    //   email: '',
    //   password: '',
    // });

    // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setUserFormData({ ...userFormData, [name]: value });
  // };