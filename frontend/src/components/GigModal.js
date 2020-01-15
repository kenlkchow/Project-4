import React, { useEffect } from 'react'
import moment from 'moment'

const GigModal = ({ toggleModal, gig, setModal }) => {

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setModal(false)
      }
    }
    window.addEventListener('keydown', listener)
  }, [])

  return <div className="modal is-active">
    <div className="modal-background" onClick={toggleModal}></div>
    <div className="modal-card" id="modal-full">
      <header className="modal-card-head has-text-left has" id="modal-head">
        <p className="modal-card-title has-text-white">{gig.venue.name} - {gig.venue.town} <br />
          <p className="modal-subtitle is-size-6">{moment(gig.date).format('MMMM Do YYYY')}</p>
        </p>
      </header>
      <section className="modal-card-body">
        <p className="">Description</p>
        <p>{gig.description}</p>
        <p className="">Ticket price approx.</p>
        <p>{gig.entryprice}</p>
        <p className="">Start time</p>
        <p>{gig.openingtimes.doorsopen}</p>
        <p className="">Venue contact information</p>
        <p>{gig.venue.phone}</p>
      </section>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export default GigModal