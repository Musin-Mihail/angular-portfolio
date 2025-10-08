import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { By } from '@angular/platform-browser';
import { LabProjectionComponent } from './lab-projection.component';
import { CardComponent } from '../../shared/ui/card/card.component';

describe('LabProjectionComponent', () => {
  let fixture: ComponentFixture<LabProjectionComponent>;
  let component: LabProjectionComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabProjectionComponent, CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabProjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should project content into the first simple card', () => {
    const firstCard = fixture.debugElement.queryAll(By.directive(CardComponent))[0];

    const title = firstCard.query(By.css('[card-title]')).nativeElement;
    expect(title.textContent.trim()).toBe('Простая карточка');

    const body = firstCard.query(By.css('[card-body] p')).nativeElement;
    expect(body.textContent).toContain('Это базовый пример использования.');

    const footer = firstCard.query(By.css('footer')).nativeElement;
    expect(footer.textContent.trim()).toBe('');
  });

  it('should project content with an image and a footer into the second card', () => {
    const secondCard = fixture.debugElement.queryAll(By.directive(CardComponent))[1];

    const title = secondCard.query(By.css('[card-title]')).nativeElement;
    expect(title.textContent.trim()).toBe('Карточка с изображением');

    const image = secondCard.query(By.css('[card-body] img')).nativeElement;
    expect(image.getAttribute('alt')).toBe('Angular Logo');

    const footerButton = secondCard.query(By.css('[card-footer] button')).nativeElement;
    expect(footerButton.textContent.trim()).toBe('Подробнее');
  });

  it('should correctly project the third card without a footer', () => {
    const thirdCard = fixture.debugElement.queryAll(By.directive(CardComponent))[2];

    const title = thirdCard.query(By.css('[card-title]')).nativeElement;
    expect(title.textContent.trim()).toBe('Карточка без футера');

    const body = thirdCard.query(By.css('[card-body] p')).nativeElement;
    expect(body.textContent).toContain('слоты являются опциональными');

    const footer = thirdCard.query(By.css('footer')).nativeElement;
    expect(footer.textContent.trim()).toBe('');
  });
});
