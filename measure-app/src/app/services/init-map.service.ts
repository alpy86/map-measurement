import { Injectable } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})

export class InitMapService {

  private baseLocation: Array<number> = [-11000000, 4600000];
  private zoom: number = 12;

  constructor(private locationService: LocationService) { }

  public create(): Map {
    // let raster = new TileLayer({
    //   source: new OSM()
    // });

    // let source = new VectorSource();

    // let vector = new VectorLayer({
    //   source: source,
    //   style: new Style({
    //     fill: new Fill({
    //       color: 'rgba(255, 255, 255, 0.2)'
    //     }),
    //     stroke: new Stroke({
    //       color: '#ffcc33',
    //       width: 2
    //     }),
    //     image: new CircleStyle({
    //       radius: 7,
    //       fill: new Fill({
    //         color: '#ffcc33'
    //       })
    //     })
    //   })
    // });

    // let map = new Map({
    //   layers: [raster, vector],
    //   target: 'map',
    //   view: new View({
    //     center: this.baseLocation,
    //     zoom: this.zoom
    //   })
    // });



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
