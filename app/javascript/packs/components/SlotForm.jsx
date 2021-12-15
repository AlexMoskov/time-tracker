import React from 'react'
import PropTypes from 'prop-types'
import TimeTracker from './TimeTracker'
import ManualTimeTracker from './ManualTimeTracker'

import axios from '../shared/configuredAxios'

class SlotForm extends React.Component {
    constructor(props) {
        super(props)

        this.createTimeSlot = this.createTimeSlot.bind(this)
    }

    createTimeSlot(data) {
        axios
            .post('/api/v1/time_slots', data)
            .then(response => {
                const timeSlot = response.data
                this.props.addTimeSlot(timeSlot)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        return (
            <React.Fragment>
                <ManualTimeTracker createTimeSlot={this.createTimeSlot} />
                <hr/>
                <div className="row g-3 align-items-center justify-content-center">
                    <TimeTracker createTimeSlot={this.createTimeSlot} />
                </div>
                <hr/>
            </React.Fragment>
        )
    }
}

export default SlotForm

SlotForm.propTypes = {
    addTimeSlot: PropTypes.func.isRequired,
}
