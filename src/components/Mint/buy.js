import { useEffect,useState,React } from 'react';
import contract from './../../contract/greenGangPumpkins.json'
import { ethers } from 'ethers';
const contractAddress = "0xF6Fb47Fba5C7A3ADc4fbfF85c4B5f811679a90eb"
const abi =contract
import '../../styles/App.css';
import * as s from "./../../styles/globalStyles";
import * as Utils from 'web3-utils';
import Instagram from './../../images/icons8-instagram-48.png'
function Buy(props){
    const[account,setCurrentAccount] = useState(null)
    const[metamaskInstalled,setMetamaskInstalled] = useState(false);
    const[onlyWhiteListed,setOnlyWhiteListed] = useState(true);
    const[currentPrice,setCurrentPrice] = useState(0);
    const[currentBalance,setCurrentBalance] = useState(1);
    const[isWhiteListed,setIsWhiteListed] = useState(false);
    const[contractIsPaused, setContractIsPaused] = useState(true);
    const[mintAmount,setMintAmount] = useState(1);
    const[totalSupply,setTotalSupply] = useState(0);
    const[amountToPay,setAmountToPay] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [claimingNft, setClaimingNft] = useState(false);
    const [lotteryTicketPrice, setLotteryTicketPrice] = useState(0);
    const[lotteryFeedback,setLotteryFeedback] = useState("")
    const[clientAlreadyInLottery,setclientAlreadyInLottery] = useState(false);
    const[transactionHash,setTransactionHash] = useState(null);
    const [lotteryIsOpen,setLotteryIsOpen] = useState(false);
    const[lotteryDeadlineTimeStamp,setLotteryDeadlineTimeStamp] = useState(0);
    const[deadLine,setDeadline] = useState(null);
    const[buyingTicket,setBuyingTicket] = useState(false);
    const[ticketHash,setTicketHash] = useState(null);
    const[winners,setWinners] = useState([]);


    const getContractData = async () => {
     

        const account = props.account;
        console.log("Found an authorized account :", account);
        setCurrentAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress,abi,signer);
          
        // Check if contract is paused
        let isPaused = await nftContract.paused();
        await isPaused
        setContractIsPaused(isPaused);

        if(isPaused == false){
            // Check client balance
            let currentBalance = await nftContract.getAccountBalance(account.toString());
            await currentBalance;
            setCurrentBalance(currentBalance);
            //   Check if client is WhiteListed
            let userIsWhiteListed = await nftContract.isWhiteListed(account);
            await userIsWhiteListed
            setIsWhiteListed(userIsWhiteListed)  
            // Check if onlyWhiteList
            let onlyWhiteListed = await nftContract.onlyWhiteListed();
            await onlyWhiteListed;
            setOnlyWhiteListed(onlyWhiteListed);
            // Get totaly supply
            let totSupply = await nftContract.totalSupply();
            await totSupply;
            setTotalSupply(totSupply);

            // Get currentPrice
            let currentPrice = await nftContract.getTokenPrice(totSupply);
            await currentPrice;
            console.log("Current price is " + currentPrice)
            setCurrentPrice(currentPrice);
            let ethAmount = Utils.fromWei((mintAmount * currentPrice).toString(),'ether');
            setAmountToPay(ethAmount);       
      
      }

    
  
         }


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
    
      const Buy =  async() =>{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress,abi,signer);
        
        let totalGasLimit = (285000 * mintAmount).toString;
        setFeedback("Minting your GGPs...")
        setClaimingNft(true);
        console.log("Minting " + mintAmount.toString() +" for eth: " + amountToPay.toString())
        try{
          let nftTxt = await nftContract.mint(mintAmount,{value:ethers.utils.parseEther(amountToPay.toString())});
          await nftTxt.wait(); 
          setFeedback(`Congrats! The GGP is yours! go visit Opensea.io to view it.`)
          setClaimingNft(false);
          console.log(nftTxt);
          console.log(nftTxt['hash'])
          setTransactionHash(nftTxt['hash'])
        } catch (err){
          
          setFeedback(err.message.toString());
          setClaimingNft(false); }
        
        

      } 


    const mintingNotAllowed = () => {

        return (

          <div id="minting-not-allowed">
            <h1>Pumpkins are not on sale yet!</h1>
<h3>Keep yourself up to date by following us on our social channels:</h3>
 <div className=" justify-content-center py-5" id="mint-links">
         
      <a href="https://twitter.com/GGP_NFT" id='btn-twitter' target="_blank" className="btn"><img src="https://img.icons8.com/color/48/000000/twitter--v1.png"/>Twitter</a>
        
        
      <a className="btn " href="https://instagram.com/greengangpumpkins?utm_medium=copy_link" id='btn-instagram' target="_blank"><img src={Instagram}/>Instagram</a>


      <a className="btn" id='btn-discord' target="_blank" href="https://discord.gg/wT2jRJt8Gu"><img src="https://img.icons8.com/doodle/48/000000/discord-logo.png"/>Discord</a>
     
    
      
      </div>

          </div>
         

           
        )
    }






    const mintNftButton = () => {
        
        return (

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
     

      useEffect(() =>{
        getContractData();
      },[])
    return(
        <div className=" text-center  " id="buy-section">

            <h1>Mint</h1>
            <s.SpacerSmall></s.SpacerSmall>

            
            <div>

      
          {
            
            (onlyWhiteListed ? 
                                (isWhiteListed ? 
                                                    mintNftButton() : mintingNotAllowed())
                                                    
                                : (mintNftButton()))
          

          }
         











            </div>
                
            <s.SpacerXXXL></s.SpacerXXXL>
        </div>
    )
}
export default Buy;