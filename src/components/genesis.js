import React  from "react";
import '../styles/App.css';
import * as s from "./../styles/globalStyles";
import Fade from 'react-reveal/Fade';
import ReactPlayer from "react-player";
// import video_content from './../images/output.mp4'
function Genesis(){
    return(
        <div className=" text-center  " id="genesis">
<s.SpacerXXXL></s.SpacerXXXL>
<Fade right big>  
<h1>GENESIS</h1>
</Fade>
<s.SpacerXXXL></s.SpacerXXXL>
{/* <s.SpacerLarge></s.SpacerLarge> */}



<div className="row justify-content-center">
<Fade right big>
  {/* <div className="col-12 col-md-8 col-lg-10" >
  <video src="https://res.cloudinary.com/dzcqzw5cj/video/upload/v1651237775/output_jgkada.mp4" autoPlay loop></video>
  </div> */}

  <div className="col-12 col-md-10 col-lg-8">
          <div className="w-100  text-center mx-auto">
    
             <s.SpacerSmall></s.SpacerSmall>
    
                <p className="mx-3">
                On a suffering planet like Earth an army of silly pumpkins lost many comrades against the forces of nature because of their laziness. It was a bloody duel that threw a few pumpkins on all sides, creating confusion.  Fortunately, a small garrison of 8888 gourds was not punished by the Environmental Forces, thanks to their genuine capacity for rationalisation.  
        The Environmental Forces donated part of their souls and a phantasmagorical skateboard to easily find their missing comrades.  Each platoon member has a specific skill, which cannot be sufficient without synergy with other skills. The pumpkins need to find each other and create a strong ecological, avant-garde empire. 
        In their adventure they have decided to contemplate the most daring of characters... YOU! Try changing the plot if you don't want to be the next lost soul in the wasteland of pollution.Do you want to be the villain or the superhero? 
        At the end of the story maybe you will be both...
                </p>
            </div>
  </div>
  <s.SpacerXXL></s.SpacerXXL>
</Fade>

</div>



        </div>
    )
}
export default Genesis;