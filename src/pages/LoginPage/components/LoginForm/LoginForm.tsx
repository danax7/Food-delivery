import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "@/modules/Auth/Model/thunk";
import { AppDispatch, RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import s from "./LoginForm.module.scss";
import { selectIsAuthenticated } from "@/modules/Auth/Model/slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) =>
    selectIsAuthenticated(state)
  );

  console.log("Is Authenticated:", isAuthenticated);

  if (isAuthenticated) {
    navigate("/profile");
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
    }),
    onSubmit: async (values) => {
      try {
        await dispatch(loginUser(values));
      } catch (error) {
        console.error("Login failed:", error);
      }
    },
  });

  return (
    <div className={s.formWrapper}>
      <form onSubmit={formik.handleSubmit} className={s.form}>
        <h2>Авторизация</h2>

        <div className={s.inputGroup}>
          <input
            className={s.inputGroup__input}
            type="email"
            id="email"
            name="email"
            placeholder="&nbsp;"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null} */}
          <label className={s.inputGroup__label} htmlFor="username">
            Email
          </label>
        </div>
        <div className={s.inputGroup}>
          <input
            className={s.inputGroup__input}
            type="password"
            id="password"
            name="password"
            placeholder="&nbsp;"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {/* {formik.touched.password && formik.errors.password ? (
            <div>{formik.errors.password}</div>
          ) : null} */}
          <label className={s.inputGroup__label} htmlFor="password">
            Пароль
          </label>
        </div>

        <button type="submit">Login</button>
        <span>
          Или{" "}
          <u>
            <Link to={"/registration/"}>зарегестрируйтесь</Link>
          </u>
          , если у вас еще нет аккаунта
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
