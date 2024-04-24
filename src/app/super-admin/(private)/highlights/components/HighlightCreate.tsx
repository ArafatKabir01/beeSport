"use client";

import ImageDropzoneSingle from "@/components/image-dropzone-single";
import { routes } from "@/config/routes";
import { useCreateHighlightMutation } from "@/features/super-admin/highlight/highlightApi";
import { useGetPopularLeaguesQuery } from "@/features/super-admin/popular-football-entity/popularFootballEntityApi";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/dark.css";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FiCheckCircle } from "react-icons/fi";
import { PiSpinnerLight } from "react-icons/pi";
import * as Yup from "yup";

export default function HighlightCreate({ searchParams }: { searchParams: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadImageMsg, setUploadImageMsg] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [createHighlight, { isError, isSuccess }] = useCreateHighlightMutation();
  // const { data: footballLeagues, isLoading: footballLeaguesLoading, refetch } = useGetPopularLeaguesQuery("football");

  const initialValues = {
    title: searchParams?.match_title || "",
    date: searchParams?.time.slice(0, 10) || "",
    fixtureId: searchParams?.fixture_id || "",
    videoType: "",
    youtubeUrl: "",
    sources: [""],
    thumbnailImageType: "",
    thumbnailImage: "",
    status: "1"
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    date: Yup.string().required("Required!"),
    fixtureId: Yup.string().required("Required!"),
    videoType: Yup.string().required("Required!"),
    thumbnailImageType: Yup.string().required("Required!")
  });

  // Submit Handler
  const handleSubmit = (values: any) => {
    setIsSubmitting(true);
    let formBody = new FormData();

    formBody.append("title", values?.title);
    formBody.append("date", values?.date);
    formBody.append("fixtureId", values?.fixtureId);
    formBody.append("videoType", values?.videoType);
    formBody.append("youtubeUrl", values?.youtubeUrl);
    formBody.append("sources", JSON.stringify(values?.sources));
    formBody.append("status", values?.status);
    formBody.append("thumbnailImageType", values?.thumbnailImageType);

    thumbnailImage
      ? formBody.append("thumbnailImage", thumbnailImage)
      : formBody.append("thumbnailImageUrl", values?.thumbnailImage);

    createHighlight(formBody);
  };

  useEffect(() => {
    if (isError) {
      setIsSubmitting(false);
      toast.error("Something went wrong!");
    }

    if (isSuccess) {
      toast.success("Highlight created successfully!");
      router.push(routes.admin.highlights.home);
    }
  }, [isError, isSuccess, router]);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ values, setFieldValue, handleChange }) => {
        return (
          <Form>
            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <Field name='title'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Title{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <input
                      type='text'
                      className={`input input-bordered w-full ${meta.touched && meta.error && "input-error"}`}
                      {...field}
                    />
                  </label>
                )}
              </Field>

              <Field name='date'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <Flatpickr
                    value={values?.date}
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
                        setFieldValue("date", dateStr);
                      },
                      enableTime: false,
                      disableMobile: true,
                      allowInput: false
                    }}
                  />
                )}
              </Field>

              <Field name='fixtureId'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Fixture ID{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <input
                      type='text'
                      className={`input input-bordered w-full ${meta.touched && meta.error && "input-error"}`}
                      {...field}
                    />
                  </label>
                )}
              </Field>

              <Field name='status'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Status{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <select className='select select-bordered' {...field}>
                      <option value='1'>Active</option>
                      <option value='0'>Inactive</option>
                    </select>
                  </label>
                )}
              </Field>
              
              {/* <Field name='category'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        League{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <select className='select select-bordered' {...field}>
                    {
                    footballLeagues?.data?.docs?.map((item : any) => <option key={item?.id} value={item?.name}>{item?.name}</option>)
                    }
                    </select>
                  </label>
                )}
              </Field> */}

              <Field name='videoType'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control col-span-2'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Video Type{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <select
                      className={`select select-bordered ${meta.touched && meta.error && "select-error"}`}
                      {...field}
                    >
                      <option value=''>Select One</option>
                      <option value='source'>Source</option>
                      <option value='youtube'>Youtube</option>
                    </select>
                  </label>
                )}
              </Field>

              {values.videoType === "youtube" && (
                <Field name='youtubeUrl'>
                  {({ field, meta }: { field: any; meta: any }) => (
                    <label className='form-control col-span-2'>
                      <div className='label'>
                        <span className='label-text font-semibold'>
                          Youtube Url{" "}
                          <span className='text-red-600'>
                            * {meta.touched && meta.error && <span>({meta.error})</span>}
                          </span>
                        </span>
                      </div>
                      <input
                        placeholder='https://'
                        type='url'
                        className='input input-bordered w-full'
                        name='youtubeUrl'
                        onChange={(e) => {
                          handleChange(e);
                          const url = e.target.value;
                          const videoId = url.split("v=")[1];
                          setFieldValue("thumbnailImageType", "url");
                          setFieldValue("thumbnailImage", `https://img.youtube.com/vi/${videoId}/0.jpg`);
                        }}
                      />
                    </label>
                  )}
                </Field>
              )}

              {values.videoType === "youtubeUrl" && (
                <Field name='youtubeUrl'>
                  {({ field, meta }: { field: any; meta: any }) => (
                    <label className='form-control col-span-2'>
                      <div className='label'>
                        <span className='label-text font-semibold'>
                          Youtube Url{" "}
                          <span className='text-red-600'>
                            * {meta.touched && meta.error && <span>({meta.error})</span>}
                          </span>
                        </span>
                      </div>
                      <input
                        placeholder='https://'
                        type='url'
                        className='input input-bordered w-full'
                        name='youtube_url'
                        onChange={(e) => {
                          handleChange(e);
                          const url = e.target.value;
                          const videoId = url.split("v=")[1];
                          setFieldValue("thumbnailImageType", "url");
                          setFieldValue("thumbnailImage", `https://img.youtube.com/vi/${videoId}/0.jpg`);
                        }}
                      />
                    </label>
                  )}
                </Field>
              )}

              {values.videoType === "source" && (
                <FieldArray name='sources'>
                  {(arrayHelpers) => (
                    <div className='col-span-2 space-y-4'>
                      {values.sources.map((video, index) => {
                        return (
                          <div key={index} className='col-span-2'>
                            <label
                              className='label flex items-center justify-start font-medium text-gray-700'
                              htmlFor='fixture_id'
                            >
                              Source Link ({index + 1})
                            </label>
                            <div className='flex gap-5'>
                              <Field
                                type='text'
                                className='input input-bordered w-full bg-white'
                                name={`sources[${index}]`}
                              />
                              {index > 0 && (
                                <button type='button' onClick={() => arrayHelpers.remove(index)}>
                                  <AiOutlineClose className='rounded bg-gray-200 text-2xl hover:bg-red-300 hover:text-rose-600' />
                                </button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div className=''>
                        <button
                          className='btn btn-primary btn-sm rounded'
                          type='button'
                          onClick={() => arrayHelpers.push("")}
                        >
                          <AiOutlinePlus />
                          Add More Source
                        </button>
                      </div>
                    </div>
                  )}
                </FieldArray>
              )}

              <Field name='thumbnailImageType'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control w-full col-span-2'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Thumbnail Type{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <select
                      className={`select select-bordered ${meta.touched && meta.error && "select-error"}`}
                      {...field}
                    >
                      <option value=''>Select One</option>
                      <option value='url'>Url</option>
                      <option value='image'>Image</option>
                    </select>
                  </label>
                )}
              </Field>

              {values?.thumbnailImageType === "url" && (
                <Field name='thumbnailImage'>
                  {({ field, meta }: { field: any; meta: any }) => (
                    <>
                      <label className='form-control w-full col-span-2'>
                        <div className='label'>
                          <span className='label-text font-semibold'>Thumbnail Url</span>
                        </div>
                        <input
                          type='url'
                          placeholder='https://'
                          className={`input input-bordered w-full ${meta.touched && meta.error && "input-error"}`}
                          {...field}
                        />
                      </label>
                    </>
                  )}
                </Field>
              )}

              {values?.thumbnailImageType === "url" && values.thumbnailImage && (
                <div className='mt-2'>
                  <img
                    src={values.thumbnailImage}
                    alt='Thumbnail Image'
                    className='h-24 w-24 rounded-md border border-gray-200 object-contain p-1'
                  />
                </div>
              )}

              {values.thumbnailImageType === "image" && (
                <div className='col-span-2'>
                  <div className='label'>
                    <span className='label-text font-medium'>
                      Upload Image <span className='text-red-500'>*</span>{" "}
                      {uploadImageMsg && <span className='text-sm text-red-600'>({uploadImageMsg})</span>}
                    </span>
                  </div>
                  <ErrorMessage name='image' component='div' className='mt-1 text-red-500' />
                  <ImageDropzoneSingle
                    className='mt-3'
                    value={thumbnailImage}
                    onChange={(image: any) => {
                      setUploadImageMsg("");
                      setThumbnailImage(image);
                    }}
                    size={1024 * 1000}
                    sizeText='1MB'
                  />
                </div>
              )}
            </div>
            <div className='my-8 flex justify-end'>
              <button type='submit' className='btn btn-primary btn-sm rounded-md  ' disabled={isSubmitting}>
                Submit{" "}
                {isSubmitting ? <PiSpinnerLight className='ml-1 animate-spin' /> : <FiCheckCircle className='ml-1' />}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
