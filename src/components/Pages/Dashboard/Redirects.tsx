import neoredeLogo from '../../../assets/neoredeLogo.png'
import aloneLogo from '../../../assets/aloneLogo.png'
import intranetLogo from '../../../assets/intranetLogo.png'

import {
  Container,
  Wrapper,
  ImageWrapper,
  Content
} from '../../../styles/components/Pages/Dashboard/Redirects'
import { useEffect, useState } from 'react'
import { useToast } from '../../../hooks/toast'
import { api } from '../../../services/api'
import Cookies from 'js-cookie'

interface UserProps {
  user_name: string
  user_email: string
}

export function Redirects() {
  const [user, setUser] = useState<UserProps>()
  const { addToast } = useToast()

  useEffect(() => {
    const token = Cookies.get('intranet-token')
    api
      .get('api/user/my_information', { headers: { tokenaccess: token } })
      .then(response => {
        setUser(response.data)
      })
      .catch(err => {
        addToast({
          type: 'error',
          title: 'Error',
          description: err.response ? err.response.data.message : err.message
        })
      })
  }, [])

  return (
    <Container>
      <Content>
        <header>
          <span>
            <strong>Usuário: </strong>
            <p>{user?.user_name}</p>
          </span>
          <span>
            <strong>E-mail: </strong>
            <p>{user?.user_email}</p>
          </span>
        </header>

        <Wrapper>
          <a href="https://neorede.com.br" target="_blank">
            <img src={neoredeLogo} alt="Neorede Logo" />
          </a>

          <ImageWrapper>
            <a href="https://alone.neorede.com.br/" target="_blank">
              <img src={aloneLogo} alt="Alone Logo" />
            </a>
            <a href="/">
              <img src={intranetLogo} alt="Intranet Logo" />
            </a>
          </ImageWrapper>
        </Wrapper>
      </Content>
    </Container>
  )
}
