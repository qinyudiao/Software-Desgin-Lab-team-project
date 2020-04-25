import React, { Component } from "react";
import PropTypes from "prop-types";

export default class FilterItem extends Component {
  getStyle = () => {
    return {
      // padding: "10px",
      // borderBottom: "1px #ccc dotted",
      color: this.props.filterItem.selected ? "#dddddd" : "#aaaaaa",
      fontWeight: this.props.filterItem.selected ? "bold" : "normal",
    };
  };

  componentDidMount = (props) => {
    // console.log(this.props.filterItem);
  };

  render() {
    const { id, title, selected } = this.props.filterItem;
    return (
      <div>
        <p style={this.getStyle()}>
          <input
            type="checkbox"
            defaultChecked={selected}
            onChange={this.props.updateSelected.bind(this, id)}
          />
          {title}
        </p>
      </div>
    );
  }
}

// PropTypes
FilterItem.propTypes = {
  filterItem: PropTypes.object.isRequired,
  markSelected: PropTypes.func.isRequired,
};
