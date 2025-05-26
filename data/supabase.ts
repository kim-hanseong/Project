//* Library *
import { createClient } from "@supabase/supabase-js";

//* type *
import { BookDataType, BooksData, ProductComment } from "@/types";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  {
    auth: {
      persistSession: true,
    },
  }
);

//*--------------------------- Auth 관련 함수 ---------------------------*
export async function checkLogin() {
  const authInfo = await supabase.auth.getSession();
  return authInfo.data?.session;
}

export async function signOut() {
  await supabase.auth.signOut();
}

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
};

//*--------------------------- Shop 테이블 관련 함수 ---------------------------*
export async function ReadSupaBase(): Promise<BooksData> {
  const { data: record, error } = await supabase.from("Shop").select("*");
  return { data: record || [], total: record ? record.length : null, error };
}

export async function DeleteSupaBase(
  id: number
): Promise<{ success: boolean; error?: any }> {
  const { data, error } = await supabase.from("Shop").delete().eq("id", id);
  if (error) return { success: false, error };
  return { success: true };
}

export const ShopDBAdd = async (items: BookDataType[] | BookDataType) => {
  try {
    const { data: records, error: readError } = await ReadSupaBase();
    if (readError) return { error: readError };

    const existingRecords = records || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    const results = await Promise.all(
      itemsArray.map(async (item) => {
        const existingItem = existingRecords.find(
          (recordItem: BookDataType) => recordItem.thumbnail === item.thumbnail
        );

        if (existingItem) {
          return await updateItemInDatabase(item, existingItem);
        } else {
          return await addItemToDatabase(item);
        }
      })
    );

    return { results };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error };
  }
};

export const DeleteShopDB = async (id: number) => {
  const { data, error } = await supabase.from("Shop").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting data.");
  }
  return data;
};

export const DeleteOrderShopDB = async (titles: string[]) => {
  const { data, error } = await supabase
    .from("Shop")
    .delete()
    .in("title", titles);

  if (error) {
    throw new Error("Shop 데이터 삭제 중 오류 발생");
  }
  return data;
};

export async function SyncShopData(test: BookDataType[]) {
  const { data: allData, error: fetchError } = await supabase
    .from("Shop")
    .select("id");

  if (fetchError) {
    console.error("Shop 데이터 불러오기 실패", fetchError);
    return;
  }

  const remainingIds = test.map((item) => item.id);
  const deleteTargets = allData?.filter(
    (item) => !remainingIds.includes(item.id)
  );

  if (deleteTargets && deleteTargets.length > 0) {
    const { error: deleteError } = await supabase
      .from("Shop")
      .delete()
      .in(
        "id",
        deleteTargets.map((item) => item.id)
      );

    if (deleteError) {
      console.error("Shop 삭제 실패", deleteError);
    }
  }

  for (const item of test) {
    if (item.id !== undefined && item.numbering !== undefined) {
      const { error: updateError } = await supabase
        .from("Shop")
        .update({ numbering: item.numbering })
        .eq("id", item.id);

      if (updateError) {
        console.error(`ID: ${item.id}의 numbering 업데이트 실패`, updateError);
      }
    }
  }
}

//*--------------------------- Best 테이블 관련 함수 ---------------------------*
export async function Best_Book_DB(
  DB: string,
  pageNumber: number,
  pageSize: number,
  sorting: string
): Promise<{
  data: BookDataType[] | null;
  total: number | null;
  error: unknown;
}> {
  const offset = (pageNumber - 1) * pageSize;
  let query = supabase
    .from(`${DB}`)
    .select("*")
    .range(offset, offset + pageSize - 1);

  if (sorting === "추천일수") {
    query = query.order("id", { ascending: false });
  } else if (sorting === "출간일순") {
    query = query.order("publicationdate", { ascending: false });
  } else {
    query = query.order("id", { ascending: false });
  }

  const { data: record, error: dataError } = await query;
  return { data: record, total: null, error: dataError };
}

export async function ReadBest(): Promise<BooksData> {
  const {
    data: record,
    error,
    count,
  } = await supabase.from("Best").select("*", { count: "exact" });

  return { data: record || [], total: count || null, error };
}

export async function BestUpdate(items: BookDataType[] | BookDataType) {
  try {
    const { data: records, error: readError } = await ReadBest();
    if (readError) return { error: readError };

    const existingRecords = records || [];
    const itemsArray = Array.isArray(items) ? items : [items];

    const results = await Promise.all(
      itemsArray.map(async (item) => {
        const existingItem = existingRecords.find(
          (recordItem: BookDataType) => recordItem.title === item.title
        );

        if (existingItem) {
          return await updateItemInDatabase(item, existingItem);
        } else {
          return await addItemToDatabase(item);
        }
      })
    );

    return { results };
  } catch (error) {
    return { error };
  }
}

