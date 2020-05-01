import React, { Component } from 'react';
import FilterItem from './FilterItem';
import PropTypes from 'prop-types';

export default class FilterList extends Component {
    render() {
        // console.log('FilterList props', this.props);
        return this.props.filterList.map((filterItem) => (
        <FilterItem key={filterItem.id} filterItem={filterItem} updateSelected={this.props.updateSelected} />
        ));
    }
}

// PropTypes
FilterList.propTypes = {
    filterList: PropTypes.array,
    markSelected: PropTypes.func
}
