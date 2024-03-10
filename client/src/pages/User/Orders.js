import React from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'

const Orders = () => {
    return (
        <Layout>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3 p-5'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 p-5'>
                        <h1>Orders page</h1>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders
