import React from 'react'

class TimeSlots extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <React.Fragment>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Start</th>
                            <th scope="col">Start</th>
                            <th scope="col">Description</th>
                            <th scope="col">Duration</th>
                            <th scope="col" className="text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>{this.props.children}</tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}
export default TimeSlots
