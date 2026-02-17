// src/supabase.ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 클라이언트 생성 후 export
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getParticipantCount = async () => {
  try {
    const { data, error } = await supabase.storage
      .from("photos") // 지니님이 만든 버킷 이름
      .list("", { limit: 1000 }); // 최대 1000개까지 리스트업

    if (error) throw error;

    // 파일들 중 실제 이미지 파일만 필터링 (필요시)
    // .emptyFolderPlaceholder 같은 시스템 파일을 제외하기 위함입니다.
    const photoFiles = data.filter(
      (file) => file.name !== ".emptyFolderPlaceholder",
    );

    return photoFiles.length;
  } catch (error) {
    console.error("개수 가져오기 실패:", error);
    return 0;
  }
};
