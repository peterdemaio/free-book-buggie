import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';

class DataReporting extends Component {

    state = {
        loading: true,
        queryParams: {
            yAxis: 'Books',
            xAxis: 'Year'
        },
        title: 'Books Distributed'
    }

    changeYAxis = async (event) => {
        console.log('in changeYAxis. event.target.value:', event.target.value)
        console.log('old yAxis:', this.state.queryParams.yAxis)
        console.log('new yAxis:', this.state.queryParams.yAxis)
        if (event.target.value === 'Books') {
            this.setState({title: 'Books Distributed'})
        } else if (event.target.value === 'Children') {
            this.setState({title: 'Children Recipients'})
        }
        this.props.dispatch({
            type: 'GET_DATA',
            payload: { 
                yAxis: event.target.value,
                xAxis: this.state.queryParams.xAxis
            }
        })
        this.setState({
            queryParams:
                {...this.state.queryParams, yAxis: event.target.value}
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
                    <select id='measurement' onChange={this.changeYAxis}>
                        <option value='Books'>Books</option>
                        <option value='Children'>Children</option>
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