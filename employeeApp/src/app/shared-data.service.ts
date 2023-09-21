  // shared-data.service.ts
  import { Injectable } from '@angular/core';

  @Injectable({
    providedIn: 'root',
  })
  export class SharedDataService {
    private firstId: number | null = null;
    // token: string;
    // private token: string | null = null;

    setFirstId(id: number | null) {
      this.firstId = id;
    }

    getFirstId() {
      return this.firstId;
    }

    private token: string | null = null;

    setToken(token: string): void {
      this.token = token; // Store the token internally
    }

    getToken(): string | null {
      return this.token; // Retrieve the stored token
    }
  }
