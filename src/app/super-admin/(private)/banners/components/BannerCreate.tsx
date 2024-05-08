"use client";

import { routes } from "@/config/routes";
import { useAddNewsMutation, useGetAllNewsQuery } from "@/features/super-admin/news/newsApi";
import { useAddBannerMutation } from "@/features/super-admin/banner/bannerApi";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import { PiSpinnerLight } from "react-icons/pi";
import * as Yup from "yup";
import BannerForm from "./BannerForm";

export default function BannerCreate() {
  const router = useRouter();
  const { refetch } = useGetAllNewsQuery(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bannerImage, setBannerImage] = useState(null);
  const [addBanner, { isSuccess: newsSuccess, isError: newsError }] = useAddBannerMutation();

  useEffect(() => {
    if (newsError) {
      setIsSubmitting(false);
      toast.error("Something went wrong!");
    }
    if (newsSuccess) {
      setIsSubmitting(false);
      refetch();
      toast.success("Banner created successfully!");
      router.push(routes.admin.banners.home);
    }
  }, [newsError, newsSuccess, refetch, router]);

  const initialValues = {
    title: "",
    fixtureId : "",
    image: "",
  };

  const newsSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    fixtureId : Yup.string().required("Required!"),
    image: Yup.string().when("imageType", {
      is: "url",
      then: () => Yup.string().url("Provide a valid image url!").required("Required!")
    }),
  });

  // Submit Handler
  const handleSubmit = async (values: any) => {
   
    setIsSubmitting(true);
    let formBody = new FormData();

    formBody.append("title", values?.title);
    formBody.append("fixtureId", values?.fixtureId);
    formBody.append("imageType", values.imageType);
    bannerImage ? formBody.append("image", bannerImage) : formBody.append("imageUrl", values?.image);
    addBanner(formBody);
  };

  return (
    <div className='flex-grow pb-10'>
      <div className='grid grid-cols-1 gap-8 @2xl:gap-10 @3xl:gap-12'>
        <Formik initialValues={initialValues} validationSchema={newsSchema} enableReinitialize onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors }) => {
            return (
              <Form>
                <BannerForm
                  values={values}
                  setFieldValue={setFieldValue}
                  bannerImage={ bannerImage}
                  setBannerImage={setBannerImage}
                />

                <div className='mt-6 flex justify-end'>
                  <button type='submit' className='btn btn-primary btn-sm rounded-md  ' disabled={isSubmitting}>
                    Submit{" "}
                    {isSubmitting ? (
                      <PiSpinnerLight className='ml-1 animate-spin' />
                    ) : (
                      <FiCheckCircle className='ml-1' />
                    )}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
}
