import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// ... (imports)

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const Analytics = () => {
  const [tickets, setTickets] = useState([]);
  const [openedTickets, setOpenedTickets] = useState(0);
  const [closedTickets, setClosedTickets] = useState(0);
  const [pendingTickets, setPendingTickets] = useState(0);
  const [softwareTickets, setSoftwareTickets] = useState(0);
  const [hardwareTickets, setHardwareTickets] = useState(0);
  const [networkTickets, setNetworkTickets] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:5000/api/v1/alltickets', { withCredentials: true });
      if (response.status !== 200) {
        navigate('/');
        return;
      }
      if(response.data.mssg ==="No tickets"){
        setOpenedTickets(opened);
        setClosedTickets(closed);
        setPendingTickets(pending);
        setSoftwareTickets(software);
        setHardwareTickets(hardware);
        setNetworkTickets(network);
        setLoading(false);
      }

      const ticketsData = response.data;

      let opened = 0;
      let closed = 0;
      let pending = 0;
      let software = 0;
      let hardware = 0;
      let network = 0;

      for (let i = 0; i < ticketsData.length; i++) {
        if (ticketsData[i].status === 'open') {
          opened++;
        } else if (ticketsData[i].status === 'closed') {
          closed++;
        } else if (ticketsData[i].status === 'pending') {
          pending++;
        }

        if (ticketsData[i].issueType === 'software') {
          software++;
        } else if (ticketsData[i].issueType === 'hardware') {
          hardware++;
        } else if (ticketsData[i].issueType === 'network') {
          network++;
        }
      }

      setOpenedTickets(opened);
      setClosedTickets(closed);
      setPendingTickets(pending);
      setSoftwareTickets(software);
      setHardwareTickets(hardware);
      setNetworkTickets(network);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    // You can render a loading spinner or indicator here
    return <div>Loading...</div>;
  }

  const data = [
    { name: 'Opened', value: openedTickets },
    { name: 'Closed', value: closedTickets },
    { name: 'Pending', value: pendingTickets },
  ];

  const data2 = [
    { name: 'Software', value: softwareTickets },
    { name: 'Hardware', value: hardwareTickets },
    { name: 'Network', value: networkTickets },
  ];

  return (
    <div>
        <div>
        <h1>Tickets Status</h1>
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
      <div>
      <h1>Tickets IssueTypes</h1>
      <PieChart width={400} height={400}>
        <Pie data={data2} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
          {data2.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
      </div>
    </div>
  );
};

export default Analytics;
