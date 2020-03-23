import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';
import { connect } from 'react-redux';

import CsvDownloader from 'react-csv-downloader';

import DataReportingNav from './DataReportingNav';
import './DataReportingStyle.css';

class DataReporting extends Component {
    
    state = {
        loading: true,
        queryParams: {
            yAxis: 'Books Distributed',
            xAxis: 'Time',
            startDate: '2018-01-01',
            endDate: '2021-01-01',
            timeUnit: 'Year',
            metric: 'Age'
        },
        title: 'Books Distributed',
        myRef: React.createRef()
    }

    handleChangeFor = (event, param) => {
        console.log('in hangleChangeFor')
        this.props.dispatch({
            type: 'GET_DATA',
            payload: {
                ...this.state.queryParams,
                [param]: event.target.value
            }
        })
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                [param]: event.target.value
            }
        })
        if (param === 'yAxis') {
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
        }
    }

    setCurrentDate() {
        console.log('in setCurrentDate')
        let today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10) 
        {
            dd='0'+dd;
        } 

        if(mm<10) 
        {
            mm='0'+mm;
        } 
        today = yyyy+'-'+mm+'-'+dd;
        console.log(today)
        this.setState({
            queryParams: {
                ...this.state.queryParams,
                endDate: today
            }
        })    
    }

    componentDidMount() {
        console.log('in DataReporting componentDidMount')
        // get events from database and store them in redux
        this.props.dispatch({
            type: 'GET_DATA',
            payload: this.state.queryParams
        })
        this.setCurrentDate();        
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
                                    <select id='thirdDropdown' className='chart-select' onChange={(event) => this.handleChangeFor(event, 'timeUnit')} style={{width:'100px'}}>
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
                                    <select id='thirdDropdown' className='chart-select' onChange={(event) => this.handleChangeFor(event, 'metric')}>
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
                <DataReportingNav/>
                    <div>
                        <h1 className="data-reporting-styles" >Craft Your Story</h1>
                    </div>
                    <div className='chart-dashboard'>
                        <div className='chart-input-container'>
                            <div className='chart-input'>
                                <label for='yAxis'>Vertical Axis</label>
                                <select id='yAxis' className='chart-select' onChange={(event) => this.handleChangeFor(event, 'yAxis')}>
                                    <option value='Books Distributed'>Books Distributed</option>
                                    <option value='Books Collected'>Books Collected</option>
                                    <option value='Children'>Children</option>
                                </select>
                            </div>
                            <div className='chart-input'>
                                <label for='xAxis'>Horizontal Axis</label>
                                <select id='xAxis' className='chart-select' onChange={(event) => this.handleChangeFor(event, 'xAxis')}>
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
                                <input type='date' id='startDate' name='Start Date' className='date-input' onChange={(event) => this.handleChangeFor(event, 'startDate')} value={this.state.queryParams.startDate} style={{width:'185px'}}></input>
                            </div>
                            <div className='chart-input'>
                                <label for='endDate'>End Date</label>
                                <input type='date' id='endDate' name='End Date' className='date-input' onChange={(event) => this.handleChangeFor(event, 'endDate')} value={this.state.queryParams.endDate} style={{width:'185px'}}></input>
                            </div>
                        </div>
                        <div className='export-options'>
                            <div className='chart-input'>
                                <CsvDownloader 
                                    filename="BookBuggieData"
                                    columns={columns} 
                                    datas={this.props.reduxStore.chartDataExcel}>
                                    <button><img src={require('./ms-excel.png')}/></button>
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
                            backgroundColor='white'
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