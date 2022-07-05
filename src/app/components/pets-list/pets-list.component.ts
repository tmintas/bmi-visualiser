import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pet } from 'src/app/models/pet.model';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent {

  @Input() pets: Pet[];

  @Output() petSelected = new EventEmitter<Pet>();

  constructor() { }

  onPetSelect(pet: Pet): void {
    this.petSelected.next(pet);
  }
}
