/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

export default class Paginator extends React.Component {
    static propTypes = {
        total: PropTypes.number,
        currentPage: PropTypes.number,
        aroundPages: PropTypes.number,
        edgePages: PropTypes.number,
        isAngularLinks: PropTypes.bool,
        isEdgeLinks: PropTypes.bool,
        minPages: PropTypes.number,
        onPageChange: PropTypes.func,

        /** Additional wrapper class name */
        className: PropTypes.string,
    };

    static defaultProps = {
        total: 0,
        currentPage: 1,
        aroundPages: 3,
        edgePages: 1,
        isAngularLinks: false,
        isEdgeLinks: false,
        minPages: 10,
        onPageChange() {},
        className: '',
    };

    changePage = page => {
        if (page < 1 || page > this.props.total) {
            return;
        }

        this.props.onPageChange(page);
    };

    gotoPage = (page, e) => {
        e.preventDefault();

        if (page < 1 || page > this.props.total) {
            return;
        }

        this.changePage(page);
    };

    gotoPrevPage = e => {
        e.preventDefault();
        this.changePage(this.props.currentPage - 1);
    };

    gotoNextPage = e => {
        e.preventDefault();
        this.changePage(this.props.currentPage + 1);
    };

    gotoFirstPage = e => {
        e.preventDefault();
        this.changePage(1);
    };

    gotoLastPage = e => {
        e.preventDefault();
        this.changePage(this.props.total);
    };

    render() {
        // Don't show anything if there is only one page
        if (this.props.total <= 1) {
            return null;
        }

        const pages = [];
        let isGap = false;
        for (let i = 1; i <= this.props.total; i++) {
            // Don't show gap pages
            if (
                this.props.total > this.props.minPages &&
                Math.abs(i - this.props.currentPage) > this.props.aroundPages &&
                Math.abs(i) > this.props.edgePages &&
                Math.abs(this.props.total - i) >= this.props.edgePages
            ) {
                if (!isGap) {
                    pages.push(
                        <li key={i} className="page-item disabled">
                            <a className="page-link">...</a>
                        </li>
                    );
                    isGap = true;
                }
            } else {
                isGap = false;

                const className = i === this.props.currentPage ? 'page-item active' : 'page-item';
                pages.push(
                    <li key={i} className={className} onClick={this.gotoPage.bind(null, i)}>
                        <a className="page-link" href="#">
                            {i}
                        </a>
                    </li>
                );
            }
        }

        // Prev and next pages
        if (this.props.isAngularLinks) {
            // Prev page
            pages.unshift(
                <li
                    key="prev"
                    className={this.props.currentPage === 1 ? 'page-item disabled' : 'page-item'}
                    onClick={this.gotoPrevPage}
                >
                    <a className="page-link" href="#">
                        «
                    </a>
                </li>
            );

            // Next page
            pages.push(
                <li
                    key="next"
                    className={
                        this.props.currentPage === this.props.total
                            ? ' page-itemdisabled'
                            : 'page-item'
                    }
                    onClick={this.gotoNextPage}
                >
                    <a href="#" className="page-link">
                        »
                    </a>
                </li>
            );
        }

        // First and last pages
        if (this.props.isEdgeLinks) {
            // First page
            pages.unshift(
                <li
                    key="first"
                    className={this.props.currentPage === 1 ? 'page-item disabled' : 'page-item'}
                    onClick={this.gotoFirstPage}
                >
                    <a className="page-link" href="#">
                        First
                    </a>
                </li>
            );

            // Last page
            pages.push(
                <li
                    key="last"
                    className={
                        this.props.currentPage === this.props.total
                            ? 'page-item disabled'
                            : 'page-item'
                    }
                    onClick={this.gotoLastPage}
                >
                    <a className="page-link" href="#">
                        Last
                    </a>
                </li>
            );
        }

        return (
            <ul
                className={classnames('pagination', 'pagination-sm', this.props.className)}
                style={{ margin: '0' }}
            >
                {pages}
            </ul>
        );
    }
}
