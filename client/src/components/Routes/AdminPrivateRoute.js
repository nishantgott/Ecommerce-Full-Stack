import axios from "axios";
import { useAuth } from "../../context/auth";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function AdminPrivateRoute() {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);

    const checkAdmin = async () => {
        const res = await axios.get("http://localhost:8080/api/v1/auth/auth-checkadmin", {
            headers: {
                "Authorization": auth.token
            }
        });
        if (res.data.ok === true) setOk(true);
        console.log(auth.user);
    }

    if (auth?.token) checkAdmin();

    return ok ? <Outlet /> : <Spinner />
}