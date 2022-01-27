import React from 'react'
import { Fragment } from 'react'
import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../helpers/api-utils'
import EventList from '../../components/events/EventList'
import ResultsTitle from '../../components/events/ResultsTitle'
import Button from '../../components/ui/Button'
import ErrorAlert from '../../components/ui/ErrorAlert'

const FilterdEvnetsPage = ({ hasError, events, mydate }) => {
  // const filterData = router.query.slug

  // if (!filterData) {
  //   return <p className='center'>...loading</p>
  // }

  // const filteredYear = filterData[0]
  // const filteredMonth = filterData[1]

  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }

  const filteredEvents = events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <p>No events found for the choosen filter</p>
        <div className='center'>
          <Button link='/events'>Show all events</Button>
        </div>
      </Fragment>
    )
  }
  const date = new Date(mydate.year, mydate.month - 1)
  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  )
}

export default FilterdEvnetsPage

export async function getServerSideProps(context) {
  const { params } = context
  const filterData = params.slug
  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: {
        hasError: true,
      },

      // notFound: true
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })
  return {
    props: {
      events: filteredEvents,
      mydate: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}
