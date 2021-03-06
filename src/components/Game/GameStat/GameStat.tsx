import withStyles from '@material-ui/core/styles/withStyles';
import { Table } from 'antd';
import * as React from 'react';
import { Component } from 'react';
import axios from '../../../api';
import { GameStatisticsAPI, Sports } from '../../../utils';

const styles = theme => ({});


// @ts-ignore
class GameStat extends Component<any, any> {
  public state = {
    columnsProperties: {},
    columns: [{
      title: '',
      dataIndex: 'home',
      align: 'center',
    }, {
      dataIndex: 'team_stat',
      align: 'center',
    }, {
      title: '',
      dataIndex: 'away',
      align: 'center',
    }],
    statisticsData: [],
  };

  public componentDidMount(): void {
    const { gameId, sport } = this.props;
    if (sport === Sports.SOCCER) {
      axios.get(GameStatisticsAPI(sport, gameId)).then(response => {

        this.setState(prevState => {
          const new_columns = prevState.columns;
          new_columns[0].title = response.data.home.team.name;
          new_columns[2].title = response.data.away.team.name;

          const statisticsItems = [
            ['possession', 'Possession'],
            ['shots_on_target', 'Shots (On target)'],
            ['fouls_offside', 'Fouls (Offside)'],
            ['corner_kicks', 'Corner Kicks'],
            ['passes', 'Passes'],
            ['crosses', 'Crosses'],
            ['interceptions', 'Interceptions'],
            ['tackles', 'Tackles'],
            ['saves', 'Saves'],
          ];

          const statisticsDataArray: any = [];
          for (let i = 0; i < statisticsItems.length; i++) {
            statisticsDataArray.push({
              key: i,
              home: response.data.home[statisticsItems[i][0]],
              team_stat: statisticsItems[i][1],
              away: response.data.away[statisticsItems[i][0]],
            })
          }

          return ({
            columnsProperties: response.data,
            columns: new_columns,
            statisticsData: statisticsDataArray,
          });
        });
      });

    } else if (sport === Sports.BASKETBALL) {
      axios.get(GameStatisticsAPI(sport, gameId)).then(response => {

        this.setState(prevState => {
          const new_columns = prevState.columns;
          new_columns[0].title = response.data.home.team.name;
          new_columns[2].title = response.data.away.team.name;

          const statisticsItems = [
            ['twos', 'Twos'],
            ['threes', 'Threes'],
            ['fouls', 'Fouls'],
            ['free_throws', 'Free throws'],
            ['points', 'Points'],
            ['first_quarter_points', 'First quarter points'],
            ['second_quarter_points', 'Second quarter points'],
            ['third_quarter_points', 'Third quarter points'],
            ['fourth_quarter_points', 'Fourth quarter points'],
          ];

          const statisticsDataArray: any = [];
          for (let i = 0; i < statisticsItems.length; i++) {
            statisticsDataArray.push({
              key: i,
              home: response.data.home[statisticsItems[i][0]],
              team_stat: statisticsItems[i][1],
              away: response.data.away[statisticsItems[i][0]],
            })
          }

          return ({
            columnsProperties: response.data,
            columns: new_columns,
            statisticsData: statisticsDataArray,
          });
        });
      });
    }

  }

  public render(): React.ReactNode {
    const { classes } = this.props;
    const { columns, statisticsData } = this.state;
    return (
      // @ts-ignore
      <Table dataSource={statisticsData} columns={columns} pagination={false}
             rowClassName={(record, index) => (index % 2 ? 'even' : 'odd')} />
    )
  }
}

export default withStyles(styles)(GameStat);
