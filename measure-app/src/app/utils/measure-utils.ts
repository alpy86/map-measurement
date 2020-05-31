import { getArea, getLength } from 'ol/sphere';
import { LineString, Polygon } from 'ol/geom';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MeasureUtils {
  public static formatLength(line: LineString): string {
    const length = getLength(line);
    let output: string;
    if (length > 100) {
      output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
    } else {
      output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
    }
    return output;
  };

  public static formatArea(polygon: Polygon): string {
    const area = getArea(polygon);
    let output: string;
    if (area > 10000) {
      output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
    } else {
      output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
    }
    return output;
  };
}
