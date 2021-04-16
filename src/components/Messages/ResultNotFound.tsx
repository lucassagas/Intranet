import { Container } from '../../styles/components/Messages/NoResultFound'

export function ResultNotFound() {
  return (
    <Container>
      <h2>Não encontramos nenhum resultado</h2>

      <p>
        Certifique que todas as palavras estão escritas de maneira <br />{' '}
        correta, ou experimente palavaras-chave diferentes.
      </p>
    </Container>
  )
}
