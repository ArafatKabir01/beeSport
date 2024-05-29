"use client";

import { routes } from "@/config/routes";
import { useLoginWithPhoneMutation, useUserRegisterMutation } from "@/features/auth/authApi";
import { userLoggedIn } from "@/features/auth/authSlice";
import { useGetAllowedStatesQuery } from "@/features/front-end/settings/settingsApi";

import { TModalElementType } from "@/types";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineArrowSmLeft } from "react-icons/hi";
import { PiSpinnerLight } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { ActionIcon, Input, Modal, Password } from "rizzui";
import OtpModal from "./OtpModal";

export default function AuthModal({ modalState, setModalState }: { modalState: boolean; setModalState: any }) {
  // const [socialLoginLoading, setSocialLoginLoading] = useState(false);

  // const handleGoogleSignIn = async () => {
  //   try {
  //     setSocialLoginLoading(true);
  //     await signIn("google");
  //     setSocialLoginLoading(false);
  //   } catch (error) {
  //     console.error("Error during Google sign-in:", error);
  //     setSocialLoginLoading(false);
  //   }
  // };

  const { replace } = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState<any>("");
  const [dialCode, setDialCode] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [emailValidMsg, setEmailValidMsg] = useState("");
  const [nameValidMsg, setNameValidMsg] = useState("");
  const [passwordValidMsg, setPasswordValidMsg] = useState("");
  const [signUp, setSignUp] = useState(false);

  const [loginWithPhone, { data: loginResponse, isSuccess: loginSuccess, isError: loginError }] =
    useLoginWithPhoneMutation();

  const [userRegister, { data: registerResponse, isSuccess: registerSuccess, isError: registerError }] =
    useUserRegisterMutation();

  const { data: allowedCountries, isLoading } = useGetAllowedStatesQuery(undefined);

  const [socialLoginLoading, setSocialLoginLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setSocialLoginLoading(true);
      await signIn("google");

      setSocialLoginLoading(false);
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      setSocialLoginLoading(false);
    }
  };

  // Handle Register Response
  useEffect(() => {
    if (registerError) {
      setSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }

    if (registerSuccess) {
      setSubmitting(false);

      if (registerResponse?.status) {
        toast.success("Otp send successfully");
        const modal = document.getElementById("otpModalVerify") as TModalElementType;

        if (modal) {
          modal.showModal();
        }
      } else {
        toast.error(registerResponse?.message);
      }
    }
  }, [registerError, registerSuccess, registerResponse]);

  // Handle Login Response
  useEffect(() => {
    if (loginError) {
      setSubmitting(false);
      toast.error("Something went wrong! Try Again");
    }

    if (loginSuccess) {
      if (loginResponse?.status) {
        localStorage.setItem("accessToken", loginResponse?.data?.accessToken);
        dispatch(
          userLoggedIn({
            accessToken: loginResponse?.data?.accessToken,
            user: loginResponse?.data
          })
        );

        signIn("credentials", {
          userData: JSON.stringify(loginResponse?.data),
          adminLogin: false,
          redirect: false
        }).then((callback) => {
          if (callback?.error) {
            setSubmitting(false);
            toast.error(callback?.error);
          }
          if (callback?.ok && !callback?.error) {
            toast.success(loginResponse?.message);
            // replace(routes.home);
            setModalState(false);
          }
        });
      } else {
        setSubmitting(false);
        toast.error(loginResponse?.message);
      }
    }
  }, [loginError, loginSuccess, loginResponse, replace, dispatch, setModalState]);

  // Submit Handler
  const signInHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setEmailValidMsg("");
    setNameValidMsg("");
    setPasswordValidMsg("");

    // if (
    //   !phone ||
    //   !country ||
    //   phone.length <= dialCode.length ||
    //   !isValidPhoneNumber(phone.replace(dialCode, ""), countryCode)
    // ) {
    //   setSubmitting(false);
    //   setPhoneValidMsg("Valid phone number is required!");
    //   return;
    // }

    if (!email) {
      setSubmitting(false);
      setEmailValidMsg("Email is required!");
      return;
    }

    if (signUp && !name) {
      setSubmitting(false);
      setNameValidMsg("Name is required!");
      return;
    }

    if (!password) {
      setSubmitting(false);
      setPasswordValidMsg("Password is required!");
      return;
    }

    if (signUp && password.length < 8) {
      setSubmitting(false);
      setPasswordValidMsg("Password length at least 8 characters!");
      return;
    }

    if (signUp) {
      userRegister({
        name,
        email,
        password,
        country,
        provider: "email"
      });
    } else {
      loginWithPhone({
        email,
        password
      });
    }
  };
  return (
    <>
      <Modal size='sm' isOpen={modalState} onClose={() => setModalState(false)}>
        {/* <div className='m-auto px-7 pt-6 pb-8'>
          <div className='mb-7 flex items-center justify-end'>
            <ActionIcon size='sm' variant='text' onClick={() => setModalState(false)}>
              <RxCross2 strokeWidth={1.2} />
            </ActionIcon>
          </div>
          <div className='grid grid-cols-2 gap-y-6 gap-x-5 [&_label>span]:font-medium'>
            <Input label='Name *' placeholder='Name' inputClassName='border-2' size='lg' className='col-span-2' />
            <Input label='Email *' placeholder='Email' inputClassName='border-2' size='lg' className='col-span-2' />
            <Password
              label='Password *'
              placeholder='Password'
              inputClassName='border-2'
              size='lg'
              className='col-span-2'
            />

            <Button
              type='submit'
              onClick={() => setModalState(false)}
              size='lg'
              className='bg-[#EE1E46] col-span-2 mt-2 text-white hover:bg-black'
            >
              Create an Account
            </Button>
          </div>
          <div className='mt-5 flex select-none items-center justify-center'>
            <button
              type='button'
              className='btn btn-md hover:bg-black border-black hover:text-white text-black font-normal w-full mt-3 rounded-md'
              disabled={socialLoginLoading}
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> <span className=' hover:text-white'>{"Sign In With Google"} </span>
            </button>
          </div>
        </div> */}

        <section className='flex items-center justify-center'>
          <div className='card w-[350px] lg:w-[500px]  shadow-xl'>
            <div className='card-body'>
              <div className='ml-7 flex items-center justify-end'>
                <ActionIcon size='sm' variant='text' onClick={() => setModalState(false)}>
                  <RxCross2 strokeWidth={1.2} />
                </ActionIcon>
              </div>
              <h2 className='mb-5 text-center text-xl font-semibold'>{signUp ? "Sign Up" : "Sign In"}</h2>
              <form onSubmit={signInHandler}>
                {isLoading ? (
                  <div>
                    <div className='mb-2 h-6 w-full max-w-36 animate-pulse rounded-md bg-[#061626]'></div>
                    <div className='h-12 w-full animate-pulse rounded bg-[#061626]'></div>
                  </div>
                ) : (
                  <div>
                    {signUp && (
                      <div>
                        <Input
                          onChange={(e) => {
                            setName(e.target.value);
                            setNameValidMsg("");
                          }}
                          type='text'
                          label={
                            <p>
                              Name<span className='font-bold text-red-600'> *</span>
                            </p>
                          }
                          placeholder='Enter your name'
                          className='py-3'
                        />
                        {nameValidMsg && <p className='mt-1 select-none px-1 font-medium text-error'>{nameValidMsg}</p>}
                      </div>
                    )}
                    <Input
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setEmailValidMsg("");
                      }}
                      type='email'
                      label={
                        <p>
                          Email<span className='font-bold text-red-600'> *</span>
                        </p>
                      }
                      placeholder='Enter your email'
                    />
                    {emailValidMsg && <p className='mt-1 select-none px-1 font-medium text-error'>{emailValidMsg}</p>}
                  </div>
                )}

                <div className='mt-3'>
                  <Password
                    size='lg'
                    label={
                      <p>
                        Password<span className='font-bold text-red-600'> *</span>
                      </p>
                    }
                    variant='outline'
                    color='primary'
                    placeholder='Enter your password'
                    labelClassName='text-base'
                    onChange={(e) => {
                      setPasswordValidMsg("");
                      setPassword(e.target.value);
                    }}
                  />
                  {passwordValidMsg && (
                    <p className='mt-1 select-none px-1 font-medium text-error'>{passwordValidMsg}</p>
                  )}
                </div>

                <div className='card-actions mt-5 justify-end'>
                  <button type='submit' className='btn btn-primary w-full' disabled={submitting}>
                    {signUp ? "Sign Up" : "Sign In"}{" "}
                    {submitting && <PiSpinnerLight className='animate-spin text-base' />}
                  </button>
                </div>
              </form>
              {!signUp && (
                <div className='mt-1'>
                  <Link href={routes.forgetPassword} className='text-primary'>
                    Forgot Password?
                  </Link>
                </div>
              )}
              <div className='divider select-none'>OR</div>
              <div className='card-actions justify-end'>
                <button onClick={() => setSignUp((prev) => !prev)} className='btn btn-outline btn-primary w-full'>
                  {signUp ? "Sign In" : "Sign Up"}
                </button>
              </div>
              <div className='mt-5 flex select-none items-center justify-center'>
                <Link
                  href={routes.home}
                  className='flex items-center transition-all duration-150 ease-in hover:text-primary'
                >
                  <HiOutlineArrowSmLeft className='mr-3 text-xl' /> Go to Home
                </Link>
              </div>
              <div className='mt-5 flex select-none items-center justify-center'>
                <button
                  type='button'
                  className='btn btn-md hover:bg-[#2F62D9] border-[#2F62D9] hover:text-white text-black font-normal w-full mt-3 rounded-md'
                  disabled={socialLoginLoading}
                  onClick={handleGoogleSignIn}
                >
                  <FcGoogle /> <span className=' hover:text-white'>{"Sign In With Google"} </span>
                </button>
              </div>
            </div>
          </div>

          {/* Otp Modal */}
          <OtpModal email={email} />
        </section>
      </Modal>
    </>
  );
}
