import Lottie from 'react-lottie'
import animationData from '../../animations/loadingButton.json'

import { Container } from '../../styles/components/Loadings/LoadingButton'

export function LoadingButton() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }

  return (
    <Container>
      <Lottie options={defaultOptions} />
    </Container>
  )
}
