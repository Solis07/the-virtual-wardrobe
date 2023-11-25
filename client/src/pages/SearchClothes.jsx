// File based off of Module 21 Challenge (before being revised to GraphQL application?):
import { useState, useEffect } from 'react';

import {
    Container,
    Col,
    Form, 
    Button,
    Card,
    Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
// Link to Amazon Prices API (commented out to test code):
// 'searchClothes' is part of 'try-catch' block below.
import { saveClothes, searchClothes } from '../utils/API';
import { saveClothesIds, getSavedClothesIds } from '../utils/localStorage';

const SearchClothes = () => {
    // State for holding returned Amazon Prices API data:
    const [searchedClothes, setSearchedClothes] = useState([]);

    // State for holding search field data (searching for clothes?):
    const [searchInput, setSearchInput] = useState('');

    // State to hold saved clothesId values:
    const [savedClothesIds, setSavedClothesIds] = useState(getSavedClothesIds());

    // useEffect hook will save 'savedClothesIds' list to localStorage (on component unmount?):
    useEffect(() => {
        return () => saveClothesIds(savedClothesIds);
    });

    // Method to search for clothes and set state on from submit:
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // This is returning the 'searchInput' typed into the search bar:
        console.log(searchInput);

        if(!searchInput) {
            return false;
        }

        try {
            const response = await searchClothes(searchInput);

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            // Commented out this section because it seems like '{ items }' is an undefined object:
            // const { items } = await response.json();

            const responseData = await response.json();
            
            // Commented out line because trying to check if 'responseData' is an array first (then mapping over it):
            // const clothesData = items.map((clothes) => ({
            
            const clothesData = Array.isArray(responseData.items)
                ? responseData.items.map((clothes) => ({
                clothesId: clothes.id,
                seller: clothes.clothesInfo.seller || ['No seller to display'],
                description: clothes.clothesInfo.description,
                price: clothes.clothesInfo.price,
                size: clothes.clothesInfo.size,
                image: clothes.clothesInfo.imageLinks?.thumbnail || '',
                link: clothes.clothesInfo.link,
                title: clothes.clothesInfo.title
                }))
                : [];

            setSearchedClothes(clothesData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // Function to save clothes to database:
    const handleSaveClothes = async (clothesId) => {
        // Find the clothes in 'searchedClothes' state by id:
        const clothesToSave = searchedClothes.find((clothes) => clothes.clothesId === clothesId);

        // Get token:
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveClothes(clothesToSave, token);

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            // If clothes successfully saves to user's account, save clothes id to state:
            setSavedClothesIds([...savedClothesIds, clothesToSave.clothesId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className='text-light bg-dark p-5'>
                <Container>
                    <h1>Search For Clothes!</h1>
                    <Form onSubmit={handleFormSubmit}>
                    <div onSubmit={handleFormSubmit}>
                        <Row>
                            <Col xs={12} md={8}>
                                <Form.Control
                                    name='searchInput'
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    type='text'
                                    size='lg'
                                    placeholder='Search for clothes'
                                    />
                            </Col>

                            <Col xs={12} md={4}>
                                <Button type='submit' variant='success' size='lg'>
                                    Submit Search
                                </Button>
                            </Col>
                        </Row>
                    </div>    
                    </Form>
                </Container>
            </div>

            <Container>
                <h2 className='pt-5'>
                    {searchedClothes.length
                        ? `Viewing ${searchedClothes.length} results:`
                        : 'Search for clothes to begin'}
                </h2>
                <Row>
                    {searchedClothes.map((clothes) => {
                        return (
                            <Col md='4' key={clothes.clothesId}>
                                <Card border='dark'>
                                    {clothes.image ? (
                                        <Card.Img src={clothes.image} alt={`The image of ${clothes.title}`} variant='top' />
                                    ) : null}
                                    <Card.body>
                                        <Card.title>{clothes.title}</Card.title>
                                        <p className='small'>Seller: {clothes.seller}</p>
                                        <Card.text>{clothes.description}</Card.text>
                                        {Auth.loggedIn() && (
                                            <Button
                                                disabled={savedClothesIds?.some((savedClothesId) => savedClothesId === clothes.clothesId)}
                                                className='btn-block btn-info'
                                                onClick={() => handleSaveClothes(clothes.clothesId)}>
                                                    {savedClothesIds?.some((savedClothesId) => savedClothesId === clothes.clothesId)
                                                    ? 'These clothes have already been saved.'
                                                    : 'Save these clothes.'}
                                                </Button>
                                        )}
                                    </Card.body>
                                </Card>
                            // </Col>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
};

export default SearchClothes;
