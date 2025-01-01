import { computed, MaybeRefOrGetter, toValue } from 'vue'
import { useList } from 'frappe-ui/src/data-fetching'
import { GPProject, GPMember } from '@/types/doctypes'
import { useSessionUser } from './users'

interface Member extends Pick<GPMember, 'user'> {}

export interface Space
  extends Pick<
    GPProject,
    | 'name'
    | 'title'
    | 'icon'
    | 'team'
    | 'archived_at'
    | 'is_private'
    | 'modified'
    | 'tasks_count'
    | 'discussions_count'
  > {
  members: Member[]
}

export let spaces = useList<Space>({
  doctype: 'GP Project',
  fields: [
    'name',
    'title',
    'icon',
    'team',
    'archived_at',
    'is_private',
    'modified',
    'tasks_count',
    'discussions_count',
    { members: ['user'] },
  ],
  initialData: [],
  orderBy: 'title asc',
  limit: 99999,
  cacheKey: 'spaces',
  transform(data) {
    for (let space of data) {
      space.name = space.name.toString()
    }
    return data
  },
  immediate: true,
})

export function useSpace(name: MaybeRefOrGetter<string>) {
  return computed(() => {
    let _name = toValue(name)
    return spaces.data?.find((space) => space.name.toString() === _name?.toString()) ?? null
  })
}

export const joinedSpaces = computed(() => {
  const sessionUser = useSessionUser()
  return (
    spaces.data
      ?.filter((space) => space.members.find((member) => member.user === sessionUser.name))
      .map((space) => space.name) || []
  )
})
