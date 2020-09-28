
export const ROUTES = {
  LOGIN          : '/login'          ,
  SIGNUP         : '/signup'         ,
  DASHBOARD      : '/dashboard'      ,
  DASHBOARD_ADMIN: '/dashboard_admin',
};

/** Routes under `ROUTES.DASHBOARD` for user */
export const ROUTES_DASHBOARD = {
  PROFILE     : `${ROUTES.DASHBOARD}/profile`     ,
  HOME        : `${ROUTES.DASHBOARD}/home`        ,
  GROUPS      : `${ROUTES.DASHBOARD}/groups`      ,
  JOBS        : `${ROUTES.DASHBOARD}/jobs`        ,
  BIDS        : `${ROUTES.DASHBOARD}/bids`        ,
  FILE_MANAGER: `${ROUTES.DASHBOARD}/file-manager`,
  CALENDAR    : `${ROUTES.DASHBOARD}/calendar`    ,
  SETTINGS    : `${ROUTES.DASHBOARD}/settings`    ,
};

/** Routes under `ROUTES.DASHBOARD_ADMIN` */
export const ROUTES_DASHBOARD_ADMIN = {
  PROFILE     : `${ROUTES.DASHBOARD_ADMIN}/profile`     ,
  HOME        : `${ROUTES.DASHBOARD_ADMIN}/home`        ,
  USERS       : `${ROUTES.DASHBOARD_ADMIN}/users`       ,
  JOBS        : `${ROUTES.DASHBOARD_ADMIN}/jobs`        ,
  FILE_MANAGER: `${ROUTES.DASHBOARD_ADMIN}/file-manager`,
  SETTINGS    : `${ROUTES.DASHBOARD_ADMIN}/settings`    ,
};