'use client'

import Script from 'next/script'
import type { Locale } from '@/lib/i18n'

interface CommentsProps {
  locale: Locale
}

// Requires GitHub Discussions to be enabled on the repo and the giscus app
// installed. Replace REPLACE_ME_REPO_ID / REPLACE_ME_CATEGORY_ID with the
// values generated at https://giscus.app for this repository.
export function Comments({ locale }: CommentsProps) {
  return (
    <div className="mt-8">
      <Script
        src="https://giscus.app/client.js"
        data-repo="glowbeautyatomy/glowbeautyatomy"
        data-repo-id="REPLACE_ME_REPO_ID"
        data-category="General"
        data-category-id="REPLACE_ME_CATEGORY_ID"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="bottom"
        data-theme="light"
        data-lang={locale}
        crossOrigin="anonymous"
        async
      />
    </div>
  )
}
