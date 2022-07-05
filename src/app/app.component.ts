import { Component, OnInit } from '@angular/core';
import { Pet } from './models/pet.model';
import { PetsService } from './services/pets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  pets: Pet[];
  selectedPet: Pet;

  constructor(private petsService: PetsService) { }

  ngOnInit(): void {
    this.pets = this.petsService.getAll();
  }
}
