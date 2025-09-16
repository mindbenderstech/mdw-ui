'use client';

const Disclaimer = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl mt-10 font-extrabold text-teal-700">Disclaimer</h1>
          <p className="mt-3 text-lg text-gray-600">
            Transparency matters. Please read the following carefully.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white shadow-md rounded-lg p-8 space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            The content on <strong>TheHeadlineWorld</strong> is provided for general informational purposes only.
            While we strive for accuracy and timely reporting, we make no warranties of any kind regarding
            the completeness, reliability, or accuracy of any information displayed.
          </p>

          <p>
            Any action you take upon the information you find on this website is strictly at your own risk.
            <strong> TheHeadlineWorld</strong> will not be liable for any losses or damages in connection with
            the use of our website or the information provided therein.
          </p>

          <p>
            We feature news from a wide variety of sources and in multiple languages to reach our
            diverse audience. While we work diligently to ensure the integrity of the stories presented,
            TheHeadlineWorld does not claim responsibility for the content published on external websites
            linked from our platform.
          </p>

          <p>
            The opinions and views expressed in articles belong solely to their respective authors and do
            not necessarily reflect those of TheHeadlineWorld or its team.
          </p>

          <p>
            By using our website, you hereby consent to our disclaimer and agree to its terms.
          </p>

          <p className="italic text-sm text-gray-500 mt-6">
            This disclaimer is subject to change without notice and was last updated on 23/06/2025.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
