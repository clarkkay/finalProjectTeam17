export default function About(props){
    return (
        <div className="post">
        <div className="image">
          <img src={props.image || "https://images.unsplash.com/photo-1682692290240-ac21cb19b0eb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=900&q=60"} alt="About Me"></img>
        </div>
        <div className="text">
          <h2>{props.name || "John Doe"}</h2>
          <p className= "info">
            <p>{props.college || "College Studies"}</p>
          </p>
          <p className="info">
            <a className="author" href={`mailto:${props.email || "johndoe@gmail.com"}`}>{props.email || "johndoe@gmail.com"}</a>
          </p>
          <p className="summary">{props.description || "description"}</p>
        </div>
      </div>
    );
  }
    