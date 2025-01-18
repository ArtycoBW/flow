import { DATABASE_ID, MEMBERS_ID, WORKSPACES_ID } from '@/config'
import { getMember } from '@/features/members/utils'
import { createSessionClient } from '@/lib/appwrite'
import { Query } from 'node-appwrite'
import { Workspace } from './types'

interface GetWorkspacesProps {
  workspaceId: string
}

interface GetWorkspacesInfoProps {
  workspaceId: string
}

export const getWorkspaces = async () => {
  const { databases, account } = await createSessionClient()

  const user = await account.get()

  const members = await databases.listDocuments(DATABASE_ID, MEMBERS_ID, [Query.equal('userId', user.$id)])

  if (members.total === 0) return { documents: [], total: 0 }

  const workspaceIds = members.documents.map(member => member.workspaceId)

  const workspaces = await databases.listDocuments(DATABASE_ID, WORKSPACES_ID, [
    Query.orderDesc('$createdAt'),
    Query.contains('$id', workspaceIds),
  ])

  return workspaces
}

export const getWorkspace = async ({ workspaceId }: GetWorkspacesProps) => {
  const { databases, account } = await createSessionClient()

  const user = await account.get()

  const member = getMember({ databases, userId: user.$id, workspaceId })

  if (!member) {
    throw new Error('Неавторизирован')
  }

  const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACES_ID, workspaceId)

  return workspace
}

export const getWorkspaceInfo = async ({ workspaceId }: GetWorkspacesInfoProps) => {
  const { databases } = await createSessionClient()

  const workspace = await databases.getDocument<Workspace>(DATABASE_ID, WORKSPACES_ID, workspaceId)

  return { name: workspace.name }
}
