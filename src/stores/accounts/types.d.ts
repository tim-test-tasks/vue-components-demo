export interface Label {
  text: string
}

export interface Account {
  id: string
  label: Label[]
  type: 'LDAP' | 'Локальная'
  login: string
  password: string | null
}

export type AccountType = 'LDAP' | 'Локальная'
export type AccountUpdate = Partial<Omit<Account, 'id'>>

export const ACCOUNT_TYPES: readonly ['LDAP', 'Локальная'] = ['LDAP', 'Локальная'] as const
