import { openDB } from 'idb'
import {
  CATEGORY_NAME,
  DATABASE_NAME,
  DATABASE_VERSION,
  PROVIDER_NAME,
  SUBSCRIPTION_NAME,
} from './configuration'

export const openDatabase = async () => {
  return openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(database) {
      const stores = [SUBSCRIPTION_NAME, CATEGORY_NAME, PROVIDER_NAME]

      stores.forEach((name) => {
        if (!database.objectStoreNames.contains(name)) {
          database.createObjectStore(name, {
            keyPath: 'id',
            autoIncrement: true,
          })
        }
      })
    },
  })
}
