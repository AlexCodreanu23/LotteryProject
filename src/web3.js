import Web3 from 'web3';

let web3;

if (typeof window.ethereum !== 'undefined') {
    // Creează o instanță Web3 utilizând MetaMask ca provider
    web3 = new Web3(window.ethereum);

    // Solicită permisiunea de acces la conturile utilizatorului
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
            console.log('Web3 Version:', web3.version);
        })
        .catch((error) => {
            console.error('User denied account access:', error);
        });
} else {
    console.error('MetaMask is not installed. Please install MetaMask and refresh the page.');
}

export default web3;