export const BestCategoryDomesticAdd = async (
  items: BookDataType[] | BookDataType
) => {
  try {
    const itemsArray = Array.isArray(items) ? items : [items];
    console.log(
      "저장하려는 데이터:",
      itemsArray.map((item) => ({
        title: item.title,
        datetime: item.datetime,
      }))
    );

    const { data, error } = await supabase
      .from("best_category_domestic")
      .insert(
        itemsArray.map((item) => ({
          title: item.title,
          publicationdate: item.datetime,
        }))
      );

    if (error) {
      console.error(
        "Error adding items to best_category_domestic:",
        error.message
      );
      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Unexpected error in BestCategoryDomesticAdd:", error);
    return { error };
  }
};

export const BestCategoryEbookAdd = async (
  items: BookDataType[] | BookDataType
) => {
  try {
    const itemsArray = Array.isArray(items) ? items : [items];
    console.log(
      "저장하려는 데이터:",
      itemsArray.map((item) => ({
        title: item.title,
        datetime: item.datetime,
      }))
    );

    const { data, error } = await supabase.from("best_category_eBook").insert(
      itemsArray.map((item) => ({
        title: item.title,
        publicationdate: item.datetime,
      }))
    );

    if (error) {
      console.error(
        "Error adding items to best_category_domestic:",
        error.message
      );
      return { error };
    }

    return { data };
  } catch (error) {
    console.error("Unexpected error in BestCategoryDomesticAdd:", error);
    return { error };
  }
};

export async function GetBestByNumbering(): Promise<BookDataType[] | null> {
  const { data, error } = await supabase
    .from("Best")
    .select("*")
    .order("numbering", { ascending: false });

  if (error) return null;
  return data;
}

export async function GetBestByDate(): Promise<BookDataType[] | null> {
  const { data, error } = await supabase
    .from("Best")
    .select("*")
    .order("publicationdate", { ascending: false });

  if (error) return null;
  return data;
}

//*--------------------------- Order 테이블 관련 함수 ---------------------------*
export async function ReadOrder(): Promise<BooksData> {
  const { data: record, error } = await supabase
    .from("Order")
    .select("*")
    .order("id", { ascending: false });
  return { data: record || [], total: record ? record.length : null, error };
}

export const OrderDB = async ({
  titles,
  numberings,
  addressName,
  phoneNumber,
}: {
  titles: string[];
  numberings: number[];
  addressName: string;
  phoneNumber: string;
}) => {
  if (titles.length !== numberings.length) {
    throw new Error("titles와 numberings의 길이가 일치하지 않습니다.");
  }

  // Order 테이블에 데이터 추가
  const insertData = titles.map((title, index) => ({
    title,
    numbering: numberings[index],
    Address: addressName,
    Phone: phoneNumber,
    delivery: false,
  }));

  const { data, error } = await supabase.from("Order").insert(insertData);

  if (error) {
    throw new Error(`주문 추가 중 오류: ${error.message}`);
  }

  // Best 테이블 업데이트
  const { data: bestRecords, error: readError } = await supabase
    .from("Best")
    .select("*");
  if (readError) {
    throw new Error(`Best 데이터 조회 중 오류: ${readError.message}`);
  }

  const existingRecords = bestRecords || [];

  // 각 title에 대해 Best 테이블 업데이트
  for (const title of titles) {
    const existingItem = existingRecords.find(
      (recordItem: BookDataType) => recordItem.title === title
    );

    if (existingItem) {
      // 기존 항목이 있으면 numbering + 1
      const { error: updateError } = await supabase
        .from("Best")
        .update({ numbering: (existingItem.numbering ?? 0) + 1 })
        .eq("title", title);

      if (updateError) {
        console.error(`Best 테이블 업데이트 중 오류: ${updateError.message}`);
      }
    } else {
      // 새로운 항목 추가
      const { error: insertError } = await supabase
        .from("Best")
        .insert([{ title, numbering: 1 }]);

      if (insertError) {
        console.error(`Best 테이블 추가 중 오류: ${insertError.message}`);
      }
    }
  }

  // Shop 테이블에서 해당 titles 삭제
  await DeleteOrderShopDB(titles);

  return data;
};

//*--------------------------- Consumer 테이블 관련 함수 ---------------------------*
export const ConsumerDB = async () => {
  const { data, error } = await supabase
    .from("Consumer")
    .select("*")
    .order("recent_selected_at", { ascending: false }); // 👈 최신순 정렬

  if (error) {
    throw new Error("Error fetching data.");
  }

  return data;
};
export const updateRecentSelectedAt = async (selectedId: number) => {
  if (!selectedId) throw new Error("selectedId가 필요합니다.");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("로그인된 사용자 정보를 가져올 수 없습니다.");
  }

  const userId = user.id;

  // 1. 모든 주소의 is_recent false로 초기화
  const { error: resetError } = await supabase
    .from("Consumer")
    .update({ is_recent: false })
    .eq("user_id", userId);

  if (resetError) {
    throw new Error(`기존 기본 배송지 초기화 중 오류: ${resetError.message}`);
  }

  // 2. 선택된 주소의 is_recent true + recent_selected_at 현재 시각으로 업데이트
  const { error: updateError } = await supabase
    .from("Consumer")
    .update({
      is_recent: true,
      recent_selected_at: new Date().toISOString(), // 현재 시간 적용
    })
    .eq("id", selectedId)
    .eq("user_id", userId);

  if (updateError) {
    throw new Error(`recent_selected_at 갱신 중 오류: ${updateError.message}`);
  }
};

