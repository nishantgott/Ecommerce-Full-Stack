import React, { useEffect, useState } from 'react'
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { get } from 'mongoose';

const CategoryProducts = () => {
    const [products, setProducts] = useState();
    const params = useParams();
    const cat = params.slug;

    // const getProducts = async () => {
    //     try {
    //         const data = await axios.get(`http://localhost:8080/api/v1/product/get-product/${cat}`)
    //         console.log('jaefsd');
    //         console.log(data);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    useEffect(() => {
        // getProducts();
        // console.log(data);
    }, [])

    return (
        <div>
            This is the category products page {cat}

        </div>
    )
}

export default CategoryProducts
