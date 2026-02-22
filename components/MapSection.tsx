'use client'; 
import { useState } from 'react';

// 移除了会导致崩溃的 async
export default function MapSection({ dict }: { dict: any }) {
  // 建议直接存储选中的 ID，而不是整个对象，这样对比更稳定
  const [activeId, setActiveId] = useState(dict.locations[0].id);

  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h2 className="text-black dark:text-white text-3xl md:text-4xl font-bold mb-4">
            {dict.businesstitle.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            {dict.businesstitle.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* 左侧：互动地址列表 */}
          <div className="space-y-4 lg:col-span-1">
            {dict.locations.map((loc: any) => (
              // ⚠️ 必须使用 button type="button" 杜绝浏览器的表单提交跳转行为
              <button 
                key={loc.id}
                type="button"
                onClick={(e) => {
                    e.preventDefault(); 
                    setActiveId(loc.id); // 只更新 ID
                }}
                className={`w-full text-left cursor-pointer p-6 rounded-lg border-2 transition-all duration-300 ${
                  activeId === loc.id 
                    ? 'border-[#cc3333] bg-white dark:bg-[#222] shadow-lg transform scale-105' 
                    : 'border-transparent bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#333]'
                }`}
              >
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-3xl">{loc.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-black dark:text-white">{loc.city}</h3>
                    <p className="text-sm text-[#cc3333] font-semibold">{loc.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-2">
                  {loc.desc}
                </p>
              </button>
            ))}
          </div>

          {/* 右侧：动态谷歌地图 iframe */}
          {/* ⚠️ 加上 relative，让地图能够叠加在一起 */}
          <div className="lg:col-span-2 relative h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow-2xl border-4 border-white dark:border-[#222] bg-gray-200 dark:bg-gray-800">
            
            {/* ⚠️ 把字典里所有的地图都渲染出来，利用透明度淡入淡出，彻底告别页面乱跳 */}
            {dict.locations.map((loc: any) => (
              <iframe
                key={loc.id}
                title={`Google Map - ${loc.city}`}
                className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out ${
                  activeId === loc.id 
                    ? 'opacity-100 z-10' 
                    : 'opacity-0 z-0 pointer-events-none'
                }`}
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                // 修复了标准的 Google Maps 嵌入 URL (加上了 https 和 ?q=${})
                src={`https://maps.google.com/maps?q=${encodeURIComponent(loc.query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
              ></iframe>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
}