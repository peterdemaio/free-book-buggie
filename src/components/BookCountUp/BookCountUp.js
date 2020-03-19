import React, { Component } from 'react';
import { connect } from 'react-redux';
//importing components for animated countup
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


class BookCountUp extends Component {

    componentDidMount() {
        // console.log('in CountUp componentDidMount')
        // get events from database and store them in redux
        this.props.dispatch({
            type: 'GET_BOOK_COUNT_DATA'   
        }) 
    }

    render() {
        console.log('broooooooooooo', this.props.reduxStore.bookCountReducer);
        //need to map over bookCountReducer.sum and pass to end={}
        //then repeat for 'books out' and pass to end={} for books out countUp
        
        return (
            <>
                {/* <p>{JSON.stringify(this.props.reduxStore.bookCountReducer[0].sum
                    )}</p> */}
                    
            <div className="counter-div">
                <h1 className="counter-style"
                // font-size= "200%"
                >
                    <CountUp
                        start={0}
                        end={Number(this.props.reduxStore.bookCountReducer[0].sum)}
                        duration={1.5}
                        delay={.25}
                        separator=","
                        decimals={0}
                        decimal=","
                        prefix="Books distributed: "
                        suffix=" "
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                    // ref={CountUp => { this.myCountUp = CountUp; }}
                    >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                        {/* removing button in favor of page load  */}
                        {/* {({ countUpRef, start }) => (
              <div>
                <span ref={countUpRef} />
                <button onClick={start}>Start</button>
              </div>
            )} */}
                    </CountUp>
                    <br />
                    <CountUp
                        start={0}
                        end={12957}
                        duration={1.75}
                        delay={.25}
                        separator=","
                        decimals={0}
                        decimal=","
                        prefix="Children impacted: "
                        suffix=" "
                        onEnd={() => console.log('Ended! 👏')}
                        onStart={() => console.log('Started! 💨')}
                    // ref={CountUp => { this.myCountUp = CountUp; }}
                    >
                        {({ countUpRef, start }) => (
                            <VisibilitySensor onChange={start} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                        {/* removing button in favor of page load */}
                        {/* {({ countUpRef, start }) => (
              <div>
                <span ref={countUpRef} />
                <button onClick={start}>Start</button>
              </div>
            )} */}
                    </CountUp>
                </h1>
            </div>


           

         </>
        )
        
    }
}


const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(BookCountUp)
