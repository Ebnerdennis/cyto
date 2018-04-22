import React, { Component } from 'react';
import { GridList, GridListTile } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import Sample from './Sample';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)'
  },
  titleBar: {
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
      'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  }
});

class Samples extends Component {
  constructor(props) {
    super(props);

    this.state = {
      samples: this.props.pathnames.map(pathname => ({
        category_id: null,
        pathname: pathname
      }))
    };
  }

  render() {
    return (
      <GridList cellHeight={256} cols={this.props.columns}>
        {this.props.pathnames.map((pathname, index) => (
          <GridListTile key={index} cols={1}>
            <Sample pathname={pathname} />
          </GridListTile>
        ))}
      </GridList>
    );
  }
}

export default withStyles(styles)(Samples);