import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'

const Home = () => {

  // const [searchBar, setSearchBar] = useState('')
  const [suggestions, setSuggestions] = useState()
  // const [slicedSuggestions, setSlicedSuggestions] = useState([])
  const [recentSearches, setRecentSearches] = useState()

  function handleSearchChange(e) {
    // console.log(e.target.value)
    // setSearchBar(e.target.value)
    e.target.value !== '' ?
      axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/search/artist/?q=${e.target.value}`)
        .then(res => setSuggestions(res.data.data.slice(0, 10)))
        // .then(res => console.log(res.data))
        .catch(err => console.log(err))
      // suggestions.data && suggestions.data.results && suggestions.data.results.artistmatches ? setSlicedSuggestions(suggestions.data.results.artistmatches.artist.slice(0, 10)) : null
      : setSuggestions('')
  }

  // function redirectToNode(id, artist) {
  //   const exportArtist = {
  //     id,
  //     artist
  //   }
  //   props.history.push('/nodes', exportArtist)
  //   console.log(exportArtist)
  // }

  function handleSuggestionClick(e) {
    e.persist()
    const id = e.target.id
    const artist = e.target.title
    axios.post('http://localhost:4000/api/recentsearch', {
      deezerId: id,
      name: artist
    })
  }


  useEffect(() => {
    axios.get('http://localhost:4000/api/recentsearch')
      .then(res => {
        const recentSearchesDuplicates = res.data.reverse().slice(0, 10)
        const recentSearchesDedup = recentSearchesDuplicates.filter((v, i, a) => a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i)
        setRecentSearches(recentSearchesDedup)
      })
  }, [effectLoad])

  const effectLoad = 5



  return <section className="section" id="search-section">
    {/* {console.log(recentSearches)} */}
    {console.log(!!suggestions)}
    {/* {console.log(exportArtist)} */}
    <div className="container">
      <input className="input is-large" id="searchbar" placeholder="Search artists" onChange={handleSearchChange}></input>
      <div className={!suggestions ? 'placeholder' : 'suggestions-container'}>
        {suggestions ? suggestions.map((artist, i) => {
          return <Link
            key={i}
            onClick={handleSuggestionClick}
            to={{
              pathname: '/nodes',
              artist: {
                deezerId: artist.id,
                name: artist.name
              }
            }}>
            <div className="level">
              <div className="level-item suggestions">
                <p title={artist.name} id={artist.id}>{artist.name}</p>
              </div>
            </div>
          </Link>
        }) : null
        }
      </div>
    </div>
    <div className="container" id="recentsearches">
      <h1>Recent Searches</h1>
      <div className="recentsearchescontainer">
        {recentSearches ? recentSearches.map((search, i) => {
          return <div key={i}>
            <p><Link
              to={{
                pathname: '/nodes',
                artist: {
                  deezerId: search.deezerId,
                  name: search.name
                }
              }}>{search.name}</Link></p>
          </div>

        }) : null}
      </div>
    </div>
  </section >
}

export default Home