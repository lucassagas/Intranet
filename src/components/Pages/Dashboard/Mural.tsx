import {
  FiClipboard,
  IoIosArrowBack,
  IoIosArrowForward
} from '../../../styles/icons'

import {
  Container,
  Wrapper
} from '../../../styles/components/Pages/Dashboard/Mural'

export function Mural() {
  return (
    <Container>
      <header>
        <span>
          <FiClipboard size={18} />
          <strong>Mural</strong>
          <button type="button">Ver mais</button>
        </span>
        <span>
          <button type="button">
            <IoIosArrowBack size={16} />
          </button>
          <button type="button">
            <IoIosArrowForward size={16} />
          </button>
        </span>
      </header>
      <Wrapper>
        <strong>Credenciais para acessar Paramount e Noggin</strong>

        <p>
          Para acess as App’s, Paramunt e Noggin, cliente deve utilizar as
          credenciais descritas no campo Hotsite, visivel para nós, através do
          caminho Cliente {'>'} Contato {'>'} Hotsite
        </p>
      </Wrapper>
    </Container>
  )
}
