import { DebugElement, SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PetsListComponent } from '../pets-list/pets-list.component';
import { Pet } from '../../models/pet.model';
import { BmiVisualizerComponent } from './bmi-visualizer.component';
import { BMISegmentType } from 'src/app/models/bmi-segment-type.enum';

describe('BmiVisualizerComponent', () => {
  let SUT: BmiVisualizerComponent;
  let fixture: ComponentFixture<BmiVisualizerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BmiVisualizerComponent, PetsListComponent ]
    })
    .compileComponents();
  });

  it('should throw an error indicating the input pet value was not provided if it was null', () => {
    // arrange
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;

    // assert
    expect(() =>
      SUT.ngOnChanges({ pet: new SimpleChange(null, null, true) })).toThrow(new Error('pet property is required but was not provided.')
    );
  });


  it('should throw an error indicating that the pet has incorrect data if no pet\'s bmiScore was present', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 0 } as Pet;
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;

    // assert
    expect(() =>
      SUT.ngOnChanges({ pet: new SimpleChange(null, pet, true) })).toThrow(new Error('your pet either does not have name or bmiscore. Please provide one.')
    );
  });

  it('should throw an error indicating that the pet has incorrect data if no pet\'s name was present', () => {
    // arrange
    const pet: Pet = { name: '', bmiScore: 22 } as Pet;
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;

    // assert
    expect(() =>
      SUT.ngOnChanges({ pet: new SimpleChange(null, pet, true) })).toThrow(new Error('your pet either does not have name or bmiscore. Please provide one.')
    );
  });

  it('should throw an error with correct bmi range description if the pet\'s bmi is negative', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: -1 } as Pet;
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;

    // assert
    expect(() => SUT.ngOnChanges({ pet: new SimpleChange(null, pet, true) })).toThrow(new Error('the BMI score should be in range (0, 120]'));
  });

  it('should throw an error with correct bmi range description if the pet\'s bmi is larger than 120', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 199 } as Pet;
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;

    // assert
    expect(() => SUT.ngOnChanges({ pet: new SimpleChange(null, pet, true) })).toThrow(new Error('the BMI score should be in range (0, 120]'));
  });

  it('should mark the underweight segment as active if the pet has bmi lower than 30', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 20 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Underweight)).toHaveClass('active');
  });

  it('should mark the underweight segment as active if the pet has bmi equal 30', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 30 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Underweight)).toHaveClass('active');
  });

  it('should mark the normal segment as active if the pet has bmi greater than 30 and lower than 90', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 40 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Normal)).toHaveClass('active');
  });

  it('should mark the normal segment as active if the pet has bmi equal to 90', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 90 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Normal)).toHaveClass('active');
  });

  it('should mark the overweight segment as active if the pet has bmi greater than 90 and lower than 120', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 100 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Overweight)).toHaveClass('active');
  });

  it('should mark the overweight segment as active if the pet has bmi equal to 120', () => {
    // arrange
    const pet: Pet = { name: 'test', bmiScore: 120 } as Pet;
    arrange(pet);

    // assert
    expect(getBmiBarSegmentNativeElementOfType(BMISegmentType.Overweight)).toHaveClass('active');
  });

  function arrange(inputPet: Pet) {
    fixture = TestBed.createComponent(BmiVisualizerComponent);
    SUT = fixture.componentInstance;
    SUT.ngOnChanges({ pet: new SimpleChange(null, inputPet, true) });
    fixture.detectChanges();
  }

  function getBmiBarSegmentNativeElementOfType(segmentType: BMISegmentType): any {
    const segments = fixture.debugElement.queryAll(By.css('.bar-segment'));
    let segmentDe: DebugElement;

    switch (segmentType) {
      case BMISegmentType.Underweight:
        segmentDe = segments[0];
        break;
      case BMISegmentType.Normal:
        segmentDe = segments[1];
        break;
      case BMISegmentType.Overweight:
        segmentDe = segments[2];
        break;
    }

    return segmentDe.nativeElement;
  }
});
