"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CertificateCard } from "@/components/certificates/CertificateCard"
import type { Certificate } from "@/content"
import { filterCertificates, getAllIssuers } from "@/lib/filtering"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface CertificatesClientProps {
  certificates: Certificate[]
}

export function CertificatesClient({ certificates }: CertificatesClientProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIssuers, setSelectedIssuers] = useState<string[]>([])

  const availableIssuers = getAllIssuers(certificates)
  const filteredCertificates = filterCertificates(certificates, searchQuery, selectedIssuers)

  const handleIssuerToggle = (issuer: string) => {
    setSelectedIssuers((prev) => (prev.includes(issuer) ? prev.filter((i) => i !== issuer) : [...prev, issuer]))
  }

  return (
    <div className="space-y-12">
      {/* Search and Filters */}
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-card/40 backdrop-blur-sm border-border/50"
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Filter by issuer:</p>
          <div className="flex flex-wrap gap-2">
            {availableIssuers.map((issuer) => {
              const isSelected = selectedIssuers.includes(issuer)
              return (
                <Badge
                  key={issuer}
                  variant={isSelected ? "default" : "outline"}
                  className={cn(
                    "cursor-pointer transition-all duration-200",
                    isSelected
                      ? "bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90"
                      : "hover:bg-card/60 hover:border-border",
                  )}
                  onClick={() => handleIssuerToggle(issuer)}
                >
                  {issuer}
                  {isSelected && <X className="ml-1 h-3 w-3" />}
                </Badge>
              )
            })}
          </div>
        </div>

        {(searchQuery || selectedIssuers.length > 0) && (
          <button
            onClick={() => {
              setSearchQuery("")
              setSelectedIssuers([])
            }}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all filters
          </button>
        )}
      </div>

      {/* Results count */}
      <div className="text-sm text-muted-foreground">
        {filteredCertificates.length} {filteredCertificates.length === 1 ? "certificate" : "certificates"} found
      </div>

      {/* Certificates Grid */}
      {filteredCertificates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCertificates.map((cert, index) => (
            <CertificateCard key={index} certificate={cert} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No certificates found matching your criteria.</p>
          <p className="text-sm text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}
