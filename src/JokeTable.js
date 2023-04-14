// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const JokesTable = () => {
//   const [jokes, setJokes] = useState([]);
//   const [localJokes, setLocalJokes] = useState([]);
//   const [newArr, setNewArr] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchJokes = async () => {
//     try {
//       const response = await axios.get(
//         "https://api.chucknorris.io/jokes/random"
//       );

//       const updateJokes = [...jokes, response.data.value];
//       setJokes(updateJokes);
//       const newUpdatedArr = [...newArr, response.data.value];
//       setNewArr(newUpdatedArr);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     const newLocal = window.localStorage.getItem("localJoke");
//     setLocalJokes(JSON.parse(newLocal));

//     const newFetch = window.localStorage.getItem("storeFechJoke");
//     setNewArr(JSON.parse(newFetch));
//   }, []);
//   useEffect(() => {
//     window.localStorage.setItem("localJoke", JSON.stringify(localJokes));
//     window.localStorage.setItem("storeFechJoke", JSON.stringify(newArr));
//   });

//   const handleAddJoke = (joke) => {
//     setLocalJokes(localJokes.concat(joke));
//   };

//   const handleNewJokes = async () => {
//     await fetchJokes();
//     setTimeout(() => {
//       window.location.reload();
//     }, -0.5);
//   };
//   const filteredJokes = jokes
//     .concat(localJokes)
//     .concat(newArr)
//     .filter((joke) => joke.toLowerCase().includes(searchTerm.toLowerCase()));

//   return (
//     <div>
//       <center>
//         <h1>JOKE GENERATOR</h1>
//         <div>
//           <label>Search:</label>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button onClick={() => setSearchTerm("")}>Clear</button>
//         </div>
//         <table>
//           <thead>
//             <tr>
//               <th>Jokes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredJokes.map((joke) => (
//               <tr key={joke}>
//                 <td>{joke}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div>
//           <input type="text" placeholder="Enter a joke" />
//           <button
//             onClick={(e) => handleAddJoke(e.target.previousSibling.value)}>
//             Add Joke
//           </button>
//         </div>
//         <button onClick={handleNewJokes}>New Jokes</button>
//       </center>
//     </div>
//   );
// };

// export default JokesTable;
