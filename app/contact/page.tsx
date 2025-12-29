"use client"

import type React from "react"

import { useState } from "react"
import { Section } from "@/components/site/section"
import { GlassCard } from "@/components/site/glass-card"
import { ContactForm } from "@/components/contact/ContactForm"
import { VariableProximityText } from "@/components/premium/variable-proximity-text"
import { Button } from "@/components/ui/button"
import { contact } from "@/content/siteData"
import { Mail, MapPin, Briefcase, Github, Linkedin, Twitter, Copy, Check } from "lucide-react"
import { ClipPathLinks } from "@/components/ui/clip-path-links"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
}

export default function ContactPage() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText(contact.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative min-h-screen pt-24 pb-16">
      <Section>
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              <VariableProximityText
                text="Let's Connect"
                className="bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] bg-clip-text text-transparent"
              />
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Interested in working together? Have a question or opportunity? {"I'd"} love to hear from you. Drop me a
              message and {"I'll"} get back to you as soon as possible.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <ClipPathLinks />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Info */}
              <GlassCard className="p-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Contact Info</h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-[var(--neon-cyan)] mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="text-sm font-medium truncate">{contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-[var(--neon-cyan)] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{contact.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Briefcase className="h-5 w-5 text-[var(--neon-cyan)] mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="text-sm font-medium">{contact.availability}</p>
                    </div>
                  </div>
                </div>

                <Button onClick={copyEmail} variant="outline" className="w-full mt-4 bg-transparent">
                  {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                  {copied ? "Email Copied!" : "Copy Email"}
                </Button>
              </GlassCard>
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}
