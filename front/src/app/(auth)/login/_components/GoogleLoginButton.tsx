import { Button } from "@/components/common/Button";
import { useGoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = () => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // Replace with your Google Client ID
  const redirectUri = "http://localhost:3001/login"; // Replace with your redirect URI
  const scope =
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const responseType = "token";

  const handleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
      scope
    )}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full"
      onClick={() => handleLogin()}
    >
      Iniciar sesión con Google
    </Button>
  );
};

export { GoogleLoginButton };

("http://localhost:3001/#access_token=ya29.a0AcM612yv030ZhPU-OZlAxhd2kBSB_YJpZxFDoHWnq5KzY9Af9noCI2aa_N6h6AKA6UJsLufsUZH7ngWqALuELSi7UHC-nLpszyBOfnlk-9DoEjYjruUrFU7syyqvb5IJpC1Zxh5iq779T1GMn17FjvYLS_hvdof-rQaCgYKAdwSARISFQHGX2MiVLF5rttrqymYPBZ_aYOCmg0169&token_type=Bearer&expires_in=3599&scope=email%20profile%20openid%20https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile&authuser=0&prompt=consent");
