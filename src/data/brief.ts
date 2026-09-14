export type FitBand = "build first" | "strong fit" | "adjacent" | "pass"

export type Opportunity = {
  id: string
  rank: number
  fit: number
  band: FitBand
  title: string
  market: string
  oneLiner: string
  whyNow: string
  unsolved: string[]
  whyYou: string[]
  wedge: string
  whoPays: string
  crowdedWith: string
  risk: string
}

export type Source = {
  title: string
  url: string
  usedFor: string
}

export const researchedOn = "14 September 2026"

export const profile = {
  name: "Eunhye Grace J.",
  location: "Seoul",
  thesis:
    "Platforms will make their next dollar from B2B partner growth, not from more consumer acquisition. The people who know the 사장님 today are account managers. The systems that should know them tomorrow are agents sitting on unified partner data.",
  identityNote:
    "This brief is written for the public professional footprint of Eunhye Grace J. (Salesforce Account Executive; previously Coupang Ads, Twitter Partnerships, and CREATORY VN in Ho Chi Minh City). If any of that is wrong, the ranking still holds for a Korea-based B2B seller with retail-media and platform-partner experience.",
  strengths: [
    {
      label: "Retail media operator",
      detail:
        "Two and a half years inside Coupang Ads Acquisition, where the job is not 'run ads' but read retail P&L through advertising metrics, then convince a seller or brand to spend.",
    },
    {
      label: "Platform partner GTM",
      detail:
        "Twitter partnerships plus Salesforce enterprise selling. You already live in the gap between a platform's revenue team and the merchants, agencies, and SI partners who actually grow it.",
    },
    {
      label: "APAC bilingual operator",
      detail:
        "Korea plus three years of business development in Vietnam. Most seller-tool startups are English-first and Amazon-first. You are not.",
    },
    {
      label: "Sales identity, data language",
      detail:
        "You named yourself a salesperson, not a marketer. You treat data as a language for pitching, not a dashboard hobby. That is the rare combination agentic products actually need.",
    },
  ],
  passions: [
    "Who knows the 사장님 better: the AM or the AI?",
    "Partner growth journeys as the platform's real future revenue",
    "MCP and Slack as the place work actually happens, not as plumbing",
    "Retail media as the deepest funnel in advertising",
    "Customer-first problem immersion over feature theater",
  ],
  quotes: [
    {
      text: "AM or AI — 누가 더 우리 플랫폼의 사장님을 잘 알까. 이번 시즌엔 뭐가 더 잘 팔릴까? 최적의 광고 설정은 뭘까?",
      context: "Agentforce World Tour Korea 2026 talk",
    },
    {
      text: "진짜 질문은 MCP를 붙였느냐가 아니라, MCP를 불러 뭘 할 것인가, 더 나아가 무슨 비즈니스 임팩트를 낼 것인가이다.",
      context: "Public note on Slack + MCP, 2026",
    },
    {
      text: "마케팅? 전략? 아니, 나는 세일즈였다.",
      context: "Coupang farewell lessons, 2025",
    },
  ],
}

export const marketSignals = [
  {
    label: "Korea retail media",
    value: "$466M → $1.08B",
    detail: "2024 to 2030, 16.2% CAGR. Korea is the most advanced commerce-media market outside China.",
  },
  {
    label: "APAC retail media 2026",
    value: "$75.5B",
    detail: "36.7% of digital ads including China. Japan, Korea, and Australia each pass 20% of digital by decade-end.",
  },
  {
    label: "Agentforce ARR",
    value: "$1.4B",
    detail: "29,000 deals since launch. Only ~17% of enterprises have any AI agent in production.",
  },
  {
    label: "Korea CRM software",
    value: "$926M",
    detail: "2024, headed toward $2.1B by 2035. Licenses are bought. The system of record is still KakaoTalk and spreadsheets.",
  },
  {
    label: "Marketplace seller AI",
    value: "83% use, 25% no lift",
    detail: "Largest single answer in Marketplace Pulse 2026: AI produced no measurable result. Advertising is a top margin killer.",
  },
  {
    label: "Korean small business DX",
    value: "83% intro-level",
    detail: "80% use digital tools, but 83.3% remain basic or introductory. Government programs are invisible to 76% of owners.",
  },
]

