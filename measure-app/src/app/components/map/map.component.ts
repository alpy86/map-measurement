import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';
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
  public isToolsLoaded: boolean = false;
  private map: Map;

  constructor(
    private initMapService: InitMapService,
    private measureMapService: MeasureMapService,
  ) { }

  public ngOnInit(): void {
    this.map = this.initMapService.create();
    this.measureMapService.initTools(this.map);
    this.isToolsLoaded = this.measureMapService.isLoaded();
  }
}
