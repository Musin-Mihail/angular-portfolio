import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'languageClass',
  standalone: true,
})
export class LanguageClassPipe implements PipeTransform {
  transform(language: string | null | undefined): string {
    const lang = (language || 'default').toLowerCase();
    switch (lang) {
      case 'typescript':
        return 'bg-blue-900/50 text-blue-300';
      case 'javascript':
        return 'bg-yellow-900/50 text-yellow-300';
      case 'html':
        return 'bg-orange-900/50 text-orange-300';
      case 'scss':
      case 'css':
        return 'bg-pink-900/50 text-pink-300';
      default:
        return 'bg-gray-700/50 text-gray-300';
    }
  }
}
