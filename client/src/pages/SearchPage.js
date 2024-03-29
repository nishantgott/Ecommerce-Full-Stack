import React from 'react'
import { useSearch } from '../context/search'
import Layout from '../components/Layout/Layout'

const SearchPage = () => {
    const [values, setValues] = useSearch();

    return (
        <Layout>
            <div>
                <h1>Search Page</h1>
                {(values.results?.length < 1) ? "No results found" : `${values.results.length} results found`}
                {values.results?.map((p) => {
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
            </div>
        </Layout>
    )
}

export default SearchPage
