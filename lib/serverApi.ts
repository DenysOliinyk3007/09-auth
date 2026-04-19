import { cookies } from 'next/headers'
import type { Note } from '@/types/note'
import type { User } from '@/types/user'
import { nextServer } from './api'
import type { NotesResponse } from './clientApi'

type CheckSessionResponse = {
  success: boolean
}

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await nextServer.get<CheckSessionResponse>('/auth/session', {
    headers: { Cookie: cookieStore.toString() },
  })
  return res
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies()
  const { data } = await nextServer.get<User>('/users/me', {
    headers: { Cookie: cookieStore.toString() },
  })
  return data
}

export const fetchServerNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const cookieStore = await cookies()
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search.trim() !== '' && { search }),
      tag,
    },
    headers: { Cookie: cookieStore.toString() },
  })
  return res.data
}

export const fetchServerNoteById = async (noteID: string): Promise<Note> => {
  const cookieStore = await cookies()
  const { data } = await nextServer.get<Note>(`/notes/${noteID}`, {
    headers: { Cookie: cookieStore.toString() },
  })
  return data
}