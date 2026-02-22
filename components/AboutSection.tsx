import { getDictionary } from 'lib/getDictionary';
import Image from 'next/image';
// 这里统一管理团队成员数据，以后修改只需改这里

export default async function AboutSection() {
    const dict = await getDictionary();
  return (
    // 修改1：增加上下内边距 (py-24)，使用非常淡的背景色区分区块，增加高级感
    <section className="py-24 bg-slate-50 dark:bg-[#111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* 左侧：视觉形象图 (新增) */}
          {/* 💡 重点：请在 public/images 下放一张高质量的工厂或产品图，命名为 about-image.jpg */}
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              // 这里先用一个占位图，请替换成您的真实图片路径，例如 '/images/about-factory.jpg'
              src="/images/2.jpg"
              alt="Marine Equipment Factory and Logistics"
              fill
              priority
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
            // 增加一个半透明遮罩层，让图片更有质感
            <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply"></div>
          </div>

          {/* 右侧：内容区域 */}
          <div>
            
            {/* 修改2：增加一个小标题 (Eyebrow text) */}
            <div className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase mb-4 text-sm">
              {dict.about.eyebrow}
            </div>

            {/* 修改3：大标题使用渐变色，更具现代科技感 */}
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-800 to-cyan-600 dark:from-blue-400 dark:to-cyan-300">
              {dict.about.title}
            </h2>
            
            {/* 简介文本，增加行高和字号 */}
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              {dict.about.description}
            </p>

            {/* 修改4：核心优势列表，使用专业 SVG 图标替代 Emoji */}
            <div className="space-y-6 mt-12">
              
              {/* 优势 1：供应链 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  {/* Factory SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5h.75m-.75 3h.75m-.75 3h.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">{dict.about.advantages[0]?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{dict.about.advantages[0]?.description}</p>
                </div>
              </div>

              {/* 优势 2：沟通 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  {/* Chat/Language SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">{dict.about.advantages[1]?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{dict.about.advantages[1]?.description}</p>
                </div>
              </div>

               {/* 优势 3：物流 */}
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-4">
                  {/* Ship/Logistics SVG Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-16.5-4.5h15m-15 0v3.75m15-3.75v3.75m-15-3.75l-1.5-6h18l-1.5 6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">{dict.about.advantages[2]?.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{dict.about.advantages[2]?.description}</p>
                </div>
              </div>

            </div>

             {/* 修改5：引言部分做成一个明显的引用块 */}
            <blockquote className="mt-12 p-6 border-l-4 border-blue-600 bg-blue-50 dark:bg-blue-900/20 rounded-r-xl italic text-gray-700 dark:text-gray-300">
              {dict.about.quote}
            </blockquote>

          </div>
        </div>
      </div>
    </section>
  );
}