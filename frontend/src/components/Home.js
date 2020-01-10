import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Home = () => {

  // const [searchBar, setSearchBar] = useState('')
  const [suggestions, setSuggestions] = useState()
  // const [slicedSuggestions, setSlicedSuggestions] = useState([])


  function handleSearchChange(e) {
    console.log(e.target.value)
    // setSearchBar(e.target.value)
    e.target.value !== '' ?
      axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/search/artist/?q=${e.target.value}`)
        .then(res => setSuggestions(res.data.data.slice(0, 10)))
        // .then(res => console.log(res.data))
        .catch(err => console.log(err))
      // suggestions.data && suggestions.data.results && suggestions.data.results.artistmatches ? setSlicedSuggestions(suggestions.data.results.artistmatches.artist.slice(0, 10)) : null
      : setSuggestions('')
  }

  return <section className="section">
    {console.log(suggestions)}

    <div className="container">
      <input className="input is-large" placeholder="Search artists" onChange={handleSearchChange}></input>
      {suggestions ? suggestions.map((artist, i) => {
        return <div key={i} className="level">
          <div className="level-item">
            <p>{artist.name}</p>
          </div>
        </div>
      }) : null }
    </div>
  </section>

}

export default Home