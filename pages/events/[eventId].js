import React from 'react'
import { Fragment } from 'react'
import EventSummary from '../../components/event-detail/event-summary'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventContent from '../../components/event-detail/event-content'
import { useRouter } from 'next/router'
import ErrorAlert from '../../components/ui/ErrorAlert'
import { getEventById } from '../../dummy-data'

const EventDetailPage = () => {
  const router = useRouter()
  // console.log(router.query.eventId)

  const eventId = router.query.eventId
  const event = getEventById(eventId)

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    )
  }
  console.log(event)

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  )
}

export default EventDetailPage
