import React from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu';

const CreateCategory = () => {
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 p-5'>
                        <h1>Create Category </h1>
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default CreateCategory
