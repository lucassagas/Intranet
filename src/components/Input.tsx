import React, {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { IconBaseProps } from 'react-icons/lib'
import { useField } from '@unform/core'
import { FiAlertCircle, RiEyeCloseLine, AiOutlineEye } from '../styles/icons'

import { Container, Error, Label } from '../styles/components/Input'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string
  width?: string
  icon?: React.ComponentType<IconBaseProps>
  label?: string
  password?: boolean
  calendar?: boolean
  disabled?: boolean
}

export function Input({
  name,
  icon: Icon,
  width,
  label,
  password,
  disabled,
  ...rest
}: InputProps) {
  const InputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [seePassword, setSeePassword] = useState(password)

  const { fieldName, defaultValue, error, registerField } = useField(name)

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!InputRef.current?.value)
  }, [])

  const handleSeePassword = useCallback(() => {
    setSeePassword(!seePassword)
  }, [seePassword])

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: InputRef.current,
      path: 'value'
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
          type={seePassword ? 'password' : 'text'}
          ref={InputRef}
          disabled={disabled}
          {...rest}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          defaultValue={defaultValue}
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
