import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'

const initialArtists = [{ artists: {} }]
const initialSingleArtist = { id: '', name: '', picture_medium: '' }
const initialSongPreviews = []

const Profile = () => {

  const [artists, setArtists] = useState(initialArtists)
  const [singleArtist, setSingleArtist] = useState(initialSingleArtist)
  const [songPreviews, setSongPreviews] = useState(initialSongPreviews)

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
      .then(resp => {
        setSingleArtist(resp.data.data[0])
        const artistId = resp.data.data[0].id
        axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${artistId}/top`)
          .then(resp => {
            console.log(resp.data.data)
            setSongPreviews(resp.data.data)
          })
      })
  }

  function handleClick(e) {
    const artist = e.target.title
    getDeezerArtist(artist)
  }

  { console.log(singleArtist)}

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
        </div>
      </div>
    </div>
  </section>
}

export default Profile