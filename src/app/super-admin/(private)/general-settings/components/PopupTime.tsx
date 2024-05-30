import { Field } from "formik";
import FormBlockWrapper from "../../components/FormBlockWrapper";

export const PopupTime = ({ value, setFieldValue }: any) => {
  return (
    <FormBlockWrapper title='PopUp Time Setting'>
      <div className='grid grid-cols-1 gap-4 gap-y-2 md:grid-cols-3'>
        <div>
          <h2 className='text-xl font-bold'>Guest User</h2>
          <Field name='GUEST_POPUP_INTERVAL'>
            {({ field, meta }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>GUEST_POPUP_INTERVAL</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>

          <Field name='GUEST_POPUP_DURATION'>
            {({ field }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>GUEST_POPUP_DURATION</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>

          <Field name='GUEST_FREE_WATCH_LIMIT'>
            {({ field }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>GUEST_FREE_WATCH_LIMIT</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>
        </div>
      </div>

      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        <div>
          <h2 className='text-xl font-bold'>Login User</h2>
          <Field name='Login_POPUP_INTERVAL'>
            {({ field }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>LOGGED_IN_POPUP_INTERVAL</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>
          <Field name='Login_POPUP_DURATION'>
            {({ field }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>LOGGED_IN_POPUP_DURATION</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>
          <Field name='Login_FREE_WATCH_LIMIT'>
            {({ field }: { field: any; meta: any }) => (
              <label className='form-control w-full'>
                <div className='label'>
                  <span className='label-text font-semibold'>LOGGED_IN_FREE_WATCH_LIMIT</span>
                </div>
                <input type='text' className='input input-bordered w-full' {...field} />
              </label>
            )}
          </Field>
        </div>
      </div>
    </FormBlockWrapper>
  );
};
