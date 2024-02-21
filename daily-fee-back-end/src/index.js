import fetch from 'node-fetch';

async function fetchChannels() {
    const searchText = "ACINQ";
    const bitqueryApiUrl = `https://mempool.space/api/v1/lightning/nodes/rankings/connectivity`;

    try {
        const response = await fetch(bitqueryApiUrl);
        const data = await response.json();

        // Handle the data 
        console.log(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// fetchChannels();

// async function fetchBitcoinTransactionsFees() {
//     try {
//       const query = `
//         {
//           bitcoin {
//             transactions(options: {desc: "date.date", limit: 10}) {
//               date {
//                 date
//               }
//               feeValueDecimal
//             }
//           }
//         }
//       `;
  
//       const response = await fetch('https://graphql.bitquery.io/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-API-KEY': 'BQYWpvUy6xifBt1UOONVZMY72gq8XY5b' // TODO hardcode
//         },
//         body: JSON.stringify({ query }),
//       });
  
//       const data = await response.json();
//       return data.data.bitcoin.feeValue;
//     } catch (error) {
//       console.error('Error fetching Bitcoin transactions:', error);
//       return null;
//     }
//   }
  
//   fetchBitcoinTransactionsFees()
//     .then(feeValue => {
//       console.log('Bitcoin daliy fees:', feeValue);
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });



// async function fetchEthereumTransactionsFees() {
//     try {
//         const query = `
//         {
//             bitcoin {
//             transactions(options: {desc: "date.date", limit: 10}) {
//                 date {
//                 date
//                 }
//                 feeValueDecimal
//             }
//             }
//         }
//         `;
    
//         const response = await fetch('https://graphql.bitquery.io/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-API-KEY': 'BQYWpvUy6xifBt1UOONVZMY72gq8XY5b' // TODO hardcode
//         },
//         body: JSON.stringify({ query }),
//         });
    
//         const data = await response.json();
//         return data.data.bitcoin.feeValue;
//     } catch (error) {
//         console.error('Error fetching Bitcoin transactions:', error);
//         return null;
//     }
//     }
    
// fetchEthereumTransactionsFees()
//     .then(feeValue => {
//         console.log('Bitcoin daily fees:', feeValue);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
