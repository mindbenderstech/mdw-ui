'use client';

const About = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-teal-700">About TheHeadlineWorld</h1>
          <p className="mt-4 text-xl text-gray-600">
            Welcome to TheHeadlineWorld, your go-to source for fast, clear, and credible news from across the globe.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700">
              At <strong>TheHeadlineWorld</strong>, we bring you the latest stories from across the world, focusing on essential news that matters most. Whether you&apos;re a busy professional or simply someone who values staying informed, we deliver news in a concise and impactful way.
            </p>

            <p className="text-lg text-gray-700">
              We believe in <strong>clarity over clutter</strong>, bringing you only the most relevant news, without unnecessary fluff. Our goal is to provide you with quick and reliable access to the world’s happenings.
            </p>

            <p className="text-lg text-gray-700">
              With <strong>multiple language support</strong>, we ensure that TheHeadlineWorld delivers content that speaks to a diverse, global audience. Whether you&apos;re reading in English, Hindi, Marathi, or any of our supported languages, we keep you connected to the world.
            </p>
          </div>

          {/* Right Section with Image */}
          <div className="flex justify-center w-full h-85">
            <img
              src="/images/theheadlineworld logonew.png"
              alt="TheHeadlineWorld Logo"
              className="rounded-lg shadow-lg p-5 bg-white"
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
              <div className="bg-teal-100 text-teal-700 p-6 rounded-full inline-block rounded">
                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#087775">
                <path d="M271-120 80-311l192-192 42 42-120 120h646v60H194l119 119-42 42Zm418-337-42-42 119-119H120v-60h646L646-798l42-42 192 192-191 191Z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold mt-4">Clear & Concise</h3>
              <p className="text-gray-600 mt-2">We provide you with straight-to-the-point stories, no fluff.</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-lg text-gray-600">
            Join us at <strong>TheHeadlineWorld</strong>, where staying informed is easy, fast, and available in multiple languages. We’re not just delivering news, we’re delivering clarity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
