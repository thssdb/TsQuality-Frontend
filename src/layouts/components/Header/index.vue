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
      <div class="layout-header-right-language">
        <n-dropdown
          trigger="hover"
          @select="languageSelect"
          :options="languageSelectOptions"
        >
          <div class="avatar">
            <n-icon size="24">
              <LanguageOutline />
            </n-icon>
          </div>
        </n-dropdown>
      </div>
      <div class="layout-header-right-avatar">
        <n-dropdown
          trigger="hover"
          @select="avatarSelect"
          :options="avatarOptions"
        >
          <div class="avatar">
            <n-avatar round>
              {{ username }}
              <template #icon>
                <UserOutlined />
              </template>
            </n-avatar>
          </div>
        </n-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PageEnum } from '@/enums/pageEnum'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@vicons/antd'
import { LanguageOutline } from '@vicons/ionicons5'
import { useDialog } from 'naive-ui'
import { ref, unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

const i18n = useI18n()

const route = useRoute()
const router = useRouter()
const dialog = useDialog()

const username = ref<string>('admin')

const avatarOptions = [
  {
    key: 1,
    label: i18n.t('global.avatar.settings'),
  },
  {
    key: 2,
    label: i18n.t('global.avatar.logout'),
  },
]

const languageSelectOptions = [
  {
    key: 1,
    label: 'English',
  },
  {
    key: 2,
    label: '简体中文',
  },
]

const logout = () => {
  dialog.info({
    title: i18n.t('global.logout.title'),
    content: i18n.t('global.logout.content'),
    positiveText: i18n.t('global.logout.confirm'),
  })
}

const avatarSelect = (key: Number) => {
  switch (key) {
    case 1:
      router.push({ name: PageEnum.SETTINGS })
      break
    case 2:
      logout()
      break
  }
}

const languageSelect = (key: Number) => {
  switch (key) {
    case 1:
      i18n.locale.value = 'en'
      break
    case 2:
      i18n.locale.value = 'zh'
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
    justify-content: space-between;

    &-language {
      margin-right: 20px;
    }

    .avatar {
      display: flex;
      align-items: center;
      height: 64px;
    }
  }
}
</style>
