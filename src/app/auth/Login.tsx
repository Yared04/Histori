import React, { useContext } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { userContext } from "@/app/auth/UserContext";
import { useRouter } from "next/navigation";

interface LoginProps {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login = ({ setShowLogin }: LoginProps) => {
  const { curUser, setCurUser } = useContext(userContext);
  const router = useRouter();

  const handleSubmit = async (values: { email: any; password: any; }, { setSubmitting, setErrors }: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/users/login`,
        {
          email: values.email,
          password: values.password,
        }
      );
      const { user, token } = response.data;
      setCurUser(user);
      window.localStorage.setItem("token", token);
      console.log(curUser);
      router.push("/home");
    } catch (error) {
      setErrors({ login: "Invalid email or password" });
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
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form name="login">
            <div className="flex flex-col gap-3.5">
              <Field
                name="email"
                type="email"
                className="bg-transparent h-12 w-64 rounded-md pl-3 outline outline-1 focus:outline-blue-600"
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
                className="bg-transparent h-12 w-64 rounded-md pl-3 outline outline-1 focus:outline-blue-600"
                placeholder="Password"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500"
              />
              <ErrorMessage
                name="login"
                component="p"
                className="text-red-500"
              />

              <button
                type="submit"
                className="self-center shadow-md border-blue-600 border mb-2 py-2 px-3 rounded-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
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

export default Login;
