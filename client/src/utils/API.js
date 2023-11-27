export const searchClothes = (query) => {
    return fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    // return fetch ('https://amazon-price1.p.rapidapi.com/search?keywords=(query)&marketplace=ES', {
    method: 'GET',
    headers: {
                // Scott's API key:
                'X-RapidAPI-Key': 'eba211f217msh5da548400280abbp19a48fjsn348dcefde8b0',
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
}
