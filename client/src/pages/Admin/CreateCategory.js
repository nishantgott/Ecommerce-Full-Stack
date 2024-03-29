import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/Layout/CategoryForm';

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(name);
            const { data } = await axios.post('http://localhost:8080/api/v1/category/create-category', { name });
            setName("");
            getAllCategories();
            toast.success(`Category ${name} has been created`);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (pid) => {
        try {
            console.log(name);
            const { data } = await axios.get(`http://localhost:8080/api/v1/category/delete-category/${pid}`);
            getAllCategories();
            toast.success(`Category ${name} has been deleted`);
        } catch (error) {
            console.log(error);
        }
    }

    const getAllCategories = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/category/category');
            console.log(data);
            if (data?.categories) setCategories(data.categories);
        } catch (error) {
            console.log(error);
            toast('something went wrong');
        }
    }

    //This pattern is commonly used for performing one-time initialization tasks, like fetching data from an API when the component mounts.
    useEffect(() => {
        getAllCategories()
    }, []);

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 p-5'>
                        <h1>Manage Categories</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Slug</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.map(c =>
                                    (
                                        <tr key={c._id} >
                                            <td>{c.slug}</td>
                                            <td>{c.name}</td>
                                            <td><button className='btn btn-danger ms-2' onClick={() => handleDelete(c._id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>

                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName} />

                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
