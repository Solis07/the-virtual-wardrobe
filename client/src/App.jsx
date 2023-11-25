import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
// 'Navbar' is unfinished:
import Navbar from "./components/Navbar";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return ( 
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;


// This has been abstracted away to 'API.js' so that 'SearchClothes.jsx' can all it easier:
// fetch('https://amazon-price1.p.rapidapi.com/search?keywords=womens%20shirt&marketplace=ES', {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': '309b7d3f4bmsh15d4997beee00a8p15d187jsn4055f7908903',
//         'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'

// }
// })
// .then(response => response.json())
// .then(json => setData(json))
// .catch(error => console.error(error));
// }, []);

// import React, { useState, useEffect } from 'react'; 
// No longer a function called 'fetchData' in './utils/API'
// Does anything from './utils/API' need to be imported to 'App.jsx'?
// import fetchData from './utils/API';

// const [data, setData] = useState([]);

// No longer 'fetchData' function being used, so comment out this code:
//  useEffect(() => {
//     fetchData().then((json) => {
//       setData(json);
//     });
//  }, []);


{/* Comment out lines to see if results will be displayed from 'SearchClothes.jsx' */}
      {/* <div>
       {data.map((item) => (
        <img key={item.ASIN} src={item.imageUrl} alt={item.title}></img>
       ))}
      </div> */}
      