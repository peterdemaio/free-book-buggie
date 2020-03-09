import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import ClipLoader from 'react-spinners/ClipLoader';

class DataReporting extends Component {

    state = {
        loading: true,
        measurement: 'books',
        selectedLabels: [],
        selectedData: []
    }

    async componentDidMount() {
        console.log('in DataReporting componentDidMount')
        // get events from database and store them in redux
        await this.props.dispatch({
            type: 'GET_EVENTS'
        })
        this.getData()
        this.setState({loading: false})
        

    }

    getData = () => {
        for (event of this.props.reduxStore.events) {
            selectedLabels.push(event.event_name)
            if (this.state.measurement === 'books') {
                selectedData.push(event.books_in)
            } else if (this.state.measurement === 'children') {
                selectedData.push(event.number_of_children)
            }
        }
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
    
                    <ul>
                        {this.props.reduxStore.events.map((event, index) => {
                            return (<li>{event.event_name}</li>)
                        })}
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