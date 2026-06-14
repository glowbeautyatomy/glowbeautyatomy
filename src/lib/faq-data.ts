import type { Locale } from './i18n'

export interface FaqItem {
  question: string
  answer: string
}

export const faqData: Record<Locale, FaqItem[]> = {
  ko: [
    {
      question: '애터미는 다단계인데, 사기 아닌가요?',
      answer:
        '애터미는 한국 공정거래위원회에 등록된 정식 직접판매 기업으로, 27개국에서 합법적으로 운영되고 있습니다. 불법 피라미드와 달리 실제 제품(생활용품, 화장품, 건강식품)을 판매하는 회사입니다. 다만 모든 직접판매업과 마찬가지로, 본인의 소비 패턴에 맞게 신중히 판단하는 것이 좋습니다.',
    },
    {
      question: '가입비가 있나요?',
      answer:
        '아니요, 애터미는 회원가입비가 무료입니다. 가입비를 요구하는 경우는 회사 정책 위반이니 주의하세요.',
    },
    {
      question: '해외에서도 가입할 수 있나요?',
      answer:
        '네, 애터미는 27개 법인 국가를 포함해 115개 이상의 지역에서 회원가입이 가능합니다. 거주 국가에 따라 가입 절차가 다르니, 국가별 가입 가이드를 참고하세요.',
    },
  ],
  en: [
    {
      question: 'Is Atomy a pyramid scheme?',
      answer:
        "Atomy is a legally registered direct-selling company operating in 27+ countries, regulated under fair-trade laws including Korea's Fair Trade Commission. Unlike illegal pyramid schemes, Atomy sells real consumer products (household goods, cosmetics, health supplements). As with any direct-selling business, it's worth evaluating based on your own consumption habits.",
    },
    {
      question: 'Is there a sign-up fee?',
      answer:
        "No, joining Atomy is free. If anyone asks you to pay a sign-up fee, that violates Atomy's official policy.",
    },
    {
      question: 'Can I join from any country?',
      answer:
        'Yes, Atomy is available for registration in 115+ regions, including 27 countries with local entities. The exact sign-up process depends on your country of residence — check our country guides for details.',
    },
  ],
}
