import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';

class DataReporting extends Component {

    state = {
        loading: true,
        queryParams: {
            yAxis: 'Books',
            xAxis: 'Time'
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
                xAxis: this.state.queryParams.xAxis,
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
                xAxis: event.target.value,
                yAxis: this.state.queryParams.yAxis
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, xAxis: event}
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
                    <select id='yAxis' onChange={this.changeYAxis}>
                        <option value='Books'>Books</option>
                        <option value='Children'>Children</option>
                        <option value='Adult ESL Learners'>Adult ESL Learners</option>
                    </select>
                    <select id='xAxis' onChange={this.changeXAxis}>
                        <option value='Time'>Time</option>
                        <option value='Events'>Events</option>
                        <option value='Organizations'>Organizations</option>
                        <option value='Demographics'>Demographics</option>
                    </select>
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