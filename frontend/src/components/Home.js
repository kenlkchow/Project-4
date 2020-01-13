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
        const recentSearchesDedup = recentSearchesDuplicates.filter((v, i, a) => a.findIndex(t => JSON.stringify(t) === JSON.stringify(v)) === i )
        setRecentSearches(recentSearchesDedup)
      })
  }, [effectLoad])

  const effectLoad = 5



  return <section className="section">
    {/* {console.log(recentSearches)} */}
    {/* {console.log(suggestions)} */}
    {/* {console.log(exportArtist)} */}
    <div className="container">
      <input className="input is-large" placeholder="Search artists" onChange={handleSearchChange}></input>
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
            <div className="level-left">
              <div className="level-item">
                <p title={artist.name} id={artist.id}> - {artist.name} - {artist.id}</p>
              </div>
            </div>
          </div>
        </Link>
      }) : null}
    </div>
    <div className="container">
      <h1>Recent Searches</h1>
      {recentSearches ? recentSearches.map((search, i) => {
        return <Link
          key={i}
          to={{
            pathname: '/nodes',
            artist: {
              deezerId: search.deezerId,
              name: search.name
            }
          }}>
          <div>
            <p>{search.name}</p>
          </div>
        </Link>
      }) : null}
    </div>
  </section >
}

export default Home