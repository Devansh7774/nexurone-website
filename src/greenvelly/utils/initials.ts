export function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  if (parts.length === 1) {
    const t = parts[0]
    return t.length >= 2 ? t.substring(0, 2).toUpperCase() : t.toUpperCase()
  }
  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export function userInitials(user: Record<string, unknown>): string {
  const name = String(user.full_name ?? '').trim()
  if (name) return initialsFromName(name)
  const email = String(user.email ?? '').trim()
  if (email.length >= 2) return email.substring(0, 2).toUpperCase()
  return '?'
}
