import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import 'bulma'
import ReactAudioPlayer from 'react-audio-player'


const Nodes = (props) => {

  const [mainNode, setMainNode] = useState({})

  const [secondaryNodes, setSecondaryNodes] = useState([])
  const [topTracks, setTopTracks] = useState([])

  const [thirdNode, setThirdNode] = useState({

    array: []

  })

  const [thirdNodeData, setThirdNodeData] = useState({})

  const handleClick = useCallback((e) => {

    e.preventDefault()
    const target = e.target.getAttribute('id')
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${target}`)
      .then(res => {
        const main = res.data
        setMainNode(main)
        axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${target}/related`)
          .then(res => {
            const newSimilar = res.data.data.slice(1, 5)
            setSecondaryNodes(newSimilar)
            thirdNode.array.push(target)
            axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${target}/top`)
              .then(res => {
                const newtracks = res.data.data.slice(0, 3)
                setTopTracks(newtracks)
                axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${thirdNode.array[thirdNode.array.length - 2]}`)
                  .then(res => {
                    const pastArtist = res.data
                    setThirdNodeData(pastArtist)
                  })
              })
          })
          .catch(err => console.log(err))
      })
  }, [])


  useEffect(() => {
    thirdNode.array.push(props.location.artist.deezerId)
    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${props.location.artist.deezerId}`)
      .then(res => {
        const main = res.data
        setMainNode(main)
        axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${props.location.artist.deezerId}/related`)
          .then(res => {
            const test = res.data.data.slice(0, 4)
            setSecondaryNodes(test)
            axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${props.location.artist.deezerId}/top`)
              .then(res => {
                const tracks = res.data.data.slice(0, 3)
                setTopTracks(tracks)
              })
              .catch(err => console.log(err))
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }, [])

  return <div>

    {/* {console.log(thirdNodeData)} */}
    {console.log(props.location.artist)}
    {console.log(thirdNodeData)}

    <div className="columns">
      <div className="column">
        {/* <div>{mainNode.map((artist, i) => {
          return <div key={i} id={artist.id} onClick={handleClick}> {artist.name}</div>

        })}</div> */}
        {mainNode.name}
      </div>

      <div className="column">
        <div>
          {secondaryNodes.map((artist, i) => {
            return <div key={i} id={artist.id} onClick={handleClick}> {artist.name}</div>

          })}
        </div>

        <div>
          {secondaryNodes.map((artist, i) => {
            return <img key={i} src={artist.picture} />

          })}
        </div>

        <div className="column">
          <div>
            {topTracks.map((track, i) => {
              return <div key={i}> <ReactAudioPlayer
                src={track.preview}
                onPlay
                controls
              /></div>

            })}
          </div>
        </div>
        <div>
          <div onClick={handleClick} id={thirdNodeData.id}> {thirdNodeData.name}</div>


        </div>

      </div>

    </div>
  </div>

}

export default Nodes