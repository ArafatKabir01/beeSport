"use client";
import { userLoggedIn } from "@/features/auth/authSlice";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const { data: session }: any = useSession();

  useEffect(() => {
    if (session) {
      dispatch(
        userLoggedIn({
          accessToken: session?.accessToken,
          user: {
            id: session.id,
            name: session.name,
            image: session.image,
            email: session.email
          }
        })
      );
    }
  }, [session, dispatch]);
  return <div>{children}</div>;
};
export default dynamic(() => Promise.resolve(Wrapper), {
  ssr: false
});
