import React from "react";
import Title from "../components/Title";
import NewsletterBox from "../components/NewsletterBox";

export const About = () => {
  return (
    <div className="px-4 md:px-10">

      {/* TITLE */}
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1="ABOUT" text2="US" />
      </div>

      {/* MAIN SECTION */}
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">

        {/* IMAGE (FIXED) */}
        <img
          src="/about.jpg"
          alt="About Forever"
          className="w-full md:max-w-[450px] h-[300px] object-cover rounded-lg shadow-lg"
        />

        {/* TEXT */}
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">

          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion, beauty, electronics, and home essentials,
            we offer an extensive collection sourced from trusted brands.
          </p>

          <b className="text-gray-800">Our Mission</b>

          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We are dedicated to providing a seamless
            shopping experience from browsing to delivery.
          </p>

        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="text-xl py-4 text-center">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">

        <div className="border border-gray-300 px-10 py-10 flex flex-col gap-4 flex-1 hover:shadow-lg transition">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            We carefully select and verify each product to ensure top quality standards.
          </p>
        </div>

        <div className="border border-gray-300 px-10 py-10 flex flex-col gap-4 flex-1 hover:shadow-lg transition">
          <b>Convenience</b>
          <p className="text-gray-600">
            User-friendly interface and smooth ordering make shopping easy.
          </p>
        </div>

        <div className="border border-gray-300 px-10 py-10 flex flex-col gap-4 flex-1 hover:shadow-lg transition">
          <b>Exceptional Service</b>
          <p className="text-gray-600">
            Our support team is always ready to help you anytime.
          </p>
        </div>

      </div>

      {/* NEWSLETTER */}
      <NewsletterBox />

    </div>
  );
};

export default About;