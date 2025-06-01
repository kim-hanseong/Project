import { useRouter } from "next/router";
import { useEffect, useState } from "react";

//* Hook : Router Move ## *
const useMove = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  // 컴포넌트가 클라이언트에서 마운트된 후 라우터를 사용할 수 있도록 함
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const move = (path: string) => {
    if (isMounted) {
      router.push(path); // 컴포넌트가 마운트된 후에만 path로 이동
    }
  };

  return { move };
};

export default useMove;
