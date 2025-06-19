import React, { useEffect, useMemo, useState } from "react";
import styles from "./style.module.css";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

const ToastContainer = ({
  type,
  slideOut,
  children,
}: {
  type: "success" | "error" | "info";
  slideOut: boolean;
  children: React.ReactNode;
}) => {
  const bgColor = useMemo(() => {
    switch (type) {
      case "success":
        return "bg-[#67ced5]";
      case "error":
        return "bg-red-500";
      case "info":
        return "bg-cyan-500";
      default:
        return "bg-emerald-50";
    }
  }, [type]);
  return (
    <div
      className={`${styles.toastContainer} ${bgColor} ${
        slideOut ? styles.slideOut : styles.slideIn
      }`}
    >
      {children}
    </div>
  );
};

export default function Toast({ message, type, onClose }: ToastProps) {
  const [slideOut, setSlideOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSlideOut(true);
      setTimeout(onClose, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <ToastContainer type={type} slideOut={slideOut}>
      <div>{message}</div>
    </ToastContainer>
  );
}
