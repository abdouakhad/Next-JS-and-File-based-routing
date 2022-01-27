import React from 'react'
import { Fragment } from 'react'
// import { getAllEvents } from '../../dummy-data'
import { getAllEvents } from '../../helpers/api-utils'
import { useRouter } from 'next/router'
import EventList from '../../components/events/EventList'
import EventSearch from '../../components/events/EventSearch'
const AllEventsPage = ({ events }) => {
  const router = useRouter()

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

export async function getStaticProps() {
  const events = await getAllEvents()
  return {
    props: {
      events,
    },
    revalidate: 60,
  }
}
