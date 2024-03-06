import React from 'react'
import Layout from '../components/Layout/Layout'

const PageNotFound = () => {
    return (
        <Layout>
            <div class="error-container">
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <a href="/">Go Back to Home</a>
            </div>
        </Layout>
    )
}

export default PageNotFound
