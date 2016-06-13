import React, { Component, PropTypes } from 'react'
import styles from '../../css/app.scss';

export default class List extends Component {
  renderLoadMore() {
    const { isFetching, onLoadMoreClick } = this.props;
    return (
      <div className="clearfix" style={{ textAlign: 'center'}}>
        <button className="btn btn-primary btn-lg" style={{display: 'inline-block'}}
                onClick={onLoadMoreClick}
                disabled={isFetching}>
          {isFetching ? 'Loading...' : 'Load More'}
        </button>
      </div>

    )
  }

  componentDidMount() {


  }

  render() {
    const {
      isFetching, nextPageUrl, pageCount,
      items, renderItem
    } = this.props;;

    const isEmpty = items.length === 0;
    if (isEmpty && isFetching) {
      return <h2><i>loading items...</i></h2>
    }

    const isLastPage = !nextPageUrl;;
    if (isEmpty && isLastPage) {
      return <h1><i>Nothing here!</i></h1>
    }

    return (
      <div className={styles.list}>
        {items.map(renderItem)}
        {pageCount > 0 && !isLastPage && this.renderLoadMore()}
      </div>
    )
  }
}

List.propTypes = {
  loadingLabel: PropTypes.string.isRequired,
  pageCount: PropTypes.number,
  renderItem: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  nextPageUrl: PropTypes.string
};

List.defaultProps = {
  isFetching: true
};
