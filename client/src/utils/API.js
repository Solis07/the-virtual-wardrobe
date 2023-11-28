export const searchClothes = (query) => {
    return fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    method: 'GET',
    headers: {
                // Scott's 2nd API key:
                'X-RapidAPI-Key': 'fbb18ab978mshb989aa61e361521p1291fbjsn12f25c17f65d',
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
};
