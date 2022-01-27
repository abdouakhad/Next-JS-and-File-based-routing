import React from 'react'
import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import ErrorAlert from '../../components/ui/ErrorAlert'
import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '../../helpers/api-utils'

const EventDetailPage = ({ selectedEvent }) => {
  if (!selectedEvent) {
    return (
      <div className='center'>
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <Fragment>
      <EventSummary title={selectedEvent.title} />
      <EventLogistics
        date={selectedEvent.date}
        address={selectedEvent.location}
        image={selectedEvent.image}
        imageAlt={selectedEvent.title}
      />
      <EventContent>
        <p>{selectedEvent.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage

export async function getStaticProps(context) {
  const eventId = context.params.eventId
  const event = await getEventById(eventId)
  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  }
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({
    params: {
      eventId: event.id,
    },
  }))

  return {
    paths: paths,
    fallback: true,
  }
}
