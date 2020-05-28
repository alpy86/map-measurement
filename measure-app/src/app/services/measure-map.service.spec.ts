import { TestBed } from '@angular/core/testing';

import { MeasureMapService } from './measure-map.service';

describe('MeasureMapService', () => {
  let service: MeasureMapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MeasureMapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
