import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthUserContext";

const Login = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const { authUser, signIn } = useAuth();

  const onSubmit = (event: any) => {
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

  useEffect(() => {
    if (authUser) router.push("/home");
  }, [authUser]);

  return (
    <div className="text-center" style={{ padding: "40px 0px" }}>
      <div>
        <div>
          <h2>Login</h2>
        </div>
      </div>
      <div style={{ maxWidth: "400px", margin: "auto" }}>
        <div>
          <form onSubmit={onSubmit}>
            {error && <div>{error}</div>}
            <div>
              <label>Email</label>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  id="loginEmail"
                  placeholder="Email"
                />
              </div>
            </div>
            <div>
              <label>Password</label>
              <div>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  id="loginPassword"
                  placeholder="Password"
                />
              </div>
            </div>
            <div>
              <div>
                <button>Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
