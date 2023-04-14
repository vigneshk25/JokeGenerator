// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const JokesTable = () => {
//   const [jokes, setJokes] = useState([]);
//   const [localJokes, setLocalJokes] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const win = window.sessionStorage;

//   useEffect(() => {
//     if (win.getItem("MyJoke")) setLocalJokes(win.getItem("MyJoke"));
//   }, []);
//   useEffect(() => {
//     win.setItem("MyJoke", localJokes);
//   }, [localJokes]);

//   useEffect(() => {
//     const fetchJokes = async () => {
//       const response = await axios.get(
//         "https://api.chucknorris.io/jokes/random"
//       );
//       setJokes(jokes.concat(response.data.value));
//     };
//     fetchJokes();
//   }, []);
//   useEffect(() => {
//     window.localStorage.setItem("MY_JOKE", JSON.stringify(localJokes));
//   }, [localJokes]);
//   useEffect(() => {
//     const data = window.localStorage.getItem("MY_JOKE");
//     if (data !== null) setLocalJokes(JSON.parse(data));
//   }, []);
//   const handleAddJoke = (joke) => {
//     setLocalJokes(localJokes.concat(joke));
//   };

//   const filteredJokes = jokes
//     .concat(localJokes)
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
//         <button onClick={() => window.location.reload()}>New Jokes</button>
//       </center>
//     </div>
//   );
// };

// export default JokesTable;
