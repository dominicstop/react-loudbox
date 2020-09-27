
export const ROUTES = {
  LOGIN    : '/login'    ,
  SIGNUP   : '/signup'   ,
  DASHBOARD: '/dashboard',
};

/** Routes under `ROUTES.DASHBOARD` */
export const ROUTES_HOME = {
  PROFILE     : `${ROUTES.DASHBOARD}/profile`     ,
  HOME        : `${ROUTES.DASHBOARD}/home`        ,
  GROUPS      : `${ROUTES.DASHBOARD}/groups`      ,
  JOBS        : `${ROUTES.DASHBOARD}/jobs`        ,
  BIDS        : `${ROUTES.DASHBOARD}/bids`        ,
  FILE_MANAGER: `${ROUTES.DASHBOARD}/file-manager`,
  CALENDAR    : `${ROUTES.DASHBOARD}/calendar`    ,
  SETTINGS    : `${ROUTES.DASHBOARD}/settings`    ,
};