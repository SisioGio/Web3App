import { useEffect,useState,React } from 'react';
import contract from './../contract/greenGangPumpkins.json'
import { ethers } from 'ethers';
const contractAddress = "0xF6Fb47Fba5C7A3ADc4fbfF85c4B5f811679a90eb"
const abi =contract
import '../styles/App.css';
import * as s from "./../styles/globalStyles";
import * as Utils from 'web3-utils';
import Instagram from './../images/icons8-instagram-48.png'
import About from './about.js'
import Countdown , { zeroPad, calcTimeDelta, formatTimeDelta }from "react-countdown";
import Timer from './salescountdown';

function Web3(props){
    const[currentAccount, setCurrentAccount] = useState(null);
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

    const[salesOpen,setSalesOpen] = useState(false)

    const openSales = () =>{
    
      setSalesOpen(true);
      
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
          let nftTxt = await nftContract.mint(mintAmount,{value:ethers.utils.parseEther("2")});
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
        console.log("Minting is not allowed")
        return (

          <div>
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


    const checkWalletIsConnected = async () => {
     
        // Check if Metamask is installed
        console.log("Checking contract status...")
      
        if(!ethereum){
          console.log("Make sure you have Metamask installed!")
        } else{
          console.log("Wallet exists! We're ready!")
        }
    
        const accounts = await ethereum.request({method:'eth_accounts'});
    
        if(accounts.length !== 0){
          const account = accounts[0];
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

        // Get lotteryTicketPrice
        let currLotteryTicketPrice = await nftContract.getLotteryTicketPrice();
        await currLotteryTicketPrice;
        let lotteryTicketPriceETH = Utils.fromWei((currLotteryTicketPrice).toString(),'ether');
        setLotteryTicketPrice(lotteryTicketPriceETH);
        // console.log("Current lottery ticket price  is " + currLotteryTicketPrice)
        
        // Check if user has already purchase a ticket lottery!
        let userAlreadyInLottery = await nftContract.checkIfUserInLotter(account);
        await userAlreadyInLottery;
        setclientAlreadyInLottery(userAlreadyInLottery);
        

        // Check if lottery is open
        let lotteryIsOpen = await nftContract.isLotteryOpen();
        await lotteryIsOpen;
        setLotteryIsOpen(lotteryIsOpen);


        // Get lottery deadline
        let lotteryEndDateTimeStamp = await nftContract.lotteryEndDateTime();
        await lotteryEndDateTimeStamp;
        setLotteryDeadlineTimeStamp(lotteryEndDateTimeStamp*1000);

        let LotteryEndDateTime = new Intl.DateTimeFormat('pl-PL', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format((lotteryEndDateTimeStamp * 1000).toString())
        
        setDeadline(LotteryEndDateTime);
       
      
      }
        } else {
          console.log("No authorized account")
        }
    
  
         }
    const connectWalletHandler = async () => {
      
     
        if(!ethereum){
          alert("Please install Metamask!")
        }
        try{
          const accounts = await ethereum.request({method:'eth_requestAccounts'});
          console.log("Found an account! Address: ", accounts[0]);
          setCurrentAccount(accounts[0]);
        } catch(err){
          console.log(err);
        }
    
       }

    const connectWalletButton = () => {
        return (
    
    
          <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
            Connect Your Wallet
          </button>
        )
      }
    const mintNftButton = () => {
        
        return (

            <div className='justify-content-center' >
               

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
     

      const Completionist = () => {

          return (
          <div>

        <h1>The lottery is finished! Wait the next one.</h1>
          
          {winners.length == 0 ?  <h5>The winners have not been selected yet!</h5>  :  (winners) }

          </div>
      
          
          )

      }

      const getLotteryWinners = async() =>{
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress,abi,signer);
    
         
          let winners = await nftContract.getLotteryWinners();
          await winners
          console.log(winners);
        
          setWinners(winners);
          
        


      }
      const renderer = ({days, hours, minutes, seconds, completed }) => {
        if (completed) {
          
       
      
          // getLotteryWinners();     



          return <Completionist />;
        } else {
          // Render a countdown
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



              <s.SpacerMedium></s.SpacerMedium>
            </div>
           
          );
        }
      };


const Lottery = () => {
 
        console.log(lotteryDeadlineTimeStamp)
        return (

            <div className='justify-content-center'>
              <h1>Feel lucky? Don't miss the lottery!</h1>
              <s.SpacerMedium></s.SpacerMedium>


{/* <Countdown date={new Date(lotteryDeadlineTimeStamp)} renderer={renderer} /> */}

<Countdown date={Date.now() + 1000} renderer={renderer} />
<s.SpacerLarge></s.SpacerLarge>
              <h3>Buy a ticket for  {lotteryTicketPrice.toString()} ETH</h3>
            <s.SpacerLarge></s.SpacerLarge>
              {deadLine ? <h5>The lottery is open and it ends on {deadLine.toString()}</h5> : null}
              <s.SpacerMedium></s.SpacerMedium>
              
              {clientAlreadyInLottery == false? <button disabled={buyingTicket? 1 : 0} className="mx-2 px-5 my-3 btn btn-lg btn-block btn-outline-light" onClick={() => buyLotteryTicket()}>{buyingTicket? "Complete the payment" : "Buy Lottery Ticket"}</button> : <h3 className='text-danger'>You cannot join this lottery! You already have a ticket!</h3>}
              <s.SpacerMedium></s.SpacerMedium>
              <h5>{lotteryFeedback}</h5>
              {ticketHash? <a href={"https://rinkeby.etherscan.io/tx/"+ ticketHash} target="_blank" >View it on Etherscan</a> : null}


              {winners.length > 0 ? (
                <div>
              <h3>Current partecipants:</h3>
                              <ul>
                                {winners.map((value,index) => {
                                  return <li key={index}><h5>{value}</h5></li>
                                })}
                              </ul>

                </div>
                
              ): null }
            </div>
        )
      }
const buyLotteryTicket = async() =>{
    setLotteryFeedback("Check your wallet and complete the payment");
    setBuyingTicket(true);
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress,abi,signer);
  
        
        try{
          let ticketTxt = await nftContract.buyLotteryTicket({value:ethers.utils.parseEther(lotteryTicketPrice.toString())});
          await ticketTxt.wait();
          
          console.log(ticketTxt);
        

          setTicketHash(ticketTxt['hash']);
          setclientAlreadyInLottery(true);
          setLotteryFeedback("Ticket purchased, wait to see if you won!")
          
         
        } catch(err){
          console.log(err)
          setLotteryFeedback(err['message'].toString())
        }
        setBuyingTicket(false);

        
    
}
    useEffect(() => {
      
        checkWalletIsConnected();       
        if(window.ethereum) {
          window.ethereum.on('chainChanged', () => {
            checkWalletIsConnected();  
          })
          window.ethereum.on('accountsChanged', () => {
            checkWalletIsConnected();  
          })}



      }, [])

    return(
        <div className=" text-center  " id="buy-section">

            <h1>NFT & Lottery</h1>
            <s.SpacerSmall></s.SpacerSmall>

          <About/>
            
            <div>


          {props.salesAreOpen? (
            currentAccount ? 
            (onlyWhiteListed ? 
                                (isWhiteListed ? 
                                                    mintNftButton() : mintingNotAllowed())
                                                    
                                : (mintNftButton()))
            : connectWalletButton()

          ):(
           <Timer endDateTime={1667170800000}/>
          )}


          {lotteryIsOpen && onlyWhiteListed==false?(
            Lottery()
          ):(null)}
         

       









            </div>
                
            <s.SpacerXXXL></s.SpacerXXXL>
        </div>
    )
}
export default Web3;