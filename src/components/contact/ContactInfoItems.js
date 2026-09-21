import { Phone, Mail, MapPin } from 'lucide-react';
import ContactInfoIcon from '@/components/contact/ContactInfoIcon';
import {
  CONTACT_EMAIL,
  CONTACT_PHONES,
  CONTACT_LOCATIONS,
  contactLinkClass,
} from '@/lib/contactInfo';

export default function ContactInfoItems({ showLocations = false, className = 'space-y-6' }) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <ContactInfoIcon icon={Phone} />
        <div>
          <h3 className="mb-1 text-base font-bold text-gray-900">Hotline</h3>
          <p className="text-sm font-medium">
            {CONTACT_PHONES.map((phone, index) => (
              <span key={phone.href}>
                {index > 0 ? <span className="text-gray-400"> | </span> : null}
                <a href={phone.href} className={contactLinkClass}>
                  {phone.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ContactInfoIcon icon={Mail} />
        <div>
          <h3 className="mb-1 text-base font-bold text-gray-900">Official Email</h3>
          <a href={`mailto:${CONTACT_EMAIL}`} className={contactLinkClass}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      {showLocations
        ? CONTACT_LOCATIONS.map((location) => (
            <div key={location.title} className="flex items-start gap-4">
              <ContactInfoIcon icon={MapPin} />
              <div>
                <h3 className="mb-1 text-base font-bold text-gray-900">{location.title}</h3>
                <p className="max-w-[300px] text-sm font-medium text-gray-600">{location.address}</p>
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
