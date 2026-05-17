export interface Drop {
  id: string
  name: string
  brand: string
  location: string
  dropTime: string
  queueOpen: string
  estimatedWait: string
  currentSlot: number | null
  totalSlots: number | null
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
  source: "LIVE" | "SIMULATED" | "SIMULATED - permission denied"
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

export interface AccountTicket {
  id: string
  dropId: string
  brand: string
  dropName: string
  location: string
  slotNumber: number
  arriveBy: string
  leaveAt: string
  transport: string
  weather: string
  sourceUrl?: string | null
  sourceLabel?: string | null
  confirmedAt: string
}
