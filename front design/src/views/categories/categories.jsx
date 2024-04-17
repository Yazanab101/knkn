import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import styles from './categories.module.css';
export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { resName } = useParams();
localStorage.setItem('resName', resName);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/restaurant-categories/${resName}`);
        if (response.data.status === "ok") {
          setCategories(response.data.categories);
          setLoading(false);
        } else {
          setError(response.data.error || "Unknown error occurred");
          setLoading(false);
        }
      } catch (error) {
        setError(error.message || "Internal Server Error");
        setLoading(false);
      }
    };

    fetchCategories();
  }, [resName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1 className='my-5'>Categories of the Restaurant : {resName}</h1>
      <div >
        {categories.map((category, index) => (
          <Container  className={styles.card}>
<Typography className='fw-bold mb-4 text-center'>Category: {category}</Typography>
          <button className='btn-global w-100' onClick={()=>{window.location.replace(`/categories/${resName}/${category}`)}} key={index}>Show Dishes in this Category</button>
          </Container>
        ))}
      </div>
    </div>
  );
}
