import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useRequest from "./useRequest";

const useAuth = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const { request } = useRequest();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            request("/users/checkuser", {
                method: "get",
            }).then(({ data }) => {
                setUser(data.user);
                setAuthenticated(true);
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    async function authUser(token) {
        localStorage.setItem("token", JSON.stringify(token));
        api.defaults.headers.Authorization = `Bearer ${token}`;
        request("/users/checkuser", {
            method: "get",
        }).then(({ data }) => {
            setUser(data.user);
            setAuthenticated(true);
            setLoadingAuth(false);
            navigate("/");
        });
    }

    async function signIn(body) {
        setLoadingAuth(true);
        const response = await request("/auth/signin", {
            method: "post",
            data: body,
        });

        if (response) {
            await authUser(response.data.token);
        } else {
            setLoadingAuth(false);
        }
    }

    async function signUp(body) {
        setLoadingAuth(true);
        const response = await request("/auth/signup", {
            method: "post",
            data: body,
        });

        if (response) {
            await authUser(response.data.token);
        } else {
            setLoadingAuth(false);
        }
    }

    function signOut() {
        setAuthenticated(false);
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = undefined;
    }

    async function updateUser(body) {
        setLoadingAuth(true);
        const response = await request("/users/update", {
            method: "put",
            data: body,
        });

        if (response) {
            setUser(response.data.user);
            setLoadingAuth(false);
            navigate("/");
        } else {
            setLoadingAuth(false);
        }
    }

    async function deleteUser() {
        signOut();

        await request("/users/delete", {
            method: "delete",
        });
    }

    return {
        user,
        setUser,
        authenticated,
        loadingAuth,
        loading,
        signUp,
        signIn,
        signOut,
        updateUser,
        deleteUser,
    };
};

export default useAuth;
