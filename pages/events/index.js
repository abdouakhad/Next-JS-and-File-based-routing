import React from 'react'
import { Fragment } from 'react'
import { getAllEvents } from '../../dummy-data'
import { useRouter } from 'next/router'
import EventList from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'
const AllEventsPage = () => {
  const router = useRouter()
  const events = getAllEvents()

  function findEventHandler(year, month) {
    const fullPath = `/events/${year}/${month}`
    console.log(fullPath)
    router.push(fullPath)
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </Fragment>
  )
}

export default AllEventsPage
