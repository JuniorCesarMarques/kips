type Text = {
  content: string
  size: string
}

export type Comp = {
  id: number
  type: "chart" | "video" | "text" | "image"
  url?: string
  width?: number
  height?: number
  controls?: boolean
  autoplay?: boolean
  title?: Text
  description?: Text
}

export type Level = {
  id: number
  comps: Comp[]
}

export interface Page {
  id: number
  duration: number
  levels: Level[]
}

