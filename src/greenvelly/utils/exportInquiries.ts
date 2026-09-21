import { format, parseISO, isValid } from 'date-fns'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'

export interface InquiryRow {
  id: string
  name: string
  phone: string
  status: string
  date: string
  project: string
  requirement: string
  budget: string
  source: string
  raw: Record<string, unknown>
}

function cell(v: unknown): string {
  if (v == null) return ''
  return String(v).trim()
}

export function formatInquiryDisplayDate(raw: unknown): string {
  if (typeof raw === 'string' && raw.trim()) {
    if (/^\d{1,2} \w{3}/.test(raw.trim())) return raw.trim()
    const dt = parseISO(raw)
    if (isValid(dt)) return format(dt, 'd MMM yyyy')
  }
  return '—'
}

export function normalizeInquiry(i: Record<string, unknown>): InquiryRow {
  const firstName = cell(i.first_name)
  const lastName = cell(i.last_name)
  const combined = `${firstName} ${lastName}`.trim()
  const name = cell(i.name) || combined || 'Unknown'
  return {
    id: cell(i.id),
    name,
    phone: cell(i.phone),
    status: cell(i.status) || 'New Lead',
    date: formatInquiryDisplayDate(i.date ?? i.created_at),
    project: cell(i.project ?? i.site_name),
    requirement: cell(i.requirement ?? i.property_subtype ?? i.property_type),
    budget: cell(i.budget ?? i.budget_range),
    source: cell(i.source ?? i.lead_source),
    raw: i,
  }
}

export type InquiryPeriodFilter = 'week' | 'month' | 'year'

export function inquiryDateInPeriod(date: Date, period: InquiryPeriodFilter): boolean {
  const now = new Date()
  const day = new Date(date.getFullYear(), date.getMonth(), date.getDate())
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  switch (period) {
    case 'week': {
      const mondayOffset = today.getDay() === 0 ? 6 : today.getDay() - 1
      const start = new Date(today)
      start.setDate(today.getDate() - mondayOffset)
      const end = new Date(start)
      end.setDate(start.getDate() + 6)
      return day >= start && day <= end
    }
    case 'month':
      return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
    case 'year':
      return date.getFullYear() === now.getFullYear()
    default:
      return true
  }
}

function parseInquiryDate(raw: string | undefined): Date | null {
  if (!raw) return null
  const s = raw.trim()
  try {
    const dt = parseISO(s)
    if (isValid(dt)) return dt
  } catch {
    /* ignore */
  }
  const parts = s.match(/^(\d{1,2}) (\w{3})(?: (\d{4}))?/)
  if (parts) {
    const now = new Date()
    const year = parts[3] ? Number(parts[3]) : now.getFullYear()
    const dt = new Date(`${parts[2]} ${parts[1]}, ${year}`)
    if (isValid(dt)) return dt
  }
  return null
}

export function filterInquiriesByPeriod(rows: InquiryRow[], period: InquiryPeriodFilter): InquiryRow[] {
  return rows.filter((r) => {
    const d = parseInquiryDate(r.date === '—' ? undefined : r.date)
    if (!d) return true
    return inquiryDateInPeriod(d, period)
  })
}

export function filterInquiriesByTab(rows: InquiryRow[], tabIndex: number): InquiryRow[] {
  switch (tabIndex) {
    case 0:
      return rows
    case 1:
      return rows.filter((r) => r.status === 'New Lead')
    case 2:
      return rows.filter((r) => r.status === 'Follow-up')
    case 3:
      return rows.filter((r) => r.status === 'Site Visit Done')
    case 4:
      return rows.filter((r) => r.status === 'Closed / Booked' || r.status === 'Not Interested')
    default:
      return rows
  }
}

export function filterInquiriesBySearch(rows: InquiryRow[], query: string): InquiryRow[] {
  const q = query.trim().toLowerCase()
  if (!q) return rows
  return rows.filter((r) => r.name.toLowerCase().includes(q) || r.phone.toLowerCase().includes(q))
}

const EXPORT_HEADERS = ['Name', 'Phone', 'Status', 'Date', 'Project', 'Requirement', 'Budget', 'Source']

export function exportInquiriesToPdf(rows: InquiryRow[]): void {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' })
  doc.setFontSize(14)
  doc.text('Inquiries export', 40, 40)
  doc.setFontSize(9)
  doc.setTextColor(100)
  doc.text(`Generated ${format(new Date(), 'd MMM yyyy, HH:mm')}`, 40, 56)
  autoTable(doc, {
    startY: 70,
    head: [EXPORT_HEADERS],
    body: rows.map((r) => [
      r.name,
      r.phone,
      r.status,
      r.date,
      r.project,
      r.requirement,
      r.budget,
      r.source,
    ]),
    styles: { fontSize: 8, cellPadding: 6 },
    headStyles: { fillColor: [203, 213, 225], textColor: [15, 23, 42], fontStyle: 'bold' },
  })
  doc.save(`inquiries_${format(new Date(), 'yyyyMMdd_HHmmss')}.pdf`)
}

export function exportInquiriesToExcel(rows: InquiryRow[]): void {
  const data = rows.map((r) => ({
    Name: r.name,
    Phone: r.phone,
    Status: r.status,
    Date: r.date,
    Project: r.project,
    Requirement: r.requirement,
    Budget: r.budget,
    Source: r.source,
  }))
  const ws = XLSX.utils.json_to_sheet(data)
  const wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Inquiries')
  XLSX.writeFile(wb, `inquiries_${format(new Date(), 'yyyyMMdd_HHmmss')}.xlsx`)
}
