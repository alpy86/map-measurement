import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})

export class InitMapService {
  private baseLocation: Array<number> = [-11000000, 4600000];
  private zoom: number = 12;

  constructor(private locationService: LocationService) { }

  public create(): Map {
    let map = new Map({
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      target: 'map',
      view: new View({
        center: this.baseLocation,
        zoom: this.zoom
      })
    });

    this.centeringMap(map);

    return map;
  }

  private centeringMap(map: Map): void {
    this.locationService.getLocation().subscribe(
      response => {
        this.setCenterMap(map, response.loc);
      });
  }

  private setCenterMap(map: Map, loc: string): void {
    const arrLoc: Array<string> = loc.split(',').reverse();
    map.setView(
      new View({
        center: olProj.fromLonLat(arrLoc),
        zoom: this.zoom
      })
    );
  }
}
