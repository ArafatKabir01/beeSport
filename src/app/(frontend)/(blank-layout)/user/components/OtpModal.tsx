import { routes } from "@/config/routes";
import { useResendOtpMutation, useVerifyPhoneMutation } from "@/features/auth/authApi";
import { userLoggedIn } from "@/features/auth/authSlice";
import { TModalElementType } from "@/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiSpinnerLight } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { PinCode } from "rizzui";

export default function OtpModal({ email }: { email: string }) {
  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState<SetStateAction<string | number | undefined>>("");
  const [otpSubmitting, setOtpSubmitting] = useState(false);
  const [resendOtpSubmitting, setResendOtpSubmitting] = useState(false);
  const [otpValidMsg, setOtpValidMsg] = useState("");

  const [verifyPhone, { data: responseData, isSuccess, isError }] = useVerifyPhoneMutation();

  const [resendOtp, { data: resendResponse, isSuccess: resendSuccess, isError: resendError }] = useResendOtpMutation();

  // Handle Otp Response
  useEffect(() => {
    if (isError) {
      setOtpSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }

    if (isSuccess) {
      if (!responseData?.status) {
        setOtpSubmitting(false);
        setOtpValidMsg(responseData?.message);
      } else {
        localStorage.setItem("accessToken", responseData?.data?.accessToken);
        dispatch(
          userLoggedIn({
            accessToken: responseData?.data?.accessToken,
            user: responseData?.data
          })
        );

        signIn("credentials", {
          userData: JSON.stringify(responseData?.data),
          adminLogin: false,
          redirect: false
        }).then((callback) => {
          if (callback?.error) {
            setOtpSubmitting(false);
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success(responseData?.message);
            replace(routes.home);
            const modal = document.getElementById("otpModalVerify") as TModalElementType;

            if (modal) {
              modal.close();
            }
          }
        });
      }
    }
  }, [dispatch, isError, isSuccess, replace, responseData]);

  // Handle Resend Response
  useEffect(() => {
    if (resendError) {
      setResendOtpSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }

    if (resendSuccess) {
      if (!resendResponse?.status) {
        setResendOtpSubmitting(false);
        toast.error(resendResponse?.message);
      } else {
        setResendOtpSubmitting(false);
        toast.success(resendResponse?.message);
      }
    }
  }, [resendError, resendResponse, resendSuccess]);

  // Handler Otp Submit
  const otpSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSubmitting(true);
    setOtpValidMsg("");

    if (typeof otp === "string") {
      if (otp.length < 6) {
        setOtpSubmitting(false);
        setOtpValidMsg("Please, Enter Valid OTP!");
      } else {
        verifyPhone({
          email,
          otp
        });
      }
    } else {
      setOtpValidMsg("Please, Enter Valid OTP!");
    }
  };

  // Handle Resend Otp Submit
  const handleResendOtp = () => {
    setResendOtpSubmitting(true);

    resendOtp({
      email,
      context: "verify_code"
    });
  };

  return (
    <dialog id='otpModalVerify' className='modal'>
      <div className='modal-box bg-[#1C2632]'>
        <h3 className='text-lg font-bold'>OTP Verification!</h3>
        <div className='py-4'>
          <div className='label mb-4'>
            <span className='text-sm font-semibold  '>
              We sent an OTP to your email ({email}). You have 2 minutes to complete this verification. Thank you!
            </span>
          </div>
          <form onSubmit={otpSubmitHandler}>
            <div>
              <PinCode length={6} setValue={(input) => setOtp(input)} />
            </div>
            {otpValidMsg && <p className='mt-4 px-1 text-center font-medium text-error'>{otpValidMsg}</p>}
            <div className='mt-10 grid grid-cols-12 items-center'>
              <div className='col-span-8'>
                <p className='flex select-none items-center'>
                  Didn{"'"}t get any otp yet?{" "}
                  <span
                    className={`${
                      resendOtpSubmitting && "pointer-events-none"
                    } ml-1 cursor-pointer font-semibold text-primary`}
                    onClick={handleResendOtp}
                  >
                    Resend OTP
                  </span>
                  {resendOtpSubmitting && <PiSpinnerLight size={20} className='ml-1 animate-spin' />}
                </p>
              </div>
              <div className='col-span-4 text-right'>
                <button className='btn btn-primary btn-sm' disabled={otpSubmitting}>
                  Submit {otpSubmitting && <PiSpinnerLight size={20} className='animate-spin' />}
                </button>
              </div>
            </div>
          </form>
        </div>

        <form method='dialog'>
          <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
        </form>
      </div>
    </dialog>
  );
}
