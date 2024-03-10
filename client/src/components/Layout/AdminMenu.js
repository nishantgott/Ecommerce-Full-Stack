import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
    return (
        <div>
            <div class="list-group">
                <NavLink to="/admin/dashboard/create-category" class="list-group-item list-group-item-action m-1">Create Category</NavLink>
                <NavLink to="/admin/dashboard/create-product" class="list-group-item list-group-item-action m-1">Create Product</NavLink>
                <NavLink to="/admin/dashboard/users" class="list-group-item list-group-item-action m-1">Users</NavLink>
            </div>
        </div>
    )
}

export default AdminMenu
