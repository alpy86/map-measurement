import { Component, OnInit } from '@angular/core';

import measure from '../../libs/ol/ol-measure';

import View from 'ol/View';
import * as olProj from 'ol/proj';

import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements OnInit {

  private myMap: any;
  private locationUser: Array<number> = [-11000000, 4600000];
  private zoom: number = 12;

  constructor(private locationService: LocationService) { }

  public ngOnInit(): void {
    this.initMap();
    this.myMap = measure(this.locationUser, this.zoom);
  }

  private initMap() {
    const baseUrl = `https://ipinfo.io/json?token=`;
    const accessKey = 'b982ebf358550b';
    const url = baseUrl + accessKey;
    this.locationService.getLocation(url).subscribe(
      response => {
        this.locationUser = response.loc.split(',').reverse();
        this.setView();
      });
  }

  private setView() {
    this.myMap.setView(
      new View({
        center: olProj.fromLonLat(this.locationUser),
        zoom: this.zoom
      })
    );
  }
}
