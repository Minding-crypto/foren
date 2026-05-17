import type { Drop, QueueOptimization, Stat, Step } from "@/lib/types"

export const drops: Drop[] = [
  {
    id: "1",
    name: "Royal Pop",
    brand: "Swatch",
    location: "ION Orchard, Level 1",
    dropTime: "10:00 AM, 18 May",
    queueOpen: "8:00 AM",
    estimatedWait: "2h 40min",
    currentSlot: 7,
    totalSlots: 200,
    status: "hot",
    imagePlaceholderColor: "#1a0a2e",
    latitude: 1.304,
    longitude: 103.8318,
    sourceUrl: null,
    sourceLabel: null
  },
  {
    id: "2",
    name: "SB Dunk Low",
    brand: "Nike",
    location: "Nike Orchard Road",
    dropTime: "11:00 AM, 18 May",
    queueOpen: "9:00 AM",
    estimatedWait: "1h 55min",
    currentSlot: 23,
    totalSlots: 150,
    status: "filling",
    imagePlaceholderColor: "#0a1a2e",
    latitude: 1.3036,
    longitude: 103.8322,
    sourceUrl: null,
    sourceLabel: null
  },
  {
    id: "3",
    name: "Labubu Series 3",
    brand: "Pop Mart",
    location: "Bugis Junction",
    dropTime: "12:00 PM, 18 May",
    queueOpen: "10:00 AM",
    estimatedWait: "3h 10min",
    currentSlot: 2,
    totalSlots: 100,
    status: "hot",
    imagePlaceholderColor: "#1a1a0a",
    latitude: 1.299,
    longitude: 103.8554,
    sourceUrl: null,
    sourceLabel: null
  }
]

export const stats: Stat[] = [
  {
    id: "queue-saved",
    value: "14 hrs",
    numericValue: 14,
    suffix: " hrs",
    label: "Avg overnight queue saved"
  },
  {
    id: "slot-time",
    value: "< 3 min",
    numericValue: 3,
    suffix: " min",
    label: "Time to get your slot"
  },
  {
    id: "arrival-rate",
    value: "98%",
    numericValue: 98,
    suffix: "%",
    label: "On-time arrival rate"
  },
  {
    id: "mrt-lines",
    value: "3 MRT lines",
    numericValue: 3,
    suffix: " MRT lines",
    label: "Coverage across Singapore"
  }
]

export const steps: Step[] = [
  {
    id: "register",
    icon: "🎯",
    title: "Register Your Drop",
    description: "Pick the item and drop location"
  },
  {
    id: "activate",
    icon: "📡",
    title: "Agents Activate",
    description: "AI checks MRT timings, weather, your location simultaneously"
  },
  {
    id: "secured",
    icon: "🎟",
    title: "Slot Secured",
    description: "Best queue position locked in for you"
  },
  {
    id: "show-up",
    icon: "🚶",
    title: "Just Show Up",
    description: "Get a notification exactly when to leave"
  }
]

export const mockQueueOptimization: QueueOptimization = {
  slotNumber: 7,
  arriveBy: "09:45 AM",
  leaveAt: "09:12 AM",
  travelMinutes: 28,
  transport: "Circle Line -> Orchard (4 min wait)",
  weather: "Light rain - umbrella advised",
  confidence: 98,
  message: "AI secured your queue slot using live MRT, weather, and crowd signals."
}
