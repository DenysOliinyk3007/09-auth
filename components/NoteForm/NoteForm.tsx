'use client'
import css from './NoteForm.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createNote } from '@/lib/clientApi'
import { useRouter } from 'next/navigation'
import { useNoteDraftStore } from '@/lib/store/noteStore'



export interface NoteFormValues {
  title: string
  content: string
  tag: string
}

const TAGS = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']

export default function NoteForm() {
  const router = useRouter()

  const { draft, setDraft, clearDraft } = useNoteDraftStore();
  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      clearDraft();
      router.push('/notes/filter/all');
      queryClient.invalidateQueries({ queryKey: ['notes'] })
    },
  })

  const handleSubmit = (formData: FormData) => {

    const values: NoteFormValues = {
      title: String(formData.get('title') ?? '').trim(),
      content: String(formData.get('content') ?? '').trim(),
      tag: String(formData.get('tag') ?? ''),
    }



    mutate(values)
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          required
          className={css.input}
          defaultValue={draft?.title} 
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={8}
          maxLength={500}
          className={css.textarea}
          defaultValue={draft?.content} 
          onChange={handleChange}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          required
          className={css.select}
          defaultValue={draft?.tag} 
          onChange={handleChange}
        >
          {TAGS.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>


      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={isPending}
        >
          {isPending ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  )
}



// 'use client'
// import css from './NoteForm.module.css'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import { useMutation, useQueryClient } from '@tanstack/react-query';
// import { createNote } from '../../lib/api';
// export interface NoteFormValues {
//   title: string;
//   content: string;
//   tag: string;
// }


// interface NoteFormProps{
//     onCancel: () => void
// }


// const initialValues: NoteFormValues = {
//   title: '',
//   content: '',
//   tag: 'Todo',
// }

// const validationSchema = Yup.object({
//   title: Yup.string().min(3, 'Title is too short').max(50, 'Title is too long').required('Title is required'),
//   content: Yup.string().max(500, 'Content is too long'),
//   tag: Yup.string()
//     .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
//     .required('Tag is required'),
// })

// export default function NoteForm({onCancel}: NoteFormProps) {
//     const queryClient = useQueryClient();
//     const {mutate} = useMutation({
//         mutationFn: createNote,
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ['notes'] })
//             onCancel();
//         }
//     })


//     const handleSubmit = (values: NoteFormValues) => {
//         mutate(values);
//     }

//   return (
//     <Formik
//       initialValues={initialValues}
//       validationSchema={validationSchema}
//       onSubmit={handleSubmit}
//     >
//       {({ isSubmitting }) => (
//         <Form className={css.form}>
//           <div className={css.formGroup}>
//             <label htmlFor="title">Title</label>
//             <Field id="title" name="title" type="text" className={css.input} />
//             <ErrorMessage name="title" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="content">Content</label>
//             <Field
//               id="content"
//               name="content"
//               as="textarea"
//               rows={8}
//               className={css.textarea}
//             />
//             <ErrorMessage name="content" component="span" className={css.error} />
//           </div>

//           <div className={css.formGroup}>
//             <label htmlFor="tag">Tag</label>
//             <Field id="tag" name="tag" as="select" className={css.select}>
//               <option value="Todo">Todo</option>
//               <option value="Work">Work</option>
//               <option value="Personal">Personal</option>
//               <option value="Meeting">Meeting</option>
//               <option value="Shopping">Shopping</option>
//             </Field>
//             <ErrorMessage name="tag" component="span" className={css.error} />
//           </div>

//           <div className={css.actions}>
//             <button type="button" className={css.cancelButton} onClick={onCancel}>
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className={css.submitButton}
//               disabled={isSubmitting}
//             >
//               Create note
//             </button>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   )
// }