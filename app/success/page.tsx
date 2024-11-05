"use client";
import { DotLottie, DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { RefCallback, useEffect, useState } from "react";
import successlottie from "@/app/lotties/success.json";

const SuccessPage = () => {
  const router = useTransitionRouter();
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    // This function will be called when the animation is completed.
    function onComplete() {
      router.push(`/info?id=${id}`);
    }

    // Listen to events emitted by the DotLottie instance when it is available.
    if (dotLottie) {
      dotLottie.addEventListener("complete", onComplete);
    }

    return () => {
      // Remove event listeners when the component is unmounted.
      if (dotLottie) {
        dotLottie.removeEventListener("complete", onComplete);
      }
    };
  }, [dotLottie]);

  const dotLottieRefCallback: RefCallback<DotLottie> = (dotLottie) => {
    setDotLottie(dotLottie);
  };
  return (
    <div className="h-screen w-screen flex flex-col justify-center">
      <DotLottieReact
        className="max-w-2xl w-full mx-auto pb-8 "
        data={successlottie}
        autoplay
        dotLottieRefCallback={dotLottieRefCallback}
      />
    </div>
  );
};

export default SuccessPage;
