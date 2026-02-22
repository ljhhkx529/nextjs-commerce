import { getDictionary } from 'lib/getDictionary';
export default async function BusinessHighlights() {
  const dict = await getDictionary();
  return (
    <section className="bg-white dark:bg-[#111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 左侧卡片：全球销售网络 */}
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-8 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div className="text-6xl flex-shrink-0">🌍</div>
          <div>
            <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
              {dict.businessHighlights.globalSales.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-2">
              {dict.businessHighlights.globalSales.description}
            </p>
          </div>
        </div>

        {/* 右侧卡片：支付方式 */}
        <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6 p-8 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
          <div className="text-6xl flex-shrink-0">🤝</div>
          <div className="w-full">
            <h3 className="text-2xl font-bold text-black dark:text-white mb-3">
              {dict.businessHighlights.paymentMethods.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed mb-4">
              {dict.businessHighlights.paymentMethods.description}
            </p>
            
            {/* 支付方式标签组 */}
            <div className="flex flex-wrap gap-2">
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-3 py-1.5 rounded-md text-sm font-bold tracking-wide">
                {dict.businessHighlights.paymentMethods.methods.label1}
              </span>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 px-3 py-1.5 rounded-md text-sm font-bold tracking-wide">
                {dict.businessHighlights.paymentMethods.methods.label2}
              </span>
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 px-3 py-1.5 rounded-md text-sm font-bold tracking-wide">
                {dict.businessHighlights.paymentMethods.methods.label3}
              </span>
              <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 px-3 py-1.5 rounded-md text-sm font-bold tracking-wide">
                {dict.businessHighlights.paymentMethods.methods.label4}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}