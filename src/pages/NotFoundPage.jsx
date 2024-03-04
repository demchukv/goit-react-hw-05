import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <p>
        Sorry, page not found!
      </p>
      <p>Start with <Link to="/">Home page</Link></p>
    </>
  )
}

export default NotFoundPage