export default function Post(){
    return (
        <div className="post">
        <div className="image">
          <img src="https://images.unsplash.com/photo-1682692290240-ac21cb19b0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60"></img>
        </div>
        <div className="text">
          <h2>New entry here</h2>
          <p className= "info">
            <a className="author">My Name</a>
            <time>2023-05-02 16:19</time>
          </p>
          <p className="summary">description</p>
        </div>
      </div>
    );
}