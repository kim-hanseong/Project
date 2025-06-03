"use client";
import { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { IoIosClose, IoMdPerson } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineCancel } from "react-icons/md";

import CategoryNav from "./CategoryNav";

import { CustomPrice } from "@/components/common/product/Price";
import LinkIcon from "@/components/common/Link-Icons";
import styles from "@/components/layout/NavBar/index.module.css";
import Component from "@/components/common/컴포넌트구별/Component";
import { useRecentSearch } from "@/Hook/Storage/useRecentSearchHook";
import FlexBox from "@/components/common/FlexBox";
import { Thumbnail } from "@/components/common/product/Thumbnail";
import { Title } from "@/components/common/product/Title";
import { AuthList } from "@/components/common/product/AuthList";
import TitleTag from "@/components/common/TitleTag";
import useBookApi from "@/Hook/Data/useBookApi";
import { BookDataType } from "@/types";
import { Content } from "@/components/common/product/Contents";
import EmptyProduct from "@/components/common/Empty";
import { Image } from "@nextui-org/react";

// OrderMobileNavbar 컴포넌트
const NavBar: React.FC & {
  Body: React.FC<{ children: React.ReactNode }>;
  Logo: React.FC;
  SearchWrapper: React.FC<{ children: React.ReactNode }>;
  SearchInput: React.FC<{
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    router: AppRouterInstance;
    add: (title: string) => void;
    onFocus: () => void;
    setIsFocused: Dispatch<SetStateAction<boolean>>;
  }>;
  SearchCloseBtn: React.FC<{
    setSearch: Dispatch<SetStateAction<string>>;
    visible: boolean;
  }>;
  UtilBtn: React.FC;
  RecentSearchBody: React.FC<{ children: React.ReactNode; visible: boolean }>;
  RecentSearchTitleTage: React.FC;
  RecentSearchList: React.FC<{
    recent: string[];
    Delete: (id: number) => void;
  }>;
  SearchListBody: React.FC<{ children: React.ReactNode }>;
  SearchListTitleTage: React.FC;
  SearchList: React.FC<{
    data: BookDataType[];
    onHover: (book: BookDataType | null) => void;
  }>;
  SearchListFocus: React.FC<{
    data: BookDataType | null;
    focus: BookDataType[];
  }>;
} = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { searches, addSearch, deleteSearch } = useRecentSearch();
  const { searchResults } = useBookApi({ slug: search });
  const [hoveredBook, setHoveredBook] = useState<BookDataType | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <Component>
        <NavBar.Body>
          <NavBar.Logo />
          <div className={styles.SearchContainer}>
            <NavBar.SearchWrapper>
              <NavBar.SearchInput
                search={search}
                setSearch={setSearch}
                router={router}
                add={addSearch}
                onFocus={() => setIsFocused(true)}
                setIsFocused={setIsFocused}
              />
              <NavBar.SearchCloseBtn
                setSearch={setSearch}
                visible={search.length > 0}
              />
            </NavBar.SearchWrapper>
            {isFocused &&
              (search.length > 0 ? (
                <NavBar.SearchListBody>
                  <NavBar.SearchListTitleTage />
                  <FlexBox $gap={24}>
                    <NavBar.SearchList
                      data={searchResults}
                      onHover={setHoveredBook}
                    />
                    {hoveredBook && (
                      <NavBar.SearchListFocus
                        focus={searchResults}
                        data={hoveredBook}
                      />
                    )}
                  </FlexBox>
                </NavBar.SearchListBody>
              ) : (
                <NavBar.RecentSearchBody visible={isFocused}>
                  <NavBar.RecentSearchTitleTage />
                  <NavBar.RecentSearchList
                    recent={searches}
                    Delete={deleteSearch}
                  />
                </NavBar.RecentSearchBody>
              ))}
          </div>
          <NavBar.UtilBtn />
        </NavBar.Body>
      </Component>
      <CategoryNav />
    </>
  );
};

// 서브 컴포넌트 정의

// 뒤로가기 버튼
// 제목
NavBar.Body = ({ children }) => (
  <nav aria-label="메인 네비게이션" className={styles.navBarContainer}>
    {children}
  </nav>
);

NavBar.Logo = () => (
  <LinkIcon
    ButtonIcons={<Image src="/Books.png" alt="Books Icon" width={104} />}
    className={styles.test}
    value="로고 홈 버튼"
    Href="/"
  />
);
NavBar.SearchWrapper = ({ children }) => {
  return <div className={styles.SearchWrapper}>{children}</div>;
};
NavBar.SearchInput = ({
  search,
  setSearch,
  router,
  add,
  onFocus,
  setIsFocused,
}) => {
  return (
    <input
      aria-label="도서 검색어 입력"
      aria-controls="search-results recent-searches"
      type="text"
      placeholder="검색어를 입력해주세요"
      className={styles.Input}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onFocus={onFocus}
      onBlur={() => {
        setTimeout(() => {
          setIsFocused(false);
        }, 200);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && search.trim() !== "") {
          router.push(`/SearchList/${search}`);
          add(search);
          setSearch("");
        }
      }}
    />
  );
};
NavBar.SearchCloseBtn = ({ setSearch, visible }) => {
  return (
    <LinkIcon
      value="Icosn"
      ButtonIcons={<MdOutlineCancel />}
      className={visible ? styles.closeButtonVisible : styles.closeButton}
      onClick={() => setSearch("")} // 여기 수정!
    />
  );
};