export const deleteAddress = async (addressId: number) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error("로그인된 사용자 정보를 가져올 수 없습니다.");
  }

  const { data, error } = await supabase
    .from("Consumer")
    .delete()
    .eq("id", addressId);

  if (error) {
    throw new Error(`주소 삭제 중 오류: ${error.message}`);
  }
  return data;
};

export const addAddressDB = async ({
  addressName,
  consumer,
  phoneNumber,
  detailAddress,
  detailInfo,
}: {
  addressName: string;
  consumer: string;
  phoneNumber: string;
  detailAddress: string;
  detailInfo: string;
}) => {
  const { error: resetError } = await supabase
    .from("Consumer")
    .update({ is_recent: false })
    .eq("consumer", consumer);

  if (resetError) {
    throw new Error(`기존 주소 초기화 중 오류: ${resetError.message}`);
  }

  const { data, error } = await supabase.from("Consumer").insert([
    {
      Address: addressName,
      consumer,
      Phone: phoneNumber,
      addressinfo: detailAddress,
      addressdetailinfo: detailInfo,
      is_recent: false,
    },
  ]);

  if (error) {
    throw new Error(`주소 추가 중 오류: ${error.message}`);
  }
  return data;
};

//*--------------------------- Posts 테이블 관련 함수 ---------------------------*
export const fetchPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from("posts")
    .select("slug, rating")
    .eq("slug", slug);

  if (error) {
    throw new Error("Error fetching post.");
  }
  return data;
};

export const fetchPostBySlug2 = async (
  slug: string,
  pageNumber: number,
  pageSize: number
) => {
  const offset = (pageNumber - 1) * pageSize;
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  if (error) {
    throw new Error("Error fetching post.");
  }
  return data;
};

export const DeleteSlugDB = async (id: number) => {
  const { data, error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    throw new Error("Error deleting data.");
  }
  return data;
};

export const addPost = async (
  slug: string,
  content: string,
  rating: number,
  email: string
) => {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ slug, content, rating, email }])
    .single();

  if (error) {
    throw new Error(`Error adding post: ${error.message}`);
  }
  return data;
};

export const updatePostById = async (
  id: number,
  content: string,
  rating: number
) => {
  const { data, error } = await supabase
    .from("posts")
    .update({ content, rating })
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error updating post: ${error.message}`);
  }
  return data;
};

//*--------------------------- Helper 함수 ---------------------------*
const addItemToDatabase = async (item: BookDataType) => {
  const { data, error } = await supabase.from("Shop").insert([
    {
      title: item.title,
      price: item.price,
      sale_price: item.sale_price,
      thumbnail: item.thumbnail,
      authors: item.authors,
      numbering: 1,
    },
  ]);

  if (error) {
    console.error("Error adding item to database:", error.message);
  }
  return { data, error };
};

const updateItemInDatabase = async (
  item: BookDataType,
  existingItem: BookDataType
) => {
  const newNumbering = (existingItem.numbering ?? 0) + 1;
  const { data, error } = await supabase
    .from("Shop")
    .update({ numbering: newNumbering })
    .eq("thumbnail", item.thumbnail);

  if (error) {
    console.error("Error updating item in database:", error.message);
  }
};
