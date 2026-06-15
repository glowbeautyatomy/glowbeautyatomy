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
    {
      question: '제품이 정품인가요? 가짜 제품 걱정은 안 해도 되나요?',
      answer:
        '애터미 공식몰 또는 추천인을 통한 정식 가입 후 구매하면 100% 정품입니다. 출처가 불분명한 오픈마켓 재판매 제품은 가격은 저렴해 보여도 정품 인증이나 교환/환불이 어려우니, 공식 채널 이용을 권장합니다.',
    },
    {
      question: '배송은 얼마나 걸리나요?',
      answer:
        '국가와 제품에 따라 다르지만, 보통 국내(한국) 주문은 1~3일, 해외 배송은 국가별 통관 절차에 따라 1~2주 정도 소요됩니다. 정확한 배송 일정은 가입한 국가의 애터미 공식몰에서 확인할 수 있습니다.',
    },
    {
      question: '가입 후 꼭 판매활동을 해야 하나요?',
      answer:
        '아니요. 많은 회원들이 본인이 쓸 제품을 더 저렴한 회원가로 구매하기 위한 목적으로만 가입합니다. 추천이나 판매는 선택 사항이며, 강제되지 않습니다.',
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
    {
      question: 'Are the products genuine? How do I avoid fakes?',
      answer:
        'Products purchased through the official Atomy mall (after signing up via a member link) are 100% authentic. Reseller listings on open marketplaces may look cheaper but often lack authenticity guarantees and easy returns, so official channels are recommended.',
    },
    {
      question: 'How long does shipping take?',
      answer:
        'It depends on your country and the product, but domestic Korea orders typically arrive in 1-3 days, while international shipping can take 1-2 weeks depending on customs in your country. Check your local Atomy mall for exact delivery estimates.',
    },
    {
      question: 'Do I have to sell products after joining?',
      answer:
        'No. Many members join purely to buy products they already use at a discounted member price. Referrals and sales are optional, never required.',
    },
  ],
}
