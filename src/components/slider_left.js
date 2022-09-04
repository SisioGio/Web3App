import React  from "react";
import '../styles/App.css';
import Nft1 from './../images/Slider/1.png'
import Nft2 from './../images/Slider/2.png'
import Nft3 from './../images/Slider/3.png'
import Nft4 from './../images/Slider/4.png'
import Nft5 from './../images/Slider/5.png'
import Nft6 from './../images/Slider/6.png'
import Nft7 from './../images/Slider/7.png'
import Nft8 from './../images/Slider/8.png'
import Nft12 from './../images/Slider/12.png'

function SliderLeft(){
    return(
        <div className="w-100 " id='slider'>
            <div id="slider-shower">
            </div>
            <div className="position-relative">

            <div class="slider-left">
            
                        <img src={Nft1} alt="" />
                        <img src={Nft2} alt="" />
                        <img src={Nft3} alt="" />
                        <img src={Nft12} alt="" />
                        <img src={Nft5} alt="" />
                        <img src={Nft6} alt="" />
                        <img src={Nft7} alt="" />
                        <img src={Nft8} alt="" />
                        <img src={Nft1} alt="" />
                        <img src={Nft2} alt="" />
                        <img src={Nft3} alt="" />
                        <img src={Nft4} alt="" />
                        <img src={Nft5} alt="" />
                        <img src={Nft6} alt="" />
                        <img src={Nft7} alt="" />
                        <img src={Nft8} alt="" />
            
                 
            </div>
            
            
</div>
           
        </div>
    )
}
export default SliderLeft;