export async function getAllEvents() {
  const url = 'https://page-prerender-default-rtdb.firebaseio.com/events.json'
  const response = await fetch(url)
  const data = await response.json()

  const events = []
  for (const key in data) {
    events.push({
      ...data[key],
      id: key,
    })
  }
  return events
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured)
}

export async function getEventById(id) {
  const allEvents = await getAllEvents()
  return allEvents.find((event) => event.id === id)
}
