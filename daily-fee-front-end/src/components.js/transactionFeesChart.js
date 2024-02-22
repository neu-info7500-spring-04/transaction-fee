import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Text } from 'recharts';
import './transactionFeesChart.css'

const TransactionFeesChart = () => {
  const [data, setData] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState('bitcoin');
  const [selectedDuration, setSelectedDuration] = useState('1w');

  const fetchData = async () => {
    try {
      let limit = selectedDuration === '1w' ? 7 : 30;
      const response = await axios.get(`http://localhost:3000/bitcoin/transaction/fees?network=${selectedNetwork}&limit=${limit}`);
      setData(response.data.data.bitcoin.transactions);
    } catch (error) {
      console.error('Error fetching transaction fees:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedNetwork, selectedDuration]);

  const handleNetworkChange = (event) => {
    setSelectedNetwork(event.target.value);
  };

  const handleDurationChange = (duration) => {
    setSelectedDuration(duration);
  };


  return (
    <div>
      <div className="select-container">
      <select value={selectedNetwork} onChange={handleNetworkChange}>
        <option value="bitcoin">bitcoin</option>
        <option value="bitcash">bitcash</option>
        <option value="litecoin">litecoin</option>
        <option value="dash">dash</option>
        <option value="dogecoin">dogecoin</option>
        <option value="zcash">zcash</option>
      </select>
      <button onClick={fetchData}>View</button>
    </div>
    <div className="duration-buttons">
        <button onClick={() => handleDurationChange('1w')} className={selectedDuration === '1w' ? 'selected' : ''}>1 Week</button>
        <button onClick={() => handleDurationChange('1m')} className={selectedDuration === '1m' ? 'selected' : ''}>1 Month</button>
      </div>
    <div>
    
    <ResponsiveContainer width="100%" height={400}>
    <h3>Daily Transaction fees</h3>
      <LineChart data={data} margin={{ top: 40, right: 40, bottom: 40, left: 40 }}>
      <Text value="Daily Transaction fees" offset={0} position="top" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date.date" reversed={true} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" name="Transaction Fees" dataKey="feeValueDecimal" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
    
  );
};

export default TransactionFeesChart;
