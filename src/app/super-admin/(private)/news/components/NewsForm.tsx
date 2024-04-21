import ImageDropzoneSingle from "@/components/image-dropzone-single";
import { useGetPopularLeaguesQuery } from "@/features/super-admin/popular-league/popularLeagueApi";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/dark.css";
import { ErrorMessage, Field } from "formik";
import dynamic from "next/dynamic";
import Image from "next/image";
import Flatpickr from "react-flatpickr";
import { FaTrashAlt } from "react-icons/fa";
import QuillLoader from "../../components/QuillLoader";

const QuillEditor = dynamic(() => import("../../components/QuillEditor"), {
  ssr: false,
  loading: () => <QuillLoader className='col-span-full h-[143px]' />
});

export default function NewsCreateFom({
  values,
  setFieldValue,
  setNewsImage,
  newsImage
}: {
  values: any;
  setFieldValue: any;
  setNewsImage: any;
  newsImage: any;
}) {
  const { data: cricketLeagues, isLoading: cricketLeaguesLoading } = useGetPopularLeaguesQuery("cricket");
  const { data: footballLeagues, isLoading: footballLeaguesLoading } = useGetPopularLeaguesQuery("football");

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
              Category <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='category' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          <Field as='select' className='select select-bordered w-full bg-white' name='category'>
            <option value='football'>Football</option>
            <option value='cricket'>Cricket</option>
          </Field>
        </label>
      </div>
      <div className='col-span-6'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              League<span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='league' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          {!footballLeaguesLoading && !cricketLeaguesLoading && (
            <Field as='select' className='input input-bordered w-full bg-white' name='league'>
              <option value=''>Select One</option>

              {values.category === "football" &&
                footballLeagues?.data?.docs?.map((league: any) => {
                  return (
                    <option key={league.id} value={league.name}>
                      {league.name}
                    </option>
                  );
                })}

              {values.category === "cricket" &&
                cricketLeagues?.data?.docs?.map((league: any) => {
                  return (
                    <option key={league.id} value={league.name}>
                      {league.name}
                    </option>
                  );
                })}
            </Field>
          )}
        </label>
      </div>
      <div className='col-span-12'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Short Description <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='shortDescription' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          <Field as='textarea' className='input input-bordered h-40 w-full bg-white p-5' name='shortDescription' />
        </label>
      </div>

      <div className='col-span-12'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Description <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='description' component='span' className='text-sm text-red-600' />
            </span>
          </div>

          <QuillEditor
            value={values.description}
            onChange={handleChange}
            label=''
            className='col-span-full [&_.ql-editor]:min-h-[100px]'
            labelClassName='font-medium text-gray-700 dark:text-gray-600 mb-1.5'
          />
        </label>
      </div>

      <div className='col-span-6'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              News Image Type <span className='text-red-500'>*</span>{" "}
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
            value={newsImage}
            onChange={(image: any) => setNewsImage(image)}
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
      <div className='col-span-6'>
        <Field name='date'>
          {({ field, meta }: { field: any; meta: any }) => (
            <Flatpickr
              value={values?.publishDate}
              render={({ defaultValue, value, ...props }, ref) => (
                <label className='form-control'>
                  <div className='label'>
                    <span className='label-text font-semibold'>
                      Date{" "}
                      <span className='text-red-600'>
                        * {meta.touched && meta.error && <span>({meta.error})</span>}
                      </span>
                    </span>
                  </div>
                  <input
                    type='text'
                    className={`input input-bordered w-full ${meta.touched && meta.error && "input-error"}`}
                    ref={ref}
                    // {...props}
                    placeholder='YYYY-MM-DD HH:MM'
                  />
                </label>
              )}
              options={{
                onChange: function (selectedDates, dateStr) {
                  setFieldValue("publishDate", dateStr);
                },
                enableTime: false,
                disableMobile: true,
                allowInput: false
              }}
            />
          )}
        </Field>
      </div>
      <div className='col-span-6'>
        <label className='form-control w-full'>
          <div className='label'>
            <span className='label-text font-medium'>
              Status <span className='text-red-500'>*</span>{" "}
              <ErrorMessage name='title' component='span' className='text-sm text-red-600' />
            </span>
          </div>
          <Field as='select' className='select select-bordered w-full bg-white' name='status'>
            <option value='1'>Active</option>
            <option value='0'>Inactive</option>
          </Field>
        </label>
      </div>
    </div>
  );
}
