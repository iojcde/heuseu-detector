import { Suspense } from "react";
import SuccessClient from "./success-client";

const SuccessPage = () => {
  return (
    <Suspense>
      <SuccessClient />
    </Suspense>
  );
};
export default SuccessPage;
