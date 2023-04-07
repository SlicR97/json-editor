export const isAlpha = (c: string): boolean => {
  return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c === '_'
}
