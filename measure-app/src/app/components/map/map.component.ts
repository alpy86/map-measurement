import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import * as olProj from 'ol/proj';
import { Vector as VectorSource } from 'ol/source';

import { LocationService } from 'src/app/services/location.service';
import { InitMapService } from 'src/app/services/init-map.service';
import { MeasureMapService } from 'src/app/services/measure-map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  private map: Map;
  private sourceMap: VectorSource;
  private baseLocation: Array<number> = [-11000000, 4600000];
  private zoom: number = 12;

  constructor(
    private initMapService: InitMapService,
    private locationService: LocationService,
    private measureMapService: MeasureMapService,
  ) { }

  public ngOnInit(): void {
    [this.map, this.sourceMap] = this.initMapService.create(this.map, this.baseLocation, this.zoom);
    this.measureMapService.initTools(this.map, this.sourceMap);
    this.centeringMap();
  }

  private centeringMap(): void {
    this.locationService.getLocation().subscribe(
      response => {
        this.setCenterMap(response.loc);
      });
  }

  private setCenterMap(loc: string): void {
    const arrLoc: Array<string> = loc.split(',').reverse();
    this.map.setView(
      new View({
        center: olProj.fromLonLat(arrLoc),
        zoom: this.zoom
      })
    );
  }
}
