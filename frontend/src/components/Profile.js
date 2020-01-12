import React, { useState, useEffect } from 'react'
import axios from 'axios'
import moment from 'moment'
import Auth from '../lib/authMethods'
import distance from '../lib/distanceMethod'

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
            setSongPreviews(resp.data.data)
          })
      })
  }

  function getSkiddleGigs(name) {
    axios.get(`https://cors-anywhere.herokuapp.com/www.skiddle.com/api/v1/artists/?api_key=${API_KEY}&name=${name}`)
      .then(resp => {
        const skiddleId = resp.data.results[0].id
        axios.get(`https://cors-anywhere.herokuapp.com/www.skiddle.com/api/v1/events/search/?api_key=${API_KEY}&a=${skiddleId}&country=GB`)
          .then(resp => {
            console.log(resp.data)
            setGigs(resp.data.results)
          })
      })
  }

  function handleClick(e) {
    const artist = e.target.title
    getDeezerArtist(artist)
    getSkiddleGigs(artist)
  }

  console.log(`${(distance(51.437291, -0.255294, 51.413792, -0.180206) * 0.000621371).toFixed(1)} miles`)
  
  return <section className="section" id="profile">
    <div className="container">
      <div className="columns">
        <div className="column" id="artist">
          <div className="title has-text-centered">Artists</div>
          {artists.map((artist, i) => {
            return <div key={i} title={artist.name} onClick={handleClick}>{artist.name}</div>
          })}
        </div>
        <div className="column" id="single-artist">
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
        <div className="column" id="gigs">
          <div className="title has-text-centered">Gigs</div>
          {gigs.map((gig, i) => {
            return <div key={i}>
              <p>{gig.venue.town} - {gig.venue.name} - {moment(gig.startdate).format('MMMM Do YYYY, h:mm a')}</p>
            </div>
          })}
        </div>
      </div>
    </div>
  </section>
}

export default Profile
