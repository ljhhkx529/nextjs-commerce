import { getDictionary } from 'lib/getDictionary';
import { Instagram, MessageCircle, QrCode, Send } from 'lucide-react';

const contactMethods = [
  {
    name: 'WhatsApp',
    icon: <MessageCircle className="w-8 h-8 text-[#25D366]" />,
    value: '+8613690381436',
    link: 'https://wa.me/8613690381436',
    // 悬停时稍微亮一点
    color: 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
  },
  {
    name: 'Telegram',
    icon: <Send className="w-8 h-8 text-[#0088cc]" />,
    value: 'ОлегизКитай',
    link: 'https://t.me/OnerCargo999',
    color: 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8 text-[#E1306C]" />,
    value: 'oner.china', 
    link: 'https://instagram.com/oner.china',
    color: 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
  },
  {
    name: 'WeChat',
    icon: <QrCode className="w-8 h-8 text-[#07C160]" />,
    value: 'ID: Avto2RU',
    link: '#',
    color: 'hover:bg-neutral-100 dark:hover:bg-neutral-800/50',
  },
];

export default async function ContactUs() {
  const dict = await getDictionary();
  
  return (
    // 使用与 Footer 相同的背景逻辑
    <section className="py-12 bg-white dark:bg-black transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        {/* 标题文字颜色适配 */}
        <h2 className="text-3xl font-bold text-center mb-10 text-neutral-900 dark:text-neutral-100">
          {dict.ContactUS.title}
        </h2>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-8 rounded-xl border transition-all duration-300
                /* 浅色模式：白底 + 淡灰边框 */
                bg-white border-neutral-200 text-neutral-900
                /* 暗色模式：深灰底 + 灰黑边框 */
                dark:bg-neutral-900 dark:border-neutral-800 dark:text-neutral-100
                ${method.color}`}
            >
              <div className="mb-4 transform transition-transform hover:scale-110 duration-300">
                {method.icon}
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight">
                {method.name}
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2 text-center break-all font-medium">
                {method.value}
              </p>
            </a>
          ))}
        </div>
        
        {/* 底部描述文字 */}
        <p className="text-center mt-10 text-neutral-400 dark:text-neutral-500 text-sm">
          {dict.ContactUS.description}
        </p>
      </div>
    </section>
  );
}