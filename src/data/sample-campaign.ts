export type KeywordRow = {
  keyword: string
  type: "자동" | "수동"
  spend: number
  clicks: number
  orders: number
  reportedSales: number
  directSales: number
  impressionShare: number
}

export const sampleShop = {
  name: "한빛리빙",
  category: "수납 · 생활용품",
  month: "2026년 8월",
  gmv: 84_200_000,
  adSpend: 11_400_000,
  productMargin: 0.38,
  coupangFee: 0.11,
  shippingShare: 0.06,
}

export const keywords: KeywordRow[] = [
  {
    keyword: "수납박스 쿠팡로켓",
    type: "수동",
    spend: 1_820_000,
    clicks: 1640,
    orders: 186,
    reportedSales: 7_440_000,
    directSales: 6_510_000,
    impressionShare: 0.41,
  },
  {
    keyword: "옷장 정리함",
    type: "수동",
    spend: 1_150_000,
    clicks: 980,
    orders: 74,
    reportedSales: 3_108_000,
    directSales: 2_664_000,
    impressionShare: 0.22,
  },
  {
    keyword: "원룸 인테리어",
    type: "자동",
    spend: 2_460_000,
    clicks: 3120,
    orders: 41,
    reportedSales: 2_050_000,
    directSales: 984_000,
    impressionShare: 0.09,
  },
  {
    keyword: "이사 선물",
    type: "자동",
    spend: 1_980_000,
    clicks: 2410,
    orders: 28,
    reportedSales: 1_624_000,
    directSales: 728_000,
    impressionShare: 0.07,
  },
  {
    keyword: "리빙박스 대용량",
    type: "수동",
    spend: 2_110_000,
    clicks: 1510,
    orders: 97,
    reportedSales: 4_365_000,
    directSales: 3_880_000,
    impressionShare: 0.28,
  },
  {
    keyword: "캠핑 수납",
    type: "자동",
    spend: 1_880_000,
    clicks: 1760,
    orders: 19,
    reportedSales: 1_216_000,
    directSales: 418_000,
    impressionShare: 0.05,
  },
]

export function formatWon(value: number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "currency",
    currency: "KRW",
    maximumFractionDigits: 0,
  }).format(value)
}

export function pct(value: number) {
  return `${Math.round(value * 100)}%`
}

export function roas(sales: number, spend: number) {
  if (spend <= 0) return 0
  return sales / spend
}

export function breakEvenRoas(shop = sampleShop) {
  const contribution = shop.productMargin - shop.coupangFee - shop.shippingShare
  if (contribution <= 0) return Infinity
  return 1 / contribution
}

export function contributionProfit(directSales: number, spend: number, shop = sampleShop) {
  const contribution = shop.productMargin - shop.coupangFee - shop.shippingShare
  return directSales * contribution - spend
}

export const sampleTotals = keywords.reduce(
  (acc, row) => {
    acc.spend += row.spend
    acc.reportedSales += row.reportedSales
    acc.directSales += row.directSales
    acc.orders += row.orders
    return acc
  },
  { spend: 0, reportedSales: 0, directSales: 0, orders: 0 },
)

export const actions = [
  {
    tone: "kill" as const,
    title: "이번 주 바로 끄기",
    body: "원룸 인테리어, 이사 선물, 캠핑 수납. 세 키워드가 광고비의 55%를 쓰면서 직접 매출은 18%입니다. 보고 ROAS는 괜찮아 보이지만 직접 ROAS는 손익분기 220%를 한참 밑돕니다.",
  },
  {
    tone: "scale" as const,
    title: "예산을 옮길 곳",
    body: "수납박스 쿠팡로켓과 리빙박스 대용량은 직접 ROAS 310%·184%입니다. 끈 세 키워드 예산의 70%를 여기로 옮기면, 같은 광고비로 기여이익이 먼저 돌아옵니다.",
  },
  {
    tone: "structure" as const,
    title: "광고 전에 고칠 구조",
    body: "원룸 인테리어는 클릭은 많은데 전환이 1.3%입니다. 상세페이지가 '인테리어 콘텐츠'로 랜딩되고 있습니다. 썸네일과 첫 3단을 수납 문제 해결로 바꾼 뒤에야 자동 캠페인을 다시 켜세요.",
  },
]
