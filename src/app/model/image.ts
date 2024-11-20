import {Color} from './color';

export interface Image{
  id : number;
  color :Color;
  image : string;
  isThumbnail :boolean;
}
