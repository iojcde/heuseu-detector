import { Suspense } from "react";
import SuccessPage from "./success-client";

const SuccesssPage = () => {
  return (
    <Suspense>
      <SuccessPage />
    </Suspense>
  );
};
export default SuccessPage;
