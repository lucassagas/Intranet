import {
  AiOutlineWarning,
  IoIosArrowBack,
  IoIosArrowForward
} from '../../../styles/icons'

import {
  Container,
  Wrapper,
  WrapperMessage,
  Scroll
} from '../../../styles/components/Pages/Dashboard/Warnings'

export function Warnings() {
  return (
    <Container>
      <Wrapper>
        <header>
          <span>
            <AiOutlineWarning size={20} />
            <strong>Avisos e Manutenções</strong>
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
        <Scroll>
          <WrapperMessage concluded type="medium">
            <header>
              <span>Classe: Alerta Médio</span>
              <span>Status: concluído</span>
            </header>

            <strong>Atenção</strong>

            <p>
              Devido a (escrever possível causa), nossa equipe está trabalhando
              para restabelecer o mais breve possível as conexões.
            </p>

            <p>Obrigado pela compreensão.</p>
          </WrapperMessage>

          <WrapperMessage concluded={false} type="hight">
            <header>
              <span>Classe: Alerta Alto</span>
              <span>Status: concluído</span>
            </header>

            <strong>Atenção</strong>

            <p>
              Devido a (escrever possível causa), nossa equipe está trabalhando
              para restabelecer o mais breve possível as conexões.
            </p>

            <p>Obrigado pela compreensão.</p>
          </WrapperMessage>

          <WrapperMessage concluded type="low">
            <header>
              <span>Classe: Alerta Baixo</span>
              <span>Status: concluído</span>
            </header>

            <strong>Atenção</strong>

            <p>
              Devido a (escrever possível causa), nossa equipe está trabalhando
              para restabelecer o mais breve possível as conexões.
            </p>

            <p>Obrigado pela compreensão.</p>
          </WrapperMessage>
        </Scroll>
      </Wrapper>
    </Container>
  )
}
