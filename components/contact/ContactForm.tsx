"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/site/glass-card"
import { SpotlightCard } from "@/components/premium/spotlight-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Send } from "lucide-react"
import { contact } from "@/content"

type FormState = {
  name: string
  email: string
  message: string
  honeypot: string
}

type FormErrors = {
  name?: string
  email?: string
  message?: string
}

const FORMSPREE_ENDPOINT = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const hasFormspree = typeof FORMSPREE_ENDPOINT === "string" && FORMSPREE_ENDPOINT.length > 0

  const validate = (data: FormState): FormErrors => {
    const nextErrors: FormErrors = {}

    if (!data.name.trim()) {
      nextErrors.name = "Please enter your name."
    }

    if (!data.email.trim()) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Please enter a valid email address."
    }

    if (!data.message.trim()) {
      nextErrors.message = "Please enter a message."
    } else if (data.message.trim().length < 20) {
      nextErrors.message = "Please provide at least 20 characters so I have enough context."
    }

    return nextErrors
  }

  const handleChange =
    (field: keyof FormState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = event.target.value
      setFormData((prev) => ({ ...prev, [field]: value }))
      if (errors[field as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }))
      }
    }

  const handleBlur = (field: keyof FormState) => {
    if (field === "honeypot") return
    const fieldErrors = validate(formData)
    if (fieldErrors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: fieldErrors[field as keyof FormErrors] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatusMessage(null)

    if (formData.honeypot.trim()) {
      // Honeypot filled – likely a bot, silently ignore
      return
    }

    const validationErrors = validate(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorField = Object.keys(validationErrors)[0] as keyof FormErrors
      const element = document.getElementById(`contact-${firstErrorField}`)
      if (element) {
        element.focus()
      }
      return
    }

    setIsSubmitting(true)

    try {
      if (hasFormspree && FORMSPREE_ENDPOINT) {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
          }),
        })

        if (!response.ok) {
          throw new Error(`Formspree request failed with status ${response.status}`)
        }

        setStatusMessage("Message sent successfully. I’ll get back to you soon.")
      } else {
        const subject = `Portfolio contact from ${formData.name || "recruiter"}`
        const bodyLines = [`Name: ${formData.name}`, `Email: ${formData.email}`, "", formData.message]
        const mailtoUrl = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`

        window.location.href = mailtoUrl
        setStatusMessage("Opening your email client. If nothing happens, you can email me directly.")
      }

      setFormData({
        name: "",
        email: "",
        message: "",
        honeypot: "",
      })
      setErrors({})
    } catch (error) {
      console.error("[contact] Failed to submit form", error)
      setStatusMessage(`Something went wrong. You can always email me directly at ${contact.email}.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const buttonLabel = hasFormspree ? "Send Message" : "Open Email App"

  return (
    <SpotlightCard className="group border-none bg-transparent shadow-none">
      <GlassCard className="p-6 md:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Honeypot field for simple spam protection */}
          <div className="hidden">
            <Label htmlFor="contact-company">Company</Label>
            <Input
              id="contact-company"
              type="text"
              autoComplete="off"
              tabIndex={-1}
              value={formData.honeypot}
              onChange={handleChange("honeypot")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input
              id="contact-name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange("name")}
              onBlur={() => handleBlur("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
              className="bg-background/50 border-border/50"
            />
            {errors.name && (
              <p id="contact-name-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange("email")}
              onBlur={() => handleBlur("email")}
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
              className="bg-background/50 border-border/50"
            />
            {errors.email && (
              <p id="contact-email-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contact-message">Message</Label>
            <Textarea
              id="contact-message"
              placeholder="Tell me about your project or opportunity..."
              value={formData.message}
              onChange={handleChange("message")}
              onBlur={() => handleBlur("message")}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
              rows={6}
              className="bg-background/50 border-border/50 resize-none"
            />
            {errors.message && (
              <p id="contact-message-error" className="text-sm text-destructive mt-1" role="alert">
                {errors.message}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90 transition-opacity"
            >
              {hasFormspree ? <Send className="mr-2 h-4 w-4" /> : <Mail className="mr-2 h-4 w-4" />}
              {isSubmitting ? "Sending..." : buttonLabel}
            </Button>

            {!hasFormspree && (
              <p className="text-xs text-muted-foreground">
                This form opens your email client and does not store data on a server.
              </p>
            )}

            {statusMessage && (
              <p className="text-sm text-muted-foreground" role="status">
                {statusMessage}
              </p>
            )}
          </div>
        </form>
      </GlassCard>
    </SpotlightCard>
  )
}
