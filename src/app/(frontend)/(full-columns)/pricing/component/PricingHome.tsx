import PaymentMethod from "./PaymentMethod";
import PricingPlans from "./PricingPlans";
import SignIn from "./SignIn";

const PricingHome = () => {
  return (
    <div>
      {/* <PlanCards /> */}
      <PricingPlans />
      <div className='grid grid-cols-12 gap-5 my-5'>
        <div className='col-span-12 '>
          <SignIn />
          <hr className='mx-auto mt-8 max-w-screen-full  border-gray-300 dark:border-gray-700 sm:mx-auto lg:my-4' />
          <PaymentMethod />
        </div>
        {/* <div className='col-span-3  h-[400px]'>
          <Benefits />
        </div> */}
      </div>
    </div>
  );
};

export default PricingHome;
