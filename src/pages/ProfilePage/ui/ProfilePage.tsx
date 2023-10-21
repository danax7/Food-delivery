import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormField from "../components/FormField/FormField";

const ProfilePage = () => {
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      birthdate: "",
      gender: "",
      phone: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      birthdate: Yup.string().required("Required"),
      gender: Yup.string().required("Required"),
      phone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={formik.handleSubmit}>
        <FormField
          label="Full Name"
          id="fullName"
          name="fullName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fullName}
          error={formik.touched.fullName && formik.errors.fullName}
        />
        <FormField
          label="Email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <FormField
          label="Birthdate"
          id="birthdate"
          name="birthdate"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.birthdate}
          error={formik.touched.birthdate && formik.errors.birthdate}
        />
        <FormField
          label="Gender"
          id="gender"
          name="gender"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.gender}
          error={formik.touched.gender && formik.errors.gender}
        />
        <FormField
          label="Phone"
          id="phone"
          name="phone"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          error={formik.touched.phone && formik.errors.phone}
        />
        <button type="submit">Submit data</button>
      </form>
    </div>
  );
};

export default ProfilePage;
