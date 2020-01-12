import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Home = () => {

  // const [searchBar, setSearchBar] = useState('')
  const [suggestions, setSuggestions] = useState()
  // const [slicedSuggestions, setSlicedSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState()

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

  function handleClick(e) {
    e.persist()
    // here, also add the function to redirect user to node page
    axios.post('http://localhost:4000/api/recentsearch', {
      deezerId: e.target.id,
      name: e.target.title
    })
    console.log(e.target.title)
    console.log(e.target.id)
    // })
  }


  useEffect(() => {
    axios.get('http://localhost:4000/api/recentsearch')
      .then(res => setRecentSearches(res.data))
  }, [effectLoad])

  const effectLoad = 5

  return <section className="section">
    {console.log(recentSearches)}
    {console.log(suggestions)}

    <div className="container">
      <input className="input is-large" placeholder="Search artists" onChange={handleSearchChange}></input>
      {suggestions ? suggestions.map((artist, i) => {
        return <div key={i} className="level" onClick={handleClick}>
          <div className="level-left">
            <div className="level-item">
              <p title={artist.name} id={artist.id}> - {artist.name} - {artist.id}</p>
              {/* here, include link using artist.id to node page where artist becomes primary node */}
            </div>
          </div>
        </div>
      }) : null}
    </div>
    <div className="container">
      <h1>Recent Searches</h1>
      {recentSearches ? recentSearches.map((search, i) => {
        return <div key={i}>
          <p>{search.name}</p>
        </div>
      }) : null}
    </div>
  </section>
}

export default Home