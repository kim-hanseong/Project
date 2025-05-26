// hooks/useLogout.ts
import { signOut } from "@/data/supabase";
import { useErrorModal } from "@/Hook/Data/useError";

export const useLogout = () => {
  const { openError } = useErrorModal();

  const handleLogout = async () => {
    try {
      await signOut();
      window.location.href = "/";
    } catch (error) {
      openError("RefError");
    }
  };

  return { handleLogout };
};
