import PropTypes from 'prop-types';
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

BackLink.propTypes = {
  children: PropTypes.string.isRequired,
}

export default BackLink