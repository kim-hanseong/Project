import React, {
  useState,
  createContext,
  useContext,
  useEffect,
  useRef,
} from "react";
import { FaReact, FaNodeJs, FaAtom } from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiSupabase,
} from "react-icons/si";
import styles from "./index.module.css";
import FlexBox from "@/components/전역/FlexBox";
import TitleTag from "@/components/전역/TitleTag";
import NextJS from "./next-js";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { OnOffModal } from "@/atoms/OnOffModal";
import { useMediaQuery } from "react-responsive";
import { useBookFetchDataPagenation } from "@/hooks/useBookFetchDataPagenation";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import MobileNavBarComponent from "@/components/MobileNavBarComponent";
import MobileNavbar from "@/components/MobileNavbar";
import MobileBottom from "@/components/MobileBottom";
import ProductShopArlam from "@/components/ProductShopArlam";
import SearchModal from "@/components/SearchModal";
import { useErrorModal } from "@/hooks/useErrorModal";
import { useAuth } from "@/contexts/AuthContext";
import { Router, Route, Routes } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { getUser } from "@/lib/supabase";
import { createContext as createReactContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { KakaoBookSearch } from "@/data/BookApi";
import { Best_Book_DB, fetchPostBySlug } from "@/data/supabase";
import { BookDataType } from "@/types";
import { BestSellerParams } from "../types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";

interface Technology {
  name: string;
  icon: JSX.Element;
  description: string;
  details: string[];
  examples?: {
    title: string;
    description: string;
    code?: string;
  }[];
}

const TechStack: React.FC & {
  Title: React.FC;
  TechList: React.FC<{
    technologies: Technology[];
    onTechClick: (tech: Technology) => void;
    selectedTech: Technology | null;
  }>;
  TechDetail: React.FC<{
    tech: Technology;
    onBackClick: () => void;
    showDetails: boolean;
  }>;
} = () => {
  const [selectedTech, setSelectedTech] = useState<Technology | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const techDetailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectedTech &&
        techDetailRef.current &&
        !techDetailRef.current.contains(event.target as Node)
      ) {
        handleBackClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedTech]);

  const technologies: Technology[] = [
    {
      name: "Next.js",
      icon: <SiNextdotjs className={styles.icon} />,
      description: "App Router를 활용한 서버 사이드 렌더링 구현",
      details: [
        "최근 검색어 기반 도서 추천",
        "도서 리뷰 작성 및 관리",
        "월간/연간 독서 및 구매 통계",
      ],
      examples: [
        {
          title: "개인화된 도서 추천",
          description: "최근 검색어 기반 도서 추천 시스템 구현",
          code: `// components/recommendation/RecentSearches.tsx
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

export const useRecentSearches = (userId: string) => {
  return useQuery({
    queryKey: ["recentSearches", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("search_history")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (error) throw error;
      return data;
    },
    enabled: !!userId,
  });
};

// 도서 추천 컴포넌트
const BookRecommendations = () => {
  const { user } = useAuth();
  const { data: recentSearches } = useRecentSearches(user?.id);

  return (
    <div className="recommendations">
      <h3>최근 검색어 기반 추천 도서</h3>
      {recentSearches?.map((search) => (
        <div key={search.id} className="recommendation-item">
          <h4>{search.query}</h4>
          <p>검색일: {new Date(search.created_at).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};`,
        },
        {
          title: "도서 리뷰 시스템",
          description: "사용자별 도서 리뷰 작성 및 관리",
          code: `// components/review/BookReview.tsx
interface Review {
  id: string;
  bookId: string;
  userId: string;
  rating: number;
  content: string;
  createdAt: Date;
}

export const useBookReviews = (bookId: string) => {
  return useQuery({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("book_id", bookId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Review[];
    },
  });
};

const BookReviewComponent = ({ bookId }: { bookId: string }) => {
  const { data: reviews } = useBookReviews(bookId);
  const { user } = useAuth();

  const handleSubmitReview = async (rating: number, content: string) => {
    if (!user) return;

    const { error } = await supabase.from("reviews").insert({
      book_id: bookId,
      user_id: user.id,
      rating,
      content,
    });

    if (error) {
      console.error("리뷰 작성 실패:", error);
    }
  };

  return (
    <div className="reviews">
      <h3>도서 리뷰</h3>
      {user && (
        <ReviewForm onSubmit={handleSubmitReview} />
      )}
      <ReviewList reviews={reviews} />
    </div>
  );
};`,
        },
        {
          title: "독서 통계 분석",
          description: "월간/연간 독서 및 구매 통계 분석",
          code: `// components/statistics/ReadingStats.tsx
interface ReadingStats {
  monthlyRead: number;
  yearlyRead: number;
  monthlyPurchased: number;
  yearlyPurchased: number;
}

export const useReadingStats = (userId: string) => {
  return useQuery({
    queryKey: ["readingStats", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reading_stats")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data as ReadingStats;
    },
  });
};

const ReadingStatsComponent = () => {
  const { user } = useAuth();
  const { data: stats } = useReadingStats(user?.id);

  return (
    <div className="reading-stats">
      <h3>독서 통계</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <h4>이번 달 읽은 책</h4>
          <p>{stats?.monthlyRead || 0}권</p>
        </div>
        <div className="stat-item">
          <h4>올해 읽은 책</h4>
          <p>{stats?.yearlyRead || 0}권</p>
        </div>
        <div className="stat-item">
          <h4>이번 달 구매한 책</h4>
          <p>{stats?.monthlyPurchased || 0}권</p>
        </div>
        <div className="stat-item">
          <h4>올해 구매한 책</h4>
          <p>{stats?.yearlyPurchased || 0}권</p>
        </div>
      </div>
    </div>
  );
};`,
        },
      ],
    },
    {
      name: "React",
      icon: <FaReact className={styles.icon} style={{ color: "#61DAFB" }} />,
      description: "Props 기반의 단방향 데이터 흐름과 컴포넌트 재사용",
      details: [
        "Props를 통한 명확한 데이터 흐름",
        "컴포넌트 계층 구조를 통한 상태 관리",
        "재사용 가능한 컴포넌트 설계",
        "타입스크립트를 통한 타입 안정성",
      ],
      examples: [
        {
          title: "재사용 컴포넌트 구현",
          description:
            "Styled Components를 활용한 유연한 FlexBox 컴포넌트 구현",
          code: `interface FlexBoxProps {
  children: React.ReactNode;
  className?: string;
  $col?: boolean;
  $gap?: number;
  $justify?: string;
  $align?: string;
  $wrap?: "nowrap" | "wrap" | "wrap-reverse";
  tooltipText?: string;
}

const FlexContainer = styled.div<FlexBoxProps>\`
  display: flex;
  flex-direction: \${(props) => (props.$col ? "column" : "row")};
  gap: \${(props) => (props.$gap ? \`\${props.$gap}px\` : "0px")};
  justify-content: \${(props) => props.$justify || "flex-start"};
  align-items: \${(props) => props.$align || "stretch"};
  flex-wrap: \${(props) => props.$wrap || "nowrap"};
\`;

const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  className,
  $col = false,
  $gap = 0,
  $justify,
  $align,
  $wrap = "nowrap",
  tooltipText,
}) => {
  return (
    <FlexContainer
      className={className}
      $col={$col}
      $gap={$gap}
      $justify={$justify}
      $align={$align}
      $wrap={$wrap}
      title={tooltipText}
    >
      {children}
    </FlexContainer>
  );
};`,
        },
        {
          title: "Custom Hook 구현",
          description: "장바구니 기능을 위한 Custom Hook 구현",
          code: `/**
 * useShopList 훅은 장바구니 데이터를 관리하는 훅입니다.
 * - Supabase에서 데이터를 불러오고,
 * - Kakao API를 통해 책 정보를 검색하며,
 * - 수량 변경, 삭제 등의 기능을 포함합니다.
 */
export function useShopList() {
  const [shopList, setShopList] = useState<BookDataType[]>([]);
  const [numbers, setNumbers] = useState<{ [key: string]: number }>({});
  const [modal] = useRecoilState(OnOffModal);
  const [loading, setLoading] = useRecoilState(LoadingAtom);
  const { openError } = useErrorModal();
  const [isFetched, setIsFetched] = useState(false);

  // Supabase에서 데이터를 불러오고 Kakao API로 책 정보 검색
  const fetchBooks = async () => {
    try {
      setLoading((prev) => ({ ...prev, isOpen: true }));
      const result = await ReadSupaBase();
      const searchQueries = result.data.map((item) => item.title);
      
      // Kakao API 호출
      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      // 성공한 결과만 정리
      const successfulResults = searchResults
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return {
              data: result.value[0],
              title: searchQueries[index],
            };
          }
          return null;
        })
        .filter((result) => result !== null);

      setShopList(successfulResults.map((item) => item.data));
      setIsFetched(true);
      setLoading((prev) => ({ ...prev, isOpen: false }));
    } catch (error) {
      openError("DataError");
      setIsFetched(true);
    }
  };

  // 수량 증가
  const handleIncrease = (title: string) => {
    setNumbers((prev) => ({
      ...prev,
      [title]: (prev[title] ?? 0) + 1,
    }));
  };

  // 수량 감소
  const handleDecrease = (title: string) => {
    setNumbers((prev) => ({
      ...prev,
      [title]: Math.max((prev[title] ?? 0) - 1, 1),
    }));
  };

  // 상품 삭제
  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    setShopList((prev) => prev.filter((item) => item.id !== id));
    await DeleteSupaBase(id);
  };

  // 모달이 열릴 때마다 데이터 새로 불러오기
  useEffect(() => {
    fetchBooks();
  }, [modal.type === "ProductShopExists", modal.type === "ProductShopAdd"]);

  return {
    loading,
    shopList,
    numbers,
    handleIncrease,
    handleDecrease,
    handleDelete,
    isFetched,
  };
}`,
        },
        {
          title: "Context API와 Custom Hook 활용",
          description: "전역 상태 관리를 위한 Context API와 Custom Hook 구현",
          code: `// AuthContext.tsx
interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({ user: null });

// Context Provider 컴포넌트
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData as User | null);
    };

    fetchUser();
    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      checkLogin();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook으로 Context 사용 추상화
export const useAuth = (): AuthContextType => {
  return useContext(AuthContext);
};

// 사용 예시
const ProfileComponent = () => {
  const { user } = useAuth();
  
  return user ? (
    <div>
      <h2>Welcome, {user.email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <button onClick={handleLogin}>Login</button>
  );
};

// App.tsx
const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};`,
        },
        {
          title: "Props 기반 데이터 흐름",
          description: "컴포넌트 간 Props를 통한 단방향 데이터 흐름 구현",
          code: `// components/bestseller/index.tsx
const BestSellerPage: React.FC = () => {
  //** modal */
  const [modal] = useRecoilState(OnOffModal);
  //* Mobile
  const isMobile = useMediaQuery("(max-width: 768px)");

  const MODAL_COMPONENTS: {
    [key: string]: React.FC;
  } = {
    ProductShopExists: ProductShopArlam,
    ProductShopAdd: ProductShopArlam,
    MobileSearchModal: SearchModal,
  };
  const BestsellerModalComponent = MODAL_COMPONENTS[modal.type];

  const [productForm, setProductForm] = useState("Basis");

  const {
    data,
    category,
    pageSize,
    pagination,
    sorting,
    setCategory,
    setPageSize,
    setPagination,
    setSorting,
  } = useBookFetchDataPagenation({
    category: "전체",
    pageSize: "10",
    pagination: "1",
    sorting: "추천일순",
  });

  const handlePageSizeChange = () => {
    if (parseInt(pageSize) >= 18) {
      return;
    }
    setPageSize((parseInt(pageSize) + 3).toString());
  };

  useInfiniteScroll(100, handlePageSizeChange, 768);

  return (
    <>
      <MobileNavBarComponent>
        {isMobile && <MobileNavbar mode="Base" Title="베스트셀러" />}
        {isMobile && <MobileBottom />}
      </MobileNavBarComponent>

      <Componenet>
        <FlexBox className={styles.Box} $justify="space-between">
          <FlexBox $gap={12}>
            <BestSellerCategor
              productForm={category}
              setProductForm={setCategory}
            />
            <BestSellerPageSize
              productForm={pageSize}
              setProductForm={setPageSize}
            />
          </FlexBox>
          <FlexBox $gap={12}>
            <BestSellerSorting
              productForm={sorting}
              setProductForm={setSorting}
            />
            <BestSellerFormChange
              productForm={productForm}
              setProductForm={setProductForm}
            />
          </FlexBox>
        </FlexBox>
        <BestSellerProduct data={data} productForm={productForm} />
        <FlexBox $justify="center">
          <BestSellerPagiNation
            productForm={pagination}
            setProductForm={setPagination}
          />
        </FlexBox>
      </Componenet>

      <ModalComponenet>
        {modal.isOpen && BestsellerModalComponent && (
          <BestsellerModalComponent />
        )}
      </ModalComponenet>
    </>
  );
};`,
        },
        {
          title: "컴포넌트 계층 구조",
          description: "명확한 컴포넌트 계층 구조를 통한 데이터 관리",
          code: `// components/order/OrderAddress/index.tsx
interface ReviewInfoProps {
  address: AddressType[];
}

const OrderAddress: React.FC<ReviewInfoProps> & {
  Title: React.FC;
  AddressInfo: React.FC<{
    address: AddressType[];
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
  EmptyWrap: React.FC<{
    setModal: React.Dispatch<React.SetStateAction<ModalStateType>>;
  }>;
} = ({ address }) => {
  return (
    <div className={styles.AddressContainer}>
      <FlexBox $align="start" $gap={22} $col={true}>
        <OrderAddress.Title />
        {address.length > 0 ? (
          <OrderAddress.AddressInfo address={address} setModal={setModal} />
        ) : (
          <OrderAddress.EmptyWrap setModal={setModal} />
        )}
      </FlexBox>
    </div>
  );
};`,
        },
      ],
    },
    {
      name: "TypeScript",
      icon: (
        <SiTypescript className={styles.icon} style={{ color: "#3178C6" }} />
      ),
      description: "타입 안정성을 통한 안정적인 개발 환경 구축",
      details: [
        "정적 타입 체크로 런타임 에러 방지",
        "인터페이스와 타입을 통한 코드 문서화",
        "자동 완성과 리팩토링 지원",
        "타입 추론을 통한 개발 생산성 향상",
      ],
      examples: [
        {
          title: "타입 정의와 활용",
          description: "도서 정보와 주소 정보를 위한 타입 정의",
          code: `// types/index.ts
// 도서 정보를 위한 타입 정의
export type BookDataType = {
  delivery?: boolean;
  id?: number;
  title: string;
  price: number;
  sale_price: number;
  authors: string[];
  thumbnail: string;
  publisher: string;
  contents: string;
  datetime: Date;
  created_at?: Date;
  numbering?: number;
  isbn: number;
  comments?: CommentType[];
};

// 주소 정보를 위한 타입 정의
export type AddressType = {
  id: number;
  Address: string;
  Phone: string;
  address_name: string;
  addressdetailinfo: string;
  addressinfo: string;
  consumer: string;
  created_at: string;
  email: string;
  is_recent: boolean;
};

// 도서 정보 컴포넌트에서의 사용 예시
const BookCard: React.FC<{ book: BookDataType }> = ({ book }) => {
  return (
    <div className="book-card">
      <Image src={book.thumbnail} alt={book.title} />
      <h3>{book.title}</h3>
      <p>저자: {book.authors.join(", ")}</p>
      <p>출판사: {book.publisher}</p>
      <p>가격: {book.sale_price.toLocaleString()}원</p>
      {book.delivery && <span className="delivery-badge">무료배송</span>}
    </div>
  );
};

// 주소 정보 컴포넌트에서의 사용 예시
const AddressList: React.FC<{ addresses: AddressType[] }> = ({ addresses }) => {
  return (
    <div className="address-list">
      {addresses.map((address) => (
        <div key={address.id} className="address-item">
          <h4>{address.address_name}</h4>
          <p>{address.addressinfo}</p>
          <p>{address.addressdetailinfo}</p>
          <p>연락처: {address.Phone}</p>
          {address.is_recent && <span className="recent-badge">최근 배송지</span>}
        </div>
      ))}
    </div>
  );
};

// API 응답 타입 정의
export type BooksData = {
  data: BookDataType[];
  total: number | null;
  error: unknown;
};

// API 호출 함수에서의 사용 예시
const fetchBooks = async (): Promise<BooksData> => {
  try {
    const response = await fetch('/api/books');
    const data = await response.json();
    return {
      data: data.books,
      total: data.total,
      error: null
    };
  } catch (error) {
    return {
      data: [],
      total: null,
      error
    };
  }
};`,
        },
      ],
    },
    {
      name: "React Query",
      icon: <FaReact className={styles.icon} style={{ color: "#61DAFB" }} />,
      description: "효율적인 서버 상태 관리 및 캐싱",
      details: [
        "자동 캐싱 및 재검증",
        "무한 스크롤 구현",
        "낙관적 업데이트",
        "서버 상태 동기화",
      ],
      examples: [
        {
          title: "데이터 페칭 및 캐싱",
          description: "베스트셀러 데이터를 가져오고 캐싱하는 커스텀 훅 구현",
          code: `// components/bestseller/Hook/useBestSellerData.ts
import { useQuery } from "@tanstack/react-query";
import { KakaoBookSearch } from "@/data/BookApi";
import { Best_Book_DB, fetchPostBySlug } from "@/data/supabase";
import { BookDataType } from "@/types";
import { BestSellerParams } from "../types";
import { useErrorModal } from "@/Hook/Data/useError";

export const useBestSellerData = (params: BestSellerParams) => {
  const { openError } = useErrorModal();

  const fetchBooks = async () => {
    try {
      // Supabase에서 베스트셀러 데이터 가져오기
      const result = await Best_Book_DB(
        params.bestSellerDB,
        parseInt(params.pagination),
        parseInt(params.pageSize),
        params.sorting
      );

      if (result.data && result.data.length < parseInt(params.pageSize)) {
        return;
      }

      // Kakao API를 통해 도서 상세 정보 검색
      const searchQueries = (result.data || []).map((item) => item.title);
      const searchResults = await Promise.allSettled(
        searchQueries.map((query) => KakaoBookSearch(query))
      );

      // 성공한 검색 결과만 필터링
      const successfulResults = searchResults
        .map((result, index) => {
          if (result.status === "fulfilled") {
            return { data: result.value, title: searchQueries[index] };
          }
          return null;
        })
        .filter((result) => result !== null) as {
        data: BookDataType[];
        title: string;
      }[];

      // 댓글 데이터 가져오기
      const successfulTitles = successfulResults.map((result) => result.title);
      const comments = await Promise.all(
        successfulTitles.map((title) => fetchPostBySlug(title))
      );

      const flattenedComments = comments.flat();

      // 도서 정보와 댓글 데이터 결합
      return {
        books: successfulResults.map((book) => ({
          ...book.data[0],
          comments:
            flattenedComments.filter(
              (comment) => comment.slug === book.title
            ) || [],
        })),
        comments: flattenedComments,
      };
    } catch (error) {
      openError("DataError");
      throw error;
    }
  };

  // React Query 설정
  return useQuery({
    queryKey: ["books", params], // 쿼리 키 설정
    queryFn: fetchBooks, // 데이터 페칭 함수
    enabled: !!params.bestSellerDB && parseInt(params.pagination) > 0, // 쿼리 활성화 조건
    staleTime: 1000 * 60 * 5, // 5분 동안 데이터를 신선한 상태로 유지
    refetchOnWindowFocus: false, // 윈도우 포커스 시 재요청 비활성화
    refetchOnMount: false, // 컴포넌트 마운트 시 재요청 비활성화
  });
};`,
        },
      ],
    },
    {
      name: "Supabase",
      icon: <SiSupabase className={styles.icon} style={{ color: "#3ECF8E" }} />,
      description: "실시간 데이터베이스 및 인증 서비스 구현",
      details: [
        "실시간 데이터베이스 구축",
        "인증 및 권한 관리",
        "개인화된 장바구니 및 주소 관리",
        "사용자별 데이터 동기화",
      ],
      examples: [
        {
          title: "소셜 로그인 구현",
          description: "Kakao OAuth를 활용한 소셜 로그인 구현",
          code: `// lib/supabase.ts
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
    },
  }
);

export async function signInWithKakao(): Promise<void> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });

    if (error) {
      console.error("Error signing in with Kakao:", error.message);
      return;
    }
    console.log("Kakao sign-in successful:", data);
  } catch (err) {
    console.error("Unexpected error during Kakao sign-in:", err);
  }
}

export const getUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  if (error) return null;
  return data.user;
};`,
        },
        {
          title: "개인화된 장바구니 관리",
          description: "로그인된 사용자별 장바구니 데이터 관리",
          code: `// container/util/Button/Hook/useAdd.tsx
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { ReadSupaBase, ShopDBAdd } from "@/data/supabase";
import { BookDataType } from "@/types";
import { useLoginCheck } from "@/Hook/Data/useUserCheck";
import { OnOffModal } from "@/components/Recoil/Modal/OnOffModal/atom";
import { useErrorModal } from "@/Hook/Data/useError";

export const useAdd = () => {
  const { isAuthenticated, checkLogin } = useLoginCheck(); // 로그인 상태 체크
  const [, setModal] = useRecoilState(OnOffModal);
  const [existingItems, setExistingItems] = useState<BookDataType[]>([]);
  const { openError } = useErrorModal();

  // 장바구니 데이터 로드
  const fetchNumberingData = async () => {
    try {
      const { data: numberingData } = await ReadSupaBase();
      setExistingItems(numberingData);
    } catch (error) {
      openError("DataError");
    }
  };

  useEffect(() => {
    fetchNumberingData();
  }, []);

  // 장바구니 추가 로직
  const handleAddToCart = async (item: BookDataType) => {
    checkLogin();
    if (!isAuthenticated) return;

    const duplicateItem = existingItems.find(
      (existingItem) => existingItem.thumbnail === item.thumbnail
    );

    if (duplicateItem) {
      // 중복 상품 처리
      const updatedItems = existingItems.map((existingItem) =>
        existingItem.thumbnail === item.thumbnail
          ? { ...existingItem, numbering: (existingItem.numbering ?? 1) + 1 }
          : existingItem
      );

      setExistingItems(updatedItems);
      setModal({ isOpen: true, type: "ProductShopExists" });
      await ShopDBAdd(item);
    } else {
      // 신규 상품 추가
      setModal({ isOpen: true, type: "ProductShopAdd" });
      setExistingItems((prevItems) => [...prevItems, item]);
      await ShopDBAdd(item);
    }
  };

  return { existingItems, handleAddToCart, fetchNumberingData };
};

// lib/supabase.ts
export async function ReadSupaBase(): Promise<BooksData> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { data: [], total: 0, error: null };

  const { data: record, error } = await supabase
    .from("Shop")
    .select("*")
    .eq("user_id", user.id);
    
  return { data: record || [], total: record ? record.length : null, error };
}

export const ShopDBAdd = async (items: BookDataType[] | BookDataType) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  try {
    const itemsArray = Array.isArray(items) ? items : [items];
    const { data, error } = await supabase
      .from("Shop")
      .insert(
        itemsArray.map(item => ({
          ...item,
          user_id: user.id
        }))
      );

    if (error) throw error;
    return { data };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return { error };
  }
};`,
        },
        {
          title: "주소 관리 시스템",
          description: "사용자별 배송지 관리 및 최근 배송지 설정",
          code: `// lib/supabase.ts
export const addAddressDB = async ({
  addressName,
  consumer,
  phoneNumber,
  detailAddress,
  detailInfo,
}) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("로그인이 필요합니다.");

  // 기존 주소의 is_recent 초기화
  const { error: resetError } = await supabase
    .from("Consumer")
    .update({ is_recent: false })
    .eq("user_id", user.id);

  if (resetError) {
    throw new Error(\`기존 주소 초기화 중 오류: \${resetError.message}\`);
  }

  // 새 주소 추가
  const { data, error } = await supabase.from("Consumer").insert([
    {
      Address: addressName,
      consumer,
      Phone: phoneNumber,
      addressinfo: detailAddress,
      addressdetailinfo: detailInfo,
      is_recent: false,
      user_id: user.id
    },
  ]);

  if (error) {
    throw new Error(\`주소 추가 중 오류: \${error.message}\`);
  }
  return data;
};

export const updateRecentSelectedAt = async (selectedId: number) => {
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("로그인된 사용자 정보를 가져올 수 없습니다.");
  }

  const userId = user.id;

  // 모든 주소의 is_recent false로 초기화
  const { error: resetError } = await supabase
    .from("Consumer")
    .update({ is_recent: false })
    .eq("user_id", userId);

  if (resetError) {
    throw new Error(\`기존 기본 배송지 초기화 중 오류: \${resetError.message}\`);
  }

  // 선택된 주소를 최근 배송지로 설정
  const { error: updateError } = await supabase
    .from("Consumer")
    .update({
      is_recent: true,
      recent_selected_at: new Date().toISOString(),
    })
    .eq("id", selectedId)
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(\`최근 배송지 설정 중 오류: \${updateError.message}\`);
  }
};`,
        },
      ],
    },
    {
      name: "Recoil",
      icon: <FaAtom className={styles.icon} style={{ color: "#3578E5" }} />,
      description: "클라이언트 상태 관리를 위한 효율적인 상태 관리",
      details: [
        "Atom 기반 상태 관리",
        "Selector를 통한 파생 상태",
        "비동기 데이터 처리",
        "상태 지속성 관리",
      ],
      examples: [
        {
          title: "모달 상태 관리",
          description: "Recoil을 활용한 모달 상태 관리 구현",
          code: `// types/index.ts
export type ModalStateType = {
  isOpen: boolean;
  type: string;
};

// components/Recoil/Modal/ErrorModal/atom.ts
import { atom } from "recoil";
import { ModalStateType } from "@/types";

export const ErrorModal = atom<ModalStateType>({
  key: "ErrorModal",
  default: {
    isOpen: false,
    type: "",
  },
});

// components/Recoil/Aralm/error/atom.ts
export const ErrorAralmAtom = atom<ModalStateType>({
  key: "ErrorAralmAtom",
  default: {
    isOpen: false,
    type: "error",
  },
});

// 사용 예시
const ModalComponent = () => {
  const [modal, setModal] = useRecoilState(ErrorModal);
  const [errorAlarm, setErrorAlarm] = useRecoilState(ErrorAralmAtom);

  const handleOpenModal = () => {
    setModal({ isOpen: true, type: "error" });
  };

  const handleCloseModal = () => {
    setModal({ isOpen: false, type: "" });
  };

  const showError = () => {
    setErrorAlarm({ isOpen: true, type: "error" });
  };

  return (
    <>
      <button onClick={handleOpenModal}>모달 열기</button>
      <button onClick={showError}>에러 표시</button>
      
      {modal.isOpen && (
        <div className="modal">
          <h2>에러 발생</h2>
          <p>에러 메시지...</p>
          <button onClick={handleCloseModal}>닫기</button>
        </div>
      )}

      {errorAlarm.isOpen && (
        <div className="error-alarm">
          에러가 발생했습니다!
        </div>
      )}
    </>
  );
};`,
        },
      ],
    },
  ];

  const handleTechClick = (tech: Technology) => {
    setIsAnimating(true);
    setSelectedTech(tech);
    setTimeout(() => {
      setShowDetails(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    setShowDetails(false);
    setTimeout(() => {
      setSelectedTech(null);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className={styles.container}>
      <FlexBox $align="start" $gap={22} $col={true}>
        <TechStack.Title />
        <TechStack.TechList
          technologies={technologies}
          onTechClick={handleTechClick}
          selectedTech={selectedTech}
        />
        {selectedTech && (
          <TechStack.TechDetail
            tech={selectedTech}
            onBackClick={handleBackClick}
            showDetails={showDetails}
            ref={techDetailRef}
          />
        )}
      </FlexBox>
    </section>
  );
};

// 서브 컴포넌트 정의
TechStack.Title = () => (
  <TitleTag level={3} classNames={styles.title}>
    기술 스택
  </TitleTag>
);

TechStack.TechList = ({ technologies, onTechClick, selectedTech }) => (
  <div className={`${styles.techList} ${selectedTech ? styles.slideOut : ""}`}>
    {technologies.map((tech) => (
      <button
        key={tech.name}
        onClick={() => onTechClick(tech)}
        className={`${styles.techCard} ${selectedTech?.name === tech.name ? styles.selectedCard : ""}`}
      >
        <FlexBox $align="start" $gap={12}>
          <div className={styles.iconWrapper}>{tech.icon}</div>
          <div className={styles.techInfo}>
            <h3 className={styles.techName}>{tech.name}</h3>
            <p className={styles.techDescription}>{tech.description}</p>
          </div>
        </FlexBox>
      </button>
    ))}
  </div>
);

TechStack.TechDetail = React.forwardRef<
  HTMLDivElement,
  {
    tech: Technology;
    onBackClick: () => void;
    showDetails: boolean;
  }
>(({ tech, onBackClick, showDetails }, ref) => (
  <div
    ref={ref}
    className={`${styles.techDetail} ${showDetails ? styles.slideIn : ""}`}
  >
    <button onClick={onBackClick} className={styles.backButton}>
      <span className={styles.backArrow}>←</span> 돌아가기
    </button>
    <FlexBox $align="start" $gap={16} $col={true}>
      <FlexBox $align="center" $gap={16}>
        <div className={styles.detailIcon}>{tech.icon}</div>
        <h3 className={styles.detailTitle}>{tech.name}</h3>
      </FlexBox>
      <p className={styles.detailDescription}>{tech.description}</p>
      <div className={styles.detailFeatures}>
        <h4 className={styles.featuresTitle}>주요 특징</h4>
        <ul className={styles.featuresList}>
          {tech.details.map((detail, index) => (
            <li key={index} className={styles.featureItem}>
              {detail}
            </li>
          ))}
        </ul>
      </div>
      {tech.examples && (
        <div className={styles.examples}>
          <h4 className={styles.examplesTitle}>구현 예시</h4>
          {tech.examples.map((example, index) => (
            <div key={index} className={styles.example}>
              <h5 className={styles.exampleTitle}>{example.title}</h5>
              <p className={styles.exampleDescription}>{example.description}</p>
              {example.code && (
                <pre className={styles.codeBlock}>
                  <code>{example.code}</code>
                </pre>
              )}
            </div>
          ))}
        </div>
      )}
    </FlexBox>
  </div>
));

// displayName 설정
TechStack.Title.displayName = "TechStack.Title";
TechStack.TechList.displayName = "TechStack.TechList";
TechStack.TechDetail.displayName = "TechStack.TechDetail";

export default TechStack;
