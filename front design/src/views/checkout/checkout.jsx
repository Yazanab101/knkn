import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import axios from 'axios';
import CustomModal from '../modal/modal';

const Checkout = () => {

  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [status, setStatus] = useState('');
  const resName = localStorage.getItem('resName');
  const customerId = localStorage.getItem('id');
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber1: '',
    phoneNumber2: ''
  });
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/get-cart/${customerId}`);
        setCart(response.data.cart);
        setProducts(response.data.cart.products);
      }


      catch (error) {
        // Inside the catch block of your fetchCart function
        console.error('Error fetching cart:', error);
        setError(error.response ? error.response.data : error.message);
        setLoading(false); // Set loading to false in case of error

      }
    };

    fetchCart();
  }, []);

  useEffect(() => {
    const fetchDishDetails = async () => {
      if (cart) {
        try {
          const productsWithDetails = await Promise.all(cart.products.map(async (product) => {
            const response = await axios.get(`http://localhost:5002/dishes/${product.productId}`);
            return { ...product, dishDetails: response.data.data };
          }));
          setCart(prevCart => ({ ...prevCart, products: productsWithDetails }));
        } catch (error) {
          setError(error);
        }
      }
    };

    fetchDishDetails();
  }, [cart]);

  if (error) {
    return <div><p style={{ color: 'red' }}>Error: {JSON.stringify(error.error)}</p></div>;
  }

  if (!cart) {
    return <div>Loading...</div>;
  }


  const calculateTotalPrice = () => {
    let totalPrice = 0;
    if (cart && cart.products) {
      cart.products.forEach((product) => {
        if (product.dishDetails && product.dishDetails.price) {
          totalPrice += product.quantity * product.dishDetails.price;
        }
        if (product.dishDetails && product.dishDetails.extras && product.dishDetails.extras.length > 0) {
          product.dishDetails.extras.forEach((extra) => {
            if (extra.price) {
              totalPrice += extra.price * product.quantity;
            }
          });
        }
      });
    }
    return totalPrice;
  };


  const handleQuantityChange = (productId, action) => {
    const updatedCart = { ...cart };
    const productIndex = updatedCart.products.findIndex(product => product._id === productId);

    if (action === 'increment') {
      updatedCart.products[productIndex].quantity++;
    } else if (action === 'decrement') {
      updatedCart.products[productIndex].quantity--;
      if (updatedCart.products[productIndex].quantity < 1) {
        updatedCart.products[productIndex].quantity = 1; // Ensure quantity doesn't go below 1
      }
    }

    setCart(updatedCart);
  };





  const handleClose = () => { setOpen(false) }

  const handleCreateOrder = async () => {
    try {
      const orderData = {
        products: products,
        status: status,
        shippingInfo: shippingInfo,
        resName: resName
      };

      const response = await axios.post(`http://localhost:5002/create-order/${customerId}`, orderData);
      console.log('Order created successfully:', response.data.order);
      console.log('Order created successfully');
      localStorage.removeItem('resName');
      setOpen(true);

      // Optionally, you can reset the form fields here
    } catch (error) {
      console.error('Error creating order:', error.message);
    }
  };



  if (localStorage.getItem('token') == null) {
    return <>

      <Typography className='text-dark fw-bold mr-5 p-5'>Please login first to be able to place an order</Typography>
      <Button onClick={() => { window.location.replace('/login-client') }} className='btn-global w-50 text-light m-3'>Login now</Button></>


  }
  else {
    return (
      <><h1>Delivery Info</h1><Grid sx={{ p: 6 }} container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={shippingInfo.name}
            onChange={(e) => {
              const newName = e.target.value;
              if (newName.length <= 20) {
                setShippingInfo({ ...shippingInfo, name: newName });
              }
            }}
            onBlur={() => {
              if (shippingInfo.name.length < 3) {
                alert("The username must be between 3 and 20 characters.");
              }
            }}
            required />

        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={shippingInfo.email}
            onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
            required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={shippingInfo.address}
            onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
            required />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            value={shippingInfo.phoneNumber1}
            onChange={(e) => {
              const newPhoneNumber = e.target.value;
              if (/^\d{0,10}$/.test(newPhoneNumber)) {
                setShippingInfo({ ...shippingInfo, phoneNumber1: newPhoneNumber });
              } else {
                alert("Please enter numbers only for the phone number 10 numbers max.");
              }
            }}
            required />


        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number 2 is optional"
            variant="outlined"
            fullWidth
            value={shippingInfo.phoneNumber2}
            onChange={(e) => {
              const newPhoneNumber = e.target.value;
              if (/^\d*$/.test(newPhoneNumber) || newPhoneNumber === "") {
                setShippingInfo({ ...shippingInfo, phoneNumber2: newPhoneNumber });
              } else {
                alert("Please enter numbers only for the phone number.");
              }
            }} />
        </Grid>
        <Grid item xs={12}>
          <Button className='btn-global' variant="contained" color="primary" onClick={handleCreateOrder}>
            Create Order
          </Button>
          <CustomModal handleClose={handleClose} open={open} body={<div>
            <Typography className='text-center fs-4'>Order created successfully</Typography> <p>In This Time We Accept Cash Only</p>
            <Button onClick={() => { window.location.replace('/'); }} className='btn-global fs-5 w-100 mt-5 text-light'>Continue Shopping </Button>
          </div>} />
        </Grid>
      </Grid></>
    );
  }
};

export default Checkout;
