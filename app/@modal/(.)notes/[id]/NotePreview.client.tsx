'use client'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { fetchNoteById } from '@/lib/clientApi'
import Modal from '@/components/Modal/Modal'

export default function NotePreview({ id }: { id: string }) {
  const router = useRouter()

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  })

  if (isLoading) return <p>Loading...</p>
  if (isError || !note) return <p>Something went wrong.</p>

  return (
    <Modal onClose={() => router.back()}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{note.tag}</p>
      <p>{note.createdAt}</p>
    </Modal>
  )
}