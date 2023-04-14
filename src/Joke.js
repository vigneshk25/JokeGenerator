import React, { useState, useEffect,useRef } from "react";
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
    window.localStorage.setItem("localJoke", JSON.stringify(localJokes));
    window.localStorage.setItem("storeFechJoke", JSON.stringify(newArr));
  },[]);
  useEffect(() => {
    const newLocal = window.localStorage.getItem("localJoke");
    setLocalJokes(JSON.parse(newLocal));

    const newFetch = window.localStorage.getItem("storeFechJoke");
    setNewArr(JSON.parse(newFetch));
  }, []);
  
  const handleAddJoke = (joke) => {
    setLocalJokes(localJokes.concat(joke));
    empty.current.value= "";
  };

  const handleNewJokes = async () => {
    await fetchJokes();
    
  };
  const filteredJokes = jokes
    .concat(localJokes)
    .filter((joke) => joke.toLowerCase().includes(searchTerm.toLowerCase()));
  const newjokeArr = jokes
    .concat(newArr)
    .filter((joke) => joke.toLowerCase().includes(searchTerm.toLowerCase()));

  const finArrFiltr = filteredJokes.reverse().map((joke) => {
    return (
      <tr key={joke}>
        <td>{joke}</td>
      </tr>
    );
  });
  const finArrLoc = newjokeArr.reverse().map((joke) => {
    return (
      <tr key={joke}>
        <td>{joke}</td>
      </tr>
    );
  });
  const deleteLocalStorage = () => {
    window.localStorage.clear();
    setNewArr([]);
    setLocalJokes([]);
  };

  const empty = useRef()
  return (
    <div>
      
      <center className="jokeG">
      <div className="ClearJoke"><button onClick={deleteLocalStorage} className="ClearAll" >Clear</button></div>  

        <h1>JOKE GENERATOR</h1>
        <button onClick={handleNewJokes} className="generateJokeButton">
          Generate Jokes
        </button>

   
        <div className="inputBox">
          <div className="searchJoke">
            <label>Search:</label>
            <input
              placeholder="Jokes"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={() => setSearchTerm("")}>Clear</button>
          </div>

          <div className="EnterJoke">
            <input type="text" placeholder="Enter a joke" ref={empty} />
            <button
              onClick={(e) => handleAddJoke(e.target.previousSibling.value)}>
              Add Joke
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Jokes</th>
            </tr>
          </thead>
          <tbody>{finArrFiltr}</tbody>
        </table>
        <table>
        <thead>
            <tr>
            </tr>
          </thead>
          <tbody>{finArrLoc}</tbody>
        </table>
        
      </center>
    </div>
  );
};

export default JokesTable;
