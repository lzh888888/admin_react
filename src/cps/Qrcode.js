import React, { PureComponent } from 'react';
import qrcanvas from 'qrcanvas';

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    this.update(this.props.options);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.options !== nextProps.options) {
      this.update(nextProps.options);
    }
  }

  getDomNode = () => {
    return this.showCanvas;
  }

  cloneCanvas = (size) => {
    return qrcanvas({ ...this.opts, size, canvas: this.hideCanvas });
  }

  update(options) {
    this.opts = {
      data: 'hello world!',
      size: 150,
      cellSize: 8,
      correctLevel: 'L',
      canvas: this.showCanvas,
      ...options,
    };
    qrcanvas(this.opts);
  }

  render() {
    return (
      <div>
        <canvas ref={r => this.showCanvas = r} />
        <canvas ref={r => this.hideCanvas = r} style={{ display: 'none' }} />
      </div>
    );
  }
}