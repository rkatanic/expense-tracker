import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Login from "../components/Login";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Login />
    </div>
  );
};

export default Home;
