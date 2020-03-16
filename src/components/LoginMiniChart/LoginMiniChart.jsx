import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';



class LoginMiniChart extends Component {

    componentDidMount() {
        console.log('in LoginMiniChart componentDidMount')
        // get events from database and store them in redux
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                yAxis: 'Books Collected',
                xAxis: 'Time',
                startDate: '2010-01-01',
                endDate: '2021-01-01',
                timeUnit: 'Month'
            },
            title: 'Books Collected',
        })
        this.setState({ loading: false })
    }




    render(){
        return(

        <div style={{ marginLeft: '12%', marginRight: '12%' }}>
            <Bar
                data={this.props.reduxStore.chartData}
                width={600}
                height={200}
                options={{
                    
                    legend: {
                        display: false
                    },
                    scales: {
                        yAxes: [{
                            display: true,
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        </div>

    // <ul>
    //     {JSON.stringify(this.props.reduxStore.chartData)}
    // </ul>
)}}


    const mapStateToProps = (reduxStore) => ({
    reduxStore
    })

export default connect(mapStateToProps)(LoginMiniChart)
