"use client";

export default function NoDataFound({ width, message }: { width?: string; message?: string }) {
  return (
    <div className={`w-${width || "6/12"} m-auto `}>
      <img src='/images/not-found-one.svg' className='m-auto w-6/12' alt='Not Found!' />
      <h2 className='text-center text-xs font-medium uppercase   lg:text-lg'>
        {message || "UNFORTUNATELY, THERE ARE NO DATA AT THE MOMENT!"}
      </h2>
    </div>
  );
}
