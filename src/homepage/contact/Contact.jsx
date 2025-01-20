import Footer from "../../components/Footer/Footer";
import Navbar from "../navbar/Navbar";

const Contact = () => {
  return (
    <>
      <Navbar/>
    <div className=" bg-{#F6C794}">
      <div className="container mx-auto px-6">
        {/* Animated Contact Us Title */}
        <h2 className="text-4xl font-extrabold text-center text-indigo-700 mb-8 animate-bounce">
          Contact Us
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <p className="text-center text-gray-600 mb-6">
            We,d love to hear from you! Feel free to reach out with any
            questions, feedback, or suggestions.
          </p>

          <form>
            {/* Name Field */}
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
              />
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
              />
            </div>

            {/* Message Field */}
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="Your message"
                className="w-full px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-300 transition duration-300"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-2 px-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Contact;
