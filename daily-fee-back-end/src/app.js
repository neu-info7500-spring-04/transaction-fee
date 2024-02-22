import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: '*'
  }));
  
// GET /bitcoin/transaction/fees/
app.get('/bitcoin/transaction/fees/', async (req, res) => {
  const network = req.query.network.toLowerCase(); // Get the network parameter and convert it to lowercase
  const limit = req.query.limit || 7; // Get the limit query parameter or default to 7 if not provided
  try {
    const query = `
      {
        bitcoin(network: ${network}) {
          transactions(options: {desc: "date.date", limit: ${limit}}) {
            date {
              date
            }
            feeValueDecimal
          }
        }
      }
    `;

    const response = await fetch('https://graphql.bitquery.io/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': 'BQYWpvUy6xifBt1UOONVZMY72gq8XY5b'
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    res.json(data); // Return the entire data object as JSON
  } catch (error) {
    console.error(`Error fetching ${network} transactions:`, error);
    res.status(500).json({ error: `Error fetching ${network} transactions` }); // Return an error response
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
