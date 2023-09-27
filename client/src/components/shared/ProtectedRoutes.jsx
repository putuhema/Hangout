import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
const ProtectedRoutes = ({ children }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
};

export default ProtectedRoutes;
