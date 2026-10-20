"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme() // Use resolvedTheme instead of theme
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 rounded-md border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-colors cursor-pointer", className)}
      onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
      title="Toggle Light / Dark Mode"
    >
      {mounted && (resolvedTheme === "light" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}