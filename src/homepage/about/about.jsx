
import './About.css';
import Navbar from '../navbar/Navbar';

const About = () => {
  return (<>
    <Navbar/>
    <div className="about-page">
      <h1 className="title">About Us</h1>
      <div className="team">
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Aman" className="team-img"/>
          <h3>Aman</h3>
          <p>Aman is the creator of the login page and is responsible for managing all components in the project. His work ensures that the project functions seamlessly.</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Sarthak" className="team-img"/>
          <h3>Sarthak</h3>
          <p>Sarthak created the Payment Successful page, ensuring users receive confirmation of their payments and a smooth user experience during payment completion.</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Anshu" className="team-img"/>
          <h3>Anshu</h3>
          <p>Anshu designed and developed the categories bar, which enhances the users navigation experience by providing easy access to different product categories.</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Vineet" className="team-img"/>
          <h3>Vineet</h3>
          <p>Vineet is responsible for building the Payment Gateway page, ensuring that all payment features are well-integrated and functional.</p>
        </div>
        <div className="team-member">
          <img src="https://via.placeholder.com/150" alt="Soamesh" className="team-img"/>
          <h3>Somesh</h3>
          <p>Somesh developed the home page of the website, focusing on creating a user-friendly interface and providing a great first impression for visitors.</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default About;
