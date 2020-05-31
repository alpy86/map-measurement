import { Injectable } from '@angular/core';

import Draw from 'ol/interaction/Draw';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { LineString, Polygon } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { unByKey } from 'ol/Observable';

import { MeasureUtils } from '../utils/measure-utils';

interface Listener {
  listener(evt: any): void;
  target: LineString;
  type: string;
}

@Injectable({
  providedIn: 'root'
})

export class MeasureMapService {
  private isToolsLoaded: boolean = false;

  private draw: Draw;
  private helpTooltipElement: HTMLElement;
  private helpTooltip: Overlay;
  private measureTooltipElement: HTMLElement;
  private measureTooltip: Overlay;
  private listener: Listener;
  private map: Map;
  private sketch: Feature;
  private source: VectorSource;

  constructor() { }

  public isLoaded(): boolean {
    return this.isToolsLoaded;
  }

  public initTools(map: Map): void {
    this.map = map;

    this.source = new VectorSource();

    let vector: VectorLayer = new VectorLayer({
      source: this.source,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });

    map.addLayer(vector);

    map.on('pointermove', this.pointerMoveHandler.bind(this));
    map.getViewport().addEventListener('mouseout', () => {
      this.helpTooltipElement.classList.add('hidden');
    });

    let typeSelect: HTMLElement = document.getElementById('type');

    typeSelect.onchange = () => {
      this.map.removeInteraction(this.draw);
      this.addInteraction(typeSelect);
    };

    this.addInteraction(typeSelect);
  }

  private addInteraction(typeSelect: HTMLElement): void {
    const type = ((<any>typeSelect).value == 'area' ? 'Polygon' : 'LineString');

    this.draw = new Draw({
      source: this.source,
      type: type,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rgba(0, 0, 0, 0.5)',
          lineDash: [10, 10],
          width: 2
        }),
        image: new CircleStyle({
          radius: 5,
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.7)'
          }),
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          })
        })
      })
    });

    this.map.addInteraction(this.draw);

    this.createHelpTooltip();
    this.createMeasureTooltip();

    this.draw.on('drawstart', this.drawStart.bind(this));
    this.draw.on('drawend', this.drawEnd.bind(this));

    this.isToolsLoaded = true;
  }

  private createHelpTooltip(): void {
    if (this.helpTooltipElement) {
      this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
    }
    this.helpTooltipElement = document.createElement('div');
    this.helpTooltipElement.className = 'ol-tooltip hidden';
    this.helpTooltip = new Overlay({
      element: this.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    });
    this.map.addOverlay(this.helpTooltip);
  }

  private createMeasureTooltip(): void {
    if (this.measureTooltipElement) {
      this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
    }
    this.measureTooltipElement = document.createElement('div');
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
    this.measureTooltip = new Overlay({
      element: this.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center'
    });
    this.map.addOverlay(this.measureTooltip);
  }

  private drawStart(evt: any): void {
    this.sketch = evt.feature;
    let tooltipCoord = evt.coordinate;

    this.listener = this.sketch.getGeometry().on('change', (evt: any) => {
      const geom = evt.target;
      let output: string;
      if (geom instanceof Polygon) {
        output = MeasureUtils.formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof LineString) {
        output = MeasureUtils.formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      this.measureTooltipElement.innerHTML = output;
      this.measureTooltip.setPosition(tooltipCoord);
    });
  }

  private drawEnd(): void {
    this.measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    this.measureTooltip.setOffset([0, -7]);
    this.sketch = null;
    this.measureTooltipElement = null;
    this.createMeasureTooltip();
    unByKey(this.listener);
  };

  private pointerMoveHandler = function(evt: any): void {
    if (evt.dragging) {
      return;
    }
    const continuePolygonMsg: string = 'Click to continue drawing the polygon';
    const continueLineMsg: string = 'Click to continue drawing the line';
    let helpMsg: string = 'Click to start drawing';

    if (this.sketch) {
      const geom = this.sketch.getGeometry();
      if (geom instanceof Polygon) {
        helpMsg = continuePolygonMsg;
      } else if (geom instanceof LineString) {
        helpMsg = continueLineMsg;
      }
    }
    this.helpTooltipElement.innerHTML = helpMsg;

    this.helpTooltip.setPosition(evt.coordinate);

    this.helpTooltipElement.classList.remove('hidden');
  };
}
