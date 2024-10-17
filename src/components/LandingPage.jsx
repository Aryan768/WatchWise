import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-gray-900 text-white">
        <nav className="container mx-auto flex justify-between items-center py-4 px-6">
          <div className="text-xl font-bold">WatchWise</div>
          <ul className="flex space-x-8">
            <li><a href="/" className="hover:text-orange-400">Home</a></li>
            <li><a href="/videodef" className="hover:text-orange-400">Video Transcription</a></li>
            <li><a href="/playlist" className="hover:text-orange-400">YouTube Playlist</a></li>
            <li><a href="/youtubevideo" className="hover:text-orange-400">YouTube Video</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section with Video */}
      <section className="bg-gray-800 text-white">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between py-16 px-6">
          <div className="lg:w-1/2">
            <h1 className="text-4xl font-bold mb-6">Welcome to WatchWise</h1>
            <p className="mb-6 text-lg">
              Unlock deeper insights from YouTube with WatchWise’s powerful tools.
              Enjoy video transcriptions, detailed playlist analysis, and personalized
              video recommendations!
            </p>
          </div>
          <div className="lg:w-1/2">
            <video controls className="rounded-lg shadow-lg w-full">
              <source src="video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      {/* Image Slideshow Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">How WatchWise Works</h2>
          <div className="relative w-full mx-auto lg:w-2/3">
            {/* Slideshow */}
            <div className="flex overflow-hidden">
              <div className="w-full transition-transform transform">
                <img
                  src="image1.jpg"
                  alt="Feature 1"
                  className="rounded-lg shadow-lg mx-auto w-full h-64 object-cover"
                />
              </div>
              <div className="w-full transition-transform transform">
                <img
                  src="image2.jpg"
                  alt="Feature 2"
                  className="rounded-lg shadow-lg mx-auto w-full h-64 object-cover"
                />
              </div>
              <div className="w-full transition-transform transform">
                <img
                  src="image3.jpg"
                  alt="Feature 3"
                  className="rounded-lg shadow-lg mx-auto w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
          <p className="text-lg mt-6">
            Discover how WatchWise helps you analyze and enhance your YouTube experience with advanced features.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-lg">Made by Aryan Bhatia</p>
          <p>&copy; 2024 WatchWise. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Slideshow JavaScript */}
      <script>
        {`
          let slideIndex = 0;
          const slides = document.querySelectorAll('.flex .transform');
          
          function showSlides() {
            slides.forEach((slide, index) => {
              slide.style.transform = \`translateX(-\${slideIndex * 100}%)\`;
            });
            slideIndex = (slideIndex + 1) % slides.length;
          }

          setInterval(showSlides, 3000); // Change slide every 3 seconds
        `}
      </script>
    </div>
  );
};

export default LandingPage;
