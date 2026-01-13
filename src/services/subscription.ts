import { type Category, type Provider, database } from '@pars/database'

export const addCategory = async (category: Omit<Category, 'id'>) => {
  await database.categories.add(category)
}

export const addProvider = async (provider: Omit<Provider, 'id'>) => {
  await database.providers.add(provider)
}
