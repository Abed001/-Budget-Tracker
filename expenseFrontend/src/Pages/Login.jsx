import { useNavigate } from "react-router";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform your login logic here...
    // Then move them to the app:
    navigate("/app");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}