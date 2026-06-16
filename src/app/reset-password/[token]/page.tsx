"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { AppDispatch } from "../../store/auth/store";
import { resetPassword } from "../../../app/store/auth/action/resetPasswordAction";

const ResetPasswordPage = () => {
  const { token } = useParams(); // Next.js dynamic route param
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { loading, message } = useSelector(
    (state: any) => state.resetPasswordState,
  );

  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required("New password is required")
      .min(8, "Must be 8+ characters")
      .matches(/[A-Z]/, "Must contain one uppercase")
      .matches(/[0-9]/, "Must contain one number")
      .matches(/[!@#$%^&*]/, "Must contain one special character"),
  });

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    const success = await dispatch(
      resetPassword(token as string, values.newPassword) as any,
    );
    if (success) {
      setTimeout(() => router.push("/screens/auth/LoginScreen"), 2000);
    }
    setSubmitting(false);
  };

  if (message) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div className="max-w-sm">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Success!</h2>
          <p className="text-slate-600">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col p-6 pt-10">
      <div className="max-w-md w-full mx-auto pt-10">
        <h1 className="text-3xl font-extrabold text-[#0A1629] mb-8">
          Reset Password
        </h1>

        <Formik
          initialValues={{ newPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-bold text-[#0A1629] mb-2">
                  New Password
                </label>
                <div className="flex items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl px-4 h-[56px] focus-within:ring-2 focus-within:ring-[#6D28D9]">
                  <Lock size={20} className="text-[#64748B]" />
                  <Field
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="flex-1 ml-3 bg-transparent outline-none text-[#0A1629]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="text-red-500 text-xs mt-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading || isSubmitting}
                className="w-full h-[56px] rounded-2xl bg-[#6D28D9] text-white font-bold hover:opacity-90 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Reset Password"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
