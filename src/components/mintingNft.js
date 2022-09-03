import React  from "react";
import '../styles/App.css';
import * as s from "./../styles/globalStyles";




function mintingNft(){
    const[mintAmount,setMintAmount] = useState(1);
    const[amountToPay,setAmountToPay] = useState(0);
    
    const decrementMintAmount = () => {
        let newMintAmount = mintAmount - 1;
        if (newMintAmount < 1) {
          newMintAmount = 1;
        }
        setMintAmount(newMintAmount);
        let ethAmount = Utils.fromWei((newMintAmount * currentPrice).toString(),'ether');
        setAmountToPay(ethAmount);
      };
    
      const incrementMintAmount = () => {
        let newMintAmount = mintAmount + 1;
        if (newMintAmount > 5) {
          newMintAmount = 5;
        }
        setMintAmount(newMintAmount);
        let ethAmount = Utils.fromWei((newMintAmount * currentPrice).toString(),'ether');
        setAmountToPay(ethAmount);
      };

    return(
        <div className='justify-content-center'>
               

                <div className='container-fluid d-flex justify-content-center py-4' id='buy-section'>
                    <button id='decrease-btn' type = 'button' onClick={() => decrementMintAmount()} className='mx-2 px-4 btn btn-outline-light'>-</button>
                    <h5 className='p-4'>{mintAmount}</h5>
                    <button id='increase-btn' type = 'button' onClick={() => incrementMintAmount()} className='mx-2 px-4 btn btn-outline-light'>+</button>
                </div>

                <h5>Total: {amountToPay.toString()} ETH</h5>

                <button disabled={claimingNft? 1 : 0} onClick={() => Buy()}className='mx-2 px-5 my-3 btn btn-lg btn-block btn-outline-light' id='buy-button'>{claimingNft ? "BUSY" : "BUY"}</button>
                
                <h5>{feedback}</h5>
                {transactionHash? <a href={"https://rinkeby.etherscan.io/tx/"+ transactionHash} target="_blank" >View it on Etherscan</a> : null}
                <div id="infobuy">
                <h5 className='font-italic text-small'><small>You have {currentBalance.toString()} GGP, you can collect max. 5 GGP.</small></h5>
                <h5 className='font-italic'><small>If you feel lucky, you can join our lottery for {Utils.fromWei((currentPrice).toString(),'ether').toString()} ETH</small></h5>
                </div>
               
                {/* <h5>{totalSupply.toString()} GGP have been already sold.</h5> */}
                <s.SpacerXXXL></s.SpacerXXXL>
                {onlyWhiteListed == false && lotteryIsOpen? Lottery(): null}
            </div>
    )
}
export default mintingNft;