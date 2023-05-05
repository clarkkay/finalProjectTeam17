import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState(null);
    const { id } = useParams();
    const { userInfo } = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:4000/post/' + id).then(response => {
            response.json().then(postInfo => {
                setPostInfo(postInfo);
                
            });
        });
    }, [])
    if (!postInfo) return '';
    return (
        <div class="post-page">
            <h1>{postInfo.title}</h1>
            <time>{format(new Date(postInfo.createdAt), 'MMM d, yyyy HH:mm')}</time>
            <div className="author">by @{postInfo.author.username}</div>
            {userInfo.id === postInfo.author._id && (
                <div class="edit-row">
                    <Link class="edit-btn" to={'/edit/' + postInfo._id}>Edit</Link>
                </div>
            )}
            <div class="image">
                <img src={'http://localhost:4000/' + postInfo.cover} alt="" />
            </div>
            <div class="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
        </div>
    );
}