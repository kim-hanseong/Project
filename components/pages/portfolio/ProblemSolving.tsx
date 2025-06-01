import React, { useState, useRef, forwardRef } from "react";
import {
  FaBug,
  FaLightbulb,
  FaCheckCircle,
  FaShoppingCart,
} from "react-icons/fa";
import styles from "./ProblemSolving.module.css";
import FlexBox from "@/components/common/FlexBox";
import TitleTag from "@/components/common/TitleTag";
import Image from "next/image";

interface Problem {
  title: string;
  description: string;
  solution: string;
  impact: string[];
  icon: JSX.Element;
  solutionImage?: string;
  solutionImageHook?: string;
  solutionImageFunction?: string;
}

const ProblemSolving: React.FC & {
  Title: React.FC;
  ProblemList: React.FC<{
    problems: Problem[];
    onProblemClick: (problem: Problem) => void;
    selectedProblem: Problem | null;
  }>;
  ProblemDetail: React.ForwardRefExoticComponent<
    {
      problem: Problem;
      onBackClick: () => void;
      showDetails: boolean;
    } & React.RefAttributes<HTMLDivElement>
  >;
} = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const problemDetailRef = useRef<HTMLDivElement>(null);

  const problems: Problem[] = [
    {
      title: "배송지 정보 관리 시스템 구현",
      description:
        "구매한 책을 배달 시키기 위해선 주소를 알아야 하는데 기본배송지를 어떻게 만들어야 할지 또한 주소지 요청을 어떻게 할 지 고민했다.",
      solution:
        "주소는 kakaoApi로 가져오게 했으며, 해당 주소는 supabase sql로 유저 자신의 주소만 보이게 했으며 주소를 선택할 수 있으며 기본배송지 또한 선택한 데이터의 날짜를 최신으로 업데이트하여 가져온 배열 데이터중 첫번째가 기본배송지가 될 수 있게 하였으며 삭제 또한 만들었다.",
      impact: [
        "Kakao API를 활용한 주소 검색 기능 구현",
        "Supabase를 통한 사용자별 주소 관리",
        "기본 배송지 자동 설정 기능",
        "주소 CRUD 기능 구현",
      ],
      icon: (
        <FaShoppingCart className={styles.icon} style={{ color: "#3B82F6" }} />
      ),
      solutionImage: "/솔루션 3.png",
      solutionImageHook: "/솔루션 3 Hook.png",
    },
    {
      title: "장바구니 추가 기능 최적화",
      description:
        "웹 페이지에 있는 상품들을 로그인 한 상태에서 해당 로그인 한 유저 장바구니 데이터에 추가함을 만들었는데, 중복과 중복이 되어있을 때 개수량이 추가가 되는걸 만들고 싶었는데 어려웠다.",
      solution:
        "장바구니를 눌렀을 때 해당 데이터를 가져와 thumbnail로 중복인지 아닌지를 확인할 수 있게 했으며, 해당 요소에 맞는 모달을 오픈되게 만들었습니다.",
      impact: [
        "중복 상품 처리 로직 개선",
        "사용자 경험 향상",
        "데이터 일관성 유지",
        "모달 UI/UX 개선",
      ],
      icon: (
        <FaShoppingCart className={styles.icon} style={{ color: "#3B82F6" }} />
      ),
      solutionImage: "/솔루션 2.png",
      solutionImageHook: "/솔루션 2 Hook.png",
    },
    {
      title: "장바구니 수량 관리 최적화",
      description:
        "장바구니에 담긴 각 상품의 수량을 개별적으로 관리하고, 이에 따라 총 가격이 실시간으로 반영되어야 했습니다. 하지만 상품 데이터를 단순 배열로만 관리할 경우, 개별 상품의 수량이나 가격 상태를 효율적으로 추적하고 동기화하기 어려웠습니다. 개수가 변경 될 때 마다 데이터와 비교함이 과부화 를 야기 할 것이였기에 데이터를 덜 사용할 수 있는 방법 을 갈구했습니다.",
      solution:
        "상품의 id를 key로 사용하는 객체(numbers)를 별도로 정의하여 수량 상태를 관리했습니다. 이를 통해 각 상품의 수량 변경 시 즉시 반영이 가능하게 되었고, shopList와 동기화하여 UI에도 실시간으로 반영할 수 있었습니다. 또한, numbering 값과 price를 활용하여 price * quantity 형태로 총 금액을 자동 계산하도록 구성함으로써, 사용자 인터랙션에 따른 가격 변화가 즉시 반영되도록 했습니다. 또한 cart 가 마운트 될 때 만 데이터를 가져온 뒤 해당 데이터를 state 에 넣어 관리 할 수 있게 함으로 써 데이터의 과부화를 줄일 수 있었습니다.",
      impact: [
        "상품 수량 변경 시 즉시 반영",
        "실시간 가격 계산 및 UI 업데이트",
        "상태 관리의 효율성 향상",
        "수량 증감, 삭제 등의 이벤트 처리 안정성 확보",
      ],
      icon: (
        <FaShoppingCart className={styles.icon} style={{ color: "#3B82F6" }} />
      ),
      solutionImage: "/솔루션1.png",
      solutionImageHook: "/솔루션1 Hook 모달.png",
      solutionImageFunction: "/솔루션 1 함수.png",
    },
    {
      title: "최근 검색어 기능 구현",
      description:
        "최근 검색어를 만들고 싶은데 이때 데이터 베이스의 사용이 미숙해서 데이터 사용량이 너무 늘어나 데이터 베이스를 사용하지 않으며 최근검색어를 만들려 했다",
      solution:
        "storage 를 사용해 해당 title 자체를 스토리지 배열에 넣고 그 배열에 따라 최근검색어가 나오게 만들었으며 최대 7개 까지 저장하게 만들어 스토리지의 문제점인 많은 데이터를 확보 못함을 해결하였다",
      impact: [
        "데이터베이스 부하 감소",
        "로컬 스토리지를 활용한 효율적인 데이터 관리",
        "최근 검색어 7개 제한으로 스토리지 용량 최적화",
        "사용자 경험 개선",
      ],
      icon: <FaBug className={styles.icon} style={{ color: "#FF6B6B" }} />,
      solutionImageHook: "/솔루션 4 Hook.png",
    },
    {
      title: "댓글 및 별점 시스템 구현",
      description:
        "로그인 된 상태에서 댓글 과 별점을 달 수 있게 만들려고 하였고 댓글을 쓴 유저만 삭제와 수정이 가능하게끔 만들려고 했다.",
      solution:
        "해당 댓글 자체의 별점과 댓글을 추가할 때 email 을 추가 로 넣을 수 있게 하고 다른 방법으로 삭제와 수정을 만들기 보단 해당 댓글과 Conetxt 와 같은 이메일인 유저만 보일 수 있게 하는 컴포넌트를 만들어서 사용하였다.",
      impact: [
        "사용자별 댓글 관리 기능 구현",
        "댓글 작성자 인증 시스템 구축",
        "댓글 수정/삭제 권한 관리",
        "사용자 경험 개선",
      ],
      icon: (
        <FaCheckCircle className={styles.icon} style={{ color: "#4CAF50" }} />
      ),
      solutionImage: "/솔루션 5.png",
      solutionImageHook: "/솔루션 5 Hook.png",
    },
    {
      title: "공용 컴포넌트 재사용성 최적화",
      description:
        "책 리스트 즉 공용 컴포넌트를 보여주는 형태에서 틀은 같지만 부가 효과가 다른 상황이 많이 있었다 예를들어 bestseller 페이지 에서 product 는 바로구매, 장바구니 버튼이 필요했고 cart 페이지에선 개수 조절이 필요했으며 mypage 페이지 에선 배송중인지 배송완료인지 구별하는 부가 효과의 버튼들이 각기 다른 형태로 존재했어서 처음엔 개별 컴포넌트로 줫다가 유지보수가 어렵다는 사실을 깨닫고 다른 방법을 모색하기 시작했다.",
      solution:
        "하나의 product 라는 컴포넌트를 활용해 이곳에서 props 를 받아 해당 데이터를 보여주는 형태와 동시에 어떤 Utill 버튼 즉 부가효과를 줄 수 있는 버튼을 보여줄 지 type 을 인수로 받아 쓸 수 있게 끔 하였다.",
      impact: [
        "컴포넌트 재사용성 향상",
        "코드 중복 제거",
        "유지보수 용이성 개선",
        "일관된 UI/UX 제공",
      ],
      icon: (
        <FaCheckCircle className={styles.icon} style={{ color: "#4CAF50" }} />
      ),
      solutionImage: "/솔루션 6.png",
      solutionImageHook: "/솔루션 6 Hook.png",
    },
    {
      title: "로그인 상태 관리 최적화",
      description:
        "로그인 의 유지를 만들려고 하는데 항상 데이터 베이스와 상호작용하는게 많은 데이터를 들인다고 생각했기에 데이터 베이스 가 아니더라도 로그인 형태를 유지할 수 있는 방법을 탐색했었다.",
      solution:
        "LayOut 부분 즉 최상위 부분에서 useConetxt 로 페이지가 마운트 될 때 만 로그인 정보를 가져오고 나머지는 전역으로 어디든 로그인 된 상태를 확인할 수 있게 만들었다.",
      impact: [
        "데이터베이스 부하 감소",
        "전역 상태 관리 효율성 향상",
        "사용자 경험 개선",
        "코드 재사용성 증가",
      ],
      icon: (
        <FaLightbulb className={styles.icon} style={{ color: "#FFD93D" }} />
      ),
      solutionImage: "/솔루션 7.png",
      solutionImageHook: "/솔루션 7 Hook.png",
    },
    {
      title: "Recoil 상태 관리 최적화",
      description:
        "프로젝트 초반에는 전역 상태를 중심으로 Recoil을 사용했지만, 시간이 지날수록 상태의 흐름이 복잡해지고 의존성이 얽히면서 데이터의 흐름을 파악하기 어려워졌습니다. 특히 특정 상황에서 데이터를 리다이렉트하는 순간, 의도치 않게 데이터 사용량이 급격히 늘어나기도 했습니다. Recoil은 사용 범위가 커질수록 오히려 프로젝트 구조를 정리하는 데 방해가 되었고, 유지보수에 어려움을 주었습니다.",
      solution:
        "Recoil의 사용을 제한적으로 적용하기로 결정했습니다. 전역적으로 상태가 필요한 상황, 예를 들어 모달의 노출 여부와 같은 UI 요소에만 Recoil을 사용했습니다. 그 외의 대부분의 상태는 props 기반의 데이터 전달 방식으로 변경하였고, 필요한 데이터는 각 컴포넌트에서 Hook을 통해 직접 가져오는 구조로 재설계했습니다. 또한, 서버 상태 관리를 위해 React Query를 적극적으로 활용하였고, 연관된 데이터가 업데이트될 때만 특정 modal type을 기반으로 리다이렉트를 수행하도록 설계함으로써 불필요한 렌더링과 데이터 낭비를 줄였습니다.",
      impact: [
        "Hook의 의존성 명확화",
        "컴포넌트별 데이터 사용 구분 용이",
        "상태 흐름 단순화",
        "불필요한 렌더링 감소",
      ],
      icon: (
        <FaLightbulb className={styles.icon} style={{ color: "#FFD93D" }} />
      ),
      solutionImage: "/솔루션 8.png",
      solutionImageHook: "/솔루션 8 Hook.png",
    },
  ];

  const handleProblemClick = (problem: Problem) => {
    setIsAnimating(true);
    setSelectedProblem(problem);
    setTimeout(() => {
      setShowDetails(true);
      setIsAnimating(false);
    }, 300);
  };

  const handleBackClick = () => {
    setIsAnimating(true);
    setShowDetails(false);
    setTimeout(() => {
      setSelectedProblem(null);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className={styles.container}>
      <FlexBox $align="start" $gap={22} $col={true}>
        <ProblemSolving.Title />
        <ProblemSolving.ProblemList
          problems={problems}
          onProblemClick={handleProblemClick}
          selectedProblem={selectedProblem}
        />
        {selectedProblem && (
          <ProblemSolving.ProblemDetail
            problem={selectedProblem}
            onBackClick={handleBackClick}
            showDetails={showDetails}
            ref={problemDetailRef}
          />
        )}
      </FlexBox>
    </section>
  );
};

// 서브 컴포넌트 정의
ProblemSolving.Title = () => (
  <TitleTag level={3} classNames={styles.title}>
    문제 해결 사례
  </TitleTag>
);

ProblemSolving.ProblemList = ({
  problems,
  onProblemClick,
  selectedProblem,
}) => (
  <div
    className={`${styles.problemList} ${selectedProblem ? styles.slideOut : ""}`}
  >
    {problems.map((problem) => (
      <button
        key={problem.title}
        onClick={() => onProblemClick(problem)}
        className={`${styles.problemCard} ${selectedProblem?.title === problem.title ? styles.selectedCard : ""}`}
      >
        <FlexBox $align="start" $gap={12}>
          <div className={styles.iconWrapper}>{problem.icon}</div>
          <div className={styles.problemInfo}>
            <h3 className={styles.problemName}>{problem.title}</h3>
            <p className={styles.problemDescription}>{problem.description}</p>
          </div>
        </FlexBox>
      </button>
    ))}
  </div>
);

ProblemSolving.ProblemDetail = forwardRef<
  HTMLDivElement,
  {
    problem: Problem;
    onBackClick: () => void;
    showDetails: boolean;
  }
>(({ problem, onBackClick, showDetails }, ref) => (
  <div
    ref={ref}
    className={`${styles.problemDetail} ${showDetails ? styles.slideIn : ""}`}
  >
    <button onClick={onBackClick} className={styles.backButton}>
      <span className={styles.backArrow}>←</span> 돌아가기
    </button>
    <FlexBox $align="start" $gap={16} $col={true}>
      <FlexBox $align="center" $gap={16}>
        <div className={styles.detailIcon}>{problem.icon}</div>
        <h3 className={styles.detailTitle}>{problem.title}</h3>
      </FlexBox>
      <div className={styles.detailContent}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>문제 상황</h4>
          <p className={styles.sectionText}>{problem.description}</p>
        </div>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>해결 방법</h4>
          <p className={styles.sectionText}>{problem.solution}</p>
          {problem.solutionImage && (
            <div className={styles.solutionImage}>
              <h5 className={styles.imageTitle}>전체 구조도</h5>
              <Image
                src={problem.solutionImage}
                alt="Solution diagram"
                width={600}
                height={400}
                className={styles.image}
              />
              {problem.title === "댓글 및 별점 시스템 구현" && (
                <Image
                  src="/솔루션 5-2.png"
                  alt="Solution diagram 2"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              )}
              {problem.title === "공용 컴포넌트 재사용성 최적화" && (
                <Image
                  src="/솔루션 6 컴포넌트.png"
                  alt="Component structure"
                  width={600}
                  height={400}
                  className={styles.image}
                />
              )}
              <b>
                {problem.title === "장바구니 수량 관리 최적화" &&
                  "상품의 id를 key로 사용하여 수량을 관리하고, 실시간으로 가격을 계산하는 구조를 구현"}
                {problem.title === "장바구니 추가 기능 최적화" &&
                  "장바구니 추가 시 데이터를 가져와 중복 확인 그리고 에러 관리, 중복된 상품이면 해당 개수가 추가될 수 있게 만들었다"}
                {problem.title === "배송지 정보 관리 시스템 구현" &&
                  "배송지 정보를 관리하고 기본 배송지를 설정하는 구조 구현"}
                {problem.title === "최근 검색어 기능 구현" &&
                  "로컬 스토리지를 활용한 최근 검색어 관리 구조 구현"}
                {problem.title === "댓글 및 별점 시스템 구현" &&
                  "이메일 기반의 권한 관리 시스템을 통한 댓글 및 별점 관리 구조 구현"}
                {problem.title === "공용 컴포넌트 재사용성 최적화" &&
                  "단일 Product 컴포넌트를 통한 다양한 페이지의 요구사항 충족 및 재사용성 향상"}
                {problem.title === "로그인 상태 관리 최적화" &&
                  "Context API를 활용한 효율적인 로그인 상태 관리 및 데이터베이스 부하 감소"}
                {problem.title === "Recoil 상태 관리 최적화" &&
                  "Recoil과 React Query를 조합한 효율적인 상태 관리 시스템 구축"}
              </b>
            </div>
          )}
          {problem.solutionImageHook && (
            <div className={styles.solutionImage}>
              <h5 className={styles.imageTitle}>Hook 구조</h5>
              <Image
                src={problem.solutionImageHook}
                alt="Hook solution diagram"
                width={600}
                height={400}
                className={styles.image}
              />
              <b>
                {problem.title === "장바구니 수량 관리 최적화" &&
                  "의존성 배열을 상품의 데이터를 추가하는 모달 타입들만 담아 장바구니에 영향을 주는 모달만 데이터에 직접적인 추가를 하는 형태를 만듦"}
                {problem.title === "장바구니 추가 기능 최적화" &&
                  "장바구니 추가 시 데이터를 가져와 중복 확인 그리고 에러 관리, 중복된 상품이면 해당 개수가 추가될 수 있게 만들었다"}
                {problem.title === "배송지 정보 관리 시스템 구현" &&
                  "배송지 정보를 관리하고 기본 배송지를 설정하는 Hook 구조"}
                {problem.title === "최근 검색어 기능 구현" &&
                  "로컬 스토리지를 활용한 최근 검색어 관리 Hook 구조"}
                {problem.title === "댓글 및 별점 시스템 구현" &&
                  "댓글의 삭제 / 추가 / 수정 의 모달이 오픈 될 때 마다 해당 type 을 의존성 배열로 줘 변경을 감지 할 수 있게 만들었다"}
              </b>
            </div>
          )}
          {problem.solutionImageFunction && (
            <div className={styles.solutionImage}>
              <h5 className={styles.imageTitle}>함수 구조</h5>
              <Image
                src={problem.solutionImageFunction}
                alt="Function solution diagram"
                width={600}
                height={400}
                className={styles.image}
              />
              <b>
                {problem.title === "장바구니 수량 관리 최적화" &&
                  "Hook 자체에서 해당 product의 개수 조절과 삭제를 할 수 있는 함수가 한곳에 있는것이 더 좋다 생각하여 한곳에 만들고 필요한 컴포넌트에서만 사용할 수 있게 만듦"}
                {problem.title === "장바구니 추가 기능 최적화" &&
                  "장바구니 추가 시 중복 확인 및 수량 증가를 처리하는 함수 구조와 모달 표시 로직 구현"}
                {problem.title === "배송지 정보 관리 시스템 구현" &&
                  "배송지 정보를 관리하고 기본 배송지를 설정하는 함수 구조"}
                {problem.title === "최근 검색어 기능 구현" &&
                  "로컬 스토리지를 활용한 최근 검색어 관리 함수 구조"}
              </b>
            </div>
          )}
        </div>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>개선 효과</h4>
          <ul className={styles.impactList}>
            {problem.impact.map((item, index) => (
              <li key={index} className={styles.impactItem}>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {problem.title === "배송지 정보 관리 시스템 구현" && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>아쉬운 점</h4>
            <div className={styles.solutionImage}>
              <Image
                src="/솔루션 3 아쉬운점 1.png"
                alt="아쉬운 점 다이어그램"
                width={600}
                height={400}
                className={styles.image}
              />
              <Image
                src="/솔루션 3 아쉬운점 2.png"
                alt="아쉬운 점 다이어그램"
                width={600}
                height={400}
                className={styles.image}
              />
            </div>
            <ul className={styles.impactList}>
              <li className={styles.impactItem}>
                추가 부분에서 해당 주소가 유효한지 확인하는 절차를 못만들어서
                아쉬움 (전화번호는 만들 수 있었는데 유효한 주소는 api 아니면
                확인을 못해서)
              </li>
              <li className={styles.impactItem}>
                모달 자체가 중복으로 나왔을 때, 현 모달 프로덕트를 하나로
                사용하고 있는데 esc를 누르면 keydown 형태로 닫히게 만들었는데
                전부 닫히는것 또한 아쉬움
              </li>
              <li className={styles.impactItem}>
                현 모달의 관리를 하나의 recoil의 type을 변경시키며 하고 있는데
                중복의 modal을 띄우는건 불가능하다여겨 여러개의 recoil 형태가
                나오는게 아쉽다고 생각함
              </li>
            </ul>
          </div>
        )}
        {problem.title === "댓글 및 별점 시스템 구현" && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>아쉬운 점</h4>
            <ul className={styles.impactList}>
              <li className={styles.impactItem}>
                현재 slug 자체를 title 로 주고 있는데 기준값을 title 로 하는
                순간 동일 제목이 있다면 해당 댓글이 제목이 같다는 이유만으로
                같은 댓글이 적힐 수 있음이 있다.
              </li>
              <li className={styles.impactItem}>
                해결 방법은 thumbnail 로 해야하는데 그런식이면 같은 책이여도
                thumbnail 만 다른 부분이 있을 때 다른책이라 보기도 좀 힘들고
                댓글을 공유해야하는 부분이기에 해결을 아직 못하였다.
              </li>
              <li className={styles.impactItem}>
                해결 방법: auth 가 같은 형태 즉 글쓴이가 같은 형태라면 댓글을
                공유하게 끔 유도해도 괜찮지 않을까
              </li>
            </ul>
          </div>
        )}
        {problem.title === "공용 컴포넌트 재사용성 최적화" && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>아쉬운 점</h4>
            <ul className={styles.impactList}>
              <li className={styles.impactItem}>
                여기에 모든 컴포넌트 형태가 들어가 있는것 이 조금 아쉬웠다
              </li>
            </ul>
          </div>
        )}
        {problem.title === "Recoil 상태 관리 최적화" && (
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>아쉬운 점</h4>
            <ul className={styles.impactList}>
              <li className={styles.impactItem}>
                Hook 하나가 담당하는 역할이 많아지면서 역할 분리가 다소 부족해진
                점이 아쉽습니다.
              </li>
            </ul>
          </div>
        )}
      </div>
    </FlexBox>
  </div>
));

// displayName 설정
ProblemSolving.Title.displayName = "ProblemSolving.Title";
ProblemSolving.ProblemList.displayName = "ProblemSolving.ProblemList";
ProblemSolving.ProblemDetail.displayName = "ProblemSolving.ProblemDetail";

export default ProblemSolving;
