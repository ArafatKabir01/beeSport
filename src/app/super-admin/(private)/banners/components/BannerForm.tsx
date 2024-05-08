import ImageDropzoneSingle from "@/components/image-dropzone-single";
import { useGetAllOwnFixtureQuery } from "@/features/super-admin/fixture/fixtureApi";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/dark.css";
import { ErrorMessage, Field } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import QuillLoader from "../../components/QuillLoader";

const QuillEditor = dynamic(() => import("../../components/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function BannerForm({
  values,
  setFieldValue,
  setBannerImage,
  bannerImage
}: {
  values: any;
  setFieldValue: any;
  setBannerImage: any;
  bannerImage: any;
}) {
  // const { data: footballLeagues, isLoading: footballLeaguesLoading } = useGetPopularLeaguesQuery("football");

  const { data: ownFixtures, isLoading } = useGetAllOwnFixtureQuery({});

  const handleChange = (input: string) => {
    const removeHtmlTags = input.replace(/<[^>]*>/g, "");
    removeHtmlTags ? setFieldValue("description", input) : setFieldValue("description", "");
  };

  return (
    <div className='grid grid-cols-12 gap-x-5 gap-y-3'>
      <div className='col-span-12'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Title <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='title' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          <Field className='input input-bordered w-full bg-white' name='title' />
        </label>
      </div>

      <div className='col-span-6'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Banner Image Type <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='imageType' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          <Field as='select' className='select select-bordered w-full bg-white' name='imageType'>
            <option value=''>Select One</option>
            <option value='url'>Url</option>
            <option value='image'>Image</option>
          </Field>
        </label>
      </div>

      <div className='col-span-6'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Fixture <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='fixtureId' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          {/* <Field className='input input-bordered w-full bg-white' name='fixtureId' /> */}

          {!isLoading && (
            <Field as='select' className='select select-bordered w-full bg-white' name='fixtureId'>
              <option value=''>Select One</option>

              {ownFixtures?.data?.map((fixture: any) => {
                return (
                  <option key={fixture.id} value={fixture.fixtureId}>
                    {fixture.name}
                  </option>
                );
              })}
            </Field>
          )}
        </label>
      </div>

      <div className='col-span-12'>
        <h2 className='bg-yellow-100 w-fit py-0.5 px-2 rounded-full'>
          Please select a image with a <span className='text-red-400 font-semibold'> 16:5 </span>ratio.
        </h2>
      </div>

      <div className='col-span-12'>
        <label className='form-control w-full'>
          {values?.imageType === "url" && (
            <>
              <div className='label'>
                <span className='label-text font-medium'>
                  Image Url <span className='text-red-500'>*</span>{" "}
                  <ErrorMessage name='image' component='span' className='text-sm text-red-600' />
                </span>
              </div>
              <Field className='input input-bordered w-full bg-white' name='image' />
              {values?.image && /^(ftp|https):\/\/[^ "]+$/.test(values?.image) && (
                <Image
                  src={values.image}
                  alt='Image'
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='mt-4 h-24 w-24 rounded-md border border-gray-200 object-contain p-1'
                />
              )}
            </>
          )}
        </label>
        {values?.imageType === "image" && values.image === "" && (
          <ImageDropzoneSingle
            className='mt-2'
            value={bannerImage}
            onChange={(image: any) => setBannerImage(image)}
            size={1024 * 1000}
            sizeText='1MB'
          />
        )}
        {values?.imageType === "image" && values.image && (
          <div className='mt-2 flex items-center gap-3'>
            <img
              src={values.image}
              alt='Uploaded Image'
              className='h-24 w-24 rounded-md border border-gray-200 object-contain p-1'
            />
            <button type='button' className='rounded bg-red-500 p-1' onClick={() => setFieldValue("image", "")}>
              <FaTrashAlt className='hover:fill-secondary-400 h-5 w-5 fill-white transition-colors' />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
