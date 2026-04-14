import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "100px" }}>
      <SignIn />
    </div>
  );
}

export default Login;