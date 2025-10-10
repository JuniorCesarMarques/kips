export type Text = {
  content: string | undefined
  size: number | null
}

export type Comp = {
  id: number
  type?: "chart" | "video" | "text" | "image" | "";
  url?: string 
  width?: number | null
  height?: number | null
  title?: Text
  description?: Text | null
}

export type Level = {
  id: number
  comps: Comp[]
}

export interface Page {
  id: number
  status: "empty" | "editing" | "done"
  duration: number
  levels: Level[]
}

