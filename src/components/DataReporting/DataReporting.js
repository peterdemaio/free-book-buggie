import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';

class DataReporting extends Component {

    state = {
        loading: true,
        queryParams: {
            yAxis: 'Books',
            xAxis: 'Time',
            startDate: '2010-01-01',
            endDate: '2021-01-01'
        },
        title: 'Books Distributed'
    }

    changeYAxis = (event) => {
        console.log('in changeYAxis. event.target.value:', event.target.value)
        console.log('old yAxis:', this.state.queryParams.yAxis)
        console.log('new yAxis:', this.state.queryParams.yAxis)
        switch(event.target.value) {
            case 'Books':
                this.setState({title: 'Books Distributed'})
                break;
            case 'Children':
                this.setState({title: 'Children Recipients'})
                break;
            case 'Adult ESL Learners':
                this.setState({title: 'Adult ESL Learner Recipients'})
                break;
            default:
                console.log('changeYAxis error')
        }

        this.props.dispatch({
            type: 'GET_DATA',
            payload: { 
                ...this.state.queryParams,
                yAxis: event.target.value
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, yAxis: event.target.value}
        })
    }

    changeXAxis = (event) => {
        console.log('in changeXAxis. event.target.value:', event.target.value)
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                xAxis: event.target.value
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, xAxis: event.target.value}
        })
    }

    changeTimeUnit = (event) => {
        console.log('in handleTimeUnitChange')
    }

    changeStartDate = (event) => {
        console.log('in handleStartDateChange. event.target.value:', event.target.value)
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                startDate: event.target.value
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, startDate: event.target.value}
        })
    }

    changeEndDate = (event) => {
        console.log('in handleEndDateChange. event.target.value:', event.target.value)
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                endDate: event.target.value
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, endDate: event.target.value}
        })
    }

    componentDidMount() {
        console.log('in DataReporting componentDidMount')
        // get events from database and store them in redux
        this.props.dispatch({
            type: 'GET_DATA',
            payload: this.state.queryParams
        })

        this.setState({loading: false})
    }

    render() {
        console.log('in render. this.state.queryparams:', this.state.queryParams)
        let thirdOption
        switch (this.state.queryParams.xAxis) {
            case 'Time':
                thirdOption = <>
                                <label for='thirdDropdown'>Time Unit</label>
                                <select id='thirdDropdown' onChange={this.changeTimeUnit}>
                                        <option value='Year'>Year</option>
                                        <option value='Month'>Month</option>
                                </select>
                                <label for='startDate'>Start Date</label>
                                <input type='date' id='startDate' name='Start Date' onChange={this.changeStartDate} value={this.state.queryParams.startDate}></input>
                                <label for='endDate'>End Date</label>
                                <input type='date' id='endDate' name='End Date' onChange={this.changeEndDate} value={this.state.queryParams.endDate}></input>
                              </>
                break;
            case 'Events':
                thirdOption = <>
                                <label for='startDate'>Start Date</label>
                                <input type='date' id='startDate' name='Start Date' onChange={this.changeStartDate} value={this.state.queryParams.startDate}></input>
                                <label for='endDate'>End Date</label>
                                <input type='date' id='endDate' name='End Date' onChange={this.changeEndDate} value={this.state.queryParams.endDate}></input>
                              </>
                break;
            case 'Organizations':
                thirdOption = <>
                                <label for='startDate'>Start Date</label>
                                <input type='date' id='startDate' name='Start Date' onChange={this.changeStartDate} value={this.state.queryParams.startDate}></input>
                                <label for='endDate'>End Date</label>
                                <input type='date' id='endDate' name='End Date' onChange={this.changeEndDate} value={this.state.queryParams.endDate}></input>
                              </>
                break;
            case 'Demographics':
                thirdOption = <>
                                <h5>this part has yet to be completed</h5>
                              </>
                break;
            default: 
                thirdOption = <>
                              </>
        }
             
        if (this.state.loading) {
            return (
                <div>
                    <ClipLoader
                        size={150}
                        loading={this.state.loading}
                    />
                </div>
            )
        } else {
            return (
                <>
                    <h1>DataReporting page</h1>
                    <label for='yAxis'>Vertical Axis</label>
                    <select id='yAxis' onChange={this.changeYAxis}>
                        <option value='Books'>Books</option>
                        <option value='Children'>Children</option>
                        <option value='Adult ESL Learners'>Adult ESL Learners</option>
                    </select>
                    <label for='xAxis'>Horizontal Axis</label>
                    <select id='xAxis' onChange={this.changeXAxis}>
                        <option value='Time'>Time</option>
                        <option value='Events'>Events</option>
                        <option value='Organizations'>Organizations</option>
                        <option value='Demographics'>Demographics</option>
                    </select>
                    {thirdOption}
                    <div style={{marginLeft:'12%', marginRight:'12%'}}>
                        <Bar
                            data={this.props.reduxStore.chartData}
                            width={1000}
                            height={500}
                            options={{
                                title:{
                                    display: true,
                                    text: this.state.title
                                },
                                legend:{
                                    display: false
                                }
                            }}
                        />
                    </div>
                    
                    <ul>
                        {JSON.stringify(this.props.reduxStore.data)}
                    </ul>
                    
                    
                </>
            )
        }
        
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(DataReporting)