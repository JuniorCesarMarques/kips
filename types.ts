type Text = {
  content: string
  size: number | null
}

export type Comp = {
  id: number
  type?: "chart" | "video" | "text" | "image" | "";
  url?: string 
  width?: number | null
  height?: number | null
  title?: Text
  description?: Text
}

export type Level = {
  id: number
  comps: Comp[]
}

export interface Page {
  id: number
  done: boolean
  duration: number
  levels: Level[]
}

