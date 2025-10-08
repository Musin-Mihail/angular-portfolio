import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { LabPipesComponent } from './lab-pipes.component';
import { PurePipe } from '../../shared/pipes/pure.pipe';
import { ImpurePipe } from '../../shared/pipes/impure.pipe';

describe('LabPipesComponent', () => {
  let component: LabPipesComponent;
  let fixture: ComponentFixture<LabPipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabPipesComponent, PurePipe, ImpurePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(LabPipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pureItems with default values', () => {
    expect(component.pureItems()).toEqual(['Элемент A', 'Элемент B']);
    const initialJson = JSON.parse(component.pureJson());
    expect(initialJson).toEqual(['Элемент A', 'Элемент B']);
  });

  it('replacePureArray should update pureItems signal with a new array', () => {
    component.replacePureArray();
    expect(component.pureItems()).toEqual(['Элемент C', 'Элемент D']);
    const newJson = JSON.parse(component.pureJson());
    expect(newJson).toEqual(['Элемент C', 'Элемент D']);
  });

  it('mutatePureArray should change the underlying array but not the signal reference', () => {
    const initialSignalValue = component.pureItems();

    component.mutatePureArray();

    expect(component.pureItems()).toBe(initialSignalValue);

    const mutatedJson = JSON.parse(component.pureJson());
    expect(mutatedJson).toEqual(['Элемент A', 'Элемент B', 'Новый элемент (мутация)']);
  });

  it('mutateImpureArray should add a new item to the impureItems signal', () => {
    const initialCount = component.impureItems().length;

    component.mutateImpureArray();

    const newItems = component.impureItems();
    expect(newItems.length).toBe(initialCount + 1);
    expect(newItems[newItems.length - 1]).toBe('Новый элемент (мутация)');
  });
});
