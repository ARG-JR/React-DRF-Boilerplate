import React from "react";
import SignInForm from "../../components/auth/SignInForm";
import FullscreenCenteredLayout from "../../layout/FullscreenCenteredLayout";

const SignInView = () => {
  return (
    <FullscreenCenteredLayout>
      <SignInForm />
    </FullscreenCenteredLayout>
  );
};

export default SignInView;
