// import React, { useEffect, useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import './Navbar.css';
// import logoImage from './logolayy.png';
// import cartIcon from './CartIcon.png';
// import axios from 'axios';
// import { FavoriteBorder } from '@mui/icons-material';
// import { debounce } from 'lodash';
// import { Button, Menu, MenuItem } from '@mui/material';

// const Navbar: React.FC = () => {
//     const [scrolling, setScrolling] = useState(false);
//     const [cartCount, setCartCount] = useState(0); // State to track cart count
//     const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user's login status
//     const [userRole, setUserRole] = useState(''); // State to track the role of the logged-in user
//     const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolling(window.scrollY > 50);
//         };

//         window.addEventListener('scroll', handleScroll);

//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);

//     useEffect(() => {
//         const checkUserLogin = () => {
//             const isAdmin = localStorage.getItem('isAdmin') === 'true';
//             const isOwner = localStorage.getItem('isOwner') === 'true';
//             const isClient = localStorage.getItem('isClient') === 'true';
//             const customerId = localStorage.getItem('id');
//             const loggedIn = localStorage.getItem('token') !== null;

//             if (isAdmin) {
//                 setIsLoggedIn(true);
//                 setUserRole('isAdmin');
//             } else if (isOwner) {
//                 setIsLoggedIn(true);
//                 setUserRole('isOwner');
//             } else if (isClient) {
//                 setIsLoggedIn(true);
//                 setUserRole('isClient');
//                 fetchCartDebounced(customerId); // Use the debounced version of fetchCart
//                 setupWebSocket();
//             } else {
//                 setIsLoggedIn(loggedIn); // If none of the roles, just check if logged in
//             }
//         };

//         checkUserLogin();
//     }, []);

//     const fetchCart = async (customerId: string | null) => {
//         try {
//             const response = await axios.get(`http://localhost:5002/get-cart/${customerId}`);
//             if (response.data && response.data.totalItemsCount !== undefined) {
//                 setCartCount(response.data.totalItemsCount);
//             } else {
//                 setCartCount(0);
//             }
//         } catch (error) {
//             console.error('Error fetching cart:', error);
//             setCartCount(0);
//         }
//     };

//     const fetchCartDebounced = debounce(fetchCart, 500); // Debounce the fetchCart function with a delay of 500ms

//     const setupWebSocket = () => {
//         const ws = new WebSocket('ws://localhost:8080');

//         ws.onmessage = function (event) {
//             if (event.data === 'cartUpdated') {
//                 fetchCartDebounced(localStorage.getItem('id')); // Use the debounced version of fetchCart
//             }
//         };

//         ws.onerror = function (event) {
//             console.error('WebSocket error:', event);
//         };

//         ws.onclose = function (event) {
//             console.log('WebSocket closed:', event);
//         };

//         return () => {
//             ws.close();
//         };
//     };

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('isAdmin');
//         localStorage.removeItem('isOwner');
//         localStorage.removeItem('isClient');
//         localStorage.removeItem('name');
//         alert('You have been successfully logged out.');
//         setIsLoggedIn(false);
//         setUserRole('');
//         navigate('/');
//         window.location.reload();
//     };

//     const handleLoginRedirect = (path: string, role: string) => {
//         if (isLoggedIn && userRole === role) {
//             alert('You are already signed in. Please log out before signing in as a different user.');
//         } else {
//             navigate(path);
//         }
//     };

//     const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleMenuClose = () => {
//         setAnchorEl(null);
//     };

//     return (
//         <nav className={`navbar ${scrolling ? 'scrolling' : ''}`}>
//             <div className='navbar-container' style={{ display: 'flex', maxWidth: "100%" }}>
//                 <Link to="/">
//                     <div className='logo-container'>
//                     <div className='logo'>
//                         <img src={logoImage} alt='YourLogo' />

//                     </div>
//                     <div>
//                     <h5 id='Logo2'>Order To Your Location</h5>

//                     </div>
//                     </div>
//                 </Link>

//                 <div className='user-actions'>
//                 <button className="action-btn" onClick={handleMenuClick}>Login As</button>
//                     <Menu
//                         anchorEl={anchorEl}
//                         open={Boolean(anchorEl)}
//                         onClose={handleMenuClose}
//                     >
//                         <MenuItem onClick={() => handleLoginRedirect('/login-client', 'isClient')}>Client</MenuItem>
//                         <MenuItem onClick={() => handleLoginRedirect('/login-owner', 'isOwner')}>Res-Owner</MenuItem>
//                         <MenuItem onClick={() => handleLoginRedirect('/admin-login', 'isAdmin')}>Admin</MenuItem>
//                     </Menu>
//                     <button className='action-btn' onClick={() => navigate('/contact-us')}>
//                         Contact Us
//                     </button>

