import React, { useState, useEffect } from "react";
import axios from "axios";
import "./jokes.css";

const JokesTable = () => {
  const [jokes, setJokes] = useState([]);
  const [localJokes, setLocalJokes] = useState([]);
  const [newArr, setNewArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJokes = async () => {
    try {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );

      const updateJokes = [response.data.value, ...jokes];
      setJokes(updateJokes);
      const newUpdatedArr = [response.data.value, ...newArr];
      setNewArr(newUpdatedArr);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const newLocal = window.localStorage.getItem("localJoke");
    setLocalJokes(JSON.parse(newLocal));

    const newFetch = window.localStorage.getItem("storeFechJoke");
    setNewArr(JSON.parse(newFetch));
  }, []);
  useEffect(() => {
    window.localStorage.setItem("localJoke", JSON.stringify(localJokes));
    window.localStorage.setItem("storeFechJoke", JSON.stringify(newArr));
  });

  const handleAddJoke = (joke) => {
    setLocalJokes(localJokes.concat(joke));
  };

  const handleNewJokes = async () => {
    await fetchJokes();
    setTimeout(() => {
      window.location.reload();
    }, -0.5);
  };
  const filteredJokes = jokes
    .concat(localJokes)
    .concat(newArr)
    .filter((joke) => joke.toLowerCase().includes(searchTerm.toLowerCase()));

  const finArrFiltr = filteredJokes.reverse().map((joke) => {
    return (
      <tr key={joke}>
        <td>{joke}</td>
      </tr>
    );
  });
  return (
    <div>
      <center>
        <h1>JOKE GENERATOR</h1>
        <button onClick={handleNewJokes} className="generateJokeButton">
          Generate Jokes
        </button>
        <div>
          <label>Search:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setSearchTerm("")}>Clear</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Jokes</th>
            </tr>
          </thead>
          <tbody>{finArrFiltr}</tbody>
        </table>
        <div>
          <input type="text" placeholder="Enter a joke" />
          <button
            onClick={(e) => handleAddJoke(e.target.previousSibling.value)}>
            Add Joke
          </button>
        </div>
      </center>
    </div>
  );
};

export default JokesTable;
