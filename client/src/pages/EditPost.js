import { useState, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import Editor from "./Editor";


export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [newRedirect, setNewRedirect] = useState(false);

    useEffect(() => {
        fetch('http://127.0.0.1:4000/post/' + id).then(response => {
            response.json().then(postInfo => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            });
        });
    }, []);

   async function updatePost(ev) {
        ev.preventDefault();
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('id', id);
        if(files?.[0]){
        data.set('file', files?.[0]);
         }
        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: "include",
        })
        if(response.ok) {
            setRedirect(true);
    }
}
async function deletePost(ev){
    ev.preventDefault();
    const response = await fetch('http://localhost:4000/post/' + id, {
        method:'DELETE',
        credentials: "include",
    })
    if(response.ok) {
        setNewRedirect(true);
    }
}


    if (redirect) {
        return <Navigate to={'/post/' + id} />
    }

    if (newRedirect){
        return <Navigate to={'/'} />
    }

    return (
        <div>
            <form class="create-post" onSubmit={updatePost}>
                <h1>Edit Post</h1>
                <input type="title" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />
                <input type="summary" placeholder="Summary" value={summary} onChange={ev => setSummary(ev.target.value)} />
                <input id="file" type="file" onChange={ev => setFiles(ev.target.files)} />
                <div id="content">
                    <Editor onChange= {setContent} value={content} />
                </div>
                <button id="content" style={{ marginTop: '5px' }}>Update post</button>
                <button id="content" style={{ marginTop: '5px' }} onClick={deletePost}>Delete post</button>
            </form>
        </div>
    );
}