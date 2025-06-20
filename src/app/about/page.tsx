'use client';

const About = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-teal-700">About Headliness</h1>
          <p className="mt-4 text-xl text-gray-600">
            Welcome to Headliness, your go-to source for fast, clear, and credible news from across the globe.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              At **Headliness**, we bring you the latest stories from across the world, focusing on essential news that matters most. Whether you're a busy professional or simply someone who values staying informed, we deliver news in a concise and impactful way.
            </p>

            <p className="text-lg text-gray-700">
              We believe in **clarity over clutter**, bringing you only the most relevant news, without unnecessary fluff. Our goal is to provide you with quick and reliable access to the world’s happenings.
            </p>

            <p className="text-lg text-gray-700">
              With **multiple language support**, we ensure that Headliness delivers content that speaks to a diverse, global audience. Whether you're reading in English, Hindi, Marathi, or any of our supported languages, we keep you connected to the world.
            </p>
          </div>

          {/* Right Section with Image */}
          <div className="flex justify-center">
            <img
              src="/images/headliness_logo.png"  // Replace this path with your image path
              alt="Headliness Logo"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-semibold text-teal-700">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 p-6 rounded-full inline-block">
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v18l15-9-15-9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Fast Updates</h3>
              <p className="text-gray-600 mt-2">Stay updated with the latest news as it happens, anytime, anywhere.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 p-6 rounded-full inline-block">
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Global Reach</h3>
              <p className="text-gray-600 mt-2">Get news from across the globe in multiple languages.</p>
            </div>

            <div className="text-center">
              <div className="bg-teal-100 text-teal-700 p-6 rounded-full inline-block">
                <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9l2 2-2 2m0 0l2 2m-2-2h12m-4-4l2 2-2 2m2-2H2" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Clear & Concise</h3>
              <p className="text-gray-600 mt-2">We provide you with straight-to-the-point stories, no fluff.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Join us at **Headliness**, where staying informed is easy, fast, and available in multiple languages. We’re not just delivering news, we’re delivering clarity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
