import { Password } from "@/components/ui/password";
import { routes } from "@/config/routes";
import { useChangeForgetPasswordMutation } from "@/features/auth/authApi";
import { userForgetPhone } from "@/features/auth/authSlice";
import { RootState } from "@/features/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { PiSpinnerLight } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";

export default function ForgetPasswordChangeInput({ currentTab, lang }: { currentTab: number; lang: Locale }) {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { forgetPhone } = useSelector((state: RootState) => state.authSlice);
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordValidMsg, setNewPasswordValidMsg] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordValidMsg, setConfirmPasswordValidMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [changeForgetPassword, { data: changeResponse, isSuccess, isError }] = useChangeForgetPasswordMutation();

  // Handle Change Forget Password Response
  useEffect(() => {
    if (isError) {
      setSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }

    if (isSuccess) {
      setSubmitting(false);

      if (changeResponse?.status) {
        toast.success(changeResponse?.message);
        dispatch(userForgetPhone(""));
        push(routes.signIn);
      } else {
        toast.error(changeResponse?.message);
      }
    }
  }, [changeResponse, dispatch, isError, isSuccess, lang, push]);

  // Submit Handler
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setNewPasswordValidMsg("");
    setConfirmPasswordValidMsg("");

    if (!newPassword) {
      setNewPasswordValidMsg("Required!");
      return;
    }

    if (newPassword.length < 8) {
      setNewPasswordValidMsg("Password length at least 8 characters!");
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordValidMsg("Required!");
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordValidMsg("Confirm password must be equal to new password!");
      return;
    }

    setSubmitting(true);

    if (forgetPhone && newPassword) {
      changeForgetPassword({
        phone: forgetPhone,
        newPassword
      });
    }
  };

  return (
    <div className={`card-body ${currentTab === 2 ? "" : "hidden"}`}>
      <h2 className='mb-5 text-center text-xl font-semibold'>Change Password</h2>

      <form onSubmit={submitHandler}>
        <div className='card-actions'>
          <div className='mt-3 w-full'>
            <Password
              size='lg'
              label={
                <p>
                  New Password<span className='font-bold text-red-600'> *</span>
                </p>
              }
              variant='outline'
              color='primary'
              labelClassName='text-base'
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
            />
            {newPasswordValidMsg && (
              <p className='mt-1 select-none px-1 font-medium text-error'>{newPasswordValidMsg}</p>
            )}
          </div>
          <div className='mt-3 w-full'>
            <Password
              size='lg'
              label={
                <p>
                  Confirm Password
                  <span className='font-bold text-red-600'> *</span>
                </p>
              }
              variant='outline'
              color='primary'
              labelClassName='text-base'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {confirmPasswordValidMsg && (
              <p className='mt-1 select-none px-1 font-medium text-error'>{confirmPasswordValidMsg}</p>
            )}
          </div>
          <button type='submit' className='btn btn-primary mt-5 w-full' disabled={submitting}>
            Next
            {submitting && <PiSpinnerLight className='animate-spin text-base' />}
          </button>
        </div>
      </form>
      <div className='mt-5 flex select-none items-center justify-center'>
        <Link href='/' className='flex items-center transition-all duration-150 ease-in hover:text-primary'>
          <HiOutlineArrowSmLeft className='mr-3 text-xl' /> Go to Home
        </Link>
      </div>
    </div>
  );
}
