// src/utils/isMainOption.ts
// 메인옵션 판별

export function isMainOption(sentence: string): boolean {
  const MAIN_OPTION_REGEX = /^(힘|민첩|지능|체력|치명|특화|제압|신속|인내)\s*\+?[0-9,.]+/;
  return MAIN_OPTION_REGEX.test(sentence);
}
