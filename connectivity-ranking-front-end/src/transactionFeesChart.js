import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TransactionFeesChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/transaction/fees?network=bitcoin&limit=7');
        setData(response.data.data.bitcoin.transactions);
      } catch (error) {
        console.error('Error fetching transaction fees:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date.date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="feeValueDecimal" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TransactionFeesChart;
