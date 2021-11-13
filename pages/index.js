import React from 'react'
import { getFeaturedEvents } from '../dummy-data'
import EventList from '../components/events/EventList'

const HomePage = () => {
  const featuredEvents = getFeaturedEvents()
  //   console.log(allData)
  return (
    <div>
      <ul>
        <EventList items={featuredEvents} />
      </ul>
    </div>
  )
}

export default HomePage
