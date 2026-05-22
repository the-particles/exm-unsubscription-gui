---
name: vite-react-refresh
description: Guidelines and procedures for fixing the ESLint error "Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)" in React Vite projects.
version: 1.0.0
tags:
  - react
  - vite
  - eslint
  - fast-refresh
---

# Vite React Refresh Lint Compliance (eslint(react-refresh/only-export-components))

## Overview
React Fast Refresh needs to reliably hot-reload React components. If a file exports both React components and non-component items (like constants, helper functions, hooks, or context), the Fast Refresh runtime cannot guarantee safe replacement without state loss or side-effects, triggering this lint rule.

This skill provides step-by-step procedures for fixing this warning/error while maintaining code organization.

## When to Use
Activate this skill when:
- Resolving the ESLint warning/error: `Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.eslint(react-refresh/only-export-components)`
- Working on React components in a Vite project and refactoring mixed exports.

## Refactoring Guidelines & Procedures

Follow these steps to eliminate the lint error:

### 1. Identify Non-Component Exports
Examine all `export` keywords in the file. Determine which exports are React components and which are non-component items.
* **Valid Component Exports:**
  - Function components named in PascalCase (e.g., `export function MyComponent() {}` or `export const App = () => {}`).
* **Non-Component Exports (Triggering Lint Error):**
  - Constants (e.g., `export const LIMIT = 10;`, `export const initialValues = {...}`).
  - Helper functions (e.g., `export function formatName(val) {}`).
  - React Context (e.g., `export const UserContext = createContext(null)`).
  - Custom Hooks (e.g., `export function useAuth() {}` or `export const useForm = () => {}`).
  - TypeScript interfaces/enums (when not exported strictly as a type).

---

### 2. Apply Refactoring Solutions

Choose the appropriate refactoring solution depending on the type of export:

#### Solution A: Remove the Export (Keep Local)
If the non-component export is only used within the current file, remove the `export` keyword.
* **Before:**
  ```tsx
  export const DEFAULT_PADDING = '16px';
  export function Button() { ... }
  ```
* **After:**
  ```tsx
  const DEFAULT_PADDING = '16px'; // No export keyword
  export function Button() { ... }
  ```

#### Solution B: Move to a Dedicated File (Shared Logic)
If the non-component export is shared with other files, move it to a dedicated file:
1. Create a companion/sibling file (e.g., `MyComponent.constants.ts`, `MyComponent.helpers.ts`, `MyComponent.types.ts`).
2. Move the non-component export to that file.
3. Import it back into the component file and any other files using it.

* **Example (Moving Constants):**
  - Create `MyComponent.constants.ts`:
    ```ts
    export const FORM_DEFAULTS = { username: '', email: '' };
    ```
  - In `MyComponent.tsx`:
    ```tsx
    import { FORM_DEFAULTS } from './MyComponent.constants';
    export function MyComponent() { ... }
    ```

* **Example (Moving React Context):**
  - Create `UserContext.ts`:
    ```ts
    import { createContext } from 'react';
    export const UserContext = createContext<User | null>(null);
    ```
  - In `UserProvider.tsx`:
    ```tsx
    import { UserContext } from './UserContext';
    export function UserProvider({ children }) { ... }
    ```

* **Example (Moving Custom Hooks):**
  - Create `useUserStatus.ts`:
    ```ts
    import { useState, useEffect } from 'react';
    export function useUserStatus() { ... }
    ```
  - In `UserCard.tsx`:
    ```tsx
    import { useUserStatus } from './useUserStatus';
    export function UserCard() { ... }
    ```

#### Solution C: Export TypeScript Types Explicitly
If exporting TypeScript interfaces or types, ensure they are exported as types using the `export type` syntax.
* **Before:**
  ```tsx
  export interface UserProps { name: string; } // May trigger lint depending on ESLint config
  export function UserCard(props: UserProps) { ... }
  ```
* **After:**
  ```tsx
  export type { UserProps }; // Safe syntax
  // OR
  export type UserProps = { name: string; };
  export function UserCard(props: UserProps) { ... }
  ```

#### Solution D: Update Vite Configuration (If appropriate)
If the project exports simple config/constant objects frequently, check if the team prefers enabling `allowConstantExport` in the ESLint config:
```js
rules: {
  'react-refresh/only-export-components': [
    'warn',
    { allowConstantExport: true },
  ],
}
```
*Note: Always consult with the user or check existing patterns before modifying `eslint.config.js` or `.eslintrc` files.*

---

### 3. Verification
Verify the fix by running:
```bash
npm run lint
```
Or by checking that the ESLint diagnostic disappears in the IDE workspace. Ensure Fast Refresh works on the modified component by changing some visual aspects in the dev server and confirming the browser hot-reloads without a full page refresh.
