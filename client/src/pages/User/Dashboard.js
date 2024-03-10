import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'

const Dashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 p-5'>
                        <div className='card p-3 '>
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

export default Dashboard
