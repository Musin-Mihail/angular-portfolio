import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Card3dDirective } from '../../shared/directives/card-3d.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CustomCheckboxComponent } from '../../shared/ui/custom-checkbox/custom-checkbox.component';
import { ToggleSwitchComponent } from '../../shared/ui/toggle-switch/toggle-switch.component';

interface UiElementShowcase {
  id: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [
    Card3dDirective,
    ParallaxDirective,
    ToggleSwitchComponent,
    CustomCheckboxComponent,
    ButtonComponent,
  ],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent {
  public isToggled = signal(false);
  public isCustomCheckboxChecked = signal(false);

  public readonly uiShowcases: UiElementShowcase[] = [
    {
      id: 'toggle',
      title: 'Анимированный переключатель (Toggle Switch)',
      description:
        'Стильный анимированный переключатель, созданный только с использованием CSS для анимации состояний. Это демонстрирует работу с псевдоэлементами и transitions.',
    },
    {
      id: 'buttons',
      title: 'Интерактивные кнопки с микроанимациями',
      description:
        'Несколько кнопок с разными эффектами при наведении и нажатии, демонстрирующие возможности CSS для создания динамичного пользовательского интерфейса.',
    },
    {
      id: 'checkbox',
      title: 'Стилизованный кастомный чекбокс',
      description:
        'Демонстрация стилизации стандартного чекбокса. Стандартный input скрыт, а вместо него отображается кастомный элемент с SVG-иконкой.',
    },
    {
      id: 'parallax',
      title: 'Элемент с Parallax-эффектом',
      description:
        'Прокрутите страницу, чтобы увидеть, как фоновое изображение движется медленнее, чем основной контент, создавая эффект глубины.',
    },
    {
      id: '3d-card',
      title: 'Карточка с 3D-эффектом при наведении',
      description:
        'Карточка, которая слегка поворачивается в сторону движения курсора, создавая псевдо-3D эффект.',
    },
    {
      id: 'tooltip',
      title: 'Кастомный Tooltip (Доступная версия)',
      description:
        'Подсказка, созданная с помощью CSS и ARIA-атрибутов для доступности скринридерам.',
    },
  ];
}
