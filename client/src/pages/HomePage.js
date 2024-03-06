import React from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth.js'

const HomePage = () => {
    const [auth, setAuth] = useAuth();

    return (
        <Layout>
            <h1>Home page</h1>
            <p>{JSON.stringify(auth)}</p>
        </Layout>
    )
}

export default HomePage
