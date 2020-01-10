import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Auth from '../lib/authMethods'

const initialArtists = [{ artists: { spotifyId: '', name: '', owner: '' } }]

const Profile = () => {

  const [artists, setArtists] = useState(initialArtists)

  useEffect(() => {
    axios.get('/api/profile', {
      headers: { Authorization: `Bearer ${Auth.getToken()}` }
    })
      .then(resp => {
        setArtists(resp.data.artists)
      })
  }, [])

  return <section className="section">
    <div className="container">
      <div className="columns">
        <div className="column">
          <div className="title has-text-centered">Artists</div>
          {artists.map((artist, i) => {
            return <div key={i}>{artist.name}</div>
          })}
        </div>
        <div className="column">
          <div className="title has-text-centered">Selected Artist</div>
        </div>
        <div className="column">
          <div className="title has-text-centered">Gigs</div>
        </div>
      </div>
    </div>
  </section>
}

export default Profile