import { Building2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { networkImageHeaders, resolveUploadsUrl } from '@/greenvelly/config/api'
import { getAuthToken } from '@/greenvelly/utils/storage'
import './SiteHeroCarousel.css'

interface SiteHeroCarouselProps {
  siteName: string
  imageUrls: string[]
}

export function SiteHeroCarousel({ siteName, imageUrls }: SiteHeroCarouselProps) {
  const [index, setIndex] = useState(0)
  const urls = imageUrls.map(resolveUploadsUrl).filter(Boolean)

  useEffect(() => {
    if (urls.length <= 1) return
    const t = setInterval(() => setIndex((i) => (i + 1) % urls.length), 4000)
    return () => clearInterval(t)
  }, [urls.length])

  if (!urls.length) {
    return (
      <div className="hero-carousel hero-carousel-empty">
        <Building2 size={48} color="var(--primary)" style={{ opacity: 0.85 }} />
        <span className="hero-carousel-empty-name">{siteName}</span>
      </div>
    )
  }

  const token = getAuthToken()
  void token
  void networkImageHeaders(urls[index])

  return (
    <div className="hero-carousel">
      <img
        key={urls[index]}
        src={urls[index]}
        alt={siteName}
        className="hero-carousel-image"
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
      <div className="hero-carousel-overlay">
        <h2 className="hero-carousel-name">{siteName}</h2>
      </div>
      {urls.length > 1 && (
        <div className="hero-carousel-dots">
          {urls.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`hero-dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
