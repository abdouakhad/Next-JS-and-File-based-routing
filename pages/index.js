import React from 'react'
import EventList from '../components/events/EventList'
import { getFeaturedEvents } from '../helpers/api-utils'
const HomePage = ({ events }) => {
  return (
    <div>
      <ul>
        <EventList items={events} />
      </ul>
    </div>
  )
}

export default HomePage

// Create a get staticprops function that will return the data
// from the dummy-data.js file
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  }
}
