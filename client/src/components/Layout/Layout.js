import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from "react-hot-toast";

const Layout = (props) => {
    return (
        <div>
            <Header />
            <main style={{ minHeight: '85vh' }}>
                {props.children}
                <Toaster />
            </main>
            <Footer />

        </div >
    )
}

export default Layout
