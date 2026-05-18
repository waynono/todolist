<template>
  <div class="category-manager">
    <div class="cat-mgr-inner">
      <div class="cat-mgr-list">
        <div v-for="cat in store.categories" :key="cat.id" class="cat-mgr-item">
          <span class="cat-dot-sm" :style="{ backgroundColor: cat.color }"></span>
          <span class="cat-mgr-name">{{ cat.name }}</span>
          <span class="cat-mgr-count">{{ categoryCompletionCount(cat.id) }}/{{ categoryTotalCount(cat.id) }}</span>
          <el-button
            v-if="!isDefaultCategory(cat.id)"
            text
            type="danger"
            size="small"
            @click="removeCategory(cat.id)"
          >
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="cat-mgr-add">
        <el-input v-model="newName" placeholder="新分类名称" size="small" style="width: 140px" @keyup.enter="addCat" />
        <el-color-picker v-model="newColor" size="small" />
        <el-button type="primary" size="small" @click="addCat">
          <el-icon><Plus /></el-icon>
          添加
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../composables/useTodoStore'

const {
  store,
  addCategory,
  removeCategory,
  isDefaultCategory,
  categoryTotalCount,
  categoryCompletionCount,
} = useTodoStore()

const newName = ref('')
const newColor = ref('#409EFF')

function addCat() {
  if (!newName.value.trim()) return
  addCategory(newName.value, newColor.value)
  newName.value = ''
  newColor.value = '#409EFF'
}
</script>
