export enum DeviceType {
  Awning = "Awning",
  Louver = "Louver",
  HeatBench = "HeatBench",
  LedLights = "LedLights",
  LedLight = "LedLight",
  SmartGlass = "SmartGlass",
  SmartGlassVideo = "SmartGlassVideo",
  SmartGlassGame = "SmartGlassGame",
  SmartGlassMusic = "SmartGlassMusic",
  SmartFilm = "SmartFilm",
  DustAlert = "DustAlert",
  DustLight = "DustLight",
  CoolingCurtain = "CoolingCurtain",
  CoolingFog = "CoolingFog",
  AirConditioner = "AirConditioner",
  AirPurifier = "AirPurifier",
  SmartLight = "SmartLight",
  SmartAirSensor = "SmartAirSensor",
  SmartAirCurtain = "SmartAirCurtain",
  SmartGreenWall = "SmartGreenWall",
  SmartDID = "SmartDID",
  SmartMoniter = "SmartMoniter",
  SystemControl = "SystemControl",
}

export enum SensorType {
  Motion = "Motion",
  Door = "Door",
  RainAwning = "RainAwning",
  RainLouver = "RainLouver",
}

export enum DeviceOperatingMode {
  //Manual = 'manual',
  //Smart = 'smart',
  Auto = "auto",
  Custom = "custom",
}

export enum DeviceSettingCategory {
  OperatingTime = "operating_time",
  OperatingDate = "operating_date",
  Temperature = "temperature",
  Snow = "snow",
  Rain = "rain",
  WindVelocity = "wind_velocity",
}

export enum DeviceSmartGlassMode {
  Video = "video",
  Game = "game",
  Music = "music",
  Multi = "Multi",
}

export enum DevicePlayMode {
  Random = "random",
  Pick = "pick",
  PickRandom = "pickRandom",
  // NoneName = 'noneName',
  // PickName = 'pickName',
}
