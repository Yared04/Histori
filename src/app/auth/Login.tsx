import React, { useContext, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userContext } from "@/app/auth/UserContext";
import { useRouter } from "next/navigation";
import { Spinner } from "flowbite-react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setShowLogin }: LoginProps) => {
  const { curUser, setCurUser } = useContext(userContext);
  const router = useRouter();

  const handleSubmit = async (
    values: { email: any; password: any },
    { setSubmitting, setFieldError }: any
  ) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
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
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div className="shadow-md p-12 rounded-md text-white">
      <p className="text-primary text-4xl font-bold mb-10">Log In</p>
      <Formik
        initialValues={{ email: "", password: "", general: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors }) => (
          <Form name="login">
            <div className="flex flex-col gap-3.5">
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

              <Field name="password" component={PasswordInput} />
              <ErrorMessage
                name="password"
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
                    <Spinner size="sm" aria-label="Logging in..." />
                    <span className="ms-2">Logging in...</span>
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <p className="text-sm text-center">
        Don&apos;t have an account?{" "}
        <button className="text-blue-600" onClick={() => setShowLogin(false)}>
          Register
        </button>
      </p>
    </div>
  );
};

const PasswordInput = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative">
      <Field
        name="password"
        type={showPassword ? "text" : "password"}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Password"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
      >
        {showPassword ? <BiSolidHide color="black" /> : <BiSolidShow color="black" />}
      </button>
    </div>
  );
};

export default Login;
