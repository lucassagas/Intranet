import neoredeLogo from '../../../assets/neoredeLogo.png'
import aloneLogo from '../../../assets/aloneLogo.png'
import intranetLogo from '../../../assets/intranetLogo.png'
import ixcLogo from '../../../assets/ixcLogo.png'
import opaLogo from '../../../assets/opaLogo.png'

import {
  Container,
  Wrapper,
  ImageWrapper,
  Content
} from '../../../styles/components/Pages/Dashboard/Redirects'

export function Redirects() {
  return (
    <Container>
      <Content>
        <header>
          <span>
            <strong>Usuário: </strong>
            <p>Lucas Sagás</p>
          </span>
          <span>
            <strong>E-mail: </strong>
            <p>lucassagas@neorede.com.br</p>
          </span>
        </header>

        <Wrapper>
          <img src={neoredeLogo} alt="Neorede Logo" />

          <ImageWrapper>
            <img src={aloneLogo} alt="Alone Logo" />
            <img src={intranetLogo} alt="Intranet Logo" />
          </ImageWrapper>
        </Wrapper>
      </Content>
    </Container>
  )
}
