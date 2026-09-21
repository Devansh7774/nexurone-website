import { useMemo } from 'react'
import { PageBackBar } from '@/greenvelly/components/layout/PageBackBar'
import { kProjects } from '@/greenvelly/data/mockData'
import { colors } from '@/greenvelly/config/colors'
import { projectMatchesSiteLabel, useSelectedSite } from '@/greenvelly/stores/siteStore'

export function ProjectsPage() {
  const selectedSite = useSelectedSite()

  const projects = useMemo(
    () => kProjects.filter((p) => projectMatchesSiteLabel(p.name, selectedSite.name)),
    [selectedSite.name],
  )

  const list = selectedSite.id ? projects : kProjects

  return (
    <div className="page app-shell">
      <PageBackBar title="Projects" />

      <div className="page-padding">
        {list.length === 0 ? (
          <div className="empty-state">No projects for this site.</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {list.map((project) => (
              <div key={project.id} className="card" style={{ borderLeft: `4px solid ${project.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16 }}>{project.name}</div>
                    <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 4 }}>
                      {project.type} · {project.location}
                    </div>
                  </div>
                  <span
                    className="chip"
                    style={{ background: `${project.color}1a`, color: project.color, borderColor: `${project.color}4d` }}
                  >
                    {project.status}
                  </span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 12, color: colors.primary }}>
                  {project.priceRange}
                </div>
                <div style={{ fontSize: 13, color: colors.textSecondary, marginTop: 8 }}>
                  {project.availableUnits} of {project.units} units available
                </div>
                <div className="chip-row" style={{ marginTop: 12 }}>
                  {project.amenities.map((a) => (
                    <span key={a} className="chip">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
