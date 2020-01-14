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
    <div className="modal-card">
      <header className="modal-card-head has-text-left">
        <p className="modal-card-title">{gig.venue.name} - {gig.venue.town} <br />
          <p className="modal-subtitle is-size-6">{moment(gig.data).format('MMMM Do YYYY, h:mma')}</p>
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
      <footer className="modal-card-foot">
      </footer>
    </div>
    <button className="modal-close is-large" aria-label="close" onClick={toggleModal}></button>
  </div>

}

export default GigModal