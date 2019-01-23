export enum API {
  NEWS_DETAILS = 'news/detail/',

  LATEST_NEWS = 'news/latest/',

  LATEST_NEWS_BASKETBALL = 'news/latest/basketball/',
  LATEST_NEWS_SOCCER = 'news/latest/soccer/',

  RELATED_NEWS_PLAYER = 'sport/player/related_news/',

  RELATED_NEWS_SOCCER_TEAM = 'sport/team/soccer/related_news/',
  RELATED_NEWS_BASKETBALL_TEAM = 'sport/team/basketball/related_news/',

}

export const PlayerInfoAPI = (sport: string, id: number) => `sport/player/${sport}/info/${id}/`;

export const PlayerNewsAPI = (id: number) => `${API.RELATED_NEWS_PLAYER}${id}/`;


