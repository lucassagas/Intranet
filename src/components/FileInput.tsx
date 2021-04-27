import { useRef, useEffect, useCallback, useState } from 'react'

import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons'

import { FiAlertCircle } from '../styles/icons'

import { Container, Error, Label } from '../styles/components/FileInput'

interface Props {
  name: string
  width?: string
  icon?: React.ComponentType<IconBaseProps>
  label?: string
  disabled?: boolean
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export function FileInput({
  name,
  icon: Icon,
  width,
  label,
  disabled,
  ...rest
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const { fieldName, registerField, defaultValue, error } = useField(name)
  const [preview, setPreview] = useState(defaultValue)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(ref: HTMLInputElement) {
        ref.value = ''
        setPreview(null)
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreview(value)
      }
    })
  }, [fieldName, registerField])

  return (
    <>
      {label && <Label disabled={disabled}>{label}</Label>}
      <Container
        id="defaultInput"
        width={width}
        isErrored={!!error}
        isFocused={isFocused}
        isFilled={isFilled}
      >
        {Icon && <Icon size={18} />}
        <input
          type="file"
          ref={inputRef}
          disabled={disabled}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
          {...rest}
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
