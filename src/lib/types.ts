export interface Drop {
  id: string
  name: string
  brand: string
  location: string
  dropTime: string
  queueOpen: string
  estimatedWait: string
  currentSlot: number
  totalSlots: number
  status: "hot" | "filling" | "available"
  imagePlaceholderColor: string
  latitude?: number | null
  longitude?: number | null
  sourceUrl?: string | null
  sourceLabel?: string | null
}

export interface Stat {
  id: string
  value: string
  numericValue: number
  suffix: string
  label: string
}

export interface Step {
  id: string
  icon: string
  title: string
  description: string
}

export interface UserLocation {
  latitude: number
  longitude: number
  source: "LIVE" | "SIMULATED"
}

export interface QueueOptimization {
  slotNumber: number
  arriveBy: string
  leaveAt: string
  travelMinutes: number
  transport: string
  weather: string
  confidence: number
  message: string
}

export interface SecureSlotRequest {
  dropId: string
  userLocation: UserLocation
}

export interface SecureSlotResponse {
  drop: Drop
  optimization: QueueOptimization
  agentLog: string[]
}
