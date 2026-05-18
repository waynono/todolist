# AGENTS.md — todo-list

## Project intent

Vite + Vue 3 SPA (Element Plus UI).  
Pure-static H5 TodoList app with categories, due dates, and drag-and-drop sorting.

## File layout

```
todo-list/
├── index.html                # Vite entry
├── package.json
├── vite.config.js
├── src/
│   ├── main.js               # App bootstrap — Vue + Element Plus + icons
│   ├── App.vue               # Root — layout, filters, orchestrator
│   ├── assets/
│   │   └── style.css          # Custom styles (mobile-first)
│   ├── composables/
│   │   └── useTodoStore.js   # Reactive singleton + localStorage persistence
│   └── components/
│       ├── TodoInput.vue      # Add form (title + category + date)
│       ├── CategorySection.vue # Filter chips bar
│       ├── CategoryPanel.vue  # Add/delete categories
│       ├── TodoList.vue       # Drag-and-drop container
│       ├── TodoItem.vue       # Single item (edit, toggle, delete)
│       └── TodoFooter.vue     # Stats + clear completed
```

## Key design decisions

- **Vite dev server** — `npm run dev`, then open the local URL.
- **localStorage** persistence — every mutation triggers auto-save via `watch(store, ..., { deep: true })`.
- **Drag-and-drop** uses native HTML5 Drag & Drop API on `store.todos` splice reorder.
- **Categories** and **due dates** are first-class fields on every todo item.
- Overdue items (past due date + not completed) render with a red highlight.
- **IDs** are generated via `Date.now().toString(36) + random` (no auto-increment).

## Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |

No lint, test, or typecheck commands are configured.
