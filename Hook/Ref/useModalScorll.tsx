import { useEffect } from "react";

interface UsePreventBodyScrollProps {
  isOpen: boolean;
}

export const useModalScroll = ({ isOpen }: UsePreventBodyScrollProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};
