import { AnimatePresence } from 'framer-motion'
import { ReactNode, useCallback, useEffect, useMemo } from 'react'
import { useModal } from '../../hooks/modal'

import { Overlay, Modalbox } from '../../styles/components/Modal/GlobalModal'

import { MdClose } from '../../styles/icons'

interface GlobalModalProps {
  title: string
  children: ReactNode
  size: number
  id?: any
}

export function GlobalModal({ title, children, size, id }: GlobalModalProps) {
  const { displayModal, setDisplayModal } = useModal()

  console.log(id)

  const closeModal = useCallback(() => {
    setDisplayModal(displayModal.filter(modal => modal !== id))
  }, [displayModal])

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal()
      }
    }

    window.addEventListener('keydown', listener)
    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      {displayModal && displayModal.includes(id) && (
        <Overlay id={id} onClick={closeModal} exit={{ opacity: 0 }}>
          <Modalbox
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -600, opacity: 0 }}
            size={size}
            onClick={(event: any) => event.stopPropagation()}
          >
            <header>
              <strong>{title}</strong>
              <MdClose size={22} onClick={closeModal} />
            </header>
            {children}
          </Modalbox>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
