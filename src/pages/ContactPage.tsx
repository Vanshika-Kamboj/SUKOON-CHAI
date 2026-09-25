import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SteamEffect } from '../components/visuals/SteamEffect';
import { Mail, Phone, MapPin, Instagram, CheckCircle2, ChevronDown, Send } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    showToast('Your message has been sent. We will reply over tea shortly!');
  };

  const faqs = [
    {
      q: 'How fresh is Sukoon Chai when delivered?',
      a: 'We blend in small micro-batches of 50kg twice a week. Every pouch is nitrogen-flushed and hermetically heat-sealed in multi-layer barrier kraft paper to preserve natural botanical aromas for up to 12 months.',
    },
    {
      q: 'Are there any artificial flavours, oils, or preservatives?',
      a: 'Absolutely none. We reject artificial spray essences and chemical preservatives. All aromas arise strictly from authentic whole Kerala cardamom, Himalayan ginger, Darjeeling leaves, and Pushkar rose petals.',
    },
    {
      q: 'Do you offer corporate or wedding gifting?',
      a: 'Yes, we curate custom engraved pine wood boxes with bespoke handwritten notes and solid brass spoons for weddings, festive occasions, and corporate retreats. Please email us directly at gifts@sukoonchai.com.',
    },
    {
      q: 'What is your shipping policy and delivery timeline?',
      a: 'We offer free express delivery across India on all orders over ₹499. Metros typically receive packages in 2–3 business days; other locations within 4–5 business days via Bluedart Express.',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
          Friendly Hospitality
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#3E2A20]">
          Let’s Talk Over Chai.
        </h1>
        <p className="font-handwriting text-3xl sm:text-4xl text-[#B96F4A]">
          “Whether you have questions, tea stories, or gifting ideas.”
        </p>
        <p className="text-sm sm:text-base text-[#3E2A20]/80 font-light max-w-xl mx-auto leading-relaxed">
          We answer every note by hand. Pull up a chair and let us know what’s on your mind.
        </p>
      </div>

      {/* Main Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Contact Info & Tea Illustration */}
        <div className="lg:col-span-5 space-y-8 bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-8 sm:p-10 shadow-xs">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wider text-[#B96F4A] font-semibold">
              Reach Out Directly
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#3E2A20]">
              The Sukoon Atelier
            </h3>
            <p className="text-xs sm:text-sm text-[#3E2A20]/75 leading-relaxed font-light">
              Our blends are crafted in Rajasthan and shipped fresh across the subcontinent.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-[#3E2A20]/80">
            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#B96F4A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#3E2A20]">Customer Care & Orders:</span>
                <a href="mailto:care@sukoonchai.com" className="hover:text-[#B96F4A] underline">
                  care@sukoonchai.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#B96F4A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#3E2A20]">Chai Helpline:</span>
                <span>+91 (0141) 489-2041 (Mon–Sat, 10am–6pm IST)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#B96F4A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#3E2A20]">Studio Address:</span>
                <span>Plot 14, Heritage Crafts Enclave, C-Scheme, Jaipur 302001, Rajasthan, India</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Instagram className="w-4 h-4 text-[#B96F4A] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold block text-[#3E2A20]">Instagram Stories:</span>
                <a
                  href="https://instagram.com/sukoon.chai_"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#B96F4A] font-medium hover:underline"
                >
                  @sukoon.chai_
                </a>
              </div>
            </div>
          </div>

          {/* Artistic Tea Cup Graphic */}
          <div className="pt-6 border-t border-[#E7D5BA]/60 flex flex-col items-center text-center">
            <SteamEffect size="md" />
            <span className="font-handwriting text-2xl text-[#3E2A20] mt-1">
              “Ek Cup, Thoda Sukoon.”
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#B96F4A] mt-1">
              Freshly Steeping Daily
            </span>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="lg:col-span-7 bg-[#FFFDF9] border border-[#E7D5BA] rounded-3xl p-8 sm:p-10 shadow-xs">
          {submitted ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#7B8665]/20 text-[#7B8665] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-3xl font-bold text-[#3E2A20]">
                Message Received!
              </h3>
              <p className="text-sm text-[#3E2A20]/80 max-w-sm mx-auto font-light leading-relaxed">
                Thank you for getting in touch, {formData.name}. Our tea team will respond to your email at <strong>{formData.email}</strong> within 24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                }}
                className="px-6 py-2.5 bg-[#3E2A20] text-white text-xs font-semibold rounded-xl hover:bg-[#B96F4A] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif text-2xl font-bold text-[#3E2A20] mb-2">
                Send a Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehta"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="aarav@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-1.5">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                  />
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                  >
                    <option value="General Inquiry">General Chai Inquiry</option>
                    <option value="Order Tracking">Order & Shipping Status</option>
                    <option value="Wedding & Corporate Gifting">Wedding & Corporate Gifting</option>
                    <option value="Tea Tasting & Wholesale">Wholesale & Cafe Collaborations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#3E2A20]/70 font-semibold block mb-1.5">
                  Your Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us what you are looking for, or share your favorite chai memory..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FFF9F0] border border-[#E7D5BA] rounded-xl text-xs text-[#3E2A20] focus:outline-none focus:border-[#B96F4A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#3E2A20] hover:bg-[#B96F4A] text-white text-xs font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SEND MESSAGE</span>
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#FFF9F0] border border-[#E7D5BA] rounded-3xl p-8 sm:p-12 space-y-6">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs uppercase tracking-widest text-[#B96F4A] font-semibold">
            Common Inquiries
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#3E2A20] mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-[#E7D5BA] rounded-2xl overflow-hidden shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base sm:text-lg font-bold text-[#3E2A20] hover:text-[#B96F4A] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#B96F4A] transition-transform duration-200 shrink-0 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openFaq === index && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#3E2A20]/80 leading-relaxed font-light border-t border-[#E7D5BA]/40">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
