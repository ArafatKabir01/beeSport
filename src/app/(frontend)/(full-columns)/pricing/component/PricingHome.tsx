import Benefits from "./Benefits";
import PaymentMethod from "./PaymentMethod";
import PlanCards from "./PlanCards";
import SignIn from "./SignIn";

const PricingHome = () => {
  return (
    <div>
      <PlanCards />
      <div className='grid grid-cols-12 gap-5 my-5'>
        <div className='col-span-9 '>
          <SignIn />
          <hr className='mx-auto mt-8 max-w-screen-full  border-gray-300 dark:border-gray-700 sm:mx-auto lg:my-4' />
          <PaymentMethod />
        </div>
        <div className='col-span-3  h-[400px]'>
          <Benefits />
        </div>
      </div>
    </div>
  );
};

export default PricingHome;
