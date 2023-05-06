import About from "../About";
import Kayley from "../images/LinkedINPhoto_2_6_2023.jpg";
import Manas from "../images/Manas Mathur.jpg";
import Melani from "../images/melani.jpg";
import Computer from "../images/college_computer.jpg";

const aboutus = [
    {
        "_id": 1,
        "name": "Kayley Clark",
        "college": "Software Engineering Major - Cyber Security Engineering Minor",
        "email": "krclark@iastate.edu",
        "description": "Hello my name is Kayley Clark, I came to Iowa State in the Fall of 2021 as an Industrial Engineering major. After discovering my passion for programming, I decided to switch into Software Engineering.  Throughout my journey at Iowa State, I have seen anywhere from cyber security to data structures to front end development. To me, COM S 319 is the first class I have seen a full stack development come together, from the backend of raspberry pi’s to the front end webpage design.",
        "image": Kayley
    }, {
        "_id": 2,
        "name": "Manas Mathur",
        "college": "Computer Science Major",
        "email": "manas1@iastate.edu",
        "description": "Hello my name is Manas Mathur, I'm currently an undergraduate student enrolled in their sophomore year of Computer Science. Technology has always fascinated me while growing up; seeing how far tech can evolve to enhance our lives will never cease to amaze me. I believe that the future of technology lies in finding innovative ways to make information more accessible and engaging to people, and web development is at the forefront of that movement. I hope to contribute to the growth fo technology as a whole, and through COM S 319 I will further gain the education to do so.",
        "image": Manas
     }, {
        "_id": 3,
        "name": "Melani Hodge",
        "college": "Software Engineering Major",
        "email": "mhodge12@iastate.edu",
        "description": "Hello my name is Melani Hodge, I am currently studying Software Engineering at Iowa State University. When I came to Iowa State, I was undecided engineering. With both my dad and brother working in technology, I was familiar with the field and was unimpressed. My intro to engineering class freshmen year changed that. In that class, I was introduced to VBA. Since then, I have learned Python, Java, JavaScript, React, RTL, and more. With technology, the field is always changing, and the opportunities are endless. COM S 319 has introduced me to combining the languages into making a functioning webpage like this one.",
        "image": Melani 
    }
]

export default function AboutUs(){
    return (
        <>
            <About name="SE/ComS 319 Construction of User Interfaces, Spring 2023" college="Dated: May 6th, 2023" email="aaldaco@iastate.edu" description="Professor: Dr. Abraham N. Aldaco Gastelum, email linked above." image={Computer} />
            <About name={aboutus[0].name} college={aboutus[0].college} email={aboutus[0].email} description={aboutus[0].description} image={aboutus[0].image} />
            <About name={aboutus[1].name} college={aboutus[1].college} email={aboutus[1].email} description={aboutus[1].description} image={aboutus[1].image}/>
            <About name={aboutus[2].name} college={aboutus[2].college} email={aboutus[2].email} description={aboutus[2].description} image={aboutus[2].image} />
        </>
    )
}
