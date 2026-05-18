import { reactive, watch, computed } from 'vue'

const STORAGE_KEY = 'todo-list'

const DEFAULT_CATEGORIES = [
  { id: 'personal', name: '个人', color: '#409EFF' },
  { id: 'work', name: '工作', color: '#E6A23C' },
  { id: 'study', name: '学习', color: '#67C23A' },
  { id: 'other', name: '其他', color: '#909399' },
]

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      return {
        todos: Array.isArray(data.todos) ? data.todos : [],
        categories: Array.isArray(data.categories) ? data.categories : [],
      }
    }
  } catch (e) {
    console.warn('[store] localStorage read failed:', e)
  }
  return { todos: [], categories: [] }
}

const state = reactive(loadFromStorage())

if (state.categories.length === 0) {
  state.categories.push(...DEFAULT_CATEGORIES.map((c) => ({ ...c })))
}

watch(
  state,
  () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        todos: state.todos,
        categories: state.categories,
      })
    )
  },
  { deep: true }
)

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}

const remaining = computed(() => state.todos.filter((t) => !t.completed).length)
const completed = computed(() => state.todos.filter((t) => t.completed).length)
const hasCompleted = computed(() => completed.value > 0)

export function useTodoStore() {
  function addTodo(title, categoryId, dueDate) {
    state.todos.push({
      id: genId(),
      title: title.trim(),
      completed: false,
      categoryId: categoryId || 'other',
      dueDate: dueDate || null,
      createdAt: Date.now(),
    })
  }

  function removeTodo(id) {
    const idx = state.todos.findIndex((t) => t.id === id)
    if (idx !== -1) state.todos.splice(idx, 1)
  }

  function toggleTodo(id) {
    const todo = state.todos.find((t) => t.id === id)
    if (todo) todo.completed = !todo.completed
  }

  function updateTodo(id, fields) {
    const todo = state.todos.find((t) => t.id === id)
    if (todo) Object.assign(todo, fields)
  }

  function clearCompleted() {
    state.todos = state.todos.filter((t) => !t.completed)
  }

  function addCategory(name, color) {
    state.categories.push({
      id: 'cat_' + genId(),
      name: name.trim(),
      color: color || '#409EFF',
    })
  }

  function removeCategory(id) {
    if (['personal', 'work', 'study', 'other'].includes(id)) return
    const idx = state.categories.findIndex((c) => c.id === id)
    if (idx !== -1) {
      state.categories.splice(idx, 1)
      state.todos.forEach((t) => {
        if (t.categoryId === id) t.categoryId = 'other'
      })
    }
  }

  function isDefaultCategory(id) {
    return ['personal', 'work', 'study', 'other'].includes(id)
  }

  function getCategory(id) {
    return state.categories.find((c) => c.id === id)
  }

  function categoryTotalCount(catId) {
    return state.todos.filter((t) => t.categoryId === catId).length
  }

  function categoryCompletionCount(catId) {
    return state.todos.filter((t) => t.categoryId === catId && t.completed).length
  }

  return {
    store: state,
    remaining,
    completed,
    hasCompleted,
    addTodo,
    removeTodo,
    toggleTodo,
    updateTodo,
    clearCompleted,
    addCategory,
    removeCategory,
    isDefaultCategory,
    getCategory,
    categoryTotalCount,
    categoryCompletionCount,
  }
}
