import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Tabs } from 'antd';
import * as React from 'react';
import { Template } from '..';
import api from '../../api';
import { GameGrid, ImageGrid, NewsList, TeamHeader, TeamPlayersList } from '../../components';
import { TeamInfoAPI, TeamPhotosAPI, TeamPlayersAPI, TeamScheduleAPI } from '../../utils';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const TabPane = Tabs.TabPane;

class TeamPage extends React.Component<any, any> {
  public state: any = { players: [], info: { name: '' }, images: [], games: [] };

  public componentDidMount(): void {
    const { sport, match } = this.props;
    const { params } = match;
    const { id } = params;
    api.get(TeamPlayersAPI(sport, id)).then(response => {
      this.setState({ players: response.data })
    });
    api.get(TeamInfoAPI(sport, id)).then(response => {
      this.setState({ info: response.data })
    });
    api.get(TeamPhotosAPI(sport, id)).then(response => {
      this.setState({ images: response.data })
    });
    api.get(TeamScheduleAPI(sport, id)).then(response => {
      this.setState({ games: response.data })
    });
  }

  public render(): React.ReactNode {
    const { classes } = this.props;
    const { info, players, images } = this.state;
    return (
      <Template>
        <TeamHeader name={info.name} />
        <Tabs defaultActiveKey="1">
          <TabPane tab="Team Game Schedule" key="1">
            <Grid container justify="center">
              <GameGrid games={this.state.games} />
            </Grid>
          </TabPane>
          <TabPane tab="Team Players" key="2">
            <TeamPlayersList players={players} />
          </TabPane>
          <TabPane tab="Team News" key="3">
            <NewsList />
          </TabPane>
          <TabPane tab="Team Photos" key="4">
            <ImageGrid images={images} />
          </TabPane>
        </Tabs>
      </Template>
    )
  }
}

export default withStyles(styles)(TeamPage);
