
export interface Route {
    id     : string,
    horseId: string
}

export interface Image {
    Id             : string
    PathToFullImg  : string,
    PathToThumbnail: string,
    Description    : string,
    AltText        : string
}

export enum Direction {
    Left=0,
    Right,
    Unknown
}

export interface LightBoxClick {
    id: string,
    arrow: Direction
}

export enum KEY_CODE {
    RIGHT_ARROW = "ArrowRight",
    LEFT_ARROW = "ArrowLeft"
  }

  export enum Month {
      January = 1,
      February, 
      March, 
      April, 
      May, 
      June, 
      July,
      August, 
      September, 
      October, 
      November,
      December
  }