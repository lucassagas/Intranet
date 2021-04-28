import { NotFoundPage } from '../components/Errors/404'
import { RemainingErrors } from '../components/Errors/RemainingErrors'

function Error({ statusCode }) {
  return (
    <>
      {statusCode === 404 ? (
        <NotFoundPage />
      ) : (
        <RemainingErrors error={statusCode} />
      )}
    </>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
