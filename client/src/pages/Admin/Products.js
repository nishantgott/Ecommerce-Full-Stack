import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'

const Products = () => {
    const [productlist, setProductlist] = useState([]);

    const handleDelete = async (pid) => {
        try {
            console.log("Product deleted");
            const deleted_product = await axios.delete(`http://localhost:8080/api/v1/product/delete-product/${pid}`);
            getAllProducts();
        } catch (error) {
            console.log(error)
        }
    }



    const getAllProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/product/all');
            // console.log(res.data.products);
            setProductlist(res.data.products);
            // console.log(productlist);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])

    useEffect(() => {
        console.log(productlist);
    }, [productlist])


    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 p-5'>
                        <h1>Products</h1>
                        {productlist?.map((p) => {
                            return (
                                <div className="card m-4" style={{ width: '18rem' }} key={p._id}>
                                    <img className="card-img-top" src={`http://localhost:8080/api/v1/product/get-productphoto/${p._id}`} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.slug}</h5>
                                        <p className="card-text">{p.description}</p>
                                        <p className="card-text">{p.price}</p>
                                        <a className="btn btn-danger" onClick={() => handleDelete(p._id)} >Delete</a>
                                    </div>
                                </div>)
                        })}

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Products
