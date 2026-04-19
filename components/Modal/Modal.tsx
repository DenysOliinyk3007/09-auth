'use client'
import css from './Modal.module.css'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
  onClose?: () => void
}

const Modal = ({ children, onClose }: Props) => {
  const router = useRouter()
  const close = onClose ?? (() => router.back())

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={close}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <button className={css.closeButton} onClick={close}>✕</button>
        {children}
      </div>
    </div>,
    document.body
  )
}

export default Modal