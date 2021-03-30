import Lottie from 'react-lottie'
import animationData from '../../animations/loadingScreen.json'

import { Container } from '../../styles/components/Loadings/LoadingScreen'

export function LoadingScreen() {
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
      <div>
        <Lottie options={defaultOptions} />
      </div>
    </Container>
  )
}
