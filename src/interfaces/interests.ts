export interface InterestCategory {
  id: string;
  label: string;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  { id: '취미', label: '취미' },
  { id: '사회', label: '사회' },
  { id: '건강', label: '건강' },
  { id: '진로', label: '진로' },
  { id: '가족', label: '가족' },
  { id: '기술', label: '기술' }
] as const;

export type InterestId = typeof INTEREST_CATEGORIES[number]['id'];

// 선택된 관심사 배열 타입
export type SelectedInterests = InterestId[];
