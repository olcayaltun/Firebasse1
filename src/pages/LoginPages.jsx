import { signInWithPopup } from "firebase/auth";
import { auth, provider1 } from "../firebase/config";

const LoginPages = ({ setIsAuth }) => {
  const handleClick = () => {
    signInWithPopup(auth, provider1)
      .then((res) => {
        setIsAuth(true);
        localStorage.setItem("TOKEN", res.user.refreshToken);
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Chat Odası</h1>
        <p>Devam Etmek İçin Giriş Yapın</p>
        <button onClick={handleClick}>
          <img src="./g-logo.png" alt="Google Logo" />
          <span>Google ile Giriş Yap</span>
        </button>
      </div>
    </div>
  );
};

export default LoginPages;
