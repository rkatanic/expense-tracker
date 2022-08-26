import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";
import Input from "./Input";
import Button from "./Button";
import { VscColorMode } from "react-icons/vsc";

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

  const handleDarkThemeSwitch = (): void => {
    if (document.body.classList.contains("dark")) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  };

  useEffect((): void => {
    if (authUser) router.push("/home");
  }, [authUser]);

  return (
    <div className="h-screen max-w-md m-auto overflow-hidden flex items-center justify-center px-8">
      <div
        className="z-10 absolute bottom-8 right-8 cursor-pointer"
        onClick={handleDarkThemeSwitch}
      >
        <VscColorMode className="fill-black dark:fill-zinc-500" />
      </div>
      <form className="w-full z-10 " onSubmit={onSubmit}>
        <div className="flex flex-col gap-1 mb-8 items-center">
          <h2 className="text-4xl font-black text-zinc-800 dark:text-zinc-300">
            Dime Flow
          </h2>
          <p className="text-zinc-400 dark:text-zinc-500">
            Expense tracking app
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            size="large"
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            id="loginEmail"
            label="E-mail"
          />
          <Input
            size="large"
            required
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            id="loginPassword"
            label="Password"
          />
          <Button size="large" text="Sign In" type="submit" fullWidth />
        </div>
        <div className="text-rose-600 text-sm mt-4">
          {error && <div>{error}</div>}
        </div>
      </form>
      <div className="fixed inset-0 [mask-image:linear-gradient(to_bottom_right,white,transparent,white)]">
        <div className="shade shade-1"></div>
        <div className="shade shade-2"></div>
        <div className="shade shade-3"></div>
        <div className="shade shade-4"></div>
        <svg className="h-full w-full absolute inset-0">
          <defs>
            <pattern
              id="grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <rect width="30" height="30" fill="url(#tenthGrid)" />
              <path
                d="M 100 0 L 0 0 0 100"
                fill="none"
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default Login;
