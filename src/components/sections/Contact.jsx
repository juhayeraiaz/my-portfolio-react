import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuCheck, LuCircleAlert, LuCircleCheck, LuCopy, LuLoaderCircle, LuMail, LuMapPin, LuPhone, LuSend } from 'react-icons/lu';
import { profile, socials } from '../../data/portfolio';
import { copyToClipboard } from '../../lib/utils';
import { Reveal } from '../ui/Reveal';
import { SectionHeading } from '../ui/SectionHeading';
import './Contact.css';

/** FormSubmit's AJAX endpoint — delivers submissions straight to the inbox, no backend required. */
export const CONTACT_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function Field({ id, label, error, optional, children }) {
  return (
    <div className={`field${error ? ' field--error' : ''}`}>
      <label htmlFor={id} className="field__label">
        {label}
        {optional && <span className="field__optional">Optional</span>}
      </label>
      {children}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          <LuCircleAlert aria-hidden="true" /> {error.message}
        </p>
      )}
    </div>
  );
}

export function Contact() {
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [copied, setCopied] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onTouched' });

  const onSubmit = async (values) => {
    if (values._honey) return; // bot filled the hidden field
    try {
      const response = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          message: values.message,
          _subject: values.subject?.trim()
            ? `Portfolio: ${values.subject.trim()}`
            : `New message from ${values.name} via juhayeraiaz.com`,
          _template: 'table',
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || String(result.success) !== 'true') throw new Error(result.message || 'Send failed');
      setStatus('success');
      reset();
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    if (await copyToClipboard(profile.email)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const describedBy = (name) => (errors[name] ? `${name}-error` : undefined);

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__glow" aria-hidden="true" />
      <div className="container contact__grid">
        <div className="contact__intro">
          <SectionHeading
            id="contact-title"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s build something <span className="gradient-text">great together.</span>
              </>
            }
            lead="Have a project in mind, a role to fill or just want to say hello? Send a message and I'll get back to you as soon as I can."
          />

          <Reveal as="ul" className="contact__methods" role="list" delay={100}>
            <li className="contact-method card">
              <span className="contact-method__icon" aria-hidden="true">
                <LuMail />
              </span>
              <span className="contact-method__text">
                <span className="contact-method__label">Email</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </span>
              <button
                type="button"
                className="icon-btn contact-method__copy"
                onClick={copyEmail}
                aria-label={copied ? 'Email copied' : 'Copy email address'}
                title={copied ? 'Copied!' : 'Copy email'}
              >
                {copied ? <LuCheck aria-hidden="true" /> : <LuCopy aria-hidden="true" />}
              </button>
            </li>
            <li className="contact-method card">
              <span className="contact-method__icon" aria-hidden="true">
                <LuPhone />
              </span>
              <span className="contact-method__text">
                <span className="contact-method__label">Phone</span>
                <a href={`tel:${profile.phone}`}>{profile.phoneDisplay}</a>
              </span>
            </li>
            <li className="contact-method card">
              <span className="contact-method__icon" aria-hidden="true">
                <LuMapPin />
              </span>
              <span className="contact-method__text">
                <span className="contact-method__label">Location</span>
                <span>{profile.location}</span>
              </span>
            </li>
          </Reveal>

          <Reveal as="ul" className="contact__socials" role="list" delay={160}>
            {socials.map(({ name, url, icon: Icon }) => (
              <li key={name}>
                <a className="icon-btn" href={url} target="_blank" rel="noreferrer" aria-label={name} title={name}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </Reveal>
        </div>

        <Reveal className="contact__form-wrap card" delay={120}>
          {status === 'success' ? (
            <div className="contact__success" role="status">
              <span className="contact__success-icon" aria-hidden="true">
                <LuCircleCheck />
              </span>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
              <button type="button" className="btn btn--ghost btn--sm" onClick={() => setStatus('idle')}>
                Send another message
              </button>
            </div>
          ) : (
            <form className="contact__form" onSubmit={handleSubmit(onSubmit)} noValidate>
              <div className="contact__row">
                <Field id="name" label="Name" error={errors.name}>
                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={describedBy('name')}
                    {...register('name', {
                      required: 'Please tell me your name.',
                      maxLength: { value: 80, message: 'That name is a little long.' },
                    })}
                  />
                </Field>
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={describedBy('email')}
                    {...register('email', {
                      required: 'I need an email to reply to.',
                      pattern: { value: EMAIL_PATTERN, message: 'Please enter a valid email address.' },
                    })}
                  />
                </Field>
              </div>

              <Field id="subject" label="Subject" optional error={errors.subject}>
                <input
                  id="subject"
                  type="text"
                  placeholder="Project inquiry, job opportunity…"
                  {...register('subject', { maxLength: { value: 120, message: 'Please keep the subject short.' } })}
                />
              </Field>

              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  rows={6}
                  placeholder="Tell me a little about what you have in mind…"
                  aria-invalid={errors.message ? 'true' : 'false'}
                  aria-describedby={describedBy('message')}
                  {...register('message', {
                    required: 'Please write a message.',
                    minLength: { value: 10, message: 'Could you share a bit more detail? (10+ characters)' },
                    maxLength: { value: 5000, message: 'That message is too long (5000 characters max).' },
                  })}
                />
              </Field>

              {/* Honeypot: hidden from people, irresistible to bots. */}
              <div className="contact__honey" aria-hidden="true">
                <label htmlFor="_honey">Leave this field empty</label>
                <input id="_honey" type="text" tabIndex={-1} autoComplete="off" {...register('_honey')} />
              </div>

              {status === 'error' && (
                <p className="contact__error" role="alert">
                  <LuCircleAlert aria-hidden="true" />
                  <span>
                    Something went wrong sending your message. Please try again or email me directly at{' '}
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>.
                  </span>
                </p>
              )}

              <button type="submit" className="btn btn--primary btn--block" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <LuLoaderCircle className="spin" aria-hidden="true" /> Sending…
                  </>
                ) : (
                  <>
                    Send message <LuSend className="btn__arrow" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
