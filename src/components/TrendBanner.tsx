interface TrendBannerProps {
  items: string[]
}

export function TrendBanner({ items }: TrendBannerProps) {
  return (
    <div className="relative overflow-hidden border-y border-luxe-line bg-luxe-paper py-3.5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-luxe-paper to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-luxe-paper to-transparent" />
      <div className="flex w-max animate-marquee whitespace-nowrap motion-reduce:animate-none">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center text-xs font-medium uppercase tracking-luxe text-luxe-muted"
              >
                <span className="mx-6 h-1 w-1 rounded-full bg-luxe-accent" />
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