export const opportunities: Opportunity[] = [
  {
    id: "sajangnim-copilot",
    rank: 1,
    fit: 94,
    band: "build first",
    title: "사장님 ads copilot for Coupang + Naver",
    market: "Korea retail media / marketplace seller ops",
    oneLiner:
      "A Korean-language agent that reads a seller's actual ads export, computes break-even ROAS after fees, and tells them which three keywords to kill this week.",
    whyNow:
      "Korea's retail media network spend is compounding at 16% a year while sellers are still trained by agencies, YouTube, and ChatGPT that has never seen their campaign. Coupang and Naver now take ~64% of Korean e-commerce. Advertising is the growth lever and the margin leak at the same time. Platforms have first-party AI. Sellers do not.",
    unsolved: [
      "Reported ROAS on Coupang is inflated by indirect conversions. Sellers scale spend on a vanity number and lose money on contribution margin.",
      "Generic AI writes listing copy. It cannot see keyword-level ACoS, inventory days, or fee structure, so it cannot make the decision that actually moves profit.",
      "83% of marketplace sellers use AI; the most common outcome is still 'no measurable result.' They automated the wrong job.",
      "Korean 소상공인 digital competency is still introductory. Tools that assume an Amazon-agency workflow will not get opened.",
      "Agencies optimize for ad spend. The 사장님 needs a tool that is loyal to their P&L, not to the platform's ad product.",
    ],
    whyYou: [
      "You sat on the other side of this conversation as a Coupang Ads AM. You already know the questions sellers ask after they have burned a week's budget.",
      "You can get the first ten design partners from people who already trust you, not from cold SEO.",
      "Your Agentforce talk is this product: support agent that guides ad settings and forecasts ROAS. You can ship a thin version without waiting for a Data 360 implementation.",
      "Korea-first, bilingual, commerce-native. That combination is almost absent in the Amazon-tool clone market.",
    ],
    wedge:
      "Do not build a full seller OS. Ingest a Coupang Ads report (CSV), output true ROAS vs break-even, a kill list, and three next actions in Kakao-pasteable Korean. Charge per shop, not per seat.",
    whoPays:
      "Independent Coupang/Naver sellers doing ₩30M–₩500M/month GMV, then the agencies who currently babysit them, then brand vendors who run both Coupang and SmartStore.",
    crowdedWith:
      "DashPanda, OSC, AID-style agencies, Excel templates, and ChatGPT. US Amazon tools (Helium 10, SellerForge) are not localized and do not speak Coupang's metrics.",
    risk: "Coupang or Naver can ship a 'smarter AI ads' toggle. Survive by optimizing for seller profit after fees, which the platform is structurally unwilling to do.",
  },
  {
    id: "partner-growth-os",
    rank: 2,
    fit: 91,
    band: "build first",
    title: "Agentic partner-growth OS for platforms",
    market: "B2B platform CRM / agentic enterprise",
    oneLiner:
      "The productized version of your World Tour talk: unify onboarding, MD, ads, and CS so an agent can run a partner's growth journey instead of an AM drowning in tabs.",
    whyNow:
      "Salesforce Agentforce crossed roughly $1.4B ARR with 29,000 deals, yet most enterprises still cannot get an agent into production. The blocker is not model quality. It is fragmented partner data and no opinionated workflow. TSIA's 2026 channel research is blunt: partner programs still reward bookings while AI products need adoption, expansion, and renewal.",
    unsolved: [
      "Marketplace and media platforms store 입점, MD, ads, and CS in different systems. No one, human or agent, can answer 'what should this partner do this week?'",
      "PRM tools track certifications and deal registration. They do not track whether the partner's customers adopted anything.",
      "Agentforce implementations stall on data readiness. Customers buy the dream, then discover they have no partner 360.",
      "Korea adds a second failure mode: Western CRM assumes institutional account ownership. Korean partner relationships still live with the individual AM.",
    ],
    whyYou: [
      "This is the thesis you already presented: platform future revenue is B2B, and the motion is agent-first sales/marketing/service.",
      "You can sell it from inside Salesforce conversations without quitting your day job — as a vertical playbook, a demo, or a side product that sits on top.",
      "You have seen both sides: Coupang partner ops and Salesforce agentic CRM. Almost nobody else has.",
    ],
    wedge:
      "Pick one platform motion (retail media partner success or SI partner success) and ship a Slack/Salesforce agent that proposes the next action for 20 accounts. Measure AM hours saved and partner ROAS lift, not 'agents deployed.'",
    whoPays:
      "Marketplace, retail-media, and SaaS platform revenue teams in Korea first (Coupang-like, Naver, 11st, agency networks), then APAC platforms. ACV is sales-led, ₩30M–₩300M.",
    crowdedWith:
      "Salesforce + SI partners (아이투맥스 and peers), Gainsight/ChurnZero on the CS side, Impartner/PartnerStack on the PRM side. None of them are a Korea marketplace partner brain.",
    risk: "You work at Salesforce. Build this as a complementary wedge or a future internal bet, not as a competing CRM. Keep customer data fictional until you have a clean IP line.",
  },
  {
    id: "am-augmentation",
    rank: 3,
    fit: 88,
    band: "strong fit",
    title: "AM augmentation, not AM replacement",
    market: "Account management / customer success AI",
    oneLiner:
      "A tool that makes a human AM the person who still knows the 사장님 best, by capturing Kakao/Slack context the CRM never sees and turning it into next-best actions.",
    whyNow:
      "Every CS suite can tell you usage dropped 40%. Almost none can tell you the champion left, the budget died in a reorg, or the seller is angry about last week's ROAS. Conversation is still the missing input. Your public question — AM or AI — is the product requirement.",
    unsolved: [
      "Health scores explain what, not why. Why lives in chat, calls, and the AM's head.",
      "When the AM leaves, 30–50% of account knowledge leaves with them. Korean sales culture makes this worse because the relationship is personal.",
      "AI copilots that auto-email customers destroy trust in high-touch retail media and partner accounts.",
      "AMs are measured on activity. The job that creates revenue is judgment. Current tools optimize the wrong one.",
    ],
    whyYou: [
      "You have been the AM. You know which notes actually matter before a QBR.",
      "You already argue that agents should propose and humans should judge. That is the only design that will sell to AMs instead of threatening them.",
      "Coupang + Salesforce is the exact two-sided user: the AM inside the platform, and the AE selling the agent.",
    ],
    wedge:
      "Start as a private 'AM brief' generator: paste last week's Kakao summary + ads snapshot, get a one-page account brief before the call. No auto-send. Human in the loop is the feature.",
    whoPays:
      "Retail media AM teams, marketplace partner managers, and Salesforce AEs/CSMs who run many mid-market accounts.",
    crowdedWith:
      "Gong, Clari, Gainsight, Notion AI, generic meeting notes. They are English-first, call-recording-first, and weak on Kakao + commerce metrics.",
    risk: "Privacy and employer data. Build on the AM's own notes and exported reports, never on scraped internal CRM until you have permission.",
  },
  {
    id: "korea-crm-layer",
    rank: 4,
    fit: 82,
    band: "strong fit",
    title: "A CRM layer Korean salespeople will actually touch",
    market: "Korea B2B SaaS / mid-market CRM",
    oneLiner:
      "Not another Salesforce clone. A Kakao/Slack-native memory layer that captures relationship work where it happens and writes back just enough for forecasting.",
    whyNow:
      "Korea's CRM market is not small — about $926M in 2024 — but implementation is theater. Forecasts still live in spreadsheets. Linkorea's 2026 analysis is the right diagnosis: global CRM assumes accounts belong to the company. In Korea they belong to the salesperson. Local tools (Channel.io, Trackit, Bizple) win on fit, not features. SME CRM marketing services are the fastest slice at ~16% CAGR.",
    unsolved: [
      "Salesforce and HubSpot get licensed, then ignored, because logging feels like surveillance of a personal relationship.",
      "AI agents cannot help a sales team whose real data is in KakaoTalk.",
      "Junior reps will not log sensitive context a manager can read without the story around it.",
      "The winning product has to feel useful to the salesperson first, and only then useful to the VP.",
    ],
    whyYou: [
      "You sell Salesforce and you know why Korean teams do not live in it. That tension is a product spec.",
      "Your MCP/Slack writing already describes the architecture: do the work in the collaboration surface, not in a system of record nobody opens.",
    ],
    wedge:
      "A Slack/Kakao capture bot for one sales team that turns voice notes and chat highlights into a private deal journal, with an optional Salesforce sync the rep controls.",
    whoPays:
      "Korea mid-market sales teams (KOSPI 200 outside chaebol) and Salesforce customers who bought licenses and got a ghost town.",
    crowdedWith:
      "Channel.io, Trackit, Salesforce, HubSpot, Kakao Work. The hole is the capture layer, not another pipeline board.",
    risk: "Hard consumer-grade distribution. Only pursue this if a current Salesforce account asks for it. Do not start here as a cold startup.",
  },
  {
    id: "sea-seller-profit",
    rank: 5,
    fit: 71,
    band: "adjacent",
    title: "Vietnam / SEA seller profit layer",
    market: "Southeast Asia social commerce ops",
    oneLiner:
      "Shopee + TikTok Shop now are Vietnam e-commerce. Sellers are dying on fees, ads, oversell, and tax — not on 'how do I open a shop.'",
    whyNow:
      "In H1 2026 Shopee and TikTok Shop held ~98% of measured Vietnam marketplace GMV. Revenue-generating shops are falling even as GMV rises. Identity verification and e-invoicing became mandatory. Overselling still drives a large share of complaints. The shakeout is the buying moment for software.",
    unsolved: [
      "Omnichannel ERPs (Sapo, BigSeller) sync stock. They do not tell a seller whether livestream ads are actually profitable after platform fees, affiliates, and returns.",
      "Cash in the bank diverges from platform-reported GMV. Tax time becomes a crisis.",
      "English Amazon playbooks do not translate to TikTok livestream economics.",
    ],
    whyYou: [
      "Three years of BD in Ho Chi Minh City is a real door-opener, not a tourism credential.",
      "The problem rhymes with Korea retail media: platforms got sophisticated, sellers got a dashboard.",
    ],
    wedge:
      "Treat this as expansion after a Korea copilot works, or as a research trip with two Vietnam sellers — not as company number one. The language, payments, and tax stack are a full-time job.",
    whoPays: "Growing Shopee/TikTok mall sellers and agencies in VN/TH/ID, once you have a working profit engine from Korea.",
    crowdedWith: "Sapo, KiotViet, BigSeller, platform-native seller centers.",
    risk: "You are no longer on the ground. Local competitors move faster on payments, e-invoices, and Zalo. Do not lead with this.",
  },
]

