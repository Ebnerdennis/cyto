import React, { PureComponent } from 'react';
import * as d3 from 'd3';

class ImageHistogram extends PureComponent {
  constructor(props) {
    super();
    this.canvas = React.createRef();
    this.state = {
      data: []
    };
    this.createHistogram = this.createHistogram.bind(this);
  }

  componentDidMount() {
    let image = new Image();
    image.onload = e => {
      const img = e.target;
      const canvas = this.canvas.current;
      const context = canvas.getContext('2d');
      context.drawImage(img, 0, img.height, img.width, img.height);
      const imageData = context.getImageData(
        0,
        img.height,
        img.width,
        img.height
      ).data;
      const data = this.createPlottableData(imageData);
      // Create Histogram
      this.createHistogram(data);
      this.setState({ data: data });
    };
    image.src = this.props.src;
  }

  componentDidUpdate() {
    this.createHistogram(this.state.data);
  }

  createPlottableData(imageData) {
    let rD = {},
      gD = {},
      bD = {};
    for (var i = 0; i < 256; i++) {
      rD[i] = 0;
      gD[i] = 0;
      bD[i] = 0;
    }
    for (var j = 0; j < imageData.length; j += 4) {
      rD[imageData[j]]++;
      gD[imageData[j + 1]]++;
      bD[imageData[j + 2]]++;
    }
    return { rD, gD, bD };
  }

  createHistogram(imgData) {
    let W = 300;
    let H = 300;
    const svg = d3.select(this.node);
    const margin = { top: 20, right: 44, bottom: 20, left: 0 };
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;
    let yAxis = true;
    let q = document.querySelector('svg');
    q.style.width = width;
    q.style.height = height;
    if (yAxis) {
      d3.selectAll('g.y-axis').remove();
    }
    function graphComponent(imgData, color) {
      d3.selectAll('.bar-' + color).remove();
      var data = Object.keys(imgData).map(function(key) {
        return { freq: imgData[key], idx: +key };
      });
      var x = d3
        .scaleLinear()
        .range([0, width])
        .domain([
          0,
          d3.max(data, function(d) {
            return d.idx;
          })
        ]);
      var y = d3
        .scaleLinear()
        .range([height, 0])
        .domain([
          0,
          d3.max(data, function(d) {
            return d.freq;
          })
        ]);
      var g = svg
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      if (!yAxis) {
        yAxis = true;
        g.append('g')
          .attr('class', 'y-axis')
          .attr('transform', 'translate(' + -5 + ',0)')
          .call(
            d3
              .axisLeft(y)
              .ticks(10)
              .tickSizeInner(10)
              .tickSizeOuter(2)
          );
      }

      g.selectAll('.bar-' + color)
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar-' + color)
        .attr('fill', color)
        .attr('x', function(d) {
          return x(d.idx);
        })
        .attr('y', function(d) {
          return y(d.freq);
        })
        .attr('width', 2)
        .attr('opacity', 0.8)
        .attr('height', function(d) {
          return height - y(d.freq);
        });
    }
    graphComponent(imgData.gD, 'green');
    graphComponent(imgData.bD, 'blue');
    graphComponent(imgData.rD, 'red');
  }

  render() {
    return (
      <React.Fragment>
        <canvas
          style={{ display: 'none' }}
          ref={this.canvas}
          height={300}
          width={300}
        />
        <svg
          style={{ margin: '20px' }}
          ref={node => (this.node = node)}
          width={300}
          height={300}
        />
      </React.Fragment>
    );
  }
}

export default ImageHistogram;
