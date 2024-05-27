import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userContext } from "@/app/auth/UserContext";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";

const Signup = () => {
  const { curUser, setCurUser } = useContext(userContext);
  const router = useRouter();

  const handleSubmit = async (
    values: {
      profilePic: any;
      fullName: any;
      username: any;
      email: any;
      password: any;
    },
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/signup`,
        {
          profilePic: values.profilePic,
          fullName: values.fullName,
          username: values.username,
          email: values.email,
          password: values.password,
          role: "user",
        }
      );
      const { user, token } = response.data;
      setCurUser!!(user);
      window.localStorage.setItem("token", token);
      router.push("/globe");
    } catch (error: any) {
      setFieldError("general", error.response.data.message);
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), ""], "Passwords must match"),
  });

  return (
    <div className="shadow-md p-12 rounded-md text-white">
      <p className="text-primary text-4xl font-bold mb-10">Sign Up</p>
      <Formik
        initialValues={{
          fullName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          profilePic: "",
          general: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form name="Signup">
            <div className="flex flex-col gap-3.5">
              <Field
                name="profilePic"
                type="file"
                className="self-center w-64 h-12 rounded-full"
              />
              <Field
                name="fullName"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Full Name"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500"
              />
              <Field
                name="username"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Username"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-500"
              />
              <Field
                name="email"
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Email"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500"
              />

              <Field
                name="password"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500"
              />
              <Field
                name="confirmPassword"
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Confirm Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="p"
                className="text-red-500"
              />
              {errors.general && (
                <p className="text-red-500">{errors.general}</p>
              )}

              <button
                type="submit"
                className="self-center shadow-md border-blue-600 border mb-2 py-2 px-3 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner size="sm" aria-label="Signing up..." />
                    <span className="ms-2">Signup...</span>
                  </>
                ) : (
                  "Signup"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-sm text-center">
        Already have an account?{" "}
        <button className="text-blue-600" onClick={() => router.push("/login")}>
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;
