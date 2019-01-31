import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Card } from 'antd';
import * as React from 'react';
import { Colors } from '../../../utils';
import Divider from "@material-ui/core/es/Divider/Divider";

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  card: {
    maxWidth: '125px',
  },
});

// const tileData = [
//   {
//     img: 'https://sport360.com/wp-content/uploads/2017/12/Messi-RealMadrid-Bernabeu.jpg',
//     title: 'Image',
//     author: 'author',
//     cols: 2,
//   }, {
//     img: 'https://www.hindustantimes.com/rf/image_size_960x540/HT/p2/2017/12/23/Pictures/barcelona-liga-santander-real-madrid-vs-fc_544bbc3e-e7e9-11e7-b094-c21f82b60b0b.jpg',
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   }, {
//     img: 'https://sport360.com/wp-content/uploads/2017/12/Messi-RealMadrid-Bernabeu.jpg',
//     title: 'Image',
//     author: 'author',
//     cols: 1,
//   }, {
//     img: 'https://sport360.com/wp-content/uploads/2017/12/Messi-RealMadrid-Bernabeu.jpg',
//     title: 'Image',
//     author: 'author',
//     cols: 2,
//   }, {
//     img: 'https://sport360.com/wp-content/uploads/2017/12/Messi-RealMadrid-Bernabeu.jpg',
//     title: 'Image',
//     author: 'author',
//     cols: 2,
//   },
// ];

class GameGrid extends React.Component<any, any> {
  public render(): React.ReactNode {
    // const { classes } = this.props;

    return (
      this.props.games.map(game => {
        return <Card
          title={game.date}
          // extra={<a href="#">More</a>}
          style={{ width: 100, margin: 20 }}
        >
          <p>{game.home.team}</p>
          <p>VS.</p>
          <p>{game.away.team}</p>
        </Card>
      })
    );
  }
}

// @ts-ignore
export default withStyles(styles)(GameGrid);
