import React, { useEffect, useState } from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios';
import { set } from 'mongoose';
import { useNavigate } from 'react-router-dom';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const [searchText, setSearchText] = useState("");
    const navigate = useNavigate();


    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/product/search/${searchText}`);
            // console.log(data);
            setValues({ keyword: searchText, results: data });
            navigate('/search');
        } catch (error) {
            console.log(error);
        }
    }

    const handleSearchChange = async (e) => {
        setSearchText(e.target.value);
    }

    useEffect(() => {
        console.log(values);
    }, [values])

    return (
        <div>
            <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearchChange} value={searchText} />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={handleSearch} >Search</button>
            </form>
        </div>
    )
}

export default SearchInput
