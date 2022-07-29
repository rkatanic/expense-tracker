import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import Input from "./Input";
import Button from "./Button";
import AbstractLine from "../assets/abstract-line.svg";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { authUser, signIn } = useAuth();

  const onSubmit = (event: any): void => {
    setError(null);
    signIn(email, password)
      .then(() => {
        router.push("/home");
      })
      .catch((error: any) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  useEffect((): void => {
    if (authUser) router.push("/home");
  }, [authUser]);

  return (
    <div className="login">
      <form className="login-form" onSubmit={onSubmit}>
        <div className="login-form-content">
          <div>
            <h2 className="login-form-content-title">Dime Flow</h2>
            <p className="login-form-content-description">
              Expense tracking app
            </p>
          </div>
          <Input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="loginEmail"
            placeholder="Email"
          />
          <Input
            required
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="loginPassword"
            placeholder="Password"
          />
          <Button text="Sign In" type="submit" fullWidth />
          <div className="login-form-error">{error && <div>{error}</div>}</div>
        </div>
      </form>
      <AbstractLine />
    </div>
  );
};

export default Login;
