import React ,{useState,useEffect} from "react";
import '../styles/App.css'
import Timer from "./salescountdown";
import * as s from "./../styles/globalStyles";
import Instagram from './../images/icons8-instagram-48.png'
function SalesStarter(props){
    
    const openSales = () => {
   
        props.whenCompleted();
    }


    return(

                <div id="timer-sales">
                    <h1>Sales open in:</h1>
                <Timer whenCompleted={()=>openSales()} endDateTime={ Date.now() + 1000}/>
                
                
                {/* <h5>Keep yourself up to date by following us on our social channels:</h5> */}
                <s.SpacerLarge></s.SpacerLarge>
                <div className=" justify-content-center" id="mint-links">
                    
                <a href="https://twitter.com/GGP_NFT" id='btn-twitter' target="_blank" className="btn"><img src="https://img.icons8.com/color/48/000000/twitter--v1.png"/>Twitter</a>
                    
                    
                <a className="btn " href="https://instagram.com/greengangpumpkins?utm_medium=copy_link" id='btn-instagram' target="_blank"><img src={Instagram}/>Instagram</a>


                <a className="btn" id='btn-discord' target="_blank" href="https://discord.gg/wT2jRJt8Gu"><img src="https://img.icons8.com/doodle/48/000000/discord-logo.png"/>Discord</a>
                
                
                </div>
                
                </div>
               
               

    )
}
export default SalesStarter;