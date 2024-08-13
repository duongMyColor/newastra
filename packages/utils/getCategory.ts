function getCategory(char: string) {
  if (/\d/.test(char)) return 1;
  if (/[A-Z]/.test(char)) return 2;
  if (/[a-z]/.test(char)) return 3;
  if (/[\u3040-\u309F]/.test(char)) return 4; // Hiragana
  if (/[\u30A0-\u30FF]/.test(char)) return 5; // Katakana
  if (/[\u4E00-\u9FAF]/.test(char)) return 6; // Kanji
  if (/[\uFF10-\uFF19]/.test(char)) return 7; // Full-width numbers
  if (/[\uFF21-\uFF3A]/.test(char)) return 8; // Full-width uppercase alphabet
  if (/[\uFF41-\uFF5A]/.test(char)) return 9; // Full-width lowercase alphabet
  return 10;
}

function sortStrings(items: string[]): string[] {
  return items.sort((a, b) => {
    const categoryA = getCategory(a);
    const categoryB = getCategory(b);
    return categoryA - categoryB;
  });
}

export { getCategory, sortStrings };
