function getCategory(char: string) {
  if (/\d/.test(char)) return 1;
  if (/[A-Z]/.test(char)) return 2;
  if (/[a-z]/.test(char)) return 3;
  if (/[\u3040-\u309F]/.test(char)) return 4;
  if (/[\u30A0-\u30FF]/.test(char)) return 5;
  if (/[\u4E00-\u9FAF]/.test(char)) return 6;
  if (/[\uFF10-\uFF19]/.test(char)) return 7;
  if (/[\uFF21-\uFF3A]/.test(char)) return 8;
  if (/[\uFF41-\uFF5A]/.test(char)) return 9;
  return 10;
}

function sortStrings(items: string[], orderBy: string): string[] {
  return items.sort((a, b) => {
    const categoryA = getCategory(a);
    const categoryB = getCategory(b);
    if (categoryA !== categoryB) {
      return orderBy === 'ASC' ? categoryA - categoryB : categoryB - categoryA;
    }
    return orderBy === 'ASC' ? a.localeCompare(b) : b.localeCompare(a);
  });
}

export { getCategory, sortStrings };
