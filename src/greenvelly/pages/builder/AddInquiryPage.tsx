import { Camera, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Toast } from '@/greenvelly/components/Toast'
import { AppButton } from '@/greenvelly/components/widgets/AppButton'
import { CustomTextField } from '@/greenvelly/components/widgets/CustomTextField'
import { NoSiteEmptyState } from '@/greenvelly/components/widgets/NoSiteEmptyState'
import { colors } from '@/greenvelly/config/colors'
import {
  BUDGET_RANGES,
  INQUIRY_PROPERTY_TYPES,
  OPTION_OTHER,
} from '@/greenvelly/config/constants'
import { useHasRealSites, useSelectedSite, useSiteStore } from '@/greenvelly/stores/siteStore'
import { citiesForState, loadIndiaStates } from '@/greenvelly/utils/indiaLocation'

const SUBTYPE_NA = '-'

function subtypesForPropertyType(type: string): string[] {
  switch (type) {
    case 'Bungalows':
    case 'Row Bungalow':
    case 'Row House':
    case 'Flats':
      return [...Array.from({ length: 5 }, (_, i) => `${i + 1} BHK`), OPTION_OTHER]
    case 'Commercial':
      return ['Ground Floor', '1st Floor', '2nd Floor', '3rd Floor', '4th Floor', '5th Floor', OPTION_OTHER]
    default:
      return []
  }
}

