'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState, useTransition } from 'react';

const languages = [
  { code: 'ru', label: '🇷🇺' },
  { code: 'en', label: '🇬🇧' },
  { code: 'zh', label: '🇨🇳' },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  // useTransition 是 React 18 的魔法，专门用来处理像刷新页面这种“非阻塞过渡”
  const [isPending, startTransition] = useTransition();
  const [currentLang, setCurrentLang] = useState('ru');

  // 组件加载时，从浏览器读取当前选中的语言
  useEffect(() => {
    const match = document.cookie.match(/(^| )NEXT_LOCALE=([^;]+)/);
    if (match) {
      setCurrentLang(match[2]);
    }
  }, []);

  const changeLanguage = (lang: string) => {
    if (lang === currentLang) return; // 如果点的就是当前语言，什么都不做
    
    // 1. 立即更新胶囊按钮的选中状态
    setCurrentLang(lang);
    // 2. 写入 Cookie
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    
    // 3. 开始过渡动画：这会让 isPending 变成 true，直到 refresh 完成才变回 false
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <>
      {/* --- 1. 优雅的胶囊切换器 (Capsule UI) --- */}
      {/* 使用 inline-flex 和 rounded-full 打造完整的胶囊外壳 */}
      <div className="inline-flex items-center bg-gray-200/50 dark:bg-gray-800/50 p-1 rounded-full border border-gray-300 dark:border-gray-700 backdrop-blur-md">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              relative px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-300 ease-out
              ${currentLang === lang.code 
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm transform scale-105' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* --- 2. "请稍后" 优雅加载弹窗 --- */}
      {/* 只有在 isPending 为 true (正在刷新) 时才会显示 */}
      {isPending && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-[#1a1a1a] px-8 py-6 rounded-2xl shadow-2xl flex flex-col items-center gap-4 animate-pulse">
            
            {/* 优雅的旋转 Loading SVG */}
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            
            {/* 多语言加载提示语 */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                Пожалуйста, подождите...
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                切换语言中 / Changing language
              </p>
            </div>

          </div>
        </div>
      )}
    </>
  );
}