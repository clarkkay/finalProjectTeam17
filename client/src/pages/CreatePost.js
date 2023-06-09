import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "./Editor";

export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);
    //creating the post to submit with button
    async function createNewPost(ev) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files[0]);
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include'
        });
        if(response.ok){
            console.log(
                "response ok!"
            )
            setRedirect(true);
        } else {
            console.log("not ok :(")
        }
    }

    //Go back to homepage
    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
        <div>        
            <form onSubmit={createNewPost} class="create-post">
                <h1>Create Post</h1>
                <input type="title" placeholder="Title" value={title} onChange={ev => setTitle(ev.target.value)} />
                <input type="summary" placeholder="Summary" value={summary} onChange={ev => setSummary(ev.target.value)} />
                <input type="file" onChange={ev => setFiles(ev.target.files)} />
                <div id="content">
                <Editor  onChange= {setContent} value={content} />
                </div>
                <button id="content" style={{ marginTop: '5px' }}>Create post</button>
            </form>
        </div>
    );
};