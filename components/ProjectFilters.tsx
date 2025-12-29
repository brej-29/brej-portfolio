"use client"

import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProjectFiltersProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  availableTags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
  sortBy: "recent" | "alphabetical"
  onSortChange: (value: "recent" | "alphabetical") => void
}

export function ProjectFilters({
  searchQuery,
  onSearchChange,
  availableTags,
  selectedTags,
  onTagToggle,
  sortBy,
  onSortChange,
}: ProjectFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search and Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 bg-card/40 backdrop-blur-sm border-border/50"
          />
        </div>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as "recent" | "alphabetical")}>
          <SelectTrigger className="w-full sm:w-[180px] bg-card/40 backdrop-blur-sm border-border/50">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Tag Filters */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Filter by tags:</p>
        <div className="flex flex-wrap gap-2">
          {availableTags.map((tag) => {
            const isSelected = selectedTags.includes(tag)
            return (
              <Badge
                key={tag}
                variant={isSelected ? "default" : "outline"}
                className={cn(
                  "cursor-pointer transition-all duration-200",
                  isSelected
                    ? "bg-gradient-to-r from-[var(--neon-purple)] to-[var(--neon-cyan)] hover:opacity-90"
                    : "hover:bg-card/60 hover:border-border",
                )}
                onClick={() => onTagToggle(tag)}
              >
                {tag}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            )
          })}
        </div>
      </div>

      {/* Clear Filters */}
      {(searchQuery || selectedTags.length > 0) && (
        <button
          onClick={() => {
            onSearchChange("")
            selectedTags.forEach((tag) => onTagToggle(tag))
          }}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear all filters
        </button>
      )}
    </div>
  )
}
