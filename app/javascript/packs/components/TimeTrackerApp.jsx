import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
import TimeSlots from "./TimeSlots"
import TimeSlot from "./TimeSlot"
import SlotForm from "./SlotForm"

class TimeTrackerApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeSlots: []
        };
        this.getTimeSlots = this.getTimeSlots.bind(this);
        this.createTimeSlot = this.createTimeSlot.bind(this);
    }

    componentDidMount() {
        this.getTimeSlots();
    }

    getTimeSlots() {
        axios
            .get("/api/v1/time_slots")
            .then(response => {
                const timeSlots = response.data;
                this.setState({ timeSlots });
            })
            .catch(error => {
                console.log(error);
            });
    }

    createTimeSlot(timeSlot) {
        const timeSlots = [timeSlot, ...this.state.timeSlots];
        this.setState({ timeSlots });
    }

    render() {
        return (
            <React.Fragment>
                <SlotForm addTimeSlot={this.createTimeSlot} />

                <TimeSlots>
                    {this.state.timeSlots.map(timeSlot => (
                        <TimeSlot
                            key={timeSlot.id}
                            timeSlot={timeSlot}
                            getTimeSlots={this.getTimeSlots}/>
                    ))}
                </TimeSlots>
            </React.Fragment>
        )
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('time-tracker-app')
    app && ReactDOM.render(<TimeTrackerApp />, app)
})
