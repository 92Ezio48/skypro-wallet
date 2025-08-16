import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Main/Main.module.scss";

const AuthForm = ({ isSignUp }) => {
  const navigate = useNavigate(); // Важный хук для переходов!

  const [loading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    login: false,
    password: false,
  });

  const [error, setError] = useState("");

  const validateForm = (data = formData) => {
    const newErrors = { name: false, login: false, password: false };
    let isValid = true;

    if (isSignUp && !data.name.trim()) {
      newErrors.name = true;
      isValid = false;
    }
    if (!data.login.trim()) {
      newErrors.login = true;
      isValid = false;
    }
    if (!data.password.trim()) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    if (!isValid) setError("Заполните все поля");
    else setError("");
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    if (isSubmitted) {
      validateForm(newFormData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (!validateForm()) return;

    // ⚡❗ Просто навигация БЕЗ API:
    navigate("/");
  };

  const isFormValid =
    (isSignUp ? formData.name.trim() : true) &&
    formData.login.trim() &&
    formData.password.trim();

  return (
    <div className={styles.auth__container}>
      <div className={styles.auth__modal}>
        <div className={styles.auth__wrapper}>
          <h2 className={styles.auth__title}>
            {isSignUp ? "Регистрация" : "Вход"}
          </h2>
          <form className={styles.auth__form} onSubmit={handleSubmit}>
            <div className={styles.auth__input_wrapper}>
              {isSignUp && (
                <input
                  type="text"
                  name="name"
                  placeholder="Имя"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${styles.auth__input}${errors.name ? " " + styles.auth__input_error : ""}`}
                />
              )}
              <input
                type="text"
                name="login"
                placeholder="Эл. почта"
                value={formData.login}
                onChange={handleChange}
                className={`${styles.auth__input}${errors.login ? " " + styles.auth__input_error : ""}`}
              />
              <input
                type="password"
                name="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={handleChange}
                className={`${styles.auth__input}${errors.password ? " " + styles.auth__input_error : ""}`}
              />
            </div>
            {error && <p className={styles.auth__error_text}>{error}</p>}
            <button
              className={styles.auth__button}
              type="submit"
              disabled={!isFormValid || loading}
            >
              {isSignUp ? "Зарегистрироваться" : "Войти"}
            </button>
            {!isSignUp && (
              <div className={styles.auth__group}>
                <p className={styles.auth__text}>Нужно зарегистрироваться?</p>
                <Link className={styles.auth__link} to="/sign-up">
                  Регистрируйтесь здесь
                </Link>
              </div>
            )}
            {isSignUp && (
              <div className={styles.auth__group}>
                <p className={styles.auth__text}>
                  Есть аккаунт?{" "}
                  <Link className={styles.auth__link} to="/sign-in">
                    Войдите здесь
                  </Link>
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
