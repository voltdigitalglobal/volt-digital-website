"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import formGrad from "@/image/form_gradient.png";
import starIcon from "@/image/star.png";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    setIsSubmitting(true);
    setErrorMsg("");
    setIsSuccess(false); // Clear previous success state
    
    const formData = new FormData(form);
    const dataObj = Object.fromEntries(formData.entries());
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/voltdigitalglobal@gmail.com", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(dataObj)
      });
      
      const data = await response.json().catch(() => null);
      
      if (response.ok && (!data || data.success === "true" || data.success === true)) {
        setIsSuccess(true);
        setErrorMsg("");
        form.reset();
        setTimeout(() => setIsSuccess(false), 5000);
      } else {
        setErrorMsg(data?.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setErrorMsg("Failed to submit form. Please check your connection or email activation.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} className="relative min-h-[80vh] w-full bg-[#010C19] pt-32 pb-12 px-6 flex flex-col items-center justify-center overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-[1fr_900px] gap-20 items-center">
        
        {/* Left Side: Title */}
        <div className="flex flex-col items-start">
          <div className="flex flex-wrap gap-x-[0.3em] mb-4">
            {["Get", "In", "Touch", "with", "Us"].map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.2, 0.65, 0.3, 0.9] }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tight"
              >
                {word}
              </motion.span>
            ))}
          </div>
          
          <div className="relative mt-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative w-40 h-40"
            >
              <Image src={starIcon} alt="" className="object-contain" fill />
            </motion.div>
          </div>
        </div>

        {/* Right Side: Form Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative p-[2px] rounded-[40px] bg-gradient-to-b from-[#103CFF] to-white group transition-all duration-500 w-full max-w-[900px]"
        >
          <div className="h-full w-full bg-[#010C19]/95 backdrop-blur-xl rounded-[38px] p-8 md:p-12 relative overflow-hidden">
            <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-8">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Name</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Phone</label>
                  <input 
                    type="tel" 
                    name="phone"
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Business Name</label>
                  <input 
                    type="text" 
                    name="business_name"
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">Industry</label>
                  <input 
                    type="text" 
                    name="industry"
                    className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-white/70 text-sm font-medium ml-1">What do you need help with?</label>
                  <div className="relative">
                    <select 
                      name="help_topic"
                      className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)] appearance-none cursor-pointer"
                      defaultValue=""
                    >
                      <option value="" disabled className="text-white/50">Select a service</option>
                      <option value="Digital Marketing" className="bg-[#0A121E]">Digital Marketing</option>
                      <option value="Performance Marketing" className="bg-[#0A121E]">Performance Marketing</option>
                      <option value="Digital Transformation" className="bg-[#0A121E]">Digital Transformation</option>
                      <option value="Business Consulting" className="bg-[#0A121E]">Business Consulting</option>
                      <option value="Other" className="bg-[#0A121E]">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                      <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="white" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-white/70 text-sm font-medium ml-1">Message</label>
                <textarea 
                  rows={4}
                  name="message"
                  required
                  className="w-full bg-[#0A121E] border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#1071FF]/50 transition-colors resize-none shadow-[inset_0_4px_20px_rgba(0,0,0,0.8)]"
                />
              </div>

              {/* FormSubmit Config */}
              <input type="hidden" name="_subject" value="New Submission from VOLT Digital Contact Form" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_autoresponse" value="Thank you for your enquiry, our team will get back to you soon." />

              {/* Submit Button */}
              <div className="flex flex-col items-center gap-4 mt-4 relative">
                {isSuccess && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-400 font-medium text-center">
                    Thank you! Your message has been sent successfully.
                  </motion.div>
                )}
                {errorMsg && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-red-400 font-medium text-center">
                    {errorMsg}
                  </motion.div>
                )}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`relative overflow-hidden flex items-center justify-center gap-3 w-56 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-lg font-bold shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:bg-white/20 transition-all active:scale-95 group ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {/* Light sweep effect matching growth button */}
                  <div className="absolute top-0 left-[-100%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none transition-none group-hover:animate-[flashPass_0.7s_ease-in-out_forwards]" />
                  
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span className="relative z-10">Submit Query</span>
                      <svg 
                        width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Bottom Clipping Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-full pointer-events-none opacity-60 z-0">
              <Image 
                src={formGrad} 
                alt="" 
                fill 
                className="object-cover object-bottom"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes flashPass {
          0% { left: -100%; }
          100% { left: 150%; }
        }
      `}</style>
    </section>
  );
}
