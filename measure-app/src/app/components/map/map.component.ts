import { Component, OnInit } from '@angular/core';

import Map from 'ol/Map';

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

  public onChange(eventTargetValue: string): void{
    this.measureMapService.changeType(eventTargetValue);
  }

  public clearMap(): void {
    this.measureMapService.clearAllMeasures();
  }
}
