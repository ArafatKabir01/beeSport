export default function SkewCard({ children, title }: { title: string; children: React.ReactNode }) {
  return (
    <div className='flex flex-col items-center bg-white rounded-md my-[18px] p-5'>
      <div className=' w-full'>
        <div className='mb-5 mt-2 flex h-full items-center justify-start  pt-4'>
          <h4 className='select-none text-2xl font-extrabold'>{title}</h4>
        </div>
      </div>
      <div className='h-auto w-full'>
        <div className=''>{children}</div>
      </div>
    </div>
  );
}
