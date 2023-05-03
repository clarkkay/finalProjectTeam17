import {Link} from "react-router-dom";
import { useEffect } from "react";

export default function Header() {
    const[username, setUsername] = useState(null);
    useEffect(() => {
        fetch('http://localhost:4000/profile', {
            credentials: 'include',
        }).then(response =>{
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            });
        });
    }, []);
    return (
        <header>
            <Link to="/" className="logo">Final Project 17</Link>
            <nav>
                {username && (
                    <>
                    <Link to="/create">Create New Post</Link>
                    <a>Logout</a>
                    </>
                )}
                {!username && (
                    <>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                    <Link to="/aboutus">About Us</Link>
                </>
                )}
            </nav>
        </header>
    );
}