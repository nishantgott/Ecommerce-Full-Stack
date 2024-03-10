import React from 'react'
import Layout from '../../components/Layout/Layout'
import { NavLink } from 'react-router-dom'
import AdminMenu from '../../components/Layout/AdminMenu'
import { useAuth } from '../../context/auth'

const AdminDashboard = () => {
    const [auth, setAuth] = useAuth();
    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9 p-5 w-50'>
                        <div className='card p-3'>
                            <h1>Name: {auth?.user?.name}</h1>
                            <h1>Email: {auth?.user?.email}</h1>
                            <h1>Phone: {auth?.user?.phone}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AdminDashboard
