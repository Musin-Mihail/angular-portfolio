import { Pipe, PipeTransform } from '@angular/core';

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
    css: 'bg-pink-900/50 text-pink-300',
  };
  private readonly defaultColor = 'bg-gray-700/50 text-gray-300';
  transform(language: string | null | undefined): string {
    const lang = (language || '').toLowerCase();
    return this.languageColorMap[lang] || this.defaultColor;
  }
}
