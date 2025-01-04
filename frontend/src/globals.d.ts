// defining global components and properties here for autocompletion
// https://github.com/johnsoncodehk/volar/tree/master/extensions/vscode-vue-language-features

import { isSessionUser } from './data/session'
import { useUser } from './data/users'
import { dayjs } from './utils'
import { getPlatform } from './utils'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
    Button: (typeof import('frappe-ui'))['Button']
    Input: (typeof import('frappe-ui'))['Input']
    TextInput: (typeof import('frappe-ui'))['TextInput']
    ErrorMessage: (typeof import('frappe-ui'))['ErrorMessage']
    Dialog: (typeof import('frappe-ui'))['Dialog']
    FeatherIcon: (typeof import('frappe-ui'))['FeatherIcon']
    Alert: (typeof import('frappe-ui'))['Alert']
    Badge: (typeof import('frappe-ui'))['Badge']
    UserInfo: (typeof import('frappe-ui'))['UserInfo']
    UserAvatar: typeof import('./components/UserAvatar.vue')
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $platform: typeof getPlatform
    $user: typeof useUser
    $dayjs: typeof dayjs
    $isSessionUser: typeof isSessionUser
  }
}

export {}
