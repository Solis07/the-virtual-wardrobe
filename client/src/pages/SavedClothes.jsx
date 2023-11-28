import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { REMOVE_CLOTHES } from "../utils/mutations";
import { GET_ME } from "../utils/queries";

import Auth from "../utils/auth";
import { removeClothesId } from "../utils/localStorage";

import { 
    Container, 
    Card, 
    Button, 
    Row, 
    Col 
} from "react-bootstrap";

const SaveClothes = () => {

  const { loading, data } = useQuery(GET_ME);
  // Added '{ error }' after 'removeClothes' (but where should this error be used?): 
  const [removeClothes, { error }] = useMutation(REMOVE_CLOTHES, {
    refetchQueries: [
      { query: GET_ME },
  ]
  })
  
  // Checks if 'data' object is defined, then looks for 'me' property within 'data' object.
  // (When accessing nested properties it's helpful to check if intermediate levels exist.)
  // If both 'data' and 'me' are defined, 'userData' is assigned value of 'data.me'
  // Otherwise, 'userData' is assigned value of 'undefined.'
  const userData = data?.me;

  // 'handleDeleteClothes' function takes MongoDB 'clothesId' value as parameter and deletes clothes from database:
  const handleDeleteClothes = async (clothesId) => {
    // Checks if user is logged in. If so, user is assigned token (from localStorage?), if not, user receives no token:
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    
    if (!token) {
      return false;
    }

    try {
      const response = await removeClothes({
        variables: {
          clothesId: clothesId,
        },
      });

      console.log(response);

      // if (!response.ok) {
      //   throw new Error("Something went wrong!");
      // }



      removeClothesId(clothesId);

    } catch (err) {
      console.error(err);
    }
  };

  // If data isn't here yet, say so:
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <>
    {/* In Bootstrap, 'fluid' is used to make a container take up the full width of its parent container.  */}
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved Clothes!</h1>
        </Container>
      </div>

      <Container>
        
        {/* Code block either displays "Viewing 10 saved clothes" or "You have no saved clothes!" */}
        <h2 className="pt-5">
          {userData.savedClothes.length
            ? `Viewing ${userData.savedClothes.length} saved ${
                userData.savedClothes.length === 1 ? "clothes" : "clothes"
              }:`
            : "You have no saved clothes!"}
        </h2>

        <Row>
          {/* 'map' iterates over the 'userData.savedClothes' array. */}
          {/* It renders a unique key for each element (using 'clothes.clothesId'). */}
          {/* It then checks if there is an image property ('clothes.image') and renders it if there is one. */}
          {userData.savedClothes.map((clothes) => {
            return (
              <Col md="4">
                <Card key={clothes.clothesId} border="dark">
                  {clothes.image ? (
                    <Card.Img
                      src={clothes.image}
                      alt={`The image of ${clothes.title}`}
                      variant="top"
                    />
                  ) : null}

                  <Card.Body>
                    <Card.Title>{clothes.title}</Card.Title>
                    {/* Commented out '{clothes.seller}' because it is not returned from API call to Amazon Prices: */}
                    {/* <p className="small">Seller: {clothes.seller}</p> */}
                    
                    {/* Commented out {clothes.description} because it is not returned from API call to Amazon Prices: */}
                    {/* <Card.Text>{clothes.description}</Card.Text> */}

                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteClothes(clothes.clothesId)}
                    >
                      Delete these Clothes!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};
export default SaveClothes;
