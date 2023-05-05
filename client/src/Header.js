import {Link} from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
    const{setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response =>{
            response.json().then(userInfo => {
               setUserInfo(userInfo);
            });
        });
    }, []);
    
    function logout() {
        fetch('http://localhost:4000/logout', {
            credentials: 'include',
            method: 'POST'
    })
    setUserInfo(null);
    }
    
    const username = userInfo?.username;

    return (
        <header>
            <Link id="title" to="/" className="logo">cyBlog</Link>
            <nav>
                {username && (
                    <>
                    <Link class="links" to="/create">Create New Post</Link>
                    <a class="links" onClick={logout}>Logout</a>
                    <Link class="links" to="/aboutus">About Us</Link>
                    </>
                )}
                {!username && (
                    <>
                    <Link class="links" to="/login">Login</Link>
                    <Link class="links" to="/register">Register</Link>
                    <Link class="links" to="/aboutus">About Us</Link>
                </>
                )}
            </nav>
        </header>
    );
}