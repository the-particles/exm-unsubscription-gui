export interface Provider {
  id: number
  name: string
}

export interface Category {
  id: number
  name: string
}

export interface Subscription {
  id: number
  name: string
  categories?: Category[]
  provider?: Provider
  amount?: number
  currency?: string
  cycle?: string
  date?: string
}
