<template>
  <div class="layout-header">
    <!-- left menu -->
    <div class="layout-header-left">
      <!-- collapse menu -->
      <div class="mt-2" @click="() => $emit('update:collapsed', !collapsed)">
        <n-icon v-if="collapsed" size="18">
          <MenuUnfoldOutlined />
        </n-icon>
        <n-icon v-else size="18">
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
          :options="languageSelectOptions"
          @select="languageSelect"
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
          :options="avatarOptions"
          @select="avatarSelect"
        >
          <div class="avatar">
            <n-avatar round>
              <n-icon>
                <UserOutlined />
              </n-icon>
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
import { unref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import i18n from '@/locales'

defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})

defineEmits({
  'update:collapsed': () => true,
})

const { t, locale } = i18n.global

const route = useRoute()
const router = useRouter()
const dialog = useDialog()

const avatarOptions = [
  {
    key: 1,
    label: t('global.avatar.settings'),
  },
  {
    key: 2,
    label: t('global.avatar.logout'),
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
    title: t('global.logout.title'),
    content: t('global.logout.content'),
    positiveText: t('global.logout.confirm'),
  })
}

const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      router.push({ name: PageEnum.SETTINGS })
      break
    case 2:
      logout()
      break
  }
}

const languageSelect = (key: number) => {
  switch (key) {
    case 1:
      locale.value = 'en'
      break
    case 2:
      locale.value = 'zh'
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
