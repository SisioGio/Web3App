import { useEffect,useState,React } from 'react';

import '../../styles/App.css';
import * as Utils from 'web3-utils';

function ConnectWallet(props){
    const setWalletAccount= (currentAccount) => {
            alert(currentAccount)
            props.updateAccount(currentAccount);

    }

    const checkWalletIsConnected = async () => {
     
      
        if(!ethereum){
          console.log("Make sure you have Metamask installed!")
        } else{
          console.log("Wallet exists! We're ready!")
        }
    
        const accounts = await ethereum.request({method:'eth_accounts'});
    
            if(accounts.length !== 0){
                const account = accounts[0];
                console.log("Found an authorized account :", account);
                setWalletAccount(account);
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
          setWalletAccount(accounts[0]);
        } catch(err){
          console.log(err);
        }
    
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
        <button onClick={connectWalletHandler} className='cta-button connect-wallet-button'>
        Connect Your Wallet
      </button>
    )
}
export default ConnectWallet;