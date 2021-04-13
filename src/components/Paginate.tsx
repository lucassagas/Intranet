import { useRouter } from 'next/router'
import {
  Container,
  PrevButton,
  PaginateButton,
  NextButton
} from '../styles/components/Paginate'

import { IoIosArrowForward, IoIosArrowBack } from '../styles/icons'

export function Paginate() {
  const router = useRouter()

  console.log(router.pathname)
  return (
    <Container>
      <PrevButton type="button">
        <IoIosArrowBack size={20} />
      </PrevButton>
      <PaginateButton isActive type="button">
        1
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        2
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        3
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        4
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        ...
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        10
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        11
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        12
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        ...
      </PaginateButton>
      <PaginateButton isActive={false} type="button">
        100
      </PaginateButton>
      <NextButton>
        <IoIosArrowForward size={20} />
      </NextButton>
    </Container>
  )
}
