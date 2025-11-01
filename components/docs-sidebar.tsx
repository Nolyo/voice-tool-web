"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "@/i18n/routing"
import { ChevronDown, Search, FileText, Book, Code, Layers } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useReleases } from "@/hooks/use-releases"
import { useTranslations } from "next-intl"

interface DocItem {
    title: string
    href: string
    icon?: React.ReactNode
}

function useDocSections() {
    const t = useTranslations("sidebar")

    return [
        {
            title: "Introduction",
            items: [
                { title: t("introduction.gettingStarted"), href: "/docs/getting-started", icon: <Book className="h-4 w-4" /> },
                { title: t("introduction.installation"), href: "/docs/installation", icon: <Layers className="h-4 w-4" /> },
                { title: t("introduction.configuration"), href: "/docs/configuration", icon: <FileText className="h-4 w-4" /> },
            ],
        },
    {
        title: "Composants",
        items: [
            { title: "Boutons", href: "/docs/components/button", icon: <Code className="h-4 w-4" /> },
            { title: "Formulaires", href: "/docs/components/forms", icon: <Code className="h-4 w-4" /> },
            { title: "Navigation", href: "/docs/components/navigation", icon: <Code className="h-4 w-4" /> },
            { title: "Cartes", href: "/docs/components/cards", icon: <Code className="h-4 w-4" /> },
        ],
    },
    {
        title: "API Reference",
        items: [
            { title: "Hooks", href: "/docs/api/hooks", icon: <Code className="h-4 w-4" /> },
            { title: "Utilitaires", href: "/docs/api/utils", icon: <Code className="h-4 w-4" /> },
            { title: "Types", href: "/docs/api/types", icon: <Code className="h-4 w-4" /> },
        ],
    },
    {
        title: "Guides",
        items: [
            { title: "Thèmes", href: "/docs/guides/theming", icon: <FileText className="h-4 w-4" /> },
            { title: "Accessibilité", href: "/docs/guides/accessibility", icon: <FileText className="h-4 w-4" /> },
            { title: "Performance", href: "/docs/guides/performance", icon: <FileText className="h-4 w-4" /> },
        ],
    },
    ]
}

export function DocsSidebar() {
    const docSections = useDocSections()
    const [searchQuery, setSearchQuery] = useState("")
    const [expandedSections, setExpandedSections] = useState<Set<string>>(
        new Set(docSections.map((section) => section.title)),
    )
    const { latest, isLoading: isLoadingVersion } = useReleases()

    const toggleSection = (title: string) => {
        const newExpanded = new Set(expandedSections)
        if (newExpanded.has(title)) {
            newExpanded.delete(title)
        } else {
            newExpanded.add(title)
        }
        setExpandedSections(newExpanded)
    }

    const filteredSections = docSections
        .map((section) => ({
            ...section,
            items: section.items.filter((item) => item.title.toLowerCase().includes(searchQuery.toLowerCase())),
        }))
        .filter((section) => section.items.length > 0)

    return (
        <aside className="w-64 border-r border-border bg-card sticky top-16 h-[calc(100vh-4rem)] flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground mb-3">Documentation</h2>

                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Rechercher..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9"
                    />
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 sidebar-scroll">
                <div className="space-y-4">
                    {filteredSections.map((section) => (
                        <div key={section.title}>
                            <button
                                onClick={() => toggleSection(section.title)}
                                className="flex items-center justify-between w-full text-sm font-medium text-foreground hover:text-primary transition-colors mb-2"
                            >
                                <span>{section.title}</span>
                                <ChevronDown
                                    className={cn(
                                        "h-4 w-4 transition-transform duration-200",
                                        expandedSections.has(section.title) ? "rotate-0" : "-rotate-90"
                                    )}
                                />
                            </button>

                            <div
                                className={cn(
                                    "grid transition-all duration-200 ease-in-out",
                                    expandedSections.has(section.title)
                                        ? "grid-rows-[1fr] opacity-100"
                                        : "grid-rows-[0fr] opacity-0"
                                )}
                            >
                                <ul className="space-y-1 ml-2 overflow-hidden">
                                    {section.items.map((item) => (
                                        <li key={item.href}>
                                            <Link
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                                                    "text-muted-foreground hover:text-foreground hover:bg-accent",
                                                )}
                                            >
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-border">
                <div className="flex flex-col gap-1">
                    <p className="text-xs text-muted-foreground">Voice Tool</p>
                    {isLoadingVersion ? (
                        <p className="text-xs font-mono text-muted-foreground">Chargement...</p>
                    ) : latest ? (
                        <p className="text-xs font-mono font-semibold text-foreground">{latest.version}</p>
                    ) : (
                        <p className="text-xs font-mono text-muted-foreground">Version inconnue</p>
                    )}
                </div>
            </div>
        </aside>
    )
}
