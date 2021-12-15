import React from 'react'
import PropTypes from 'prop-types'
import ms from 'pretty-ms'

class TimeTracker extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: 0,
            isOn: false,
            start: 0,
            start_time: null,
            end_time: null
        }
        this.startTimer = this.startTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
    }
    startTimer() {
        this.setState({
            isOn: true,
            time: this.state.time,
            start: Date.now() - this.state.time,
            start_time: Date.now()
        })
        this.timer = setInterval(() => this.setState({
            time: Date.now() - this.state.start
        }), 1);
    }

    stopTimer() {
        const endTime = Date.now()
        this.resetTimer()
        clearInterval(this.timer)

        const data = {
            time_slot: {
                description: 'Working time',
                start_time: new Date(this.state.start_time),
                end_time: new Date(endTime)
            }
        }
        this.props.createTimeSlot(data)
    }

    resetTimer() {
        this.setState({ time: 0, isOn: false })
    }

    render() {
        const start = (this.state.time == 0) ?
            <button className="btn btn-outline-success me-xxl-4" onClick={this.startTimer}>Clock In</button> : null
        const stop = (this.state.time == 0 || !this.state.isOn) ?
            null : <button className="btn btn-outline-danger me-xxl-4" onClick={this.stopTimer}>Clock Out</button>
        return (
            <React.Fragment>
                <div className="col-2">
                    <strong>timer: {ms(this.state.time, { colonNotation: true })}</strong>
                </div>
                <div className="col-auto">
                    {start}
                    {stop}
                </div>
            </React.Fragment>
        )
    }
}

export default TimeTracker

TimeTracker.propTypes = {
    createTimeSlot: PropTypes.func.isRequired,
}
