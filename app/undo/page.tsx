"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { LoaderCircle } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useSearchParams } from "next/navigation";

import { useFormStatus } from "react-dom";
import Form from "next/form";
import undoAction from "./undoAction";

function UndoPage() {
  const searchParams = useSearchParams();
  const router = useTransitionRouter();

  const id = searchParams.get("id");

  const { pending } = useFormStatus();

  return (
    <Form action={undoAction}>
      <AlertDialog defaultOpen>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>출석체크 취소</AlertDialogTitle>
            <AlertDialogDescription>
              {id} 학생 출석체크를 취소할까요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>괜찮아요</AlertDialogCancel>
            <AlertDialogAction formAction="submit">
              {pending ? (
                <>
                  <LoaderCircle className=" animate-spin" />
                  취소하는 중
                </>
              ) : (
                <> 취소할게요</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Form>
  );
}

export default UndoPage;
