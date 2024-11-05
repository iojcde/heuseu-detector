"use client";
import { useZxing } from "react-zxing";

export const BarcodeScanner = () => {
  const { ref } = useZxing({
    onDecodeResult(result) {
      alert(result.getText());
    },
  });

  return (
    <>
      <video className="w-full h-full object-fill" ref={ref} />
    </>
  );
};
