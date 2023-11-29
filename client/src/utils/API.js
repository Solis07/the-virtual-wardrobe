fetch('/api/key')
  .then((response) => response.json())
  .then((data) => {
    apiKey = data.apiKey;
  })
  .catch((error) => {
    console.error('Error fetching API key:', error);
  });


export const searchClothes = (apiKey, query) => {
    return fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    method: 'GET',
    headers: {
                // Scott's 2nd API key:
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
};
