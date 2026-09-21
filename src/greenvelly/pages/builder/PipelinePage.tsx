import { pipelineLeads } from '@/greenvelly/data/mockData'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { StatusBadge } from '@/greenvelly/components/widgets/StatusBadge'
import { colors } from '@/greenvelly/config/colors'

const STAGE_COLORS: Record<string, string> = {
  'New Lead': colors.statusNew,
  'Follow-up': colors.statusFollowUp,
  'Site Visit Done': colors.statusSiteVisit,
  'Not Interested': colors.statusNotInterested,
  'Closed / Booked': colors.statusClosed,
}

export function PipelinePage() {
  const stages = Object.entries(pipelineLeads)
  const totalLeads = stages.reduce((sum, [, leads]) => sum + leads.length, 0)

  return (
    <div className="page app-shell">
      <PageBackBar title="Lead Pipeline" />

      <div
        className="page-padding"
        style={{
          paddingTop: 0,
          background: colors.primarySurface,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '16px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.primary }}>{totalLeads}</div>
            <div style={{ fontSize: 12, color: colors.textSecondary }}>Total leads</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.success }}>
              {pipelineLeads['Closed / Booked']?.length ?? 0}
            </div>
            <div style={{ fontSize: 12, color: colors.textSecondary }}>Closed</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.warning }}>
              {pipelineLeads['Follow-up']?.length ?? 0}
            </div>
            <div style={{ fontSize: 12, color: colors.textSecondary }}>In follow-up</div>
          </div>
        </div>
      </div>

      <div className="page-padding">
        {stages.map(([status, leads]) => (
          <div key={status} style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <StatusBadge status={status} />
              <span style={{ fontSize: 13, color: colors.textHint }}>({leads.length})</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {leads.map((lead) => (
                <div
                  key={`${lead.name}-${lead.project}`}
                  className="card"
                  style={{ borderLeft: `4px solid ${STAGE_COLORS[status] ?? colors.border}` }}
                >
                  <div style={{ fontWeight: 600 }}>{lead.name}</div>
                  <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                    {lead.requirement} · {lead.budget}
                  </div>
                  <div style={{ fontSize: 12, color: colors.textHint, marginTop: 2 }}>{lead.project}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
