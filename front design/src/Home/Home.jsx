import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../views/card/card';
import styles from './Home.module.css';
import { Button, Typography, TextField } from '@mui/material'; // Import TextField component
import './Home.module.css';
import { red } from '@mui/material/colors';

const HomeComponent = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [isOwner, setIsOwner] = useState();
  const [user, setUser] = useState(null); // State to store user information
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const token = localStorage.getItem('token');
  const id = localStorage.getItem('id');
  const resName = localStorage.getItem('resName');
  const name = localStorage.getItem('name');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const isClient = localStorage.getItem('isClient');
        const isAdmin = localStorage.getItem('isAdmin');
        const Owner = localStorage.getItem('isOwner');
        let endpoint = 'http://localhost:5002/get-restaurants';
        let headers = {};
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
        if (Owner && !isClient && !isAdmin && resName) {
          endpoint = `http://localhost:5002/get-one-res/${resName}`;
          setIsOwner(Owner === "true");
        }

        const response = await axios.get(endpoint, { headers });
        setProducts(response.data.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [isOwner, name]);

  const handleOrder = () => {
    window.location.replace('/orders');
  }

  const handleOwnerOrder = () => {
    window.location.replace(`/owner/${resName}`);
  }

  const filteredProducts = products && products.length > 0
  ? products.filter(product =>
      product.restaurantName && product.restaurantName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];



  return (
    <div>
      <img src="https://beyondtype1.org/wp-content/uploads/2023/01/FAST-FOOD-CHAIN-NUTRITION-GUIDE-HEADER.jpg" alt="Header" className={styles.headerImage} />
      <div className={`${styles.p4}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2>Restaurant Area</h2>
        {(localStorage.getItem('isClient') === 'true' || localStorage.getItem('isAdmin') === 'true') && (
          <TextField
            placeholder="Search by restaurant name"
            value={searchTerm}
            type='search'
            variant='outlined'
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-[30vw] mb-4'
          />
        )}
        {isOwner && (
          <>
            {/* Display user's name */}
            <Typography  variant="h5" component="h1" gutterBottom>
              Welcome Back: {name ? name : ''}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleOwnerOrder}>
              View Orders
            </Button>
          </>
        )}
        {localStorage.getItem('isAdmin') === 'true' &&(
           <Typography className='' variant="h5" component="h1" gutterBottom>
           Welcome Back: Admin 
         </Typography>
        )

        }
        {localStorage.getItem('isClient') === 'true' && (
          <>
            <Button
              className={`Btn2 ${isOwner ? 'newCssClass' : ''}`}
              onClick={handleOrder}
              sx={{
                backgroundColor: '#87cefa',
                color: '#000',
                '&:hover': {
                  backgroundColor: '#add8e6',
                  fontWeight: 'bold',
                },
                fontWeight: 'bold',
              }}
            >
              My Orders
            </Button>
            {/* Display user's name */}
            <Typography className='' variant="h5" component="h1" gutterBottom>
              Welcome Back: {name ? name : ''}
            </Typography>
          </>
        )}
        <div className={styles.containerr}>
          {loading ? (
            <div className={styles.loading}>Loading . . . . </div>
          ) : (
            isOwner ? (
              <>
                <Card key={products._id} product={products}/>
              </>
            ) : (
              searchTerm === '' ? (
                products.map((product, index) => (
                  <Card key={index} product={product}/>
                ))
              ) : (
                filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <Card key={index} product={product}/>
                  ))
                ) : (
                  <Typography variant="body1">No restaurants found for "{searchTerm}"</Typography>
                )
              )
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;
