"use client";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { ArrowLeft, Camera, Delete } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { BarcodeScanner } from "./barcode";
import SuccessPage from "./success/page";

export default function Home() {
  const [studentID, setStudentID] = useState("");
  const router = useTransitionRouter();

  const handlekb = (num: number) => {
    if (studentID.length > 4) return;
    setStudentID((s) => s + String(num));
  };

  useEffect(() => {
    if (studentID.length === 5) handleSubmit();
  }, [studentID]);

  const handleSubmit = () => {
    let flag = false;

    if (studentID.length < 5) {
      flag = true;
    }
    if (![1, 2, 3].includes(parseInt(studentID[0]))) {
      flag = true;
    }
    if (parseInt(studentID[1]) != 0) {
      flag = true;
    }
    if (![1, 2, 3, 4, 5].includes(parseInt(studentID[2]))) {
      flag = true;
    }
    if (parseInt(studentID.slice(3, 5)) > 29) {
      flag = true;
    }
    if (flag) {
      toast.error("학번을 올바르게 입력했는지 확인해주세요");
      setStudentID("");
    } else {
      router.push(`/success?id=${studentID}`);
    }
  };

  return (
    <div className="min-h-screen  p-8 pb-12 gap-24 sm:p-12 flex flex-col justify-center ">
      <div className="container max-w-min mx-auto w-full pb-24">
        <div className="flex justify-between">
          <div className="text-3xl font-bold ">네 출석 확인하실게요</div>
          <p className=" text-neutral-800 mt-2">
            단국대학교부속소프트웨어고등학교 자기주도학습 지원 시스템
          </p>
        </div>

        <div className="flex gap-24 mt-10">
          {" "}
          <div>
            <h2 className="font-semibold text-xl  ">학생증 스캔</h2>
            <div className=" flex items-center justify-center border-dashed mt-4 bg-gray-50 w-[36rem] rounded-xl overflow-hidden h-[24rem]">
              <BarcodeScanner />
            </div>
          </div>
          <div>
            <div>
              <h2 className="font-semibold text-xl mb-2">수동 입력</h2>
              <Label htmlFor="studentid" className="text-xl text-neutral-600">
                학번
              </Label>
              <InputOTP
                name="studentid"
                value={studentID}
                maxLength={5}
                onChange={setStudentID}
              >
                <InputOTPGroup className="mx-auto mb-4 mt-2 font-bold">
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                </InputOTPGroup>
              </InputOTP>
              <div className="grid grid-cols-3  gap-1 font-bold">
                <Button
                  size="keypad"
                  onClick={() => handlekb(1)}
                  variant={"ghost"}
                >
                  1
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(2)}
                  variant={"ghost"}
                >
                  2
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(3)}
                  variant={"ghost"}
                >
                  3
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(4)}
                  variant={"ghost"}
                >
                  4
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(5)}
                  variant={"ghost"}
                >
                  5
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(6)}
                  variant={"ghost"}
                >
                  6
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(7)}
                  variant={"ghost"}
                >
                  7
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(8)}
                  variant={"ghost"}
                >
                  8
                </Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(9)}
                  variant={"ghost"}
                >
                  9
                </Button>
                <Button
                  size="keypad"
                  onClick={() => toast.success("탁월함을 넘어 감동으로!")}
                  variant={"ghost"}
                ></Button>
                <Button
                  size="keypad"
                  onClick={() => handlekb(0)}
                  variant={"ghost"}
                >
                  0
                </Button>{" "}
                <Button
                  size="keypad"
                  onClick={() => setStudentID((s) => s.slice(0, -1))}
                  variant={"ghost"}
                >
                  <Delete />
                </Button>
              </div>
              <div className="mt-6 flex gap-3">
                <Button
                  onClick={() => {
                    setStudentID("");
                  }}
                  size={"lg"}
                  variant={"ghost"}
                >
                  초기화
                </Button>
                <Button
                  variant={"default"}
                  className="w-full"
                  size={"lg"}
                  onClick={handleSubmit}
                >
                  확인
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
