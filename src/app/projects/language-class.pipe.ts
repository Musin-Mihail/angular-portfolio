import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe для преобразования названия языка программирования в соответствующий
 * CSS-класс Tailwind для стилизации.
 */
@Pipe({
  name: 'languageClass',
  standalone: true,
})
export class LanguageClassPipe implements PipeTransform {
  private readonly languageColorMap: Record<string, string> = {
    typescript: 'bg-blue-900/50 text-blue-300',
    javascript: 'bg-yellow-900/50 text-yellow-300',
    html: 'bg-orange-900/50 text-orange-300',
    scss: 'bg-pink-900/50 text-pink-300',
    css: 'bg-indigo-900/50 text-indigo-300',
    python: 'bg-green-900/50 text-green-300',
    shell: 'bg-gray-600/50 text-gray-200',
  };
  private readonly defaultColor = 'bg-gray-700/50 text-gray-300';
  transform(language: string | null | undefined): string {
    if (!language) {
      return this.defaultColor;
    }
    const langKey = language.toLowerCase();
    return this.languageColorMap[langKey] || this.defaultColor;
  }
}
