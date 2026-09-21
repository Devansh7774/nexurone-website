"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export default function CareerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    otherRole: "",
    coverLetter: "",
    file: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "role" && value !== "Other" ? { otherRole: "" } : {}),
    }));
  };

  const isOtherRole = formData.role === "Other";
  const submittedRole = isOtherRole ? formData.otherRole.trim() : formData.role;

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isOtherRole && !submittedRole) {
      setStatus({ type: "error", message: "Please specify the role you are applying for." });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("phone", formData.phone);
      payload.append("location", formData.location);
      payload.append("role", submittedRole);
      payload.append("coverLetter", formData.coverLetter);
      if (formData.file) payload.append("cvFile", formData.file);

      const res = await fetch("/api/public/career", {
        method: "POST",
        body: payload,
      });
      const data = await res.json();

      if (!res.ok) {
        setStatus({ type: "error", message: data.error || "Failed to submit application." });
        return;
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        role: "",
        otherRole: "",
        coverLetter: "",
        file: null,
      });
      setStatus({ type: "success", message: "Application submitted successfully." });
    } catch {
      setStatus({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="w-full  py-16 md:py-24 scroll-mt-32">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[40px] font-bold text-[#2f6bff] mb-4">
            Turn Your Skills Into Impact
          </h2>
          <p className="text-[#505a68] text-[15px]">
            Fill out the form and take the next step in your career.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-[1340px] mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.18)] p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email*"
                  required
                  className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                />
              </div>
              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                />
              </div>
            </div>

            {/* Location & Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
              <div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your Current Location*"
                  required
                  className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                />
              </div>
              <div className="space-y-4">
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-400 rounded-sm py-3 px-4 text-[15px] text-gray-700 focus:outline-none focus:border-blue-500 transition-colors bg-white appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 1rem center',
                    backgroundSize: '1.2em 1.2em'
                  }}
                >
                  <option value="" disabled>Select Role</option>
                  <option value="Junior React.js Developer">Junior React.js Developer</option>
                  <option value="Junior MERN Stack Developer">Junior MERN Stack Developer</option>
                  <option value="Other">Other</option>
                </select>

                {isOtherRole && (
                  <input
                    type="text"
                    name="otherRole"
                    value={formData.otherRole}
                    onChange={handleChange}
                    placeholder="Specify the role you are applying for*"
                    required
                    className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                  />
                )}
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Cover Letter *"
                required
                rows={4}
                className="w-full border-b border-gray-400 py-3 text-[15px] text-gray-700 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors bg-transparent resize-y min-h-[100px]"
              ></textarea>
            </div>

            {/* File Upload */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-2">
                <input
                  type="file"
                  id="resume"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                />
                <label 
                  htmlFor="resume"
                  className="border border-gray-300 bg-gray-50 px-4 py-1.5 text-[14px] text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  Choose file
                </label>
                <span className="text-[14px] text-gray-500">
                  {formData.file ? formData.file.name : "No file chosen"}
                </span>
              </div>
              
              <div className="w-full border-b border-gray-200 mt-6 mb-4"></div>
              
              <p className="text-[13px] text-gray-500">
                Supported formats: PDF, DOC, DOCX. Max size: 2 MB.
              </p>
            </div>

            {/* Submit Button */}
            <div>
              {status.message && (
                <p className={`mb-4 text-sm font-medium ${status.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                  {status.message}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="nexuron-btn-solid rounded-md py-3 px-8 flex items-center gap-2 font-medium"
              >
                <Send className="w-4 h-4" />
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
