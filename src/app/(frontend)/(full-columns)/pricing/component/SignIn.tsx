import { FaGoogle } from "react-icons/fa";
import { Input, Password } from "rizzui";

const SignIn = () => {
  return (
    <div>
      {" "}
      <div className='flex items-center gap-3'>
        <p className='rounded-full w-8 h-8 font-bold text-xl border-2 border-gray-500 flex justify-center items-center'>
          2
        </p>
        <h2 className='font-bold text-xl'>Create your account</h2>
      </div>
      <div>
        <div className='grid grid-cols-2 gap-5 mt-5 '>
          <Input
            labelClassName={"text-md font-bold"}
            type='email'
            label='Email'
            placeholder='Enter your email'
            className='w-full'
          />
          <Password label='Password' placeholder='Enter your password' className='w-full' />
        </div>
        <div className='w-full mt-4 text-md font-bold flex items-center gap-3'>
          <h2>Sign Up via</h2>
          <span>
            <FaGoogle className='text-xl text-orange-600' />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
