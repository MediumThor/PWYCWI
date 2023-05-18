import { Component } from 'react';
import ICAL from 'ical.js';

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
const EVENTS_URL = CORS_PROXY + 'https://calendar.google.com/calendar/ical/c_bd0e45eb9b14f51c50b76b7c5b558babd421df0d95e908270c88c6f891f1e5e4%40group.calendar.google.com/public/basic.ics';

fetch(EVENTS_URL)
    .then(response => response.text())

export class Events extends Component {
    state = {
        events: [],
    };

    componentDidMount() {
        this.fetchEvents();

        // Refresh events every hour
        this.refreshInterval = setInterval(() => {
            this.fetchEvents();
        }, 1000 * 60 * 60);
    }

    componentWillUnmount() {
        clearInterval(this.refreshInterval);
    }

    fetchEvents() {
        fetch(EVENTS_URL)
            .then((response) => response.text())
            .then((data) => {
                console.log(data);  // add this line to inspect the received data
                const jcalData = ICAL.parse(data);
                const comp = new ICAL.Component(jcalData);
                const events = comp.getAllSubcomponents('vevent').map((event) => new ICAL.Event(event));

                // Filter out past events and sort by start time
                const now = ICAL.Time.now();
                const upcomingEvents = events
                    .filter((event) => event.startDate.compare(now) > 0)
                    .sort((a, b) => a.startDate.compare(b.startDate))
                    .slice(0, 3);  // Only take the next three events

                this.setState({ events: upcomingEvents });
            });
    }


    render() {
        return (
            <div>
                <h2>Upcoming Events</h2>
                {this.state.events.map((event, i) => (
                    <div key={i}>
                        <h3>{event.summary}</h3>
                        <p>{event.startDate.toString()}</p>
                    </div>
                ))}
            </div>
        );
    }
}