export const passList = [
  {
    title: "US Amazon seller SaaS clone",
    reason:
      "Crowded, English-first, and your unfair advantage is Coupang/Naver/Salesforce, not Amazon SP-API trivia.",
  },
  {
    title: "Generic ChatGPT wrapper",
    reason:
      "Sellers already have that, and 25% already know it does not move the P&L. Context-blind AI is the problem, not the market.",
  },
  {
    title: "Another Salesforce SI shop",
    reason:
      "Korea already has capable partners. Your leverage is the workflow opinion, not more implementation hours.",
  },
  {
    title: "Web3 / entertainment brand studio",
    reason:
      "CREATORY was a chapter, not the current thesis. Your public work in 2025–2026 is commerce, CRM, and agents.",
  },
]

export const ninetyDayPlan = [
  {
    days: "1–14",
    title: "Twelve conversations, one spreadsheet",
    steps: [
      "Talk to six Coupang or Naver sellers who spent on ads in the last 30 days. Ask what they looked at before raising budget.",
      "Talk to four AMs or agency ops people about the last time a seller was angry about ROAS.",
      "Talk to two platform or Salesforce customers who own partner revenue.",
      "Collect three anonymized ads exports. If you cannot get a CSV, the wedge is too early.",
    ],
  },
  {
    days: "15–45",
    title: "Ship the ugly copilot",
    steps: [
      "Build the CSV-in, Korean-actions-out loop you can click in this brief.",
      "Compute break-even ROAS from margin, fees, and shipping — not from the platform's default ROAS.",
      "Show a kill list and a scale list. Nothing else.",
      "Sit next to one seller while they use it. Watch where they get lost.",
    ],
  },
  {
    days: "46–90",
    title: "Get paid, then decide the company shape",
    steps: [
      "Charge ₩100k–₩300k/month for two design partners. Paid is the only signal that matters.",
      "If sellers pay, you have a product. Keep it independent and quiet.",
      "If platforms pay, you have a Salesforce-shaped wedge: partner-growth OS. Stay on the right side of employment and IP.",
      "If nobody pays, you still have a point of view you can take into every Agentforce conversation.",
    ],
  },
]

