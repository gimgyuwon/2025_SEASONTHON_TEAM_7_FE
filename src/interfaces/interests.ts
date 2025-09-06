export interface InterestCategory {
  id: string;
  label: string;
}

export const INTEREST_CATEGORIES: InterestCategory[] = [
  { id: '#맛집', label: '맛집' },
  { id: '#여행', label: '여행' },
  { id: '#패션', label: '패션' },
  { id: '#요리', label: '요리' },
  { id: '#영화', label: '영화' },
  { id: '#스마트기기', label: '스마트기기' },
  { id: '#건강', label: '건강' },
  { id: '#스포츠', label: '스포츠' }
] as const;

export type InterestId = typeof INTEREST_CATEGORIES[number]['id'];

// 선택된 관심사 배열 타입
export type SelectedInterests = InterestId[];
