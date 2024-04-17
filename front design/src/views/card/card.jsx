// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FavoriteBorder, Favorite } from '@mui/icons-material';

// export default function Card({ product }) {
//   const { picture, restaurantName, location } = product;

//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
//   const [isRemovingFromFavorites, setIsRemovingFromFavorites] = useState(false);
//   const id = localStorage.getItem('id');

//   useEffect(() => {
//     const fetchFavorites = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5002/favorites/${id}`);
//         const favorites = response.data.map(favorite => favorite.restaurantName);
//         setIsFavorite(favorites.includes(restaurantName));
//       } catch (error) {
//         console.error('Error fetching favorites:', error);
//       }
//     };

//     fetchFavorites();
//   }, [restaurantName]);

//   const addToFavorites = async () => {
//     try {
//       setIsAddingToFavorites(true);
//       await axios.post(`http://localhost:5002/add-to-favorites/${id}`, { restaurantName });
//       setIsFavorite(true);
//       alert('Restaurant added to favorites successfully');
//     } catch (error) {
//       console.error('Error adding restaurant to favorites:', error);
//       alert('Failed to add restaurant to favorites');
//     } finally {
//       setIsAddingToFavorites(false);
//     }
//   };

//   const removeFromFavorites = async () => {
//     try {
//       setIsRemovingFromFavorites(true);
//       await axios.delete(`http://localhost:5002/remove-from-favorites/${id}`, { data: { restaurantName } });
//       setIsFavorite(false);
//       alert('Restaurant removed from favorites successfully');
//     } catch (error) {
//       console.error('Error removing restaurant from favorites:', error);
//       alert('Failed to remove restaurant from favorites');
//     } finally {
//       setIsRemovingFromFavorites(false);
//     }
//   };

//   const handleShowCategories = () => {
//     window.location.replace(`/categories/${restaurantName}`);
//   };

//   const handleEdit = () => {
//     window.location.replace(`/edit/${restaurantName}`);
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5002/delete-restaurant/${restaurantName}`);
//       alert('Restaurant deleted successfully');
//       window.location.replace('/');
//     } catch (error) {
//       console.error('Error deleting restaurant:', error);
//       alert('Failed to delete restaurant');
//     }
//   };

//   const isAdmin = localStorage.getItem('isAdmin') === 'true';
//   const isOwner = localStorage.getItem('isOwner') === 'true';
//   const isClient = localStorage.getItem('isClient') === 'true';

//   return (
//     <div className="flex bg-white rounded-xl items-center justify-center shadow-lg overflow-hidden mt-4">
//       <div className="w-full">
//         <div>
//           <img className="w-screen h-[20vh]  lg:h-[38vh] flex" src={picture} alt={restaurantName} />
//         </div>
//         <div className="col-span-2 p-8">
//           <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{restaurantName}</div>
//           <p className="mt-2 grid grid-cols-1 text-gray-500">{location}</p>
//           {isClient && (
//             <button
//               className={`btn-global ${isAddingToFavorites || isRemovingFromFavorites ? 'opacity-50 cursor-not-allowed' : ''} mt-2`}
//               onClick={isFavorite ? removeFromFavorites : addToFavorites}
//               disabled={isAddingToFavorites || isRemovingFromFavorites}
//             >
//               {isAddingToFavorites ? 'Adding to Favorites...' : isRemovingFromFavorites ? 'Removing from Favorites...' : (
//                 isFavorite ? <Favorite className="text-red-500" /> : <FavoriteBorder className="text-gray-500" />
//               )}
//             </button>
//           )}
//           <button className="btn-global mt-2" onClick={handleShowCategories}>Show Categories</button>
//           {isAdmin && (
//             <>
//               <button className="btn-global mt-4" onClick={handleEdit}>Edit</button>
//               <button className="btn-global mt-2" onClick={handleDelete}>Delete</button>
//             </>
//           )}
//           {isOwner && (
//             <button className="btn-global mt-4" onClick={handleEdit}>Edit</button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

export default function Card({ product }) {
  const { picture, restaurantName, location } = product;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isAddingToFavorites, setIsAddingToFavorites] = useState(false);
  const [isRemovingFromFavorites, setIsRemovingFromFavorites] = useState(false);
  const id = localStorage.getItem('id');

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`http://localhost:5002/favorites/${id}`);
        const favorites = response.data.map(favorite => favorite.restaurantName);
        setIsFavorite(favorites.includes(restaurantName));
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [restaurantName]);

  const addToFavorites = async () => {
    try {
      setIsAddingToFavorites(true);
      await axios.post(`http://localhost:5002/add-to-favorites/${id}`, { restaurantName });
      setIsFavorite(true);
      alert('Restaurant added to favorites successfully');
    } catch (error) {
      console.error('Error adding restaurant to favorites:', error);
      alert('Failed to add restaurant to favorites');
    } finally {
      setIsAddingToFavorites(false);
    }
  };

  const removeFromFavorites = async () => {
    try {
      setIsRemovingFromFavorites(true);
      await axios.delete(`http://localhost:5002/remove-from-favorites/${id}`, { data: { restaurantName } });
      setIsFavorite(false);
      alert('Restaurant removed from favorites successfully');
    } catch (error) {
      console.error('Error removing restaurant from favorites:', error);
      alert('Failed to remove restaurant from favorites');
    } finally {
      setIsRemovingFromFavorites(false);
    }
  };

  const handleShowCategories = () => {
    window.location.replace(`/categories/${restaurantName}`);
  };

  const handleEdit = () => {
    window.location.replace(`/edit/${restaurantName}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5002/delete-restaurant/${restaurantName}`);
      alert('Restaurant deleted successfully');
      window.location.replace('/');
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      alert('Failed to delete restaurant');
    }
  };

  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const isOwner = localStorage.getItem('isOwner') === 'true';
  const isClient = localStorage.getItem('isClient') === 'true';

  return (
    <div className="flex bg-white rounded-xl items-center justify-center shadow-lg overflow-hidden mt-4">
      <div className="max-w-screen max-h-screen">
        <div className='grid'>
          <img className='object-cover w-full h-[30vh]' src={picture} alt={restaurantName} />
        </div>


        <div className="grid justify-center items-center col-span-2 p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{restaurantName}</div>
          <p className="mt-2 grid grid-cols-1 text-gray-500">Location: {location}</p>
          {isClient && (
            <button
              className={`btn-global ${isAddingToFavorites || isRemovingFromFavorites ? 'opacity-50 cursor-not-allowed' : ''} mt-2`}
              onClick={isFavorite ? removeFromFavorites : addToFavorites}
              disabled={isAddingToFavorites || isRemovingFromFavorites}
            >
              {isAddingToFavorites ? 'Adding to Favorites...' : isRemovingFromFavorites ? 'Removing from Favorites...' : (
                isFavorite ? <Favorite className="text-red-500" /> : <FavoriteBorder className="text-white-500" />
              )}
            </button>
          )}
          <button className="btn-global mt-2" onClick={handleShowCategories}>Show Categories</button>
          {isAdmin && (
            <>
              <button className="btn-global mt-4" onClick={handleEdit}>Edit</button>
              <button className="btn-global mt-2" onClick={handleDelete}>Delete</button>
            </>
          )}
          {isOwner && (
            <button className="btn-global mt-4" onClick={handleEdit}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

