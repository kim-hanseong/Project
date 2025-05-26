// hooks/useMediaQuery.ts
import { useState, useEffect } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const handler = () => setMatches(media.matches);

    // 초기 체크
    handler();

    // 이벤트 리스너 등록
    media.addEventListener("change", handler);

    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}
