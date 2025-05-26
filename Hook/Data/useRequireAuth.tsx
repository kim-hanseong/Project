// hooks/useRequireAuth.ts
"use client"; // Next.js 13 app router 사용 시 필요

import { useEffect } from "react";
import { useRecoilState } from "recoil";

import { checkLogin } from "@/data/supabase";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";

export const useRequireAuth = () => {
  const [LoginCheckAralm, setLoginCheckAralm] = useRecoilState(OnOffModal);

  useEffect(() => {
    const check = async () => {
      const session = await checkLogin();

      if (!session) {
        setLoginCheckAralm({
          isOpen: true,
          type: "LoginModal",
        });
      }
    };

    check();
  }, []);
};
