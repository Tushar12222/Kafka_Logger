import { TestBed } from '@angular/core/testing';

import { FetchChatsService } from './fetch-chats.service';

describe('FetchChatsService', () => {
  let service: FetchChatsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
