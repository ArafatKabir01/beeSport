"use client";

import { routes } from "@/config/routes";
import { useGetAllNewsQuery, useGetNewsQuery, useUpdateNewsMutation } from "@/features/super-admin/news/newsApi";
import { useGetSingleBannerQuery, useUpdateBannerMutation } from "@/features/super-admin/banner/bannerApi";
import { Form, Formik } from "formik";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FiCheckCircle } from "react-icons/fi";
import { PiSpinnerLight } from "react-icons/pi";
import * as Yup from "yup";
import NewsForm from "./BannerForm";

export default function BannerUpdate({ bannerId }: { bannerId: number }) {
  const router = useRouter();
  const { data, isLoading } = useGetSingleBannerQuery(bannerId);
  const { refetch } = useGetAllNewsQuery(undefined);
  const [bannerImage, setBannerImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateBanner, { isSuccess: newsSuccess, isError: newsError }] = useUpdateBannerMutation();
  const [initialValues, setInitialValues] = useState({
    title: "",
    fixtureId : "",
    image: "",
    imageType : "url"
  });

  useEffect(() => {
    if (!isLoading) {
      const news = data?.data;
      setInitialValues((prev) => {
        return {
          ...prev,
          ...news,
          publishDate: news?.publishDate ? moment(news?.publishDate).format("YYYY-MM-DD") : ""
        };
      });
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (newsError) {
      setIsSubmitting(false);
      toast.error("Something went wrong!");
    }
    if (newsSuccess) {
      setIsSubmitting(false);
      refetch();
      toast.success("Banner updated successfully!");
      router.push(routes.admin.banners.home);
    }
  }, [newsError, newsSuccess, refetch, router]);

  const newsSchema = Yup.object().shape({
    title: Yup.string().required("Required!"),
    fixtureId : Yup.string().required("Required!"),
    image: Yup.string().when("imageType", {
      is: "url",
      then: () => Yup.string().url("Provide a valid image url!").required("Required!")
    }),
  });

  // News Handler
  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    let formBody = new FormData();

    formBody.append("title", values?.title);
    formBody.append("imageType", values.imageType);
    formBody.append("fixtureId", values?.fixtureId);
    bannerImage ? formBody.append("image", bannerImage) : formBody.append("imageUrl", values?.image);
  

    updateBanner({
      id: bannerId,
      data: formBody
    });
  };

  return (
    <div className='flex-grow pb-10'>
      <div className='grid grid-cols-1 gap-8 @2xl:gap-10 @3xl:gap-12'>
        <Formik initialValues={initialValues} validationSchema={newsSchema} enableReinitialize onSubmit={handleSubmit}>
          {({ values, setFieldValue, errors }) => {
            return (
              <Form>
                <NewsForm
                  values={values}
                  setFieldValue={setFieldValue}
                  bannerImage={bannerImage}
                  setBannerImage={setBannerImage}
                />

                <div className='mt-6 flex justify-end'>
                  <button type='submit' className='btn btn-primary btn-sm rounded-md  ' disabled={isSubmitting}>
                    Update{" "}
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
