import { Dexie, type EntityTable } from 'dexie'
import {
  CATEGORY_TABLE_NAME,
  DATABASE_NAME,
  DATABASE_VERSION,
  PROVIDER_TABLE_NAME,
  SUBSCRIPTION_TABLE_NAME,
} from './configuration'

// Types
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

type UnsubscriptionDatabase = Dexie & {
  subscriptions: EntityTable<Subscription, 'id'>
  categories: EntityTable<Category, 'id'>
  providers: EntityTable<Provider, 'id'>
}

export const database = new Dexie(DATABASE_NAME) as UnsubscriptionDatabase

database.version(DATABASE_VERSION).stores({
  [SUBSCRIPTION_TABLE_NAME]:
    '++id, name, amount, currency, cycle, date, categories, provider',
  [CATEGORY_TABLE_NAME]: '++id, name',
  [PROVIDER_TABLE_NAME]: '++id, name',
})
