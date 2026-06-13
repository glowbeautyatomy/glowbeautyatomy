interface TrendBannerProps {
  items: string[]
}

export function TrendBanner({ items }: TrendBannerProps) {
  const text = items.join('   ·   ')
  return (
    <div className="mt-6 overflow-hidden rounded-lg bg-gray-900 py-2">
      <div className="animate-marquee whitespace-nowrap text-sm font-semibold text-white">
        {text}
        {'   '}
        {text}
      </div>
    </div>
  )
}