export const sources: Source[] = [
  {
    title: "South Korea Retail Media Networks Market Size & Outlook, 2030",
    url: "https://www.grandviewresearch.com/horizon/outlook/retail-media-networks-market/south-korea",
    usedFor: "Korea retail media $466M (2024) to $1.08B (2030), 16.2% CAGR",
  },
  {
    title: "MPA Report: Asia Pacific advertising 2026, retail media twice linear TV",
    url: "https://avia.org/mpa-report-asia-pacific-advertising-to-reach-us276-billion-in-2026-as-retail-media-grows-to-twice-the-size-of-linear-tv/",
    usedFor: "APAC retail media $75.5B in 2026; Korea among most advanced commerce-media markets",
  },
  {
    title: "Naver Smartstore & Coupang — Korea E-Commerce Playbook 2026",
    url: "https://noahgroup.co.kr/articles/naver-coupang-ecommerce-playbook.html",
    usedFor: "Korea e-commerce >$160B; Coupang + Naver ~64% share",
  },
  {
    title: "Marketplace Pulse 2026 via Robert Hu — seller AI adoption vs results",
    url: "https://theroberthu.com/blog/marketplace-sellers-ai-adoption-no-results-marketplace-pulse-2026",
    usedFor: "83% of sellers use AI; 25% report no measurable result",
  },
  {
    title: "Why generic AI tools are failing Amazon sellers in 2026",
    url: "https://www.sellerforge.ai/blog/why-generic-ai-fails-amazon-sellers",
    usedFor: "Context-blind chatbots cannot see campaigns, inventory, or account history",
  },
  {
    title: "Korea Federation of SMEs DX/AX survey, June 2026",
    url: "https://www.asiae.co.kr/en/article/2026060908575149180",
    usedFor: "80% digital adoption but 83.3% still basic/introductory",
  },
  {
    title: "AI Agents Statistics 2026",
    url: "https://voxbooster.com/blog/ai-agents-statistics-2026/",
    usedFor: "Agentforce ~$1.4B ARR; ~17% of enterprises have an agent in production",
  },
  {
    title: "KeyBanc / CIO on Agentforce traction and data readiness",
    url: "https://www.cio.com/article/4198127/salesforces-agentforce-product-maturity-questioned-as-keybanc-cites-weak-customer-traction.html",
    usedFor: "Appetite is not the bottleneck; data unification and workflow are",
  },
  {
    title: "Korea CRM implementation: why HubSpot and Salesforce struggle",
    url: "https://linkoreamarketing.com/korea-crm-implementation/",
    usedFor: "CRM licensed but not used; personal relationship ownership vs system of record",
  },
  {
    title: "B2B SaaS Marketing in Korea 2026",
    url: "https://noahgroup.co.kr/articles/b2b-saas-marketing-korea.html",
    usedFor: "Korea enterprise software ~$4.8B; CRM challenged by local tools",
  },
  {
    title: "South Korea CRM Marketing Services Market",
    url: "https://www.mordorintelligence.com/industry-reports/south-korea-crm-marketing-services-market",
    usedFor: "SME fastest CAGR ~16%; KakaoTalk-centered workflows",
  },
  {
    title: "TSIA — State of Channel Partnerships 2026",
    url: "https://www.tsia.com/blog/the-state-of-channel-partnerships-2026-ai",
    usedFor: "Partner programs still reward transactions, not adoption and renewal",
  },
  {
    title: "Vietnam e-commerce 2026 — Cimigo / YouNet ECI",
    url: "https://www.cimigo.com/en/trends/vietnam-e-commerce-2026/",
    usedFor: "Shopee + TikTok Shop ~98% of measured GMV; seller counts falling",
  },
  {
    title: "E-commerce challenges in Vietnam 2026",
    url: "https://www.sliner.sg/en/insights/e-commerce-challenges-in-vietnam-for-2026",
    usedFor: "Overselling, fee pressure, tax/e-invoice compliance",
  },
  {
    title: "쿠팡 광고 보고서 분석 — DashPanda",
    url: "https://www.dashpanda.io/blog/coupang-ad-report-analysis",
    usedFor: "Indirect conversions inflate Coupang ROAS; keyword-level P&L is the real unit",
  },
  {
    title: "쿠팡 셀러가 광고비를 태워도 안 뜨는 이유 — i-boss",
    url: "https://www.i-boss.co.kr/ab-6141-70969",
    usedFor: "Sellers spend before conversion structure exists; algorithm then starves the listing",
  },
]
