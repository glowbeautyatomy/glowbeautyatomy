import type { Locale } from './i18n'

export const dictionaries = {
  ko: {
    nav: { join: '가입 가이드', reviews: '리뷰', faq: 'FAQ' },
    home: {
      badge: '🔥 전세계 27개국 K-뷰티 인사이더',
      title: 'GlowBeautyAtomy',
      subtitle: 'K-뷰티 최저가 + 가입 혜택, 당신의 나라에서 시작하세요',
      cta: '한국에서 가입하기',
      trends: [
        '🇦🇺 호주에서 인기',
        '🇦🇱 알바니아에서 화제',
        '🇧🇷 브라질에서 급성장',
        'K-뷰티, 전세계로',
      ],
      cards: [
        {
          href: '/ko/join',
          emoji: '🌍',
          title: '국가별 가입 가이드',
          description: '내 나라에서 애터미 가입하는 법',
        },
        {
          href: '/ko/reviews',
          emoji: '✨',
          title: '솔직 리뷰',
          description: '실제 사용 후기 모음',
        },
        {
          href: '/ko/faq',
          emoji: '💬',
          title: '신뢰 FAQ',
          description: '"이거 사기 아니야?" 궁금증 해결',
        },
      ],
    },
  },
  en: {
    nav: { join: 'Join Guide', reviews: 'Reviews', faq: 'FAQ' },
    home: {
      badge: '🔥 K-Beauty Insider in 27+ Countries',
      title: 'GlowBeautyAtomy',
      subtitle: 'Best K-beauty deals + sign-up perks, start from your country',
      cta: 'Start Your Global Journey',
      trends: [
        '🇦🇺 Trending in Australia',
        '🇦🇱 Hot in Albania',
        '🇧🇷 Growing fast in Brazil',
        'K-Beauty Goes Global',
      ],
      cards: [
        {
          href: '/en/join',
          emoji: '🌍',
          title: 'Country Join Guides',
          description: 'How to join Atomy from your country',
        },
        {
          href: '/en/reviews',
          emoji: '✨',
          title: 'Honest Reviews',
          description: 'Real reviews from real users',
        },
        {
          href: '/en/faq',
          emoji: '💬',
          title: 'Trust FAQ',
          description: 'Is Atomy legit? All your questions answered',
        },
      ],
    },
  },
} as const

export function getDictionary(locale: Locale) {
  return dictionaries[locale]
}
