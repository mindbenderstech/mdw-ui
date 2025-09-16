'use client';

const Contact = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl mt-10 font-extrabold text-teal-700">Contact Us</h1>
          <p className="mt-4 text-xl text-gray-600">
            We&apos;d love to hear from you! Whether you have a question, feedback, or just want to connect, feel free to reach out.
          </p>
        </div>

        {/* Contact Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-teal-700">Get in Touch</h2>
            <p className="text-lg text-gray-700">
              If you have any questions or would like to know more about <strong>TheHeadlineWorld</strong> and the news we provide, feel free to contact us!
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="30px" fill="#087775" className="mr-2">
                  <path d="M480-462 140-685v465h390v60H140q-24 0-42-18t-18-42v-520q0-24 18-42t42-18h680q24 0 42 18t18 42v310h-60v-255L480-462Zm0-60 340-218H140l340 218ZM774-44l-42-42 73-74H590v-60h215l-74-74 43-42 146 146L774-44ZM140-685v499-244 4-314 55Z" />
                </svg>
                <p>Email: <a onClick={(e) => e.preventDefault()} href="mailto:support@TheHeadlineWorld.com" className="text-teal-700 hover:underline">support@TheHeadlineWorld.com</a></p>
              </div>
              {/* Social Media Section */}
              <div className="flex items-center space-x-6  p-1 rounded-lg bg-teal-100 shadow-md">
                <p className="text-lg font-semibold text-teal-700">Follow us on Social Media:</p>
                <div className="flex space-x-6">
                  {/* Twitter Icon */}
                  <a onClick={(e) => e.preventDefault()}  href="https://twitter.com/TheHeadlineWorld" className="text-teal-700 hover:text-white hover:bg-teal-600 p-2 rounded-full transition-all duration-300 ml-10">
                    <svg  className="w-20 h-8 text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M22 5.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.343 8.343 0 0 1-2.605.981A4.13 4.13 0 0 0 15.85 4a4.068 4.068 0 0 0-4.1 4.038c0 .31.035.618.105.919A11.705 11.705 0 0 1 3.4 4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 6.1 13.635a4.192 4.192 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 2 18.184 11.732 11.732 0 0 0 8.291 20 11.502 11.502 0 0 0 19.964 8.5c0-.177 0-.349-.012-.523A8.143 8.143 0 0 0 22 5.892Z" clipRule="evenodd" />
                    </svg>
                    <p className="pl-3">Twitter</p>
                  </a>

                  {/* Facebook Icon */}
                  <a onClick={(e) => e.preventDefault()}  href="https://facebook.com/TheHeadlineWorld" className="text-teal-700 hover:text-white hover:bg-teal-600 p-2 rounded-full transition-all duration-300 ml-10">
                    <svg className="w-20 h-8 text-blue-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M13.135 6H15V3h-1.865a4.147 4.147 0 0 0-4.142 4.142V9H7v3h2v9.938h3V12h2.021l.592-3H12V6.591A.6.6 0 0 1 12.592 6h.543Z" clipRule="evenodd" />
                    </svg>
                    <p className="pl-1">Facebook</p>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-lg p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-teal-700 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your full name"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Enter your email"
                  disabled
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Write your message here"
                  disabled
                ></textarea>
              </div>
              <button type="submit" onClick={(e) => e.preventDefault()} className="w-full py-2 bg-teal-700 text-white font-semibold rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Thank you for reaching out! We&apos;ll get back to you as soon as possible.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
