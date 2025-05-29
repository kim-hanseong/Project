import React from "react";
import {
  FaBook,
  FaSearch,
  FaUserFriends,
  FaChartLine,
  FaTruck,
  FaSort,
  FaList,
  FaLock,
  FaExclamationTriangle,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Features: React.FC = () => {
  const features = [
    {
      title: "도서 검색 및 정렬",
      icon: <FaSearch className="w-6 h-6 text-green-500" />,
      description: "카테고리별 도서 검색과 다양한 정렬 옵션을 제공합니다.",
      details: [
        "카테고리별 도서 구분",
        "추천순/출판일순 정렬",
        "연관 도서 추천",
        "페이지네이션 지원",
      ],
    },
    {
      title: "도서 리뷰",
      icon: <FaUserFriends className="w-6 h-6 text-purple-500" />,
      description: "읽은 책에 대한 리뷰를 작성하고 관리할 수 있습니다.",
      details: [
        "도서 리뷰 작성",
        "리뷰 수정 및 삭제",
        "작성자 본인 확인",
        "리뷰 총합 확인",
      ],
    },
    {
      title: "구매 시스템",
      icon: <FaLock className="w-6 h-6 text-blue-500" />,
      description: "로그인한 사용자만 도서를 구매할 수 있습니다.",
      details: [
        "로그인 필수 구매",
        "구매 목록 관리",
        "구매 페이지 접근 제한",
        "구매 내역 조회",
      ],
    },
    {
      title: "독서 통계",
      icon: <FaChartLine className="w-6 h-6 text-orange-500" />,
      description: "월간/연간 독서 및 구매 통계를 확인할 수 있습니다.",
      details: ["월간/연간 독서 통계", "월간/연간 구매 통계"],
    },
    {
      title: "배송 서비스",
      icon: <FaTruck className="w-6 h-6 text-red-500" />,
      description: "주소지를 등록하고 구매한 도서를 배송받을 수 있습니다.",
      details: ["주소지 등록 및 관리", "기본 배송지 설정", "배송 상태 확인"],
    },
    {
      title: "시스템 안정성",
      icon: <FaExclamationTriangle className="w-6 h-6 text-yellow-500" />,
      description: "안정적인 서비스 이용을 위한 시스템을 제공합니다.",
      details: ["에러 처리", "로딩 상태 표시", "모달 알림", "사용자 피드백"],
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">주요 기능</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h3 className="ml-3 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
            </div>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <ul className="list-disc list-inside text-gray-600">
              {feature.details.map((detail, index) => (
                <li key={index} className="mb-1">
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
