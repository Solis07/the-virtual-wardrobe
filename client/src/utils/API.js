// Should 'API.js' only be for the API call to 'Amazon Prices'?

// What does 'encodeURIComponent' do in the 'fetch' request?
export const searchClothes = (query) => {
    return fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    // return fetch ('https://amazon-price1.p.rapidapi.com/search?keywords=(query)&marketplace=ES', {
    method: 'GET',
    headers: {
                // Kiara's API key:
                // 'X-RapidAPI-Key': '309b7d3f4bmsh15d4997beee00a8p15d187jsn4055f7908903',
                // Scott's API key:
                'X-RapidAPI-Key': 'eba211f217msh5da548400280abbp19a48fjsn348dcefde8b0',
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
}

// This 'saveClothes' function doesn't seem to work because it uses a route ('/api/users') rather than GraphQL:
// export const saveClothes = (clothesData, token) => {
//     return fetch('/api/users', {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//             authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(clothesData)
//     });
// };