NavBar.UtilBtn = () => (
  <FlexBox $gap={22} className={styles.IconsTool}>
    <LinkIcon
      Href="/cart"
      aria-label="장바구니로 이동"
      ButtonIcons={
        <button className={styles.Icons}>
          <AiOutlineShoppingCart />
        </button>
      }
      className={styles.Icons}
      value="장바구니"
    />
    <LinkIcon
      Href="/myPage"
      aria-label="마이페이지로 이동"
      ButtonIcons={
        <button className={styles.Icons}>
          <IoMdPerson />
        </button>
      }
      className={styles.Icons}
      value="마이페이지"
    />
  </FlexBox>
);

NavBar.RecentSearchBody = ({ children, visible }) => (
  <FlexBox
    aria-label="최근 검색어"
    $col={true}
    className={`${styles.RecentSearchDropdown} ${visible ? styles.visible : ""}`}
  >
    {children}
  </FlexBox>
);

NavBar.RecentSearchTitleTage = () => <TitleTag level={3}>최근 검색어</TitleTag>;

NavBar.RecentSearchList = ({ recent, Delete }) => (
  <FlexBox $col={true} className={styles.RecentSearchList}>
    {recent.map((search, index) => (
      <div key={index} className={styles.Tag}>
        <Link href={`/SearchList/${search}`} className={styles.FlexButton}>
          {search}
        </Link>
        <button onClick={() => Delete(index)} className={styles.DeleteButton}>
          <IoIosClose />
        </button>
      </div>
    ))}
  </FlexBox>
);

NavBar.SearchListBody = ({ children }) => (
  <FlexBox
    $col={true}
    $gap={7}
    className={styles.SearchListBody}
    aria-label="검색 결과"
  >
    {children}
  </FlexBox>
);
NavBar.SearchListTitleTage = () => <TitleTag level={3}>검색결과</TitleTag>;

NavBar.SearchList = ({ data, onHover }) => (
  <FlexBox $col={true} $gap={12} $justify="center" className="w-full">
    {data.length > 0 ? (
      data.slice(0, 3).map((book, index) => (
        <div
          role="article"
          className={styles.ProductTool}
          key={index}
          onMouseEnter={() => onHover(book)}
        >
          <FlexBox $gap={8} $justify="space-between">
            <FlexBox $gap={16}>
              <Thumbnail
                data={book}
                className={styles.thumbnail}
                key={`${book.title}-${book.thumbnail}`}
              />
              <FlexBox $col={true} $gap={4} $justify="center">
                <Title data={book} className={styles.title} />
                <AuthList data={book} className={styles.authors} />
                <FlexBox $align="items-start" $col>
                  <CustomPrice
                    data={book}
                    Tool={styles.PriceTool}
                    DisCount={styles.PricePercentage}
                    SalePrice={styles.SalePrice}
                    Price={styles.Price}
                  />
                </FlexBox>
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </div>
      ))
    ) : (
      <EmptyProduct
        className={styles.Empty}
        message="검색 결과가 없습니다"
        submessage="다른 검색어를 입력해주세요"
        aria-label="검색 결과가 존재하지않는는 상태"
      />
    )}
  </FlexBox>
);

NavBar.SearchListFocus = ({ data, focus }) => (
  <>
    {focus.length > 0 ? (
      <FlexBox $col={true} $gap={16}>
        <Thumbnail data={data} className={styles.Focusthumbnail} />
        <Title data={data} className={styles.title} />
        <AuthList data={data} className={styles.authors} />
        <Content data={data} className={styles.title} sliceLength={60} />
      </FlexBox>
    ) : null}
  </>
);

// displayName 설정
NavBar.Body.displayName = "NavBar.Body";
NavBar.Logo.displayName = "NavBar.Logo";
NavBar.SearchWrapper.displayName = "NavBar.SearchWrapper";
NavBar.SearchInput.displayName = "NavBar.SearchInput";
NavBar.SearchCloseBtn.displayName = "NavBar.SearchCloseBtn";
NavBar.UtilBtn.displayName = "NavBar.UtilBtn";
NavBar.RecentSearchBody.displayName = "NavBar.RecentSearch";
NavBar.RecentSearchTitleTage.displayName = "NavBar.RecentSearchTitleTage";
NavBar.RecentSearchList.displayName = "NavBar.RecentSearch";
NavBar.SearchListBody.displayName = "NavBar.SearchListBody";
NavBar.SearchListTitleTage.displayName = "NavBar.SearchListTitleTag";
NavBar.SearchList.displayName = "NavBar.SearchList";
NavBar.SearchListFocus.displayName = "NavBar.SearchListFocus";

export default NavBar;
