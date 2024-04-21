import { useForgetPasswordMutation } from '@/features/auth/authApi';
import { userForgetPhone } from '@/features/auth/authSlice';
import { useGetAllowedStatesQuery } from '@/features/front-end/settings/settingsApi';
import { RootState } from '@/features/store';
import { CountryCode, isValidPhoneNumber } from 'libphonenumber-js';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiOutlineArrowSmLeft } from 'react-icons/hi';
import { PiSpinnerLight } from 'react-icons/pi';
import { useDispatch, useSelector } from 'react-redux';
import { PhoneNumber } from './PhoneNumber';

export default function ForgetPhoneInput({
  currentTab,
  setCurrentStep,
  setCurrentTab,
}: {
  currentTab: number;
  setCurrentStep: any;
  setCurrentTab: any;
}) {
  const dispatch = useDispatch();
  const { forgetPhone } = useSelector((state: RootState) => state.authSlice);
  const [country, setCountry] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [phoneValidMsg, setPhoneValidMsg] = useState('');
  const [countryCode, setCountryCode] = useState<any>('');

  const { data: allowedCountries, isLoading } =
    useGetAllowedStatesQuery(undefined);

  const [
    forgetPassword,
    { data: forgetResponse, isSuccess: forgetSuccess, isError: forgetError },
  ] = useForgetPasswordMutation();

  // Handle Forget Password Response
  useEffect(() => {
    if (forgetError) {
      setSubmitting(false);
      toast.error('Something went wrong! Try Again');
    }

    if (forgetSuccess) {
      setSubmitting(false);

      if (forgetResponse?.status) {
        setCurrentStep((prev: number) => prev + 1);
        setCurrentTab((prev: number) => prev + 1);
        toast.success(forgetResponse?.message);
      } else {
        toast.error(forgetResponse?.message);
      }
    }
  }, [
    forgetError,
    forgetResponse,
    forgetSuccess,
    setCurrentStep,
    setCurrentTab,
  ]);

  // Submit Handler
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setPhoneValidMsg('');

    if (
      !forgetPhone ||
      !country ||
      forgetPhone.length <= dialCode.length ||
      !isValidPhoneNumber(forgetPhone.replace(dialCode, ''), countryCode)
    ) {
      setSubmitting(false);
      setPhoneValidMsg('Valid phone number is required!');
      return;
    }

    forgetPassword({
      phone: forgetPhone,
    });
  };

  return (
    <div className={`card-body ${currentTab === 0 ? '' : 'hidden'}`}>
      <h2 className="mb-5 text-center text-xl font-semibold">
        Forgot Password?
      </h2>

      <form onSubmit={submitHandler}>
        {isLoading ? (
          <div>
            <div className="mb-2 h-6 w-full max-w-36 animate-pulse rounded-md bg-[#061626]"></div>
            <div className="h-12 w-full animate-pulse rounded bg-[#061626]"></div>
          </div>
        ) : (
          <div>
            <PhoneNumber
              label="Phone Number"
              size="lg"
              country={allowedCountries?.data[0]}
              onlyCountries={allowedCountries?.data}
              dropdownClassName="text-black"
              requiredStar={true}
              labelClassName="text-base"
              color="primary"
              variant="outline"
              onChange={(
                phone,
                country: {
                  name: string;
                  countryCode: CountryCode;
                  dialCode: string;
                }
              ) => {
                setPhoneValidMsg('');
                dispatch(userForgetPhone(phone));
                setCountry(country?.name);
                setCountryCode(country?.countryCode.toUpperCase());
                setDialCode(country?.dialCode);
              }}
              value={forgetPhone}
            />
            {phoneValidMsg && (
              <p className="mt-1 select-none px-1 font-medium text-error">
                {phoneValidMsg}
              </p>
            )}
          </div>
        )}

        <div className="card-actions mt-5 justify-end">
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={submitting}
          >
            Next
            {submitting && (
              <PiSpinnerLight className="animate-spin text-base" />
            )}
          </button>
        </div>
      </form>
      <div className="mt-5 flex select-none items-center justify-center">
        <Link
          href="/"
          className="flex items-center transition-all duration-150 ease-in hover:text-primary"
        >
          <HiOutlineArrowSmLeft className="mr-3 text-xl" /> Go to Home
        </Link>
      </div>
    </div>
  );
}
