import { AnimatePresence } from 'framer-motion'
import { ReactNode, useEffect } from 'react'
import { useModal } from '../../hooks/modal'

import { Overlay, Modalbox } from '../../styles/components/Modal/GlobalModal'

import { MdClose } from '../../styles/icons'

interface GlobalModalProps {
  title: string
  children: ReactNode
  size: number
  id: string
}

export function GlobalModal({ title, children, size, id }: GlobalModalProps) {
  const { displayModal, setDisplayModal } = useModal()

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDisplayModal('')
      }
    }
    window.addEventListener('keydown', listener)

    return () => window.removeEventListener('keydown', listener)
  }, [])

  return (
    <AnimatePresence exitBeforeEnter>
      {displayModal && displayModal === id && (
        <Overlay
          id={id}
          onClick={() => setDisplayModal('')}
          exit={{ opacity: 0 }}
        >
          <Modalbox
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -600, opacity: 0 }}
            size={size}
            onClick={(event: any) => event.stopPropagation()}
          >
            <header>
              <strong>{title}</strong>
              <MdClose size={22} onClick={() => setDisplayModal('')} />
            </header>
            {children}
          </Modalbox>
        </Overlay>
      )}
    </AnimatePresence>
  )
}
