import { useRouter } from 'next/router'
import { useCallback } from 'react'
import {
  Container,
  PrevButton,
  PaginateButton,
  NextButton
} from '../styles/components/Paginate'

import { IoIosArrowForward, IoIosArrowBack } from '../styles/icons'

interface PaginateProps {
  totalPages: number
  currentPage: number
}

export function Paginate({ totalPages, currentPage }: PaginateProps) {
  const router = useRouter()

  const handlePrevPage = useCallback(() => {
    if (Number(currentPage > 1)) {
      router.push(`${router.pathname}?page=${Number(currentPage) - 1}`)
    }
  }, [currentPage, router])

  const handleNextPage = useCallback(() => {
    if (Number(currentPage < totalPages)) {
      router.push(`${router.pathname}?page=${Number(currentPage) + 1}`)
    }
  }, [router, currentPage])

  const handleChangePage = useCallback(
    page => {
      router.push(`${router.pathname}?page=${page}`)
    },
    [router]
  )

  return (
    <Container>
      <PrevButton
        disabled={Number(currentPage) <= 1}
        onClick={handlePrevPage}
        type="button"
      >
        <IoIosArrowBack size={20} />
      </PrevButton>
      {totalPages > 1 && (
        <>
          <PaginateButton
            onClick={() => handleChangePage(1)}
            isActive={Number(currentPage) === 1}
            type="button"
          >
            1
          </PaginateButton>
          {totalPages > 2 && (
            <>
              <PaginateButton
                onClick={() =>
                  handleChangePage(
                    Number(currentPage) > 2 ? Number(currentPage) - 1 : 2
                  )
                }
                isActive={Number(currentPage) === 2}
                type="button"
              >
                {Number(currentPage) > 2 ? Number(currentPage) - 1 : 2}
              </PaginateButton>

              {totalPages > 3 && (
                <>
                  <PaginateButton
                    onClick={() =>
                      handleChangePage(
                        Number(currentPage) > 3 ? Number(currentPage) : 3
                      )
                    }
                    isActive={Number(currentPage) >= 3}
                    type="button"
                  >
                    {Number(currentPage) > 3 ? Number(currentPage) : 3}
                  </PaginateButton>

                  {Number(currentPage) < Number(totalPages) && (
                    <>
                      <PaginateButton
                        onClick={() =>
                          handleChangePage(
                            Number(currentPage) >= 4
                              ? Number(currentPage) + 1
                              : 4
                          )
                        }
                        isActive={false}
                        type="button"
                      >
                        {Number(currentPage) >= 4 ? Number(currentPage) + 1 : 4}
                      </PaginateButton>

                      {Number(currentPage) + 11 < Number(totalPages) && (
                        <>
                          <PaginateButton isActive={false} type="button">
                            ...
                          </PaginateButton>

                          <PaginateButton
                            onClick={() =>
                              handleChangePage(Number(currentPage) + 9)
                            }
                            isActive={
                              Number(currentPage) === Number(currentPage) + 9
                            }
                            type="button"
                          >
                            {Number(currentPage) + 9}
                          </PaginateButton>

                          <PaginateButton
                            onClick={() =>
                              handleChangePage(Number(currentPage) + 10)
                            }
                            isActive={
                              Number(currentPage) === Number(currentPage) + 10
                            }
                            type="button"
                          >
                            {Number(currentPage) + 10}
                          </PaginateButton>

                          <PaginateButton
                            onClick={() =>
                              handleChangePage(Number(currentPage) + 11)
                            }
                            isActive={
                              Number(currentPage) === Number(currentPage) + 11
                            }
                            type="button"
                          >
                            {Number(currentPage) + 11}
                          </PaginateButton>
                        </>
                      )}
                      <PaginateButton isActive={false} type="button">
                        ...
                      </PaginateButton>

                      <PaginateButton
                        onClick={() => handleChangePage(Number(totalPages))}
                        isActive={false}
                        type="button"
                      >
                        {totalPages}
                      </PaginateButton>
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}

      <NextButton
        disabled={Number(currentPage) === Number(totalPages)}
        onClick={handleNextPage}
      >
        <IoIosArrowForward size={20} />
      </NextButton>
    </Container>
  )
}
