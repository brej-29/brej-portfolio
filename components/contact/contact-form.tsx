"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Send } from "lucide-react"
import { contact } from "@/content"
import { cn } from "@/lib/utils"

type FormState = { name: string; email: string; message: string; honeypot: string }
type FormErrors = { name?: string; email?: string; message?: string }

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

const fieldClasses =
  "w-full rounded-md border border-border bg-transparent px-4 py-3 text-sm placeholder:text-faint transition-colors duration-200 focus:border-accent focus:outline-none"

function validate(data: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = "Please enter your name."
  if (!data.email.trim()) {
    errors.email = "Please enter your email address."
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address."
  }
  if (!data.message.trim()) {
    errors.message = "Please enter a message."
  } else if (data.message.trim().length < 20) {
    errors.message = "Please provide at least 20 characters so I have enough context."
  }
  return errors
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: "", email: "", message: "", honeypot: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const hasFormspree = typeof FORMSPREE_ENDPOINT === "string" && FORMSPREE_ENDPOINT.length > 0

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)

    // Honeypot filled — likely a bot, silently ignore
    if (formData.honeypot.trim()) return

    const validationErrors = validate(formData)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0]
      document.getElementById(`contact-${firstErrorField}`)?.focus()
      return
    }

    setIsSubmitting(true)
    try {
      if (hasFormspree && FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: formData.name, email: formData.email, message: formData.message }),
        })
        if (!response.ok) throw new Error(`Formspree request failed with status ${response.status}`)
        setStatusMessage("Message sent. I'll get back to you soon.")
      } else {
        const subject = `Portfolio contact from ${formData.name || "recruiter"}`
        const body = [`Name: ${formData.name}`, `Email: ${formData.email}`, "", formData.message].join("\n")
        window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        setStatusMessage("Opening your email client. If nothing happens, email me directly.")
      }
      setFormData({ name: "", email: "", message: "", honeypot: "" })
      setErrors({})
    } catch (error) {
      console.error("[contact] Failed to submit form", error)
      setStatusMessage(`Something went wrong. You can always email me directly at ${contact.email}.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      {/* Honeypot field for simple spam protection */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
          value={formData.honeypot}
          onChange={handleChange("honeypot")}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-name" className="mono-label block">
          Name
        </label>
        <input
          id="contact-name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange("name")}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={cn(fieldClasses, errors.name && "border-destructive")}
        />
        {errors.name && (
          <p id="contact-name-error" className="text-sm text-destructive" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-email" className="mono-label block">
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          placeholder="you@company.com"
          value={formData.email}
          onChange={handleChange("email")}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={cn(fieldClasses, errors.email && "border-destructive")}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-sm text-destructive" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="contact-message" className="mono-label block">
          Message
        </label>
        <textarea
          id="contact-message"
          placeholder="Tell me about the role or project…"
          value={formData.message}
          onChange={handleChange("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          rows={6}
          className={cn(fieldClasses, "resize-none", errors.message && "border-destructive")}
        />
        {errors.message && (
          <p id="contact-message-error" className="text-sm text-destructive" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-gradient group inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-[transform,opacity] duration-200 hover:-translate-y-0.5 disabled:opacity-60"
        >
          {hasFormspree ? <Send className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
          {isSubmitting ? "Sending…" : hasFormspree ? "Send message" : "Open email app"}
        </button>

        {!hasFormspree && (
          <p className="text-xs text-faint">
            This form opens your email client — nothing is stored on a server.
          </p>
        )}

        {statusMessage && (
          <p className="text-sm text-muted-foreground" role="status">
            {statusMessage}
          </p>
        )}
      </div>
    </form>
  )
}
