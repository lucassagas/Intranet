import React, { useRef, useEffect, useState, useCallback } from 'react'
import ReactInputMask, { Props as InputProps } from 'react-input-mask'
import { useField } from '@unform/core'
import { IconBaseProps } from 'react-icons/lib'

import { Container, Error, Label } from '../styles/components/InputMask'
import { FiAlertCircle, RiEyeCloseLine, AiOutlineEye } from '../styles/icons'

interface Props extends InputProps {
  name: string
  width?: string
  icon?: React.ComponentType<IconBaseProps>
  label?: string
  password?: boolean
  calendar?: boolean
}
export function InputMask({
  name,
  icon: Icon,
  width,
  label,
  password,
  ...rest
}: Props) {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [seePassword, setSeePassword] = useState(password)
  const { fieldName, registerField, defaultValue, error } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  const handleSeePassword = useCallback(() => {
    setSeePassword(!seePassword)
  }, [seePassword])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value: string) {
        ref.setInputValue(value)
      },
      clearValue(ref: any) {
        ref.setInputValue('')
      }
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
        <ReactInputMask
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          ref={inputRef}
          type={seePassword ? 'password' : 'text'}
          defaultValue={defaultValue}
          {...rest}
        />
        {password && (
          <span>
            {seePassword ? (
              <AiOutlineEye
                onClick={handleSeePassword}
                size={20}
                color="var(--gray)"
              />
            ) : (
              <RiEyeCloseLine
                onClick={handleSeePassword}
                size={20}
                color="var(--gray)"
              />
            )}
          </span>
        )}
        {error && (
          <Error title={error}>
            <FiAlertCircle color="var(--error)" size={20} />
          </Error>
        )}
      </Container>
    </>
  )
}
