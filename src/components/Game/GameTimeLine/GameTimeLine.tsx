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
  timeLineItemEntry: {
    margin: '5px',
  }
});


// TODO: find icon for 'AT' and 'PY'
let iconsDictionary = {
  'Red Card': <Icon name="meanpath" color="red" />,
  'Yellow Card': <Icon name="meanpath" color="yellow" />,
  'Substitution in': <Icon name="arrow up" color="green" />,
  'Substitution out': <Icon name="arrow down" color="red" />,
  'Goal': <Icon name="soccer" />,
  'Assist': '',
  'Penalty': '',
};

function eventTimeParser(eventTime: string) {
  return parseFloat(`${eventTime.substring(0, 2)}.${eventTime.substring(3, 5)}`);
}

function compare(a, b) {
  if (eventTimeParser(a.eventTime) > eventTimeParser(b.eventTime))
    return -1;
  if (eventTimeParser(a.eventTime) < eventTimeParser(b.eventTime))
    return 1;
  return 0;
}

class GameTimeLine extends Component<any, any> {

  public state = {
    events: [
      {
        eventType: '',
        eventTime: '',
        eventIcon: null,
      },
    ],
  };


  public componentDidMount(): void {
    const { GameId, GameType } = this.props;

    if (GameType === 'soccer') {
      axios.get(`${API.SOCCER_GAME_EVENTS}${GameId}/`).then(response => {
        let eventList: any = [];
        for (let i = 0; i < response.data.length; i++) {
          eventList.push({

            eventType: response.data[i].event_type,

            eventTime: response.data[i].event_time,

            eventIcon: iconsDictionary[response.data[i].event_type]
          });
        }
        this.setState((prevState) => ({
            events: eventList.sort(compare)
          })
        );

      });
    } else if (GameType === 'basketball') {
      axios.get(`${API.BASKETBALL_GAME_EVENTS}${GameId}/`).then(response => {
        this.setState({ events: response.data });
      });
    }

  }

  public render(): React.ReactNode {
    const { classes } = this.props;
    const { events } = this.state;
    return (
      <Timeline className={classes.root} mode="alternate">
        {
          events.map((e) => {
            return (
              <Timeline.Item dot={e.eventTime.substring(0, 5)} >
                <div className={classes.timeLineItemEntry}>
                  {e.eventIcon} {e.eventType}
                </div>
              </Timeline.Item>
            )
          })
        }
      </Timeline>
    );
  }

}

export default withStyles(styles)(GameTimeLine);
