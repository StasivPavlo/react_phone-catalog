import classNames from 'classnames';
import React, { FC } from 'react';
import { DOTS, usePagination } from './usePagination';

import './Pagination.scss';

interface Props {
  pageCount: number;
  siblingCount: number;
  currentPage: number;
  setCurrentPage: (state: number | ((state: number) => number)) => void;
}

export const PageList: FC<Props> = React.memo(function PageList({
  pageCount,
  siblingCount,
  currentPage,
  setCurrentPage,
}) {
  const pages = usePagination(pageCount, currentPage, siblingCount);

  return (
    <ul className="pagination__page-list">
      {pages.map(page => {
        if (page === DOTS) {
          return (
            <li key={page}>
              <div className="pagination__dots">{DOTS}</div>
            </li>
          );
        }

        return (
          <li key={page}>
            <button
              type="button"
              className={classNames('pagination__button', {
                selected: currentPage === page,
              })}
              onClick={() => {
                if (typeof page !== 'string') {
                  setCurrentPage(page);
                }
              }}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
});

export const Pagination: FC<Props> = React.memo(function Pagination({
  pageCount,
  siblingCount,
  currentPage,
  setCurrentPage,
}) {
  const onPrevButtonClick = () => {
    setCurrentPage((state: number) => state - 1);
  };

  const onNextButtonClick = () => {
    setCurrentPage((state: number) => state + 1);
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button pagination__button--prev"
        type="button"
        onClick={onPrevButtonClick}
        disabled={currentPage <= 1}
      >
        <svg className="pagination__button-icon prev" viewBox="0 0 16 16">
          <path
            d="M10.4714 3.52851C10.211 3.26816 9.7889 3.26816 9.52855
            3.52851L5.52855 7.52851C5.26821 7.78886 5.26821 8.21097
            5.52855 8.47132L9.52855 12.4713C9.7889 12.7317 10.211 12.7317
            10.4714 12.4713C10.7317 12.211 10.7317 11.7889 10.4714
            11.5285L6.94277 7.99992L10.4714 4.47132C10.7317 4.21097 10.7317
            3.78886 10.4714 3.52851Z"
          />
        </svg>
      </button>
      <PageList
        pageCount={pageCount}
        siblingCount={siblingCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <button
        className="pagination__button pagination__button--next"
        type="button"
        onClick={onNextButtonClick}
        disabled={currentPage >= pageCount}
      >
        <svg className="pagination__button-icon next" viewBox="0 0 16 16">
          <path
            d="M10.4714 3.52851C10.211 3.26816 9.7889 3.26816 9.52855
            3.52851L5.52855 7.52851C5.26821 7.78886 5.26821 8.21097
            5.52855 8.47132L9.52855 12.4713C9.7889 12.7317 10.211 12.7317
            10.4714 12.4713C10.7317 12.211 10.7317 11.7889 10.4714
            11.5285L6.94277 7.99992L10.4714 4.47132C10.7317 4.21097
            10.7317 3.78886 10.4714 3.52851Z"
          />
        </svg>
      </button>
    </div>
  );
});
