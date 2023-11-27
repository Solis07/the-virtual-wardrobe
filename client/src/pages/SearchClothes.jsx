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

import { searchClothes } from '../utils/API';
import { GET_ME } from '../utils/queries';
import { SAVE_CLOTHES } from '../utils/mutations';
import { saveClothesIds, getSavedClothesIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';

const SearchClothes = () => {
    // Empty array 'state' holds returned Amazon Prices API data:
    const [searchedClothes, setSearchedClothes] = useState([]);

    // Empty quotes 'state' holds search field data:
    const [searchInput, setSearchInput] = useState('');

    // 'getSavedClothesIds()' function 'state' holds local storage 'saved_clothes':
    const [savedClothesIds, setSavedClothesIds] = useState(getSavedClothesIds());

    // Method to search for clothes and set state on form submit:
    const [error, setError] = useState(null);

    // Writing 'saveClothesMutation' this way causes a response to and from GraphQL:
    const [saveClothesMutation, { mutationError }] = useMutation(SAVE_CLOTHES, {
        refetchQueries: [
            { query: GET_ME },
        ]
    });

    // useEffect hook will save 'savedClothesIds' list to localStorage.
    // Setting 'savedClothesIds' in the dependency array means the effect will run whenever 'savedClothesIds' changes:
    useEffect(() => {
        return () => saveClothesIds(savedClothesIds);
    }, [savedClothesIds]);
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if(!searchInput) {
            return false;
        }

        try {
            const response = await searchClothes(searchInput);

            if (!response.ok) {
                throw new Error('Something went wrong.');
            }

            const responseData = await response.json();

            if (Array.isArray(responseData)) {
            const clothesData = responseData.map((clothes) => ({
                    clothesId: clothes.ASIN,
                    title: clothes.title,
                    price: clothes.price,
                    image: clothes.imageUrl
                }));

            setSearchedClothes(clothesData);
            setSearchInput('');
            
            } else {
                console.error('Invalid response format:', responseData)
            }

        } catch (err) {
            setError(err.message);
        }
    };

    // Function saves clothes to database:
    const handleSaveClothes = async (clothesId) => {
        // Find the clothes in 'searchedClothes' state by id:
        const clothesToSave = searchedClothes.find((clothes) => clothes.clothesId === clothesId);

        // Get token:
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveClothesMutation({
                variables: { clothesData: { ...clothesToSave }},
                context: {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                },
            });

            if (response.errors) {
                throw new Error(response.errors[0].message);
            }

            // If clothes successfully saves to user's account, save clothes id to state:
            setSavedClothesIds([...savedClothesIds, clothesToSave.clothesId]);
        } catch (err) {
            console.error(err);
            setError(err.message);
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
                {error && <p>Error: {error}</p>}
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
                                        <Card.Body>
                                            <Card.Title>{clothes.title}</Card.Title>
                                            <p className='small'>Price: {clothes.price}</p>
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

export default SearchClothes;
