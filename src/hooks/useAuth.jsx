import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import useRequest from "./useRequest";

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { request } = useRequest();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      request("/users/check-user", {
        method: "get",
      }).then(({ data }) => {
        setUser(data.user);
        setAuthenticated(true);
      });
    }
  }, []);

  async function authUser(token) {
    localStorage.setItem("token", JSON.stringify(token));
    api.defaults.headers.Authorization = `Bearer ${token}`;
    request("/users/check-user", {
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
    const response = await request("/auth/sign-in", {
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
    const response = await request("/auth/sign-up", {
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

  return { user, setUser, authenticated, loadingAuth, signUp, signIn, signOut };
};

export default useAuth;
