import React, { useState, useEffect,useRef } from "react";
import axios from "axios";
import "./jokes.css";

const JokesTable = () => {
  const [jokes, setJokes] = useState([]);
  const [found, setFound] = useState(null);
  const empty1 = useRef()
  const empty2 = useRef();
  const fetchJokes = async () => {
    try {
      const response = await axios.get(
        "https://api.chucknorris.io/jokes/random"
      );
      console.log('16: ', response.data.value)
      const updateJokes = [response.data.value, ...jokes];
      setJokes(updateJokes.reverse());
      store(response.data.value)

    } catch (error) {
      console.error(error);
    }
  };

 
  useEffect(() => {
    const currentJokes = JSON.parse(window.localStorage.getItem('localJoke'))

    if (!currentJokes) {
      window.localStorage.setItem("localJoke", JSON.stringify([]));
      setJokes(currentJokes && currentJokes.length > 0 ? currentJokes : []);
    } else {
      setJokes(currentJokes);
    }
  
  },[]);
  
  const store = (joke) => {
    const currentJokes = JSON.parse(window.localStorage.getItem('localJoke')) || []
    window.localStorage.setItem("localJoke", JSON.stringify([...currentJokes, joke]));
  }
  const handleAddJoke = (joke) => {
    if (joke === '') return;
    setJokes([...jokes, joke]);
    store(joke)
    empty1.current.value= "";
  };

  const deleteLocalStorage = () => {
    setJokes([])
    window.localStorage.setItem("localJoke", JSON.stringify([]));
  };
  const onSearch = (val) => {
    const result = []
    if (val !== '' || val.trim() !== '') {
      for (let i = 0; i < jokes.length; i++) {
        if (jokes[i].toLowerCase().includes(val)) {
            result.push(jokes[i])
        }
      }
    }
    if (result.length > 0) {
      setFound(result)
    } else {
      setFound(null);
    }
  }
const renderItems = (items = []) => {
  if (items === null) items = []
  items = items.reverse();
  return items.map((item, idx) => {
    return (
      <tr key = {idx}><td>{item}</td></tr>
    )
  })
}
  return (
    <div>
      
      <center className="jokeG">
      <div className="ClearJoke"><button onClick={deleteLocalStorage} className="ClearAll" >Clear</button></div>  

        <h1>JOKE GENERATOR</h1>
        <button onClick={fetchJokes} className="generateJokeButton">
          Generate Jokes
        </button>

   
        <div className="inputBox">
          <div className="searchJoke">
            <label>Search:</label>
            <input
              placeholder="Jokes"
              type="text"
              onChange={(e) => onSearch(e.target.value)}
              ref = {empty2}
            />
            <button onClick={() => {
                empty2.current.value = ''
                setFound(null)
            }}>Clear</button>
          </div>

          <div className="EnterJoke">
            <input type="text" placeholder="Enter a joke" ref={empty1} />
            <button
              onClick={(e) => handleAddJoke(e.target.previousSibling.value)}>
              Add Joke
            </button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th className="name">Jokes</th>
            </tr>
          </thead>
          <tbody>{found ? renderItems(found) : renderItems(jokes) }</tbody>
        </table>



        {/* <table>
        <thead>
            <tr>
            </tr>
          </thead>
          <tbody>{finArrLoc}</tbody>
        </table> */}
        
      </center>
    </div>
  );
};

export default JokesTable;