export function AddInquiryPage() {
  const navigate = useNavigate()
  const hasSite = useHasRealSites()
  const selectedSite = useSelectedSite()
  const createInquiry = useSiteStore((s) => s.createInquiry)
  const checkDuplicatePhone = useSiteStore((s) => s.checkDuplicatePhone)

  const [states, setStates] = useState<string[]>([])
  const [cities, setCities] = useState<string[]>([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)
  const [stateOther, setStateOther] = useState('')
  const [cityOther, setCityOther] = useState('')
  const [address, setAddress] = useState('')
  const [unitNumber, setUnitNumber] = useState('')
  const [budget, setBudget] = useState(BUDGET_RANGES[0])
  const [budgetOther, setBudgetOther] = useState('')
  const [propertyType, setPropertyType] = useState(INQUIRY_PROPERTY_TYPES[0])
  const [propertyTypeOther, setPropertyTypeOther] = useState('')
  const [propertySubtype, setPropertySubtype] = useState('')
  const [subtypeOther, setSubtypeOther] = useState('')
  const [notes, setNotes] = useState('')
  const [photo, setPhoto] = useState<File | undefined>()
  const [photoPreview, setPhotoPreview] = useState('')
  const [isDuplicate, setIsDuplicate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null)

  const subtypeItems = useMemo(
    () => (propertyType === OPTION_OTHER ? [] : subtypesForPropertyType(propertyType)),
    [propertyType],
  )

  useEffect(() => {
    loadIndiaStates().then(setStates)
  }, [])

  useEffect(() => {
    if (subtypeItems.length && !propertySubtype) setPropertySubtype(subtypeItems[0])
  }, [subtypeItems, propertySubtype])

  useEffect(() => {
    citiesForState(selectedState).then((list) => {
      setCities(list)
      if (list.length && !selectedCity) setSelectedCity(list[0])
    })
  }, [selectedState, selectedCity])

  const resolvedState = () => {
    if (!selectedState) return ''
    if (selectedState === OPTION_OTHER) return stateOther.trim()
    return selectedState
  }

  const resolvedCity = () => {
    if (!selectedCity) return ''
    if (selectedCity === OPTION_OTHER) return cityOther.trim()
    return selectedCity
  }

  const handlePhoneChange = async (v: string) => {
    const digits = v.replace(/\D/g, '').slice(0, 10)
    setPhone(digits)
    if (digits.length !== 10) {
      setIsDuplicate(false)
      return
    }
    const r = await checkDuplicatePhone(digits)
    setIsDuplicate(Boolean(r?.duplicate))
  }

  const handlePhoto = (file: File | undefined) => {
    if (!file) return
    setPhoto(file)
    setPhotoPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async () => {
    if (!firstName.trim() || !lastName.trim()) {
      setToast({ msg: 'First and last name are required.', type: 'error' })
      return
    }
    if (phone.length !== 10) {
      setToast({ msg: 'Enter a valid 10-digit mobile number.', type: 'error' })
      return
    }
    if (!resolvedState() || !resolvedCity()) {
      setToast({ msg: 'State and city are required.', type: 'error' })
      return
    }

    const budgetVal = budget === OPTION_OTHER ? budgetOther.trim() : budget
    const propType = propertyType === OPTION_OTHER ? propertyTypeOther.trim() : propertyType
    let propSubtype = SUBTYPE_NA
    if (propertyType !== OPTION_OTHER) {
      propSubtype =
        propertySubtype === OPTION_OTHER ? subtypeOther.trim() : propertySubtype || subtypeItems[0] || SUBTYPE_NA
    }

    setLoading(true)
    try {
      const created = await createInquiry(
        {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone,
          state: resolvedState(),
          city: resolvedCity(),
          address: address.trim(),
          unit_number: unitNumber.trim(),
          budget_range: budgetVal,
          property_type: propType,
          property_subtype: propSubtype,
          notes: notes.trim(),
        },
        photo,
      )
      if (created) {
        navigate('/home/inquiries', { replace: true })
      } else {
        setToast({ msg: 'Could not create inquiry.', type: 'error' })
      }
    } finally {
      setLoading(false)
    }
  }

  if (!hasSite) {
    return (
      <div className="page app-shell">
        <header className="app-bar">
          <button type="button" className="app-bar-back" onClick={() => navigate(-1)}>
            <X size={22} />
          </button>
          <h1 className="app-bar-title">Add Inquiry</h1>
        </header>
        <NoSiteEmptyState />
      </div>
    )
  }

  const selectStyle = { width: '100%', padding: '12px 14px', borderRadius: 12, border: `1px solid ${colors.border}`, background: colors.surfaceVariant, fontSize: 14 }

  return (
    <div className="page app-shell">
      <header className="app-bar">
        <button type="button" className="app-bar-back" onClick={() => navigate(-1)}>
          <X size={22} />
        </button>
        <h1 className="app-bar-title">Add Inquiry</h1>
        <div style={{ width: 40 }} />
      </header>

      <div className="page-padding" style={{ paddingBottom: 40 }}>
        <p style={{ fontSize: 13, color: colors.textSecondary, margin: '0 0 16px' }}>
          Site: {selectedSite.name}
        </p>

        <div className="form-card" style={{ marginBottom: 16 }}>
          <p className="section-title" style={{ marginTop: 0 }}>Basic Details</p>
          <CustomTextField label="First Name *" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Last Name *" value={lastName} onChange={(e) => setLastName(e.target.value)} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Mobile Number *" value={phone} onChange={(e) => handlePhoneChange(e.target.value)} maxLength={10} />
          {isDuplicate && (
            <p style={{ color: colors.warning, fontSize: 12, margin: '8px 0 0' }}>
              Duplicate! This number already has an inquiry for this site.
            </p>
          )}
          <div style={{ height: 12 }} />
          <label className="custom-field">
            <span className="custom-field-label">State *</span>
            <select style={selectStyle} value={selectedState ?? ''} onChange={(e) => { setSelectedState(e.target.value || null); setSelectedCity(null) }}>
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </label>
          {selectedState === OPTION_OTHER && (
            <>
              <div style={{ height: 12 }} />
              <CustomTextField label="Specify state *" value={stateOther} onChange={(e) => setStateOther(e.target.value)} />
            </>
          )}
          <div style={{ height: 12 }} />
          <label className="custom-field">
            <span className="custom-field-label">City *</span>
            <select style={selectStyle} value={selectedCity ?? ''} disabled={!selectedState} onChange={(e) => setSelectedCity(e.target.value || null)}>
              {!selectedState && <option value="">Select state first</option>}
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </label>
          {selectedCity === OPTION_OTHER && (
            <>
              <div style={{ height: 12 }} />
              <CustomTextField label="Specify city *" value={cityOther} onChange={(e) => setCityOther(e.target.value)} />
            </>
          )}
          <div style={{ height: 12 }} />
          <CustomTextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} multiline rows={2} />
          <div style={{ height: 12 }} />
          <CustomTextField label="Unit number" value={unitNumber} onChange={(e) => setUnitNumber(e.target.value)} />
        </div>

        <div className="form-card" style={{ marginBottom: 16 }}>
          <p className="section-title" style={{ marginTop: 0 }}>Property & Budget</p>
          <label className="custom-field">
            <span className="custom-field-label">Budget range</span>
            <select style={selectStyle} value={budget} onChange={(e) => setBudget(e.target.value)}>
              {BUDGET_RANGES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </label>
          {budget === OPTION_OTHER && (
            <>
              <div style={{ height: 12 }} />
              <CustomTextField label="Specify budget" value={budgetOther} onChange={(e) => setBudgetOther(e.target.value)} />
            </>
          )}
          <div style={{ height: 12 }} />
          <label className="custom-field">
            <span className="custom-field-label">Property type</span>
            <select style={selectStyle} value={propertyType} onChange={(e) => { setPropertyType(e.target.value); setPropertySubtype('') }}>
              {INQUIRY_PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
          {propertyType === OPTION_OTHER && (
            <>
              <div style={{ height: 12 }} />
              <CustomTextField label="Specify property type" value={propertyTypeOther} onChange={(e) => setPropertyTypeOther(e.target.value)} />
            </>
          )}
          {subtypeItems.length > 0 && (
            <>
              <div style={{ height: 12 }} />
              <label className="custom-field">
                <span className="custom-field-label">Subtype</span>
                <select style={selectStyle} value={propertySubtype} onChange={(e) => setPropertySubtype(e.target.value)}>
                  {subtypeItems.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </>
          )}
          {propertySubtype === OPTION_OTHER && (
            <>
              <div style={{ height: 12 }} />
              <CustomTextField label="Specify subtype" value={subtypeOther} onChange={(e) => setSubtypeOther(e.target.value)} />
            </>
          )}
          <div style={{ height: 12 }} />
          <CustomTextField label="Notes" multiline rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>

        <div className="form-card">
          <p className="section-title" style={{ marginTop: 0 }}>Photo (optional)</p>
          <label style={{ display: 'block' }}>
            <input type="file" accept="image/*" capture="environment" style={{ display: 'none' }} onChange={(e) => handlePhoto(e.target.files?.[0])} />
            <span className="list-item" style={{ justifyContent: 'center', color: colors.primary, fontWeight: 600 }}>
              <Camera size={20} /> {photo ? 'Change photo' : 'Take / upload photo'}
            </span>
          </label>
          {photoPreview && (
            <img src={photoPreview} alt="" style={{ width: '100%', marginTop: 12, borderRadius: 12, maxHeight: 200, objectFit: 'cover' }} />
          )}
          <div style={{ height: 20 }} />
          <AppButton text="Save inquiry" isLoading={loading} onClick={handleSubmit} />
        </div>
      </div>

      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  )
}
