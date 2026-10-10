"use client";

import type { FormEvent } from "react";

const DIRECT_EMAIL = "divyanshusharma7982@gmail.com";
const FORM_RECIPIENT = "divyanshu.office9711@gmail.com";

export default function ContactSection() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const fullName = `${data.get("firstName")} ${data.get("lastName")}`;
    const subject = String(data.get("subject")).trim();
    const body = [
      `Name: ${fullName}`,
      `Mobile: ${data.get("mobile")}`,
      `Email: ${data.get("email")}`,
      "",
      `Message: ${data.get("message")}`,
    ].join("\n");

    const compose = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: FORM_RECIPIENT,
      su: subject,
      body,
    });
    if (window.matchMedia("(max-width: 760px)").matches) {
      window.location.href = `mailto:${FORM_RECIPIENT}?${compose.toString()}`;
      return;
    }
    window.open(`https://mail.google.com/mail/?${compose.toString()}`, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="contact contact-panel" id="contact">
      <div className="contact-intro">
        <div className="eyebrow">Have a role or project in mind?</div>
        <h2>Let&apos;s make it work better.</h2>
        <p className="contact-copy">Share a few details and I&apos;ll get back to you. I look forward to hearing what you have in mind.</p>
        <div className="contact-links">
          <a className="contact-action" href={`https://mail.google.com/mail/?view=cm&fs=1&to=${DIRECT_EMAIL}`} target="_blank" rel="noopener noreferrer" onClick={(event) => {
            if (window.matchMedia("(max-width: 760px)").matches) {
              event.preventDefault();
              window.location.href = `mailto:${DIRECT_EMAIL}`;
            }
          }}>
            <span>Email me</span>
          </a>
          <a className="contact-action" href="/Divyanshu_resume.pdf" download>
            <span>Download resume</span>
          </a>
        </div>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-field"><label htmlFor="contact-first-name">First name</label><input id="contact-first-name" name="firstName" autoComplete="given-name" placeholder="Your first name" required /></div>
        <div className="contact-field"><label htmlFor="contact-last-name">Last name</label><input id="contact-last-name" name="lastName" autoComplete="family-name" placeholder="Your last name" required /></div>
        <div className="contact-field"><label htmlFor="contact-mobile">Mobile number</label><input id="contact-mobile" name="mobile" type="tel" autoComplete="tel" inputMode="tel" placeholder="Your phone number" required /></div>
        <div className="contact-field"><label htmlFor="contact-email">Email address</label><input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required /></div>
        <div className="contact-field contact-field-full"><label htmlFor="contact-subject">Subject</label><input id="contact-subject" name="subject" placeholder="What would you like to discuss?" required /></div>
        <div className="contact-field contact-field-full"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" rows={4} placeholder="Tell me a little more..." required /></div>
        <div className="contact-form-actions">
          <p className="contact-form-note">Opens Gmail with your message addressed to {FORM_RECIPIENT}. You can review and send it there.</p>
          <button className="contact-send" type="submit">Send message</button>
        </div>
      </form>

      <footer className="footer contact-footer"><span>&#169; 2026 Divyanshu Sharma</span><span>Built with care in India</span></footer>
    </section>
  );
}
