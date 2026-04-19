'use client'
import css from './page.module.css'
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from '@/components/NoteList/NoteList'
import Pagination from '@/components/Pagination/Pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { fetchNotes } from '@/lib/clientApi'
import {useRouter} from 'next/navigation'
export default function NotesClient({ tag }: { tag?: string }) {
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['notes', currentPage, search, tag],
    queryFn: () => fetchNotes(search, currentPage, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

  const notes = data?.notes ?? []
  const totalPages = data?.totalPages ?? 0

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value)
    setCurrentPage(1)
  }, 1000)

  const router = useRouter();

  const handleCreateNoteRedirect = () => {
    router.push('/notes/action/create')
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox search={search} onSearch={handleSearch} />
        {isSuccess && totalPages > 1 && (
          <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
        )}
        <button className={css.button} onClick={() => handleCreateNoteRedirect()}>
          Create note +
        </button>
      </header>
      {notes.length > 0 && !isError && <NoteList notes={notes} />}
    </div>
  )
}