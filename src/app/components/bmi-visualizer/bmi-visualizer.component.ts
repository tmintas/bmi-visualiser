import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BMISegmentType } from 'src/app/models/bmi-segment-type.enum';
import { Pet } from '../../models/pet.model';

@Component({
  selector: 'app-bmi-visualizer',
  templateUrl: './bmi-visualizer.component.html',
  styleUrls: ['./bmi-visualizer.component.scss']
})
export class BmiVisualizerComponent implements OnChanges {
  private minBMIExcluded = 0;
  private maxBMIUnderWeight = 30;
  private maxBMINormal = 90;
  private maxBMIOverWeight = 120;

  @Input() pet: Pet;

  arrowLeftMarginCssValue: string;
  bmiSegments: BMISegment[] = [
    {
      name: BMISegmentType.Underweight,
      lowestBMIScoreExcluded: this.minBMIExcluded,
      highestBMIScoreIncluded: this.maxBMIUnderWeight,
    },
    {
      name: BMISegmentType.Normal,
      lowestBMIScoreExcluded: this.maxBMIUnderWeight,
      highestBMIScoreIncluded: this.maxBMINormal,
    },
    {
      name: BMISegmentType.Overweight,
      lowestBMIScoreExcluded: this.maxBMINormal,
      highestBMIScoreIncluded: this.maxBMIOverWeight,
    },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    const inputValue = changes['pet'].currentValue;
    if (!inputValue) {
      throw new Error('pet property is required but was not provided.');
    }
    if (!inputValue.bmiScore || !inputValue.name) {
      throw new Error('your pet either does not have name or bmiscore. Please provide one.')
    }
    if (inputValue.bmiScore < this.minBMIExcluded || inputValue.bmiScore > this.maxBMIOverWeight) {
      throw new Error(`the BMI score should be in range (${this.minBMIExcluded}, ${this.maxBMIOverWeight}]`);
    }

    // calculate arrow's left margin - use value in percents minus arrow's actual width which is 15px
    this.arrowLeftMarginCssValue = `calc(${inputValue.bmiScore * 100 / this.maxBMIOverWeight}% - 15px)`;

    this.pet = inputValue;
  }

  getBmiSegmentWidthPercents(bmiSegment: BMISegment): string {
    return `${bmiSegment.highestBMIScoreIncluded - bmiSegment.lowestBMIScoreExcluded}`;
  }
}

interface BMISegment {
  name: BMISegmentType,
  lowestBMIScoreExcluded: number,
  highestBMIScoreIncluded: number,
}

