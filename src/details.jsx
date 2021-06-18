import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

function Details(props) {
  const [userDetails, setUserDetails] = useState({
    username: "",
    mobileNum: "",
    address: "",
    email: "",
  });
  function handleChange(event) {
    const { name, value } = event.target;
    setUserDetails((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    if (userDetails.username.length === 0) {
      alert("Username cannot be empty");
    } else if (userDetails.mobileNum.length === 0) {
      alert("Mobile Number cannot be empty");
    } else if (userDetails.address.length === 0) {
      alert("Address cannot be empty");
    } else if (userDetails.email.length === 0) {
      alert("Email cannot be empty");
    } else {
      props.userData(userDetails);

      setUserDetails({
        username: "",
        mobileNum: "",
        address: "",
        email: "",
      });
    }
  }

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
          value={userDetails.username}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="number"
          placeholder="Mobile Number"
          name="mobileNum"
          required
          onChange={handleChange}
          value={userDetails.mobileNum}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email </Form.Label>
        <Form.Control
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
          value={userDetails.email}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          value={userDetails.address}
          required
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>

    
  );
}

export default Details;
