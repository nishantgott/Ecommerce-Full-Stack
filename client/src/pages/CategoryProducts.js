import React, { useEffect, useState } from 'react'
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { get } from 'mongoose';
import Layout from '../components/Layout/Layout';

const CategoryProducts = () => {
    const [products, setProducts] = useState();
    const { cat } = useParams();

    const getProducts = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/category/${cat}`)
            // console.log('jaefsd');
            setProducts(data.products);
            console.log(products);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts();
        // console.log(data);
    }, [cat])

    return (
        <Layout>
            This is the category products page {cat}
            {products?.map((p) => {
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
        </Layout>
    )
}

export default CategoryProducts
