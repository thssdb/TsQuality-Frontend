<template>
  <div class="layout-header">
    <!-- left menu -->
    <div class="layout-header-left">
      <!-- collapse menu -->
      <div class="mt-2" @click="() => $emit('update:collapsed', !collapsed)">
        <n-icon size="18" v-if="collapsed">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon size="18" v-else>
          <MenuFoldOutlined />
        </n-icon>
      </div>

      <div class="mt-2 ml-4" @click="reloadPage">
        <n-icon size="18">
          <ReloadOutlined />
        </n-icon>
      </div>
    </div>
    <!-- right menu -->
    <div class="layout-header-right">
      <div>
        <NDropdown
          trigger="hover"
          @select="avatarSelect"
          :options="avatarOptions"
        >
          <div class="avatar">
            <NAvatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </NAvatar>
          </div>
        </NDropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@vicons/antd'
import { NAvatar, NDropdown, useDialog } from 'naive-ui'
import { ref, unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const router = useRouter()
const dialog = useDialog()

const username = ref<string>('admin')

const avatarOptions = [
  {
    key: 1,
    label: '个人设置',
  },
  {
    key: 2,
    label: '退出登录',
  },
]

const logout = () => {
  dialog.info({
    title: '提示',
    content: '退出登录成功',
    positiveText: '确定',
  })
}

const avatarSelect = (key: Number) => {
  switch (key) {
    case 1:
      router.push({ name: 'Setting' })
      break
    case 2:
      logout()
      break
  }
}

const reloadPage = () => {
  router.push({
    path: '/redirect' + unref(route).fullPath,
  })
}
</script>

<style lang="less" scoped>
.layout-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  transition: all 0.2s ease-in-out;
  width: 100%;
  z-index: 11;

  &-left {
    display: flex;
    align-items: center;
    justify-self: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;
    padding-left: 10px;
  }

  &-right {
    display: flex;
    align-items: center;
    margin-right: 20px;

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }
  }
}
</style>