//                     <Link to="/cart" className='action-btn'>
//                         <div className="cart-icon-container">
//                             <img src={cartIcon} alt="Cart" className="cart-icon" />
//                             {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
//                         </div>
//                     </Link>

//                     {isLoggedIn && (
//                         <>
//                             <Link to="/favorites" className='action-btn'>
//                                 <div className="cart-icon-container">
//                                     <FavoriteBorder />
//                                 </div>
//                             </Link>
//                             <button className='action-btn !bg-red-600' onClick={handleLogout}>
//                                 Logout
//                             </button>
//                         </>
//                     )}

//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import logoImage from './logolayy.png';
import cartIcon from './CartIcon.png';
import axios from 'axios';
import { Dashboard, Favorite, FavoriteBorder, ListAlt, Menu as MenuIcon, Money } from '@mui/icons-material';
import { debounce } from 'lodash';
import { Button, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
const Navbar: React.FC = () => {
    const [scrolling, setScrolling] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [favoriteUpdate, setFavoritesUpdated] = useState(false); // State for favorites update
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const isOwner = localStorage.getItem('isOwner') === 'true';
    const isClient = localStorage.getItem('isClient') === 'true';

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const checkUserLogin = () => {
            const customerId = localStorage.getItem('id');
            const loggedIn = localStorage.getItem('token') !== null;

            if (isAdmin) {
                setIsLoggedIn(true);
                setUserRole('isAdmin');
            } else if (isOwner) {
                setIsLoggedIn(true);
                setUserRole('isOwner');
            } else if (isClient) {
                setIsLoggedIn(true);
                setUserRole('isClient');
                fetchCartDebounced(customerId);
                setupWebSocket();
            } else {
                setIsLoggedIn(loggedIn);
            }
        };

        checkUserLogin();
    }, []);

    const fetchCart = async (customerId: string | null) => {
        try {
            const response = await axios.get(`http://localhost:5002/get-cart/${customerId}`);
            if (response.data && response.data.totalItemsCount !== undefined) {
                setCartCount(response.data.totalItemsCount);
            } else {
                setCartCount(0);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
            setCartCount(0);
        }
    };

    const fetchCartDebounced = debounce(fetchCart, 500);

    const setupWebSocket = () => {
        const ws = new WebSocket('ws://localhost:8080');

        ws.onmessage = function (event) {
            if (event.data === 'cartUpdated') {
                fetchCartDebounced(localStorage.getItem('id'));
            } else if (event.data === 'favoritesUpdated') {
                setFavoritesUpdated(true); // Set favorites updated to true
            }
        };

        ws.onerror = function (event) {
            console.error('WebSocket error:', event);
        };

        ws.onclose = function (event) {
            console.log('WebSocket closed:', event);
        };

        return () => {
            ws.close();
        };
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('isOwner');
        localStorage.removeItem('isClient');
        localStorage.removeItem('name');
        alert('You have been successfully logged out.');
        setIsLoggedIn(false);
        setUserRole('');
        navigate('/');
        window.location.reload();
    };

    const handleLoginRedirect = (path: string, role: string) => {
        if (isLoggedIn && userRole === role) {
            alert('You are already signed in. Please log out before signing in as a different user.');
        } else {
            navigate(path);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuClose = () => {
        setIsMenuOpen(false);
        setAnchorEl(null);
    };

    return (
        <>
            {/* Desktop View */}
            <nav className={`navbar desktop-view ${scrolling ? 'scrolling' : ''}`}>
                <div className='navbar-container'>
                    <Link to="/">
                        <div className='logo-container'>
                            <div className='logo'>
                                <img src={logoImage} alt='YourLogo' />
                            </div>
                            <div>
                                <h5 id='Logo2'>Order To Your Location</h5>
                            </div>
                        </div>
                    </Link>

                    <div className='user-actions'>
                        {!isLoggedIn && (
                            <button className="action-btn" onClick={(event) => setAnchorEl(event.currentTarget)}>Login As</button>
                        )}
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                        >
                            {(!isLoggedIn || !isClient) && (
                                <MenuItem onClick={() => handleLoginRedirect('/login-client', 'isClient')}>Client</MenuItem>
                            )}
                            {(!isLoggedIn || !isOwner) && (
                                <MenuItem onClick={() => handleLoginRedirect('/login-owner', 'isOwner')}>Res-Owner</MenuItem>
                            )}
                            {!isLoggedIn && (
                                <MenuItem onClick={() => handleLoginRedirect('/admin-login', 'isAdmin')}>Admin</MenuItem>
                            )}
                        </Menu>
                        <button className='action-btn' onClick={() => navigate('/contact-us')}>
                            Contact Us
                        </button>


                        {/* Conditionally render the button based on the logged-in restaurant name */}
                        {isOwner && (
                            <Link to={`/owner/${'resName'}`} className="action-btn">
                                <ListAlt />Orders                            </Link>
                        )}



                        <Link to="/cart" className='action-btn'>
                            <div className="cart-icon-container">
                                <img src={cartIcon} alt="Cart" className="cart-icon" />
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}

                            </div>
                        </Link>

                        {isLoggedIn && (
                            <>

                                <Link to="/favorites" className='action-btn'>
                                    <div className={`cart-icon-container ${favoriteUpdate ? 'text-red-600' : ''}`}>
                                        {favoriteUpdate ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder style={{ color: 'black' }} />}
                                        Favorite
                                    </div>
                                </Link>

                                {isLoggedIn && (isAdmin || isOwner) && (
                                    <Link to="/finance" className='action-btn'>
                                        <div className={`cart-icon-container}`}>
                                            <Money />Finance
                                        </div>
                                    </Link>
                                )}
                                {isLoggedIn && isAdmin && (
                                    <Link to="/admin-dashboard" className='action-btn'>
                                        <div className={`cart-icon-container}`}>
                                            <Dashboard className="w-6 h-6" />
                                            Dashboard
                                        </div>
                                    </Link>
                                )}


                                <button className='action-btn' onClick={handleLogout}>
                                    Logout
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Mobile View */}
            <nav className={`navbar mobile-view ${scrolling ? 'scrolling' : ''}`}>
                {/* Mobile content */}
                <div className='navbar-container'>
                    <Link to="/">
                        <div className='logo-container'>
                            <div className='logo'>
                                <img src={logoImage} alt='YourLogo' />
                            </div>
                            <div>
                                <h5 id='Logo2'>Order To Your Location</h5>
                            </div>
                        </div>
                    </Link>

                    <div className='user-actions'>
                        {isLoggedIn && (
                            <div className='flex space-x-4'>

                                <Link to="/favorites" className='action-btn'>
                                    <div className={`cart-icon-container ${favoriteUpdate ? 'text-red-600' : ''}`}>
                                        {favoriteUpdate ? <Favorite style={{ color: 'red' }} /> : <FavoriteBorder style={{ color: 'black' }} />}
                                    </div>
                                </Link>



                                <Link to="/cart" className='action-btn'>
                                    <div className="cart-icon-container">
                                        <img src={cartIcon} alt="Cart" className="cart-icon" />
                                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                                    </div>
                                </Link>
                            </div>
                        )}
                        <IconButton className="menu-icon" onClick={toggleMenu}>
                            <MenuIcon />
                        </IconButton>
                        <Drawer anchor="right" open={isMenuOpen} onClose={toggleMenu}>
                            <h3 id='SideTextNav'>Layla</h3>


                            <div className="mobile-menu mt-4 bg-white p-4">
                                {!isLoggedIn && !isAdmin && (
                                    <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => handleLoginRedirect('/admin-login', 'isAdmin')}>
                                        Admin
                                    </MenuItem>
                                )}
                                {!isLoggedIn && !isClient && (
                                    <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => handleLoginRedirect('/login-client', 'isClient')}>
                                        Client
                                    </MenuItem>
                                )}
                                {!isLoggedIn && !isOwner && (
                                    <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => handleLoginRedirect('/login-owner', 'isOwner')}>
                                        Res-Owner
                                    </MenuItem>
                                )}
                                {isLoggedIn && (isAdmin || isOwner) && (
                                    <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => navigate('/finance')}>
                                        Finance
                                    </MenuItem>
                                )}
                                {isOwner && (
                                    <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => navigate(`/owner/${'resName'}`)}>
                                        Orders
                                    </MenuItem>
                                )}
                                <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={() => navigate('/contact-us')}>
                                    Contact Us
                                </MenuItem>
                                {isLoggedIn && (
                                    <>
                                        <MenuItem className="py-2 px-4 hover:bg-gray-200" onClick={handleLogout}>
                                            Logout
                                        </MenuItem>
                                    </>
                                )}
                            </div>
                        </Drawer>

                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
