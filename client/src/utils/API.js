// Save the clothes data for a logged in user:
export const saveClothes = (clothesData, token) => {
    return fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(clothesData)
    });
};

// Is 'encodeURIComponent' needed in the 'fetch' request?
export const searchClothes = (query) => {
    return fetch (`https://amazon-price1.p.rapidapi.com/search?keywords=${encodeURIComponent(query)}&marketplace=ES`, {
    // return fetch ('https://amazon-price1.p.rapidapi.com/search?keywords=(query)&marketplace=ES', {
    method: 'GET',
    headers: {
                'X-RapidAPI-Key': '309b7d3f4bmsh15d4997beee00a8p15d187jsn4055f7908903',
                'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
            }
        })
}




// Code to 'fetch' data from Amazon Prices API:
// const fetchData = async () => {
//     try {
//         const response = await fetch('https://amazon-price1.p.rapidapi.com/search?keywords=womens%20shirt&marketplace=ES', {
//             method: 'GET',
//             headers: {
//               'X-RapidAPI-Key': '309b7d3f4bmsh15d4997beee00a8p15d187jsn4055f7908903',
//               'X-RapidAPI-Host': 'amazon-price1.p.rapidapi.com'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Network response was not okay.')
//         }

//         const json = await response.json();
//         return json;
//     } catch (err) {
//         console.error('Error fetching data:', err);
//         return [];
//     }
// };

// export default fetchData;


// // This code will be rewritten as its calling from Amazon Prices API (not Unsplash):
// import ReactDOM from "react-dom";
// import React, { Fragment, useEffect, useState } from "react";
// import "./style.css";
// import { createApi } from "unsplash-js";
// import { fetch } from "undici-types";

// const api = createApi({
//   // Don't forget to set your access token here!
//   // See https://unsplash.com/developers
//   accessKey: "Whw5QJvEGQtU3fTHQFSSItDUwAwwB0kHhNz_VE7tYH0"
// });

// const PhotoComp = ({ photo }) => {
//   const { user, urls } = photo;

//   return (
//     <Fragment>
//       <img className="img" src={urls.regular} />
//       <a
//         className="credit"
//         target="_blank"
//         href={`https://unsplash.com/@${user.username}`}
//       >
//         {user.name}
//       </a>
//     </Fragment>
//   );
// };

// const Body = () => {
//   const [data, setPhotosResponse] = useState(null);

//   useEffect(() => {
//     api.search
//       .getPhotos({ query: "cat", orientation: "landscape" })
//       .then(result => {
//         setPhotosResponse(result);
//       })
//       .catch(() => {
//         console.log("something went wrong!");
//       });
//   }, []);

//   if (data === null) {
//     return <div>Loading...</div>;
//   } else if (data.errors) {
//     return (
//       <div>
//         <div>{data.errors[0]}</div>
//         <div>PS: Make sure to set your access token!</div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="feed">
//         <ul className="columnUl">
//           {data.response.results.map(photo => (
//             <li key={photo.id} className="li">
//               <PhotoComp photo={photo} />
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// };

// const Home = () => {
//   return (
//     <main className="root">
//       <Body />
//     </main>
//   );
// };

// ReactDOM.render(<Home />, document.getElementById("root"));
