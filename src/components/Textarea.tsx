import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { useField } from '@unform/core'
import { FiAlertCircle } from '../styles/icons'

import { Container, Error, Label } from '../styles/components/Textarea'

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  name: string
  width?: string
  label?: string
  rows?: number
}

export function Textarea({ name, width, label, rows, ...rest }: InputProps) {
  const InputRef = useRef<HTMLTextAreaElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!InputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <Label>{label}</Label>}
      <Container
        id="defaultInput"
        width={width}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        <textarea
          ref={InputRef}
          {...rest}
          rows={rows}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
        />
        {error && (
          <Error title={error}>
            <FiAlertCircle color="var(--error)" size={20} />
          </Error>
        )}
      </Container>
    </>
  )
}
