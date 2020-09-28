
export const ROUTES = {
  LOGIN          : '/login'          ,
  SIGNUP         : '/signup'         ,
  DASHBOARD      : '/dashboard'      ,
  DASHBOARD_ADMIN: '/dashboard_admin',
};

/** Routes under `ROUTES.DASHBOARD` for user */
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

/** Routes under `ROUTES.DASHBOARD_ADMIN` */
export const ROUTES_HOME_ADMIN = {
  PROFILE     : `${ROUTES.DASHBOARD_ADMIN}/Profile`     ,
  HOME        : `${ROUTES.DASHBOARD_ADMIN}/Home`        ,
  USERS       : `${ROUTES.DASHBOARD_ADMIN}/Users`       ,
  JOBS        : `${ROUTES.DASHBOARD_ADMIN}/Jobs`        ,
  FILE_MANAGER: `${ROUTES.DASHBOARD_ADMIN}/File-Manager`,
  SETTINGS    : `${ROUTES.DASHBOARD_ADMIN}/Settings`    ,
};