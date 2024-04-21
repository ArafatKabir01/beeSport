"use client";

import { useState } from "react";
import { Button, Stepper } from "rizzui";
import ForgetOtpInput from "./ForgetOtpInput";
import ForgetPasswordChangeInput from "./ForgetPasswordChangeInput";
import ForgetPhoneInput from "./ForgetPhoneInput";

export default function ForgetPassword({ lang }: { lang: Locale }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <section className='flex min-h-screen flex-col items-center justify-center bg-[#061626]  '>
      <div className='w-[500px]  '>
        <Stepper currentIndex={currentStep} className='w-full'>
          <Stepper.Step title={<span className=' '>Step 1</span>} color='primary' />
          <Stepper.Step title={<span className=' '>Step 2</span>} color='primary' />
          <Stepper.Step title={<span className=' '>Step 3</span>} color='primary' />
        </Stepper>

        <div className='mt-7 flex space-x-4'>
          {currentStep === 3 && (
            <Button
              onClick={() => {
                setCurrentStep(0);
                setCurrentTab(0);
              }}
            >
              Reset
            </Button>
          )}
        </div>
      </div>
      <div className='card w-[500px] bg-[#1C2632] shadow-xl'>
        <ForgetPhoneInput currentTab={currentTab} setCurrentTab={setCurrentTab} setCurrentStep={setCurrentStep} />

        <ForgetOtpInput currentTab={currentTab} setCurrentTab={setCurrentTab} setCurrentStep={setCurrentStep} />

        <ForgetPasswordChangeInput currentTab={currentTab} lang={lang} />
      </div>
    </section>
  );
}
