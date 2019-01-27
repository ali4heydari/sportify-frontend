import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import {Tabs} from 'antd';
import * as React from 'react';
import {Template} from '..';
import {GameGrid, ImageGrid, NewsList, TeamHeader, TeamPlayersList} from '../../components';
import axios from "../../api";
import {API} from "../../utils";

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
});

const TabPane = Tabs.TabPane;

class TeamPage extends React.Component<any, any> {
  public state: any = {players: [], info: {name: ''}, images: [], games: []};

  public componentDidMount(): void {
    const {params} = this.props.match;
    const {sport} = this.props;
    const {id} = params;
    axios.get(`${API.TEAM_PLAYERS}${sport}/${id}`).then(response => {
      this.setState({players: response.data})
    });
    axios.get(`${API.TEAM_INFO}${sport}/${id}`).then(response => {
      this.setState({info: response.data})
    });
    axios.get(`${API.TEAM_PHOTO}${sport}/${id}`).then(response => {
      this.setState({images: response.data})
    });
    axios.get(`${API.TEAM_SCHEDULE}${sport}/${id}`).then(response => {
      this.setState({games: response.data})
    });
  }

  public render(): React.ReactNode {
    const {classes} = this.props;
    return (
      <Template>
        <TeamHeader name={this.state.info.name}/>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Team Game Schedule" key="1">
            <Grid container justify="center">
              <GameGrid games={this.state.games}/>
            </Grid>
          </TabPane>
          <TabPane tab="Team Players" key="2">
            <TeamPlayersList players={this.state.players}/>
          </TabPane>
          <TabPane tab="Team News" key="3">
            <NewsList/>
          </TabPane>
          <TabPane tab="Team Photos" key="4">
            <ImageGrid images={this.state.images}/>
          </TabPane>
        </Tabs>
      </Template>
    )
  }
}

export default withStyles(styles)(TeamPage);
