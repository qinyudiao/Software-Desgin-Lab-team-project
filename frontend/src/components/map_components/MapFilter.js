import React, { Component } from 'react'
import FilterList from './FilterList';

export default class MapFilter extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment >
                <div style={{marginLeft: "0.5rem"}}>
                    <FilterList
                    filterList={this.props.filterListActive}
                    updateSelected={this.props.updateSelectedActive}
                    />
                    <hr />
                    <FilterList
                        filterList={this.props.filterListLaunch}
                        updateSelected={this.props.updateSelectedLaunch}
                    />
                    <hr />
                    <FilterList
                        filterList={this.props.filterListCountry}
                        updateSelected={this.props.updateSelectedCountry}
                    />
                </div>
            </React.Fragment>
        );
    }
}
