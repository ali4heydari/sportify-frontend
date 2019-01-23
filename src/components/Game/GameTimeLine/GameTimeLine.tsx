import withStyles from '@material-ui/core/es/styles/withStyles';
import Timeline from 'antd/es/timeline/Timeline';
import * as React from 'react';
import { Component } from 'react';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon';
import axios from '../../../api';
import { API } from '../../../utils';


const styles = theme => ({
  root: {
    marginTop: '50px',
  },
});


// TODO: find icon for 'AT' and 'PY'
let iconesDictanary = [
  { 'Red Card': <Icon name="meanpath" color="red" /> },
  { 'Yellow Card': <Icon name="meanpath" color="yellow" /> },
  { 'Substitution in': <Icon name="arrow up" color="green" /> },
  { 'Substitution out': <Icon name="arrow down" color="red" /> },
  { 'Goal': <Icon name="soccer" /> },
  { 'Assist': '' },
  { 'Penalty': '' },
];

function compare(a, b) {
  if (a.eventTime < b.eventTime)
    return -1;
  if (a.eventTime > b.eventTime)
    return 1;
  return 0;
}

class GameTimeLine extends Component<any, any> {
  public states = {
    events: [],
  };


  public componentDidMount(): void {
    const { GameId, GameType } = this.props;

    if (GameType === 'soccer') {
      axios.get(`${API.SOCCER_GAME_EVENTS}${GameId}`).then(response => {
        this.setState(prevState => {
          let eventList: any = [];
          for (let i = 0; i < response.data.length; i++) {
            eventList.push({
              eventType: response.data[i].event_type,
              eventTime: response.data[i].event_time,
              eventIcon: iconesDictanary[response.data[i].event_type]
            });
          }
          eventList.sort(compare);

          return ({
            events: eventList
          });

        });
      });
    } else if (GameType === 'basketball') {
      axios.get(`${API.BASKETBALL_GAME_EVENTS}${GameId}`).then(response => {
        this.setState({ events: response.data });
      });
    }

  }

  public render(): React.ReactNode {
    const { classes } = this.props;
    return (
      <Timeline className={classes.root} mode="alternate">
        <Timeline.Item dot={<Icon name="circle notch" loading />}>
          Last data refresh
          for {(new Date()).getHours() + ':' + (new Date()).getMinutes() + "'"}
        </Timeline.Item>
        <Timeline.Item dot="85'">
          <Icon name="meanpath" color="red" />
          cristiano ronaldo
        </Timeline.Item>
        <Timeline.Item dot="79'">
          <Icon name="font awesome flag" />
          Corner for real madrid
        </Timeline.Item>
        <Timeline.Item dot={"71'"}>
          <Icon name="flag checkered" />
          Offside
        </Timeline.Item>
        <Timeline.Item dot={"69'"}>
          <Icon name="soccer" />
          Lionel Messi
        </Timeline.Item>
        <Timeline.Item dot={"45'"}>
          <Icon name="arrow up" color="green" />
          Lionel Messsi
          <br />
          <Icon name="arrow down" color="red" />
          Neimaar
        </Timeline.Item>
        <Timeline.Item dot={"37'"}>
          <Icon name="soccer" />
          cristiano ronaldo
        </Timeline.Item>
        <Timeline.Item dot={"23'"}>
          <Icon name="meanpath" color="yellow" />
          cristiano ronaldo
        </Timeline.Item>
        <Timeline.Item dot={<Icon name="clock outline" style={{ fontSize: '16px' }} />}>
          Game Started
          2015-09-01
        </Timeline.Item>
      </Timeline>
    );
  }

}

export default withStyles(styles)(GameTimeLine);
