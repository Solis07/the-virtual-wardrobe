import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { useState, useEffect } from 'react';

const client = new ApolloClient({
  uri: "/graphql",
  cache: new InMemoryCache(),
});

function App() {

  const [data, setData] = useState([]);

 useEffect(() => {
    fetch('https://amazon-price1.p.rapidapi.com/search?keywords=womens%20shirt&marketplace=ES', {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '309b7d3f4bmsh15d4997beee00a8p15d187jsn4055f7908903',
        'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(json => setData(json))
    .catch(error => console.error(error));
  }, []);

  return ( 
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
      <div>
       {data.map((item) => (
        <img key={item.ASIN} src={item.imageUrl} alt={item.title}></img>
       ))}
      </div>
    </ApolloProvider>
  );
}

export default App;
