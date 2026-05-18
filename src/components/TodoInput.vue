<template>
  <div class="add-card">
    <el-input
      v-model="title"
      placeholder="输入待办事项，按 Enter 添加..."
      @keyup.enter="handleSubmit"
      clearable
      size="large"
    />
    <div class="add-form-options">
      <el-select v-model="categoryId" placeholder="分类" size="small" style="width: 120px">
        <el-option
          v-for="cat in store.categories"
          :key="cat.id"
          :label="cat.name"
          :value="cat.id"
        >
          <span class="cat-option">
            <span class="cat-dot-sm" :style="{ backgroundColor: cat.color }"></span>
            {{ cat.name }}
          </span>
        </el-option>
      </el-select>
      <el-date-picker
        v-model="dueDate"
        type="date"
        placeholder="截止日期"
        size="small"
        format="YYYY-MM-DD"
        value-format="x"
        style="width: 140px"
      />
      <el-button type="primary" size="small" @click="handleSubmit">
        <el-icon><Plus /></el-icon>
        添加
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../composables/useTodoStore'

const emit = defineEmits(['add'])

const { store } = useTodoStore()

const title = ref('')
const categoryId = ref('personal')
const dueDate = ref(null)

function handleSubmit() {
  if (!title.value.trim()) return
  emit('add', {
    title: title.value,
    categoryId: categoryId.value || 'other',
    dueDate: dueDate.value || null,
  })
  title.value = ''
  categoryId.value = 'personal'
  dueDate.value = null
}
</script>
