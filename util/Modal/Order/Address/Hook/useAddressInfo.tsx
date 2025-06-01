import { useRecoilState } from "recoil";
import { useState, useEffect } from "react";

import { ConsumerDB } from "@/data/supabase";
import { AddressType } from "@/types";
import { ResultsModal } from "@/components/Recoil/Modal/ResultModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

/**
 * @example
 * // Example usage of the hook:
 * const { address } = useAddressUserInfo();
 * 저장된 모든 주소지를 보여줍니다
 */

const useAddressUserInfo = () => {
  const [resultsModal] = useRecoilState(ResultsModal);
  const [address, setAddress] = useState<AddressType[]>([]);
  const [recentAddress, setRecentAddress] = useState<AddressType[]>([]);
  const { openError } = useErrorModal();

  const fetchComments = async () => {
    try {
      const comments = await ConsumerDB();

      setAddress(comments);

      const recent = comments.slice(0);

      setRecentAddress(recent);
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    fetchComments();
  }, [resultsModal]);

  return { address, recentAddress };
};

export default useAddressUserInfo;
