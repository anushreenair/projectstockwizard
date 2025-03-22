import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';
import News from './pages/News';
import Portfolio from './components/Portfolio';
import Account from './components/Account';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function App() {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stockSymbol, setStockSymbol] = useState('AAPL'); // Default stock symbol

  const API_KEY = 'cvdcrq1r01qm9khk2rdgcvdcrq1r01qm9khk2re0'; // Finnhub API key

  useEffect(() => {
    const fetchLiveStockData = async () => {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${stockSymbol}&token=${API_KEY}`
        );

        const { c: currentPrice, t: timestamp } = response.data;

        // Prepare data for the chart
        const time = new Date(timestamp * 1000).toLocaleTimeString();

        setChartData((prevData) => {
          const updatedLabels = prevData ? [...prevData.labels, time] : [time];
          const updatedData = prevData
            ? [...prevData.datasets[0].data, currentPrice]
            : [currentPrice];

          return {
            labels: updatedLabels,
            datasets: [
              {
                label: `${stockSymbol} Stock Price`,
                data: updatedData,
                borderColor: '#61dafb',
                backgroundColor: 'rgba(97, 218, 251, 0.2)',
                tension: 0.4,
              },
            ],
          };
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching live stock data:', error);
        setLoading(false);
      }
    };

    // Fetch data every 5 seconds
    const interval = setInterval(fetchLiveStockData, 5000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [stockSymbol]);

  return (
    <Router>
      <div className="App dark">
        <nav className="navbar">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">StockWizard</Link>
            <ul className="navbar-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/news">News</Link></li>
              <li><Link to="/portfolio">Portfolio</Link></li>
              <li><Link to="/account">Account</Link></li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="page-content">
                <h1>Welcome to StockWizard!</h1>
                <div className="stock-input">
                  <input
                    type="text"
                    value={stockSymbol}
                    onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
                    placeholder="Enter stock symbol"
                  />
                </div>
                <div className="chart-container">
                  {loading ? (
                    <p>Loading live stock data...</p>
                  ) : chartData ? (
                    <Line
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: true,
                            position: 'top',
                          },
                        },
                        scales: {
                          x: {
                            title: {
                              display: true,
                              text: 'Time',
                              color: '#fff',
                            },
                            ticks: {
                              color: '#fff',
                            },
                          },
                          y: {
                            title: {
                              display: true,
                              text: 'Price (USD)',
                              color: '#fff',
                            },
                            ticks: {
                              color: '#fff',
                            },
                          },
                        },
                      }}
                    />
                  ) : (
                    <p>No data available</p>
                  )}
                </div>
              </div>
            }
          />
          <Route path="/news" element={<div className="page-content"><News /></div>} />
          <Route path="/portfolio" element={<div className="page-content"><Portfolio /></div>} />
          <Route path="/account" element={<div className="page-content"><Account /></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
