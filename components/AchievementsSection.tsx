// import Image from 'next/image';
import { getDictionary } from 'lib/getDictionary';
const achievementImages = [
  { id: 1, src: '/images/achievements/1.jpg', alt: 'Commercial Invoice Draft' },
  { id: 2, src: '/images/achievements/2.jpg', alt: 'Client Feedback Chat' },
  { id: 3, src: '/images/achievements/3.jpg', alt: 'Shipping Documents' },
  { id: 4, src: '/images/achievements/4.jpg', alt: 'Order Confirmation Chat' },
];

// 【魔法机制】：如果图片太少（比如只有4张），在宽屏电脑上滚动会断层。
// 我们在这里把数组自动复制一份拼接起来，保证传送带永远是满的。
const duplicatedImages = [...achievementImages, ...achievementImages];

export default async function AchievementsSection() {
    const dict = await getDictionary();
  return (
    <section className="bg-gray-50 dark:bg-[#1a1a1a] py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white leading-tight">
          {dict.achievementstitle.title}  
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mt-4 max-w-2xl mx-auto">
          {dict.achievementstitle.description}
        </p>
      </div>

      {/* 1. 去掉了 justify-center，让跑马灯回归正常的从左到右衔接。
         2. maskImage 保留：通过左右两端的渐变透明，实现“视觉上的绝对居中”。
      */}
      <div 
        className="group flex overflow-hidden w-full relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        
        {/* 第一组无限滚动轨道 */}
        {/* 注意这里的 pr-8 (padding-right)，它是保证两组轨道首尾相连时不出缝隙的关键 */}
        <div className="flex shrink-0 animate-carousel group-hover:[animation-play-state:paused] gap-8 pr-8">
          {duplicatedImages.map((item, index) => (
            <AchievementItem key={`set1-${item.id}-${index}`} item={item} />
          ))}
        </div>

        {/* 第二组无限滚动轨道 (用于无缝替补) */}
        <div 
          className="flex shrink-0 animate-carousel group-hover:[animation-play-state:paused] gap-8 pr-8" 
          aria-hidden="true"
        >
          {duplicatedImages.map((item, index) => (
            <AchievementItem key={`set2-${item.id}-${index}`} item={item} />
          ))}
        </div>
        
      </div>
    </section>
  );
}

// 单个图片项组件 (纯净截图版)
function AchievementItem({ item }: { item: { src: string; alt: string } }) {
  return (
    // 修改点：
    // 1. 保留 w-[280px] h-[580px] 的手机尺寸比例。
    // 2. 去掉了黑色的 border 和模拟的刘海。
    // 3. 改用 rounded-2xl 变成普通的好看的圆角截图，加上柔和的阴影。
    <div className="relative shrink-0 w-[280px] h-[600px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-black transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 cursor-pointer">
        <img
            src={item.src}
            alt={item.alt}
            // object-cover 会让你的手机截图完美填满这个框，不会变形
            className="h-full w-full object-cover" 
        />
    </div>
  );
}