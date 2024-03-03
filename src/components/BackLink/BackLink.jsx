import { Link } from "react-router-dom"
import { HiArrowLeft } from 'react-icons/hi';
import css from './BackLink.module.css';

const BackLink = ({ to, children }) => {
  return (
    <>
    <Link to={to} className={css.backlLink}>
      <HiArrowLeft size="16" />
      {children}
    </Link>
    </>
  )
}

export default BackLink