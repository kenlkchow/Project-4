import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'

const initialArtists = [{ artists: {} }]
const initialSingleArtist = { id: '', name: '', picture_medium: '' }
const initialSongPreviews = []
const initialGigs = []
const API_KEY = 'a2deda32b8d4b76c19f38e21b744d580'

const Profile = () => {

  const [artists, setArtists] = useState(initialArtists)
  const [singleArtist, setSingleArtist] = useState(initialSingleArtist)
  const [songPreviews, setSongPreviews] = useState(initialSongPreviews)
  const [gigs, setGigs] = useState(initialGigs)

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setArtists(resp.data.artists)
        console.log(resp.data)
      })
  }, [])

  function getDeezerArtist(name) {
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/search/artist/?q=${name}&index=0&limit=1`)
    // axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${name}`) This is for when we have valid deezerID's in the database

      .then(resp => {
        // resp.data when its just an id required
        setSingleArtist(resp.data.data[0])
        const artistId = resp.data.data[0].id
        axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${artistId}/top`)
          .then(resp => {
            console.log(resp.data.data)
            setSongPreviews(resp.data.data)
          })
      })
  }

  function getSkiddleGigs(name) {
    axios.get(`https://cors-anywhere.herokuapp.com/www.skiddle.com/api/v1/artists/?api_key=${API_KEY}&name=${name}`)
      .then(resp => {
        const skiddleId = resp.data.results[0].id
        console.log(skiddleId)
        axios.get(`https://cors-anywhere.herokuapp.com/www.skiddle.com/api/v1/events/search/?api_key=${API_KEY}&a=${skiddleId}&country=GB`)
          .then(resp => {
            setGigs(resp.data.results)
          })
      })
  }

  function handleClick(e) {
    const artist = e.target.title
    getDeezerArtist(artist)
    getSkiddleGigs(artist)
  }

  { console.log(singleArtist)}
  { console.log(gigs)}

  return <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="title has-text-centered">Artists</div>
          {artists.map((artist, i) => {
            return <div key={i} title={artist.name} onClick={handleClick}>{artist.name}</div>
          })}
        </div>
        <div className="column">
          <div className="title has-text-centered">Selected Artist</div>
          <div className="subtitle">{singleArtist.name}</div>
          <img src={singleArtist.picture_medium} alt=""/>
          <div>Top tracks</div>
          {songPreviews.map((song, i) => {
            return <div key={i}>
              <p>{song.title}</p>
              <audio src={song.preview}></audio>
            </div>
          })}
        </div>
        <div className="column">
          <div className="title has-text-centered">Gigs</div>
          {/* {gigs.map((gig, i) => {
            return <div key={i}>
              {gig}
            </div>
          })} */}
        </div>
      </div>
    </div>
  </section>
}

export default Profile