import { TestBed } from '@angular/core/testing';

import { GenrichttpService } from './genericHttpService.service';

describe('GenrichttpService', () => {
  let service: GenrichttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenrichttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
