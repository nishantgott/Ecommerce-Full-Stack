import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <div>
            <div class="list-group">
                <NavLink to="/dashboard/profile" class="list-group-item list-group-item-action m-1">Profile</NavLink>
                <NavLink to="/dashboard/orders" class="list-group-item list-group-item-action m-1">Orders</NavLink>
            </div>
        </div>
    )
}

export default UserMenu
