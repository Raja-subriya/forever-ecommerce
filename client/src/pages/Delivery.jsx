import React from 'react';
import Title from '../components/Title';

const Delivery = () => {
  return (
    <div className="border-t pt-14">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'DELIVERY'} text2={'INFO'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 px-10 md:px-0">
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            At FOREVER, we are committed to delivering your orders as quickly and safely as possible. We partner with reliable shipping services to ensure your products reach you in perfect condition.
          </p>
          <b className="text-gray-800">Our Shipping Process</b>
          <p>
            Once your order is placed, our team begins processing it within 24 hours. You will receive a tracking number as soon as your parcel is dispatched.
          </p>
          <b className="text-gray-800">Estimated Delivery Times</b>
          <ul className="list-disc ml-5">
            <li>Standard Shipping: 5-7 business days</li>
            <li>Express Shipping: 2-3 business days</li>
            <li>International Shipping: 10-15 business days</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
