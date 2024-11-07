"use client";
import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { LoaderCircle } from "lucide-react";
import { useTransitionRouter } from "next-view-transitions";
import { useFormStatus } from "react-dom";
import Form from "next/form";
import undoAction from "./undoAction";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <AlertDialogAction type="submit">
      {pending ? (
        <>
          <LoaderCircle className=" animate-spin" />
          취소하는 중
        </>
      ) : (
        <> 취소할게요</>
      )}
    </AlertDialogAction>
  );
};

export const UndoForm = ({ id }: { id: string }) => {
  const router = useTransitionRouter();

  return (
    <form action={undoAction}>
      <AlertDialog open>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>출석체크 취소</AlertDialogTitle>
            <AlertDialogDescription>
              {id} 학생 출석체크를 취소할까요?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>괜찮아요</AlertDialogCancel>
            <SubmitButton />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </form>
  );
};
