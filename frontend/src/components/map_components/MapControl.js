import { Component } from 'react';
import { createPortal } from 'react-dom';
import { MAP } from 'react-google-maps/lib/constants';
import { string, element, object, oneOfType, array } from 'prop-types';

export default class MapControl extends Component {
  static propTypes = {
    position: string.isRequired,
    children: oneOfType([element, array]),
    className: string,
  };

  static defaultProps = {
    children: [],
    className: '',
  };

  static contextTypes = { [MAP]: object };

  constructor(props, context) {
    super(props);

    this.map = context[MAP];
    this.controlDiv = document.createElement('div');
    this.divIndex = this.map.controls[this.props.position].length;    
    this.map.controls[props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    this.map.controls[this.props.position].removeAt(this.divIndex);
  }

  render() {
    const { className } = this.props;
    className && this.controlDiv.classList.add(className);

    return createPortal(this.props.children, this.controlDiv);
  }
}