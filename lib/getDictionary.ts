import { cookies } from 'next/headers';

// 💡 魔法 1：把你的 ru.json 认作“标准模板”。
// 这样 TypeScript 就会去扫描 ru.json，自动生成类型，你以后在里面加什么字段它都能自动识别！
type Dictionary = typeof import('../dictionaries/ru.json');

const dictionaries = {
  ru: () => import('../dictionaries/ru.json').then((module) => module.default),
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  zh: () => import('../dictionaries/zh.json').then((module) => module.default),
};

// 💡 魔法 2：强制规定这个函数的返回值必须是 Promise<Dictionary>
export const getDictionary = async (): Promise<Dictionary> => {
  const cookieStore = cookies();
  const locale = cookieStore.get('NEXT_LOCALE')?.value || 'ru'; 
  
  // @ts-ignore
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries['ru']();
};