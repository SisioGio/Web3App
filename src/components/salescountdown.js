import { React } from 'react';
import '../styles/App.css';

import Countdown from "react-countdown";
function Timer(props){

      const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
                props.whenCompleted();
  
        } else {
            
          return (

            <div className="row d-flex justify-content-center">

              <div className="col-12 col-sm-6 col-md-3 col-xl-2">
              <h3>Days</h3><h1>{days}</h1>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-xl-2">
              <h3>Hours</h3> <h1>{hours}</h1>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-xl-2">
              <h3>Minutes</h3><h1>{minutes}</h1>
              </div>
              <div className="col-12 col-sm-6 col-md-3 col-xl-2">
              <h3>Seconds</h3><h1>{seconds}</h1>
              </div>
            
            </div>
           
          );
        }
      };






    return(
        <div className=" text-center  " id="">
              <Countdown date={	props.endDateTime} renderer={renderer} />
        </div>
    )
}
export default Timer;