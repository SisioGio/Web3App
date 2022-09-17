import React ,{useState,useEffect} from "react";
import '../styles/App.css'
import Mint from './mint.js'
import Bounce from 'react-reveal/Bounce';
import SalesStarter from "./salesstarter";
import * as s from "./../styles/globalStyles";
import Buy from "./Mint/buy";
function Home(props){

  const  openSales = () =>{
    props.setSalesAreOpen(true);
    setSales(true)
  }

  const[salesAreOpen,setSales] = useState(false);



    return(
        <div className="" id='home'>



               

                    {salesAreOpen?
                    (           
                            <div id="open-sales">
<h1>Sales are open!<br></br> Buy or NFT or lottery tickets!</h1>
<a href="#buy-section"><button className='mx-2 px-5 my-3 btn btn-lg btn-block btn-outline-light'  id='buy-button'>Go to the buy section</button></a>

                            </div>
                            
                    ):
                    (
                        <SalesStarter whenCompleted={openSales}/>
                    )}
                    


                
                
          
               
               
        </div>
    )
}
export default Home;