"use client";

import { buttonVariants } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link, useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export const InfoPageContents = ({ stats }: { stats: any }) => {
  const searchParams = useSearchParams();
  const router = useTransitionRouter();

  const id = searchParams.get("id") as string;
  const type = searchParams.get("type") as "start" | "end";

  const [secondsLeft, setSecondsLeft] = useState(10);

  const progressRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const accumulatedTimeRef = useRef<number>(0);

  const DURATION = 10000;

  const updateProgress = useCallback((elapsedTime: number) => {
    const newSecondsLeft = Math.ceil((DURATION - elapsedTime) / 1000);
    const progress = Math.min((elapsedTime / DURATION) * 100, 100);

    if (progressRef.current) {
      progressRef.current.style.width = `${progress}%`;
    }

    setSecondsLeft(newSecondsLeft);
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

  useEffect(() => {
    if (secondsLeft == 0) {
      setTimeout(() => {
        router.push("/");
      }, 100);
    }
  }, [secondsLeft]);

  return (
    <div className="p-8 container text-center flex flex-col gap-4 mt-24 max-w-sm mx-auto">
      <div className="w-full absolute inset-0 bg-secondary h-3  overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-primary transition-all duration-100 ease-out"
          style={{ width: "0%" }}
        />
      </div>
      <h1 className="font-bold text-pretty leading-snug text-4xl mt-16">
        {type == "start" ? (
          "환영해요!"
        ) : (
          <>
            자기주도학습이
            <br /> 기록되었어요
          </>
        )}
      </h1>
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
      <p className="text-xl font-semibold">
        {type == "start" ? (
          "출석 확인이 완료되었어요."
        ) : (
          <>총 {stats.formattedStudyTime} 학습했어요.</>
        )}
      </p>
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
