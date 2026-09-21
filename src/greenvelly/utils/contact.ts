export function launchPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned) window.open(`tel:${cleaned}`, '_self')
}

export function launchWhatsApp(phone: string, message = '') {
  const cleaned = phone.replace(/\D/g, '')
  if (!cleaned) return
  const num = cleaned.length === 10 ? `91${cleaned}` : cleaned
  const url = `https://wa.me/${num}${message ? `?text=${encodeURIComponent(message)}` : ''}`
  window.open(url, '_blank', 'noopener,noreferrer')
}
