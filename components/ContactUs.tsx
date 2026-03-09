import { getDictionary } from 'lib/getDictionary';
import { Instagram, MessageCircle, QrCode, Send } from 'lucide-react';
const contactMethods = [
  {
    name: 'WhatsApp',
    icon: <MessageCircle className="w-8 h-8 text-[#25D366]" />,
    value: '+8613690381436',
    link: 'https://wa.me/8613690381436', // 格式：https://wa.me/国家代码+手机号
    color: 'hover:bg-green-50',
  },
  {
    name: 'Telegram',
    icon: <Send className="w-8 h-8 text-[#0088cc]" />,
    value: 'ОлегизКитай',
    link: 'https://t.me/OnerCargo999', // 俄罗斯客户首选
    color: 'hover:bg-blue-50',
  },
  {
    name: 'Instagram',
    icon: <Instagram className="w-8 h-8 text-[#E1306C]" />,
    value: 'Менеджер по доставке в Китай🇨🇳🇷🇺',
    link: 'https://instagram.com/oner.china',
    color: 'hover:bg-pink-50',
  },
  {
    name: 'WeChat',
    icon: <QrCode className="w-8 h-8 text-[#07C160]" />,
    value: 'ID: Avto2RU',
    link: '#', // 建议点击弹出二维码图片
    color: 'hover:bg-green-50',
  },
];

export default async function ContactUs() {
    const dict = await getDictionary();
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          {dict.ContactUS.title}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {contactMethods.map((method) => (
            <a
              key={method.name}
              href={method.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md ${method.color}`}
            >
              <div className="mb-4">{method.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900">{method.name}</h3>
              <p className="text-sm text-gray-500 mt-1 text-center break-all">
                {method.value}
              </p>
            </a>
          ))}
        </div>
        
        <p className="text-center mt-8 text-gray-400 text-sm">
          {dict.ContactUS.description}
        </p>
      </div>
    </section>
  );
}