import React, { Component } from 'react';
import { connect } from 'react-redux';
//importing components for animated countup
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';


class BookCountUp extends Component {

    componentDidMount() {
        console.log('in CountUp componentDidMount')
        // get events from database and store them in redux
        this.props.dispatch({
            type: 'GET_DATA'   
        }) 
    }

    render() {
        return (
            <div className="counter-div">
                <h1 className="counter-style"
                // font-size= "200%"
                >
                    <CountUp
                        start={0}
                        end={18164}
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


            // <ul>
            //     {JSON.stringify(this.props.reduxStore.???)}
            // </ul>
        )
    }
}


const mapStateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(mapStateToProps)(BookCountUp)
