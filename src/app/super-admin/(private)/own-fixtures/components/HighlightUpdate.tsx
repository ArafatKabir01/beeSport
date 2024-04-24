"use client";

import ImageDropzoneSingle from "@/components/image-dropzone-single";
import { routes } from "@/config/routes";
import { useGetHighlightQuery, useUpdateHighlightMutation } from "@/features/super-admin/highlight/highlightApi";
import { useGetFixtureByIdQuery, useUpdateFixtureMutation } from "@/features/super-admin/fixture/fixtureApi";
import "flatpickr/dist/flatpickr.css";
import "flatpickr/dist/themes/dark.css";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";
import { PiSpinnerLight } from "react-icons/pi";
import * as Yup from "yup";

export default function HighlightUpdate({ highlightId }: { highlightId: number }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadImageMsg, setUploadImageMsg] = useState("");
  const [thumbnailImage, setThumbnailImage] = useState("");
  const [updateHighlight, { isError, isSuccess }] = useUpdateHighlightMutation();
  const [updateFixture] = useUpdateFixtureMutation();
  const {data : fixture, isSuccess : isFixtureSuccess} = useGetFixtureByIdQuery(highlightId);
  const { isLoading, data } = useGetHighlightQuery(highlightId);
  const [initialValues, setInitialValues] = useState({
    title: "",
    // category: "",
    // date: "",
    fixtureId: "",
    fixtureType: "",
    // youtubeUrl: "",
    // sources: [""],
    // thumbnailImageType: "",
    // thumbnailImage: "",
    status: "1"
  });

  console.log("fixtu", fixture);

  useEffect(() => {
    if (isFixtureSuccess) {
      // const highlightData = data?.data;
      setInitialValues((prev) => {
        return {
          ...prev,
          title : fixture?.data?.name,
          fixtureId : fixture?.data?.fixtureId,
          fixtureType: fixture?.data?.matchType,
          status: fixture?.data?.status
          // ...highlightData,
          // date: highlightData?.date ? moment(highlightData?.date).format("YYYY-MM-DD") : ""
        };
      });
    }
  }, [fixture, isFixtureSuccess]);

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    // category: Yup.string().required("Required!"),
    // date: Yup.string().required("Required!"),
    fixtureId: Yup.string().required("Required!"),
    fixtureType: Yup.string().required("Required!"),
    // thumbnailImageType: Yup.string().required("Required!")
  });

  const handleSubmit = async(values: any) => {
    setIsSubmitting(true);
    // let formBody = new FormData();

    // formBody.append("title", values?.title);
    // formBody.append("category", values?.category);
    // formBody.append("date", values?.date);
    // formBody.append("fixtureId", values?.fixtureId);
    // formBody.append("videoType", values?.videoType);
    // formBody.append("youtubeUrl", values?.youtubeUrl);
    // formBody.append("sources", JSON.stringify(values?.sources));
    // formBody.append("status", values?.status);
    // formBody.append("thumbnailImageType", values?.thumbnailImageType);

    // thumbnailImage
    //   ? formBody.append("thumbnailImage", thumbnailImage)
    //   : formBody.append("thumbnailImageUrl", values?.thumbnailImage);

    // updateHighlight({ id: highlightId, data: formBody });
    const res : any = await updateFixture({id : highlightId, data : {name : values?.title, status : values?.status, matchType : values?.fixtureType}})
    if(res?.data?.status){
      toast.success(res?.data?.message);
      router.push("/super-admin/own-fixtures");
    }else{
      toast.error('Something went wrong!');
    }
  };

  useEffect(() => {
    if (isError) {
      setIsSubmitting(false);
      toast.error("Something went wrong!");
    }

    if (isSuccess) {
      toast.success("Highlight updated successfully!");
      router.replace(routes.admin.highlights.home);
    }
  }, [isError, isSuccess, router]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
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

              {/* <Field name='date'>
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
              </Field> */}

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
                        Category{" "}
                        <span className='text-red-600'>
                          * {meta.touched && meta.error && <span>({meta.error})</span>}
                        </span>
                      </span>
                    </div>
                    <select className='select select-bordered' {...field}>
                      <option value='football'>Football</option>
                      <option value='cricket'>Cricket</option>
                    </select>
                  </label>
                )}
              </Field> */}

              <Field name='fixtureType'>
                {({ field, meta }: { field: any; meta: any }) => (
                  <label className='form-control col-span-2'>
                    <div className='label'>
                      <span className='label-text font-semibold'>
                        Fixture Type{" "}
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
                      <option value='hot'>Hot</option>
                      <option value='normal'>Normal</option>
                    </select>
                  </label>
                )}
              </Field>

              {/* {values.videoType === "youtube" && (
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
                        value={values.youtubeUrl}
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

              {values?.thumbnailImageType === "image" && values.thumbnailImage && (
                <div className='mt-2 flex items-center gap-3'>
                  <img
                    src={values.thumbnailImage}
                    alt='Uploaded Image'
                    className='h-24 w-24 rounded-md border border-gray-200 object-contain p-1'
                  />
                  <button
                    type='button'
                    className='rounded bg-red-500 p-1'
                    onClick={() => setFieldValue("thumbnailImage", "")}
                  >
                    <FaTrashAlt className='hover:fill-secondary-400 h-5 w-5 fill-white transition-colors' />
                  </button>
                </div>
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

              {values.thumbnailImageType === "image" && values.thumbnailImage === "" && (
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
              )} */}
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
