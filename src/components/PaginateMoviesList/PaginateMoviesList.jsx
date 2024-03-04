import PropTypes from 'prop-types';
import ReactPaginate from "react-paginate";
import css from './PaginateMoviesList.module.css';

const PaginateMoviesList = ({ onClick, pageCount, forcePage }) => {
  return (
    <div>
    <ReactPaginate
        pageCount={pageCount}
        onPageChange={onClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        forcePage={forcePage-1}
        breakLabel="..."
        previousLabel="&laquo;"
        nextLabel="&raquo;"
        containerClassName={css.pagination}
        activeClassName={css.active}
        pageClassName={css.pageItem}
        disabledClassName={css.pageItemDisabled}
        nextClassName={css.pageItem}
        previousClassName={css.pageItem}
    />
    </div>
  )
}

PaginateMoviesList.propTypes = {
    onClick: PropTypes.func.isRequired,
    pageCount: PropTypes.number.isRequired,
}

export default PaginateMoviesList