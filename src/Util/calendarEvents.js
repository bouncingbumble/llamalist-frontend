import { apiCall } from './api'

const gapi = window.gapi

export const getCalendarEvents = async () => {
    const response = await getOAuthTokens()

    if (response.provider === 'oauth_google') {
        const events = await getGoogleEvents(response.token)
        return events
    } else {
        return []
    }
}

const getOAuthTokens = async () => {
    try {
        return await apiCall(`GET`, `/oauthTokens`)
    } catch (error) {
        console.log(error)
    }
}

const getGoogleEvents = async (token) => {
    let events = []
    await new Promise((resolve) => {
        gapi.load('client', resolve)
    })
    // init client
    await gapi.client.init({
        apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        discoveryDocs: [
            'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
    })

    // set token
    gapi.client.setToken({ access_token: token })

    // get calendar events
    try {
        const request = {
            calendarId: 'primary',
            timeMin: new Date().toISOString(),
            showDeleted: false,
            singleEvents: true,
            maxResults: 10,
            orderBy: 'startTime',
        }
        const response = await gapi.client.calendar.events.list(request)
        events = response.result.items
    } catch (error) {
        console.log(error)
    }
    return events
}
