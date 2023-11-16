import React, { useState } from "react";
import Button from "../Button/Button";
import styles from "./AuthForm.module.scss";
import { isEqual } from "lodash"

const AuthForm: React.FC = () => {

  const [value, setValue] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");

  const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const regPassword = /^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).{1,15}$/;
  type dataType = {
    email: string;
    password: string;
  }
  const data = {
    email: "test@test.ru",
    password: "Password123"
  } as dataType

  const onChange = (e: React.FormEvent<HTMLInputElement>, type: "email" | "password") => {
    const value = e.currentTarget.value
    switch (type) {
      default: {
        setValue((val) => { return { ...val, [type]: value } });
        break;
      }
    }
  };

  const getData = () => new Promise((resolve, reject) => {
    setLoading(true);
    setTimeout(() => {
      if (isEqual(value, data)) {
        resolve(
          { message: "success", data }
        )
      } else {
        reject({ message: "error", data: null })
      }
      setLoading(false);
    }, 2000);
  })

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = value;
    if (email && password) {
      await getData().then((data) => {
        setMessage((data as any).message)

      }).catch((error) => {
        setMessage(error.message)
      });
    }

  }

  const disableButton = !value.email.match(regEmail) || !value.password.match(regPassword)

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.form__inputs}>
        <div>{message}</div>
        <input
          type="email"
          className={styles[`${value.email.match(regEmail) || !value.email ? "input-valid" : "input"}`]}
          placeholder="Введите почту"
          onChange={(e) => onChange(e, "email")}
        />
        <input
          type="password"
          className={styles[`${value.password.match(regPassword) || !value.password ? "input-valid" : "input"}`]}
          placeholder="Введите пароль"
          onChange={(e) => onChange(e, "password")}
        />
      </div>
      <div className={styles.form__btns}>
        <Button className={styles.button} label="Забыл пароль" onClick={() => setShowInfo(!showInfo)} />
        <Button className={styles.button} label="Войти" disabled={loading || disableButton} />
      </div>
      {showInfo && <div className={styles.info}>
        <div>email: test@test.ru</div>
        <div>password: Password123</div>
      </div>}
    </form>
  )
};

export default AuthForm;