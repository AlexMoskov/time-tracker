import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';
import DatePicker from 'react-datepicker';

import axios from '../shared/configuredAxios'

class TimeSlot extends React.Component {
    constructor(props) {
        super(props)
        const { timeSlot: { start_time, end_time, approved } } = this.props

        this.state = {
            editable: false,
            selectStartDate: Date.parse(start_time),
            selectEndDate: Date.parse(end_time),
            approved: approved
        }

        this.handleEdit = this.handleEdit.bind(this)
        this.handleUpdate = this.handleUpdate.bind(this)
        this.handleCancelUpdate = this.handleCancelUpdate.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
        this.handleChangeApproved = this.handleChangeApproved.bind(this)

        this.onStartDateChange = this.onStartDateChange.bind(this)
        this.onEndDateChange = this.onEndDateChange.bind(this)

        this.textareaRef = React.createRef()
        this.approvedRef = React.createRef()
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

    handleEdit() {
        this.setState({
            editable: true
        })
    }

    handleUpdate() {
        this.handleCancelUpdate()
        this.updateTimeSlotItem()
    }

    handleChangeApproved() {
        const { editable } = this.state

        if (!editable) {
            this.updateTimeSlotItem()
        }
    }

    updateTimeSlotItem() {
        const { timeSlot } = this.props
        const { selectStartDate, selectEndDate, description, editable } = this.state
        const path = `/api/v1/time_slots/${timeSlot.id}`
        const data = { time_slot: { approved: this.approvedRef.current.checked } }

        if (editable) {
            data.time_slot.description = this.textareaRef.current.value
            data.time_slot.start_time = new Date(selectStartDate)
            data.time_slot.end_time = new Date(selectEndDate)
        }

        axios
            .put(path, data)
            .then(_response => {
                this.props.getTimeSlots();
            })
            .catch(error => {
                console.log(error);
            });
    }

    handleCancelUpdate() {
        this.setState({
            editable: false
        })
    }

    handleDestroy() {
        const confirmation = confirm("Are you sure?");
        const { timeSlot } = this.props
        const path = `/api/v1/time_slots/${timeSlot.id}`

        if (confirmation) {
            axios
                .delete(path)
                .then(_response => {
                    this.props.getTimeSlots();
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    render() {
        const { timeSlot } = this.props
        const { editable, selectStartDate, selectEndDate, approved } = this.state

        return (
            <tr className={`${approved ? 'table-light' : ''}`}>
                <td>
                    <svg className={`bi bi-check-circle ${approved ? `text-success` : `text-muted`}`}
                        width="2em"
                        height="2em"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                            d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                            clipRule="evenodd"/>
                        <pathfillRule fillRule="evenodd" d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z" clipRule="evenodd"/>
                    </svg>
                </td>
                <td>
                    {!editable && <Moment format="MM/DD/YYYY hh:mm:ss" date={timeSlot.start_time}/>}
                    {editable &&
                        <DatePicker
                            className="form-control"
                            selected={ selectStartDate }
                            onChange={ this.onStartDateChange }
                            name="selectStartDate"
                            id="selectStartDate"
                            showTimeSelect
                            required
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy h:mm aa" />}
                </td>
                <td>
                    {!editable && <Moment format="MM/DD/YYYY hh:mm:ss" date={timeSlot.end_time}/>}
                    {editable &&
                        <DatePicker
                            className="form-control"
                            selected={ selectEndDate }
                            onChange={ this.onEndDateChange }
                            name="selectEndDate"
                            id="selectEndDate"
                            showTimeSelect
                            required
                            timeIntervals={5}
                            timeFormat="HH:mm"
                            timeCaption="time"
                            dateFormat="MM/dd/yyyy h:mm aa" />}
                </td>
                <td>
                    <textarea type="text"
                              defaultValue={timeSlot.description}
                              disabled={!editable}
                              ref={this.textareaRef}
                              className="form-control"
                              rows="1"
                              id={`timeSlot__description-${timeSlot.id}`} />
                </td>
                <td>
                    <button className="btn btn-success">
                        <Moment duration={timeSlot.start_time} date={timeSlot.end_time}/>
                    </button>
                </td>
                <td className="text-right">
                    <div className="form-check form-check-inline">
                        <input type="boolean"
                               defaultChecked={approved}
                               type="checkbox"
                               onChange={this.handleChangeApproved}
                               ref={this.approvedRef}
                               className="form-check-input"
                               id={`approved-${timeSlot.id}`} />
                        <label className="form-check-label" htmlFor={`approved-${timeSlot.id}`}>
                            Approved?
                        </label>
                    </div>
                    <button
                        className="btn btn-outline-danger btn-sm me-xxl-2"
                        onClick={this.handleDestroy}
                    >Delete</button>
                    {!editable && <button
                        className="btn btn-outline-primary btn-sm me-xxl-2"
                        onClick={this.handleEdit}
                        >Edit</button>}
                    {editable &&
                        <React.Fragment>
                            <button
                                className="btn btn-outline-success btn-sm me-xxl-2"
                                onClick={this.handleUpdate}
                            >Update</button>
                            <button
                                className="btn btn-outline-dark btn-sm me-xxl-2"
                                onClick={this.handleCancelUpdate}
                            >Cancel</button>
                        </React.Fragment>}
                </td>
            </tr>
        )
    }
}

export default TimeSlot

TimeSlot.propTypes = {
    timeSlot: PropTypes.object.isRequired,
    getTimeSlots: PropTypes.func.isRequired
}
