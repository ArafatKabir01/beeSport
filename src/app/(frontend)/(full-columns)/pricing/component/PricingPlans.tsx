import React from "react";

interface Plan {
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Small Plan",
    price: 39,
    features: [
      "Free domain",
      "Monthly Bandwidth 1GB",
      "SSD Storage 1TB",
      "SSL Certificate",
      "Website SEO",
      "Google Analytics",
      "Messenger Live Chat",
      "Full Support"
    ]
  },
  {
    name: "Medium Plan",
    price: 69,
    features: [
      "Free domain",
      "Monthly Bandwidth 1GB",
      "SSD Storage 1TB",
      "SSL Certificate",
      "Website SEO",
      "Google Analytics",
      "Messenger Live Chat",
      "Full Support"
    ],
    isPopular: true
  },
  {
    name: "Large Plan",
    price: 99,
    features: [
      "Free domain",
      "Monthly Bandwidth 1GB",
      "SSD Storage 1TB",
      "SSL Certificate",
      "Website SEO",
      "Google Analytics",
      "Messenger Live Chat",
      "Full Support"
    ]
  }
];

const PricingPlans: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-7 bg-lightGray'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold text-textPrimary mb-4'>Our Pricing Plans</h1>
        <p className='text-textSecondary'>Choose a plan that fits your needs</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-[#FFFFFF] text-[#111827] p-8 rounded-lg shadow-lg w-80 transform hover:scale-105 transition-transform duration-300 ease-in-out ${
              plan.isPopular ? "border-4 border-primary" : "border border-cardBorder"
            }`}
          >
            {plan.isPopular && (
              <div className='bg-[#1D4ED8] text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block mb-4'>
                Most Popular
              </div>
            )}
            <h2 className='text-2xl font-bold mb-4'>{plan.name}</h2>
            <ul className='mb-6'>
              {plan.features.map((feature, index) => (
                <li key={index} className='flex items-center mb-2 text-[#6B7280]'>
                  <svg
                    className='w-4 h-4 mr-2 text-green-500'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <div className='text-4xl font-bold mb-4'>
              ${plan.price} <span className='text-lg text-textSecondary'>/ month</span>
            </div>
            <button className='bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Sign up
            </button>
          </div>
        ))}
      </div>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='relative bg-white rounded-2xl w-72 p-5 shadow-lg'>
          <div
            className='absolute top-0 left-0 w-full h-32'
            style={{
              background: "linear-gradient(to right, #f97316, #ef4444)",
              clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)"
            }}
          ></div>
          <div className='relative z-10 pt-12 text-center text-white'>
            <div className='text-lg font-semibold'>Business</div>
            <div className='text-4xl font-bold mt-2'>
              $49<span className='text-xl'>.99</span>
            </div>
          </div>
          <ul className='relative z-10 mt-10 space-y-3 text-gray-700'>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Consecour adiscing elit amet adipis elit diam conse
              ctetuer.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Sed diam nonorum eiusm ctetuer adipi scing elit diam.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Magna aliquam eratn conse ctetuer adip iscing elit diam.
            </li>
          </ul>
          <button className='relative z-10 w-full mt-5 py-2 bg-gradient-to-r from-orange-500 to-red-700 text-white font-bold rounded-lg'>
            Select
          </button>
        </div>
      </div>
      <div className='flex justify-center items-center min-h-screen bg-gray-100'>
        <div className='bg-white rounded-2xl w-72 p-5 shadow-lg relative overflow-hidden'>
          <div
            className='absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-orange-500 to-red-700'
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 0% 100%)" }}
          ></div>
          <div className='relative z-10 pt-16'>
            <div className='text-2xl font-bold text-white'>Business</div>
            <div className='mt-2 text-4xl font-bold text-white'>
              $49<span className='text-xl'>.99</span>
            </div>
          </div>
          <ul className='mt-10 space-y-3 text-gray-700'>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Consecour adiscing elit amet adipis elit diam conse
              ctetuer.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Sed diam nonorum eiusm ctetuer adipi scing elit diam.
            </li>
            <li className='flex items-center'>
              <span className='text-green-500 mr-2'>✔</span>Magna aliquam eratn conse ctetuer adip iscing elit diam.
            </li>
          </ul>
          <button className='w-full mt-5 py-2 bg-gradient-to-r from-orange-500 to-red-700 text-white font-bold rounded-lg'>
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
