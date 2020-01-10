import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import 'bulma'

// const initialNodes = { similarartists: { artist: [{ name: '' }] } }

const Nodes = () => {

  const [mainNode, setMainNode] = useState({

    id: '27'

  })

  const [secondaryNodes, setSecondaryNodes] = useState([])

  const [thirdNode, setThirdNode] = useState([])

  const handleClick = useCallback((e) => {

    console.log(e.target.getAttribute('id'))

    setMainNode({ ...mainNode, artist: e.target.getAttribute('id') })

    e.preventDefault()

    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${e.target.getAttribute('id')}/related`)

    
      .then(res => {
        const newSimilar = res.data.data.slice(1, 5)
        console.log(newSimilar)
        setSecondaryNodes(newSimilar)
      })

      .catch(err => console.log(err))
    

  }, [])


  useEffect(() => {

    axios.get(`https://cors-anywhere.herokuapp.com/api.deezer.com/artist/${mainNode.id}/related`)

      .then(res => {
        const test = res.data.data.slice(0, 4)
        console.log(test)
        setSecondaryNodes(test)
      })
      .catch(err => console.log(err))

  }, [])


  { console.log(secondaryNodes) }


  return <div>
    <div className="columns">
      <div className="column">
        <div>{mainNode.artist}</div>
      </div>

      <div className="column">
        <div>
          {secondaryNodes.map((artist, i) => {
            return <div key={i} id={artist.id} onClick={handleClick}> {artist.name}</div>

          })}
        </div>
      </div>
    </div>

  </div>

}

export default Nodes