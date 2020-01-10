import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Home = () => {

  // const [searchBar, setSearchBar] = useState('')
  const [suggestions, setSuggestions] = useState()
  // const [slicedSuggestions, setSlicedSuggestions] = useState([])


  function handleSearchChange(e) {
    console.log(e.target.value)
    // setSearchBar(e.target.value)
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${e.target.value}&api_key=6652c5a8cadca923253398103521219b&format=json`)
      .then(res => setSuggestions(res.data.results.artistmatches.artist.slice(0, 10)))
      .catch(err => console.log(err))
    // suggestions.data && suggestions.data.results && suggestions.data.results.artistmatches ? setSlicedSuggestions(suggestions.data.results.artistmatches.artist.slice(0, 10)) : null
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