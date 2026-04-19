import type { Note } from '@/types/note'
import type { NoteFormValues } from '@/components/NoteForm/NoteForm'
import type { User } from '@/types/user'
import { nextServer } from './api/api'

export type RegisterRequest = {
  email: string
  password: string
}

export type LoginRequest = {
  email: string
  password: string
}

export type UpdateMeRequest = {
  username: string
}

export interface NotesResponse {
  notes: Note[]
  totalPages: number
}

type CheckSessionResponse = {
  success: boolean
}


export const register = async (data: RegisterRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/register', data)
  return res.data
}

export const login = async (data: LoginRequest): Promise<User> => {
  const res = await nextServer.post<User>('/auth/login', data)
  return res.data
}

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
}

export const checkSession = async (): Promise<boolean> => {
  const res = await nextServer.get<CheckSessionResponse>('/auth/session')
  return res.data.success
}

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>('/users/me')
  return data
}

export const updateMe = async (payload: UpdateMeRequest): Promise<User> => {
  const { data } = await nextServer.patch<User>('/users/me', payload)
  return data
}


export const fetchNotes = async (
  search: string,
  page: number,
  tag?: string
): Promise<NotesResponse> => {
  const res = await nextServer.get<NotesResponse>('/notes', {
    params: {
      page,
      perPage: 12,
      ...(search.trim() !== '' && { search }),
      tag,
    },
  })
  return res.data
}

export const fetchNoteById = async (noteID: string): Promise<Note> => {
  const { data } = await nextServer.get<Note>(`/notes/${noteID}`)
  return data
}

export const createNote = async (values: NoteFormValues): Promise<Note> => {
  const { data } = await nextServer.post<Note>('/notes', values)
  return data
}

export const deleteNote = async (noteID: Note['id']): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteID}`)
  return data
}