// import React, { useState } from 'react';
// import axios from 'axios';
// import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';

// const Finance = () => {
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [completedOrders, setCompletedOrders] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(null);
//   const [error, setError] = useState(null);

//   const handleFetchCompletedOrders = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5002/api/orders/completed?startDate=${startDate}&endDate=${endDate}`);
//       setCompletedOrders(response.data);
//       setTotalRevenue(null); // Reset total revenue when fetching new data
//       if (response.data.length === 0) {
//         setError('No completed orders found in this date range.');
//       } else {
//         setError(null);
//       }
//     } catch (err) {
//       console.error('Error fetching completed orders:', err);
//       setError('Failed to fetch completed orders. Please try again later.');
//     }
//   };

//   const handleCalculateRevenue = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5002/api/revenue?startDate=${startDate}&endDate=${endDate}`);
//       setTotalRevenue(response.data.totalRevenue);
//       setCompletedOrders([]); // Reset completed orders when calculating revenue
//       if (response.data.totalRevenue === 0 || response.data.totalRevenue === undefined) {
//         setError('No revenue found in this date range.');
//       } else {
//         setError(null);
//       }
//     } catch (err) {
//       console.error('Error calculating total revenue:', err);
//       setError('Failed to calculate total revenue. Please try again later.');
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleString(); // Convert to local time format
//   };

//   return (
//     <Box className='flex items-center text-center justify-center mt-4'>
//       <Grid container spacing={2} justifyContent="center">
//         <Grid item xs={12}>
//           <Typography variant="h4" gutterBottom>
//             Finance Dashboard
//           </Typography>
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="Start Date"
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             fullWidth
//             className="mb-4"
//           />
//         </Grid>
//         <Grid item xs={6}>
//           <TextField
//             label="End Date"
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             fullWidth
//             className="mb-4"
//           />
//         </Grid>
//         <Grid item xs={12} className='space-x-2'>
//           <Button variant="contained" onClick={handleFetchCompletedOrders} className="mb-2">
//             Fetch Completed Orders
//           </Button>
//           <Button variant="contained" onClick={handleCalculateRevenue} className="mb-2 ml-2">
//             Calculate Revenue
//           </Button>
//         </Grid>
//         <Grid item xs={12}>
//           {error && <Typography color="error">{error}</Typography>}
//         </Grid>
//         {completedOrders.length > 0 && (
//           <Grid item xs={12}>
//             <Typography variant="h5" gutterBottom>
//               Completed Orders
//             </Typography>
//             {completedOrders.map((order) => (
//               <Card key={order._id} className="mb-2">
//                 <CardContent>
//                   {order.products.map((product) => (
//                     <div key={product._id} className="p-4 bg-gray-100 rounded-lg">
//                       <Typography variant="body2">
//                         Order ID: {order.orderId}<br />
//                         Restaurant Name: {order.resName}<br />
//                         Name: {product.name}<br />
//                         Quantity: {product.quantity}<br />
//                         Price: {product.price}<br />
//                         Extras: {product.extras && product.extras.length > 0 ? product.extras.map(extra => extra.name).join(', ') : 'None'}<br />
//                         Extras Price: {product.extras && product.extras.length > 0 ? product.extras.map(extra => extra.price).join(', ') : 'None'}<br />
//                         Status: {order.status ? order.status : 'No Status Yet'}<br />
//                         Ordered At: {formatDate(order.orderTime)}<br />

//                       </Typography>
//                     </div>
//                   ))}
//                 </CardContent>
//               </Card>
//             ))}
//           </Grid>
//         )}
//         {totalRevenue !== null && (
//           <Grid item xs={12}>
//             <Typography variant="h5" gutterBottom>
//               {totalRevenue}
//             </Typography>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default Finance;


import React, { useState } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Card, CardContent, Grid } from '@mui/material';

