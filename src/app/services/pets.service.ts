import { Injectable } from '@angular/core';
import { Pet } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {
  getAll(): Pet[] {
    return [
      {
        name: 'Nash',
        bmiScore: 20.99,
      },
      {
        name: 'Lucky',
        bmiScore: 45.23,
      },
      {
        name: 'Fluffy',
        bmiScore: 90.44,
      },
      {
        name: 'Happy',
        bmiScore: 110,
      },
    ]
  }
}
