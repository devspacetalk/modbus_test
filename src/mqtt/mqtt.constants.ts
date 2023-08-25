export const jwtConstants = {
  secret: "secretKey",
};

export const MQTT_SERVICE = "MQTT_SERVICE";

export enum Constants {
  DISCONNECT = "disconnect",
  SYSTEM = "system",
  USER_REQUEST = "user_request",
  WRONG_STATUS = "wrong_status",
}

export const PLUG_USAGE_REPORTING_SECONDS =
  process.env.NODE_ENV == "production" ? 60 : 10;