const Finance = () => {
  const [restaurantName, setRestaurantName] = useState('');
  const [completedOrders, setCompletedOrders] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(null);
  const [showCalculateRevenue, setshowCalculateRevenue] = useState(null);
  const [error, setError] = useState(null);
  const [rejected, setrejected] = useState(null);
  const [displayedOrder, setDisplayedOrder] = useState(null);
  const [currentPeriod, setCurrentPeriod] = useState(null);
  const isOwner = localStorage.getItem('isOwner') === 'true';
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const resName = localStorage.getItem('resName');
  const periods = ['today', 'yesterday', 'lastWeek', 'lastMonth', 'lastTwoMonths'];
  const [showDetails, setShowDetails] = useState(false);


  const handlePeriodButtonClick = async (period) => {
    try {
      const response = await axios.post(`http://localhost:5002/api/orders/completed`, { period, restaurantName: isOwner ? resName : restaurantName });
      setCompletedOrders(response.data);
      setDisplayedOrder(true); // Clear displayed order
      setTotalRevenue(null); // Reset total revenue when fetching new data
      setshowCalculateRevenue(true);
      setrejected(null);
      setShowDetails(null);
      setCurrentPeriod(period); // Set the current period
      setError(response.data.length === 0 ? `No completed orders found in the ${period} period.` : null);
      if (response.data.length === 0) {
        setshowCalculateRevenue(null);
      }
    } catch (err) {
      console.error('Error fetching completed orders:', err);
      setError('Failed to fetch completed orders. Please try again later.');
    }
  };

  const handleCalculateRevenue = async () => {
    try {
      const response = await axios.post(`http://localhost:5002/api/revenue`, { period: currentPeriod, restaurantName: isOwner ? resName : restaurantName });
      setTotalRevenue(response.data.totalRevenue);
      setError(response.data.totalRevenue === 0 || response.data.totalRevenue === undefined ? 'No revenue found in this date range.' : null);
      setshowCalculateRevenue(null);
    } catch (err) {
      console.error('Error calculating total revenue:', err);
      setError('Failed to calculate total revenue. Please try again later.');
    }
  };


  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const handleRejectedOrders = async () => {
    try {
      const response = await axios.post(`http://localhost:5002/api/orders/rejected`, { period: currentPeriod, restaurantName: isOwner ? resName : restaurantName });
      setCompletedOrders(response.data);
      setshowCalculateRevenue(null);
      setrejected(true);
      setShowDetails(null);
      setError(response.data.length === 0 ? `No rejected orders found in the ${currentPeriod} period.` : null);
    } catch (err) {
      console.error('Error fetching rejected orders:', err);
      setError('Failed to fetch rejected orders. Please try again later.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString(); // Convert to local time format
  };

  return (
    <Box className='flex items-center text-center justify-center mt-4'>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Finance Dashboard
          </Typography>
          {currentPeriod && (
            // <div className='flex md:absolute md:left-2 '>
            <Button variant="contained" onClick={handleRejectedOrders} className="mb-2">
              Show Rejected Orders for {currentPeriod}
            </Button>
            // </div>
          )}
        </Grid>
        {isOwner ? null : (
          <Grid item xs={4}>
            <TextField
              placeholder="Restaurant Name"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              fullWidth
              className="mb-4 mt-10"
            />
          </Grid>
        )}
        <div className='flex flex-col md:absolute md:mt-[10vh] md:right-2 items-end justify-end'>
          {periods.map(period => (
            <React.Fragment key={period}>
              <Button variant="contained" onClick={() => handlePeriodButtonClick(period)} className="mb-2">
                Filter for {period}
              </Button>
            </React.Fragment>
          ))}
        </div>

        <Grid item xs={12}>
          {error && <Typography color="error">{error}</Typography>}
        </Grid>
        {completedOrders.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {rejected ? 'Declined Orders' : 'Completed Orders'}
            </Typography>
            {completedOrders.map((order) => (
              <Card key={order._id} className="mb-2">
                <CardContent>
                  {order.products.map((product) => (
                    <div key={product._id} className="p-4 bg-gray-100 rounded-lg">
                      <Typography variant="body2">
                        Order ID: {order.orderId}<br />
                        Restaurant Name: {order.resName}<br />
                        Price: {product.price}₪<br />
                        {showDetails && (
                          <>
                            Name: {product.name}<br />
                            Quantity: {product.quantity}<br />
                            Extras: {product.extras && product.extras.length > 0 ? product.extras.map(extra => extra.name).join(', ') : 'None'}<br />
                            Extras Price: {product.extras && product.extras.length > 0 ? product.extras.map(extra => extra.price).join(', ') : 'None'}<br />
                            Status: {order.status ? order.status : 'No Status Yet'}<br />
                            {rejected ? `Declined At: ${formatDate(order.declinedAt)}` : `Ordered At: ${formatDate(order.orderTime)}`}<br />
                          </>
                        )}
                      </Typography>
                      <Button onClick={toggleDetails} variant="contained" className='mt-2'>
                        {showDetails ? 'Show Less' : 'Show More'}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </Grid>
        )}
        {showCalculateRevenue && (
          <Button variant="contained" onClick={handleCalculateRevenue} className="mb-2 ml-2">
            Calculate Revenue
          </Button>
        )}
        {totalRevenue !== null && displayedOrder && !rejected && (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Total Revenue is: {totalRevenue} ₪
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Finance;

