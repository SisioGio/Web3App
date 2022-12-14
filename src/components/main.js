import React, { useEffect, useState, useRef } from "react";
import './../styles//App.css'
import Nav from './nav.js'
import Home from './home.js'
import About from './about.js'
import Genesis from './genesis.js'
import Vision from './vision.js'
import Team from './team.js'
import Cartoon from './cartoon.js'
import GreenMap from './greenMap.js'
import FAQS from './faqs.js'
import FOoter from './footer.js'
import AboutNew from './new_about.js'
import * as s from './../styles/globalStyles.js'
import Footer from "./footer.js";
import RingLoader from 'react-spinners/RingLoader';
import Web3 from './web3.js'
import SliderLeft from './slider_left'
import SliderRight from './slider_right'
const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;
function Main() {
  
  const [loading,setLoading] = useState(false);

  const[salesAreOpen,setSalesAreOpen] = useState(false)

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() =>{
      
  //     setLoading(false);


  //   },1500)
  // },[])
  return (
    
    
    <div className="">

    {

      loading ?
      <div className="loading-screen">
      <RingLoader
     
     size={400}
     color={'#F5A623'}
     loading={loading}
     
     
     />
      </div>



      :
            <div className="main-container">

                 
                  <Home salesAreOpen={salesAreOpen} setSalesAreOpen={setSalesAreOpen}/>
                  <s.SpacerXXXL></s.SpacerXXXL>
                  
                  <AboutNew/>
                  <s.SpacerXXXL></s.SpacerXXXL>
                  <Web3 salesAreOpen={salesAreOpen}/>
                  <Team/>

               
                  <Genesis/>
              
                  <s.SpacerXXL></s.SpacerXXL>
                  <s.SpacerXXXL></s.SpacerXXXL>

                  <SliderLeft/>

                <Cartoon/>

                <SliderRight/>

                <s.SpacerXXXL></s.SpacerXXXL>
              
              
                
                
                <GreenMap/>
            <Footer></Footer>
            </div>
    }

      
    </div>
  );
}
export default Main;
