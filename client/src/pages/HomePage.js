import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.js'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Checkbox } from 'antd'
import { Prices } from '../components/Prices';

const HomePage = () => {
    const [auth, setAuth] = useAuth();
    const [productlist, setProductlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState("");
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);

    const getTotalPages = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/get-count');
            if (data?.count) setTotal(data.count);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/category');
            if (data?.categories) setCategories(data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            // console.log(res.data.products);
            // setProductlist([...productlist, res.data.products]);
            setProductlist(res.data.products);
            // console.log(productlist);
        } catch (error) {
            console.log(error);
        }
    }

    const getFilteredProducts = async () => {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/product/filtered', { checked, radio });
            setProductlist(res.data.products);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     getFilteredProducts();
    //     console.log(productlist);
    //     console.log("getfiltered is being called");
    // }, [radio, checked])

    useEffect(() => {
        getAllProducts();
        getAllCategories();
        getTotalPages();
    }, [])

    useEffect(() => {
        console.log(categories);
    }, [categories])

    useEffect(() => {
        console.log(checked);
    }, [checked])

    useEffect(() => {
        console.log(radio);
    }, [radio])

    useEffect(() => {
        if (page === 1) return;
        LoadMore();
    }, [page])


    const handleCheck = async (isChecked, pid) => {
        console.log(isChecked);
        console.log(pid);
        if (isChecked) {
            setChecked([...checked, pid]);
        }
        else {
            setChecked(checked.filter(p => p !== pid))
        }
    }

    const handleRadio = async (val) => {
        setRadio(val);
        console.log(val);
    }

    const handleClear = async () => {
        window.location.reload();
    }

    const LoadMore = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/product/product-list/${page}`);
            // console.log(res.data.products);
            setProductlist([...productlist, ...res.data.products]);
            // setProductlist(res.data.products);
            // console.log(productlist);
        } catch (error) {
            console.log(error);
        }
    }

    const handleLoadMore = async (e) => {
        e.preventDefault();
        setPage(page + 1);
    }

    return (
        <Layout>
            <h1>Home page</h1>
            <p>{JSON.stringify(auth)}</p>
            <div className='row mt-3'>
                <div className='col-md-3'>
                    <div className='btn btn-danger' onClick={handleClear}>Clear filter</div><br /><br />
                    Filter by Category {
                        categories?.map((c) => {
                            return (
                                <div className="form-check m-2">
                                    <input className="form-check-input" type="checkbox" defaultValue id={c._id}
                                        key={c._id} onChange={(e) => { handleCheck(e.target.checked, e.target.id) }} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {c.slug}
                                    </label>
                                </div>

                            );

                        })
                    }
                    <div className='mt-4'>
                        Filter by Prices {
                            Prices.map(p => {
                                return (
                                    <div className='mt-2'>
                                        <input onChange={e => handleRadio(e.target.value)} className="form-check-input" type="radio" name="flexRadioDefault" id={p._id} value={p.value} />
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            {p.name}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='col-md-9'>
                    {productlist?.map((p) => {
                        return (
                            <div className='d-flex flex-wrap'>
                                <div className="card m-4" style={{ width: '18rem' }} key={p._id}>
                                    <img className="card-img-top" src={`http://localhost:8080/api/v1/product/get-productphoto/${p._id}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.slug}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">{p.price}</p>
                                        <button className="btn btn-primary" >View Details</button>
                                        <button className="btn btn-secondary m-2" >Add To Cart</button>
                                    </div>
                                </div>
                            </div>)
                    })}
                    {(productlist.length < total) ? <div className="btn btn-primary m-3" onClick={handleLoadMore}>Load More</div> : <div></div>}
                </div>
            </div>
        </Layout >
    )
}

export default HomePage
