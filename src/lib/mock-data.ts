import type { Stat, Step } from "@/lib/types"

export const stats: Stat[] = [
  {
    id: "gps",
    value: "GPS",
    label: "Browser location with permission"
  },
  {
    id: "routing",
    value: "OneMap",
    label: "Singapore public transport routing"
  },
  {
    id: "weather",
    value: "Weather",
    label: "OpenWeather at the drop venue"
  },
  {
    id: "drops",
    value: "Verified",
    label: "Drops only appear with a source"
  }
]

export const steps: Step[] = [
  {
    id: "register",
    icon: "",
    title: "Register Your Drop",
    description: "Pick the item and drop location"
  },
  {
    id: "activate",
    icon: "",
    title: "Agents Activate",
    description: "AI checks MRT timings, weather, and your location simultaneously"
  },
  {
    id: "secured",
    icon: "",
    title: "Slot Secured",
    description: "Best queue position locked in for you"
  },
  {
    id: "show-up",
    icon: "",
    title: "Just Show Up",
    description: "Get a notification exactly when to leave"
  }
]
