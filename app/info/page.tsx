"use client";
import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const InfoPage = () => {
  const searchParams = useSearchParams();
  const router = useTransitionRouter();
  const id = searchParams.get("id") as string;

  const [secondsLeft, setSecondsLeft] = useState(7);

  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);

  const DURATION = 7000; // 5 seconds in milliseconds

  const updateProgress = useCallback((elapsedTime: number) => {
    const newSecondsLeft = Math.ceil((DURATION - elapsedTime) / 1000);
    const progress = Math.min((elapsedTime / DURATION) * 100, 100);

    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }

    setSecondsLeft(newSecondsLeft);

    if (progress >= 100) {
      // Redirect after 5 seconds
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp;
      }

      const elapsedTime =
        timestamp - startTimeRef.current + accumulatedTimeRef.current;
      updateProgress(elapsedTime);

      if (elapsedTime < DURATION) {
        requestAnimationFrame(animate);
      }
    },
    [updateProgress]
  );

  useEffect(() => {
    let animationFrameId: number;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, store the current progress
        if (startTimeRef.current !== null) {
          accumulatedTimeRef.current +=
            performance.now() - startTimeRef.current;
        }
        startTimeRef.current = null;
        cancelAnimationFrame(animationFrameId);
      } else {
        // Page is visible again, restart the animation
        startTimeRef.current = null;
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Start the animation
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
      startTimeRef.current = null;
      accumulatedTimeRef.current = 0;
    };
  }, [animate]);

  return (
    <div className="p-8 container text-center flex flex-col gap-4 mt-24 max-w-sm mx-auto">
      <div className="w-full absolute inset-0 bg-secondary h-3  overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      <h1 className="font-bold text-4xl mt-16">환영해요!</h1>
      <div className="mt-4">
        <span>{id[0]}학년</span>
        {` `}
        <span>{id[2]}</span>반
        <span>
          {` `}
          {id.slice(3, 5)}번
        </span>
        {` `}
      </div>
      <p className="text-xl font-semibold">출석확인이 완료되었어요.</p>
      <div className="mt-6">
        <Link href="/undo" className={buttonVariants({ variant: "ghost" })}>
          잘못 입력하였나요?
        </Link>
      </div>
      <p className="mt-6 text-sm text-neutral-800">
        {" "}
        {secondsLeft}초 후에 메인 페이지로 이동합니다.
      </p>{" "}
      <Link href="/" className={cn(buttonVariants(), "mt-3")}>
        돌아가기
      </Link>
    </div>
  );
};
export default InfoPage;
