import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class ManualTimeTracker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectStartDate: new Date(),
            selectEndDate: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this)
        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)
        this.onDescriptionChange = this.onDescriptionChange.bind(this)
    }

    onStartDateChange(date) {
        this.setState({
            selectStartDate: date
        })
    }

    onEndDateChange(date) {
        this.setState({
            selectEndDate: date
        })
    }

    onDescriptionChange(e) {
        this.setState({
            description: e.target.value
        })
    }

    handleSubmit(e) {
        const { selectStartDate, selectEndDate, description } = this.state
        const data = {
            time_slot: {
                description: description,
                start_time: selectStartDate,
                end_time: selectEndDate
            }
        }

        e.preventDefault()
        this.props.createTimeSlot(data)
        e.target.reset()
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="row g-3 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="description" className="form-label">Description:</label>
                        <input
                            type="text"
                            name="description"
                            onChange={ this.onDescriptionChange }
                            required
                            className="form-control"
                            id="description"
                            placeholder="Write the slot description..."
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="selectStartDate" className="form-label">Start time:</label>
                        <DatePicker
                            className="form-control"
                            selected={ this.state.selectStartDate }
                            onChange={ this.onStartDateChange }
                            name="selectStartDate"
                            id="selectStartDate"
                            showTimeSelect
                            required
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy h:mm aa"
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="selectStartDate" className="form-label">End time:</label>
                        <DatePicker
                            className="form-control"
                            selected={ this.state.selectEndDate }
                            onChange={ this.onEndDateChange }
                            name="selectEndDate"
                            id="selectEndDate"
                            showTimeSelect
                            required
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy h:mm aa"
                        />
                    </div>
                    <div className="col-auto align-self-end">
                        <button className="btn btn-outline-primary btn-block form-control">
                            Add Manual Time Slot
                        </button>
                    </div>
                </div>
            </form>
        )
    }
}

export default ManualTimeTracker

ManualTimeTracker.propTypes = {
    createTimeSlot: PropTypes.func.isRequired,
}