'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import ContactInfoItems from '@/components/contact/ContactInfoItems';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const res = await fetch('/api/public/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setStatus({ type: 'error', message: data.error || 'Failed to submit your query.' });
        return;
      }

      setForm({ name: '', email: '', phone: '', message: '' });
      setStatus({
        type: 'success',
        message: 'Thanks! Your query has been submitted successfully.',
      });
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="py-20 bg-gray-50/50">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Column - Contact Info */}
          <div>
            <div className="mb-6 inline-block rounded bg-[#e2e8f0] px-3 py-1 text-sm font-semibold uppercase tracking-wide text-[#1e293b]">
              HAVE QUESTIONS?
            </div>
            <h1 className="mb-4 text-4xl font-bold text-gray-900">
              Contact Information
            </h1>
            <p className="text-gray-500 mb-12 max-w-md text-sm leading-relaxed">
              Reach our team by phone, email, or the form below. We respond to new inquiries within one business day.
            </p>

            <ContactInfoItems showLocations className="space-y-6" />
          </div>

          {/* Right Column - Form aligned with Contact Information title */}
          <div className="lg:pt-14">
            <div className="rounded-[20px] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 lg:p-12">
              <h2 className="mb-10 text-3xl font-bold text-gray-900">
                How can we help you?
              </h2>

              <form className="space-y-8" onSubmit={handleSubmit} aria-label="Contact form">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input 
                  id="contact-name"
                  type="text" 
                  name="name"
                  autoComplete="name"
                  placeholder="Name" 
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                  className="w-full border-b border-gray-200 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-colors bg-transparent text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="contact-email" className="sr-only">Email</label>
                  <input 
                    id="contact-email"
                    type="email" 
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="Email*" 
                    required
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full border-b border-gray-200 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-colors bg-transparent text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="sr-only">Phone</label>
                  <input 
                    id="contact-phone"
                    type="tel" 
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Phone" 
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full border-b border-gray-200 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-colors bg-transparent text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea 
                  id="contact-message"
                  name="message"
                  placeholder="Message or Requirement *" 
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className="w-full border-b border-gray-200 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#2563eb] transition-colors bg-transparent resize-none text-sm"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                {status.message && (
                  <p
                    className={`mb-4 text-sm font-medium ${
                      status.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                    }`}
                  >
                    {status.message}
                  </p>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="nexuron-btn-solid rounded-md py-3.5 px-8 flex items-center gap-2 text-sm font-medium"
                >
                  <Send size={18} className="mr-1" />
                  {isSubmitting ? 'Submitting...' : 'Get In Touch'}
                </button>
              </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
