"use client";

import { Button } from "@/components/common/Button";
import { apiAuth } from "@/lib/api/auth/apiAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { GoogleIcon } from "../_components/GoogleIcon";

interface IProps {
  text: string;
  redirectRoute: string;
  disabled?: boolean;
}

const GoogleButton = ({ redirectRoute, text, disabled }: IProps) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const redirectUri = process.env.NEXT_PUBLIC_DOMAIN + redirectRoute;
  const scope =
    "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const responseType = "token";

  const handleClick = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=${responseType}&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(
      scope
    )}`;
    window.location.href = googleAuthUrl;
  };

  return (
    <Button
      variant="outline"
      type="button"
      className="w-full flex gap-x-4"
      onClick={() => handleClick()}
      disabled={disabled}
    >
      <GoogleIcon />
      {text}
    </Button>
  );
};

export { GoogleButton };
