import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import SearchInput from './SearchInput';
import axios from 'axios';


const Header = () => {
    const [auth, setAuth] = useAuth();
    const [categories, setCategories] = useState([])

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/category');
            console.log(data?.categories)
            if (data?.categories) setCategories(data?.categories);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllCategories();
        console.log('helloww')
        console.log(categories);
    }, [])

    // console.log(auth.user?.role);
    const whichDashboard = (auth.user?.role) ? "/admin/dashboard" : "/dashboard"

    const handleLogout = (e) => {
        localStorage.clear();
        setAuth({
            user: null,
            token: ""
        })
    }


    return (


        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <Link to="/" className="navbar-brand">
                            🛒 Ecommerce App
                        </Link>


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <SearchInput />
                            </li>
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link ">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <li className="nav-item dropdown">
                                    <NavLink
                                        className="nav-link dropdown-toggle"
                                        href="#"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        Category
                                    </NavLink>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <NavLink
                                                onClick={handleLogout}
                                                to="/category"
                                                className="dropdown-item"
                                            >
                                                All Categories
                                            </NavLink>
                                        </li>
                                        {
                                            categories.map(c => {
                                                const whereTo = `/category/${c.slug}`
                                                return (
                                                    <li>
                                                        <NavLink to={whereTo} className="dropdown-item">
                                                            {c.slug}
                                                        </NavLink>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </li>
                            </li>

                            {
                                (auth.user) ? (
                                    <>
                                        <li className="nav-item dropdown">
                                            <NavLink
                                                className="nav-link dropdown-toggle"
                                                href="#"
                                                role="button"
                                                data-bs-toggle="dropdown"
                                                aria-expanded="false"
                                            >
                                                {auth?.user?.name}
                                            </NavLink>
                                            <ul className="dropdown-menu">
                                                <li>
                                                    <NavLink to={whichDashboard} className="dropdown-item">
                                                        Dashboard
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        onClick={handleLogout}
                                                        to="/login"
                                                        className="dropdown-item"
                                                    >
                                                        Logout
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </li>
                                    </>
                                )
                                    : (
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/register" className="nav-link">
                                                    Register
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/login" className="nav-link">
                                                    Login
                                                </NavLink>
                                            </li>
                                        </>
                                    )
                            }
                            <li className="nav-item">
                                <NavLink to="/cart" className="nav-link">
                                    Cart (0)
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Header
