import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';

import CsvDownloader from 'react-csv-downloader';
import DownloadExcel from '../DownloadExcel/DownloadExcel';


const ObjectsToCsv = require('objects-to-csv');


class DataReporting extends Component {
    
    state = {
        loading: true,
        queryParams: {
            yAxis: 'Books Distributed',
            xAxis: 'Time',
            startDate: '2010-01-01',
            endDate: '2021-01-01',
            timeUnit: 'Year',
            metric: 'Age'
        },
        title: 'Books Distributed',
        myRef: React.createRef()
    }

    changeYAxis = (event) => {
        console.log('in changeYAxis. event.target.value:', event.target.value)
        console.log('old yAxis:', this.state.queryParams.yAxis)
        console.log('new yAxis:', this.state.queryParams.yAxis)
        switch(event.target.value) {
            case 'Books Distributed':
                this.setState({title: 'Books Distributed'})
                break;
            case 'Children':
                this.setState({title: 'Children Recipients'})
                break;
            case 'Books Collected':
                this.setState({title: 'Books Collected'})
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
            queryParams: {
                ...this.state.queryParams, 
                yAxis: event.target.value
            }
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
            queryParams: {
                ...this.state.queryParams, 
                xAxis: event.target.value
            }
        })
    }

    changeTimeUnit = (event) => {
        console.log('in changeTimeUnit. event.target.value:', event.target.value)
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                timeUnit: event.target.value
            }
        })
        this.setState({
            queryParams: {
                ...this.state.queryParams,  
                timeUnit: event.target.value
            }
        })
    }

    changeMetric = (event) => {
        console.log('in changeMetric. event.target.value:', event.target.value)
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                metric: event.target.value
            }
        })
        this.setState({
            queryParams: {
                ...this.state.queryParams,  
                metric: event.target.value
            }
        })
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
            queryParams: {
                ...this.state.queryParams, startDate: event.target.value
            }
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
            queryParams: {
                ...this.state.queryParams, endDate: event.target.value
            }
        })
    }

    // JSONtoCSV = (items) => {
    //     console.log(items)
    //     items = [items, items]
    //     const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
    //     const header = Object.keys(items[0])
    //     let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
    //     csv.unshift(header.join(','))
    //     csv = csv.join('\r\n')

    //     console.log(csv)
    // }
    downloadCSV = async () => {
        console.log(this.props.reduxStore.chartDataExcel)
        const csv = new ObjectsToCsv(this.props.reduxStore.chartDataExcel)
        console.log(await csv.toString())
        csv.toDisk('./test.csv');
    }

    componentDidMount() {
        //let myRef = React.createRef()

        console.log('this.state.myRef:', this.state.myRef)
        //console.log('this.myRef.current.getElementsByTagName("canvas")[0]:', this.myRef.current.getElementsByTagName("canvas")[0])
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
        
        // declare jsx object that contains conditionally-rendered dropdowns 
        let thirdOption

        // conditionally define the thirdOption jsx object based on selected xAxis
        switch (this.state.queryParams.xAxis) {
            case 'Time':
                thirdOption = <>
                                <div className='chart-input'>
                                    <label for='thirdDropdown'>Time Unit</label>
                                    <select id='thirdDropdown' className='chart-select' onChange={this.changeTimeUnit} style={{width:'100px'}}>
                                        <option value='Year'>Year</option>
                                        <option value='Month'>Month</option>
                                    </select>
                                </div>
                              </>
                break;
            case 'Events':
                thirdOption = <>
                              </>
                break;
            case 'Organizations':
                thirdOption = <>
                              </>
                break;
            case 'Demographics':
                thirdOption = <>
                                <div className='chart-input'>
                                    <label for='metric'>Metric</label>
                                    <select id='thirdDropdown' className='chart-select' onChange={this.changeMetric}>
                                            <option value='Age'>Age</option>
                                            <option value='Poverty'>Poverty</option>
                                            <option value='Race'>Race</option>
                                    </select>
                                </div>
                              </>
                break;
            default: 
                thirdOption = <>
                              </>
        }

        let columns = [];
        for (let column in this.props.reduxStore.chartDataExcel[0]) {
            console.log('column:', column)
            columns.push(column)
        }
        console.log('columns:', columns)
             
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
                    <div className='chart-dashboard'>
                        <div className='chart-input-container'>
                            <div className='chart-input'>
                                <label for='yAxis'>Vertical Axis</label>
                                <select id='yAxis' className='chart-select' onChange={this.changeYAxis}>
                                    <option value='Books Distributed'>Books Distributed</option>
                                    <option value='Books Collected'>Books Collected</option>
                                    <option value='Children'>Children</option>
                                </select>
                            </div>
                            <div className='chart-input'>
                                <label for='xAxis'>Horizontal Axis</label>
                                <select id='xAxis' className='chart-select' onChange={this.changeXAxis}>
                                    <option value='Time'>Time</option>
                                    <option value='Events'>Events</option>
                                    <option value='Organizations'>Organizations</option>
                                    <option value='Demographics'>Demographics</option>
                                </select>
                            </div>
                            {/* render conditionally-defined jsx from above */}
                            {thirdOption}
                            <div className='chart-input'>
                                <label for='startDate'>Start Date</label>
                                <input type='date' id='startDate' name='Start Date' className='date-input' onChange={this.changeStartDate} value={this.state.queryParams.startDate} style={{width:'185px'}}></input>
                            </div>
                            <div className='chart-input'>
                                <label for='endDate'>End Date</label>
                                <input type='date' id='endDate' name='End Date' className='date-input' onChange={this.changeEndDate} value={this.state.queryParams.endDate} style={{width:'185px'}}></input>
                            </div>
                        </div>
                        <div className='export-options'>
                            <div className='chart-input'>
                                
                                {/* <button onClick={() => this.JSONtoCSV(this.props.reduxStore.chartData)}>Download csv</button> */}
                                <CsvDownloader 
                                    filename="BookBuggieData"
                                    columns={columns} 
                                    datas={this.props.reduxStore.chartDataExcel}>
                                    <button><img src="https://img.icons8.com/color/48/000000/ms-excel.png"/></button>
                                </CsvDownloader>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div style={{marginLeft:'12%', marginRight:'12%'}}>
                        <Bar
                            ref={this.state.myRef}
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
                                },
                                scales: {
                                    yAxes: [{
                                        scaleFontSize: 32,
                                        display: true,
                                        ticks: {
                                            beginAtZero: true   // minimum value will be 0.
                                        }
                                    }],
                                    scaleLabel: { fontSize: 32 }
                                }
                            }}
                        />
                    </div>
                </>
            )
        }
    }
}

const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(DataReporting)