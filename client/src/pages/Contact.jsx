import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="px-4 md:px-10">

      {/* TITLE */}
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* MAIN SECTION */}
      <div className="my-10 flex flex-col md:flex-row items-center justify-center gap-10 mb-20">

        {/* IMAGE */}
        <img
          src="/contact.jpg"
          alt="Contact"
          className="w-full md:max-w-[480px] h-[280px] md:h-auto object-cover rounded-lg shadow-lg hover:scale-105 transition"
        />

        {/* TEXT */}
        <div className="flex flex-col gap-6 max-w-[500px]">

          <div>
            <p className="font-semibold text-2xl text-gray-700">Our Store</p>
            <p className="text-gray-500 mt-2">
              123 Fashion Street <br />
              Coimbatore, Tamil Nadu, India
            </p>
            <p className="text-gray-500 mt-2">
              Tel: +91 98765 43210 <br />
              Email: support@foreverstore.com
            </p>
          </div>

          <div>
            <p className="font-semibold text-2xl text-gray-700">Careers at Forever</p>
            <p className="text-gray-500 mt-2">
              Learn more about our teams and job openings.
            </p>

            <button className="mt-4 border border-black px-8 py-3 text-sm rounded hover:bg-black hover:text-white transition">
              Explore Jobs
            </button>
          </div>

        </div>
      </div>

      {/* MAP */}
      <div className="w-full mb-10">

        <iframe
          src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed"
          className="w-full h-[300px] rounded-lg shadow-lg"
          loading="lazy"
          title="Store Location"
        ></iframe>

        <div className="text-center mt-4">
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Coimbatore,Tamil%20Nadu"
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            Get Directions
          </a>
        </div>

      </div>

      {/* NEWSLETTER */}
      <NewsletterBox />

    </div>
  );
};

export default Contact;