// shared-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private firstId: number | null = null;

  setFirstId(id: number | null) {
    this.firstId = id;
  }

  getFirstId() {
    return this.firstId;
  }
}
