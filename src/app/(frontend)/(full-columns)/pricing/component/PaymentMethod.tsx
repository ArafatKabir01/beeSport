const PaymentMethod = () => {
  return (
    <div>
      <div>
        <div className='flex items-center gap-3 mt-9'>
          <p className='rounded-full w-8 h-8 font-bold text-xl border-2 border-gray-500 flex justify-center items-center'>
            3
          </p>
          <h2 className='font-bold text-xl'>Choose your method of payment</h2>
        </div>
        <div className='mt-16'>
          <div className='h-[50px] bg-white rounded-md shadow-md flex justify-between items-center p-2'>
            <input type='radio' name='radio-6' className='radio radio-warning' checked />
            <div className='flex gap-2 '>
              <div className='w-12 h-6 bg-gray-300 rounded-md'></div>
              <div className='w-12 h-6 bg-gray-300 rounded-md'></div>
              <div className='w-12 h-6 bg-gray-300 rounded-md'></div>
              <div className='w-12 h-6 bg-gray-300 rounded-md'></div>
            </div>
          </div>
          <div className='h-[250px] bg-white rounded-md shadow-md my-8'></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
