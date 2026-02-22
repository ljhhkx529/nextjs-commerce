
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8 text-black dark:text-white">
      {/* 顶部大标题 */}
      <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-center">
        Powering Your Maritime Journey with Reliable Marine Solutions.
      </h1>

      <div className="space-y-12 text-lg leading-relaxed">
        {/* 公司简介 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p>
            Located in Guangdong, the heart of China’s premium manufacturing hub, we specialize in exporting high-performance marine equipment and outboard motors. We understand that in the marine industry, reliability is not just a requirement—it’s a lifeline. That’s why we focus on delivering top-tier mechanical products that perform exceptionally in the most demanding aquatic environments.
          </p>
        </section>

        {/* 核心优势 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Why Partner with Us?</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Direct Supply Chain Access:</strong> Rooted in the industrial center of Southern China, we bridge the gap between world-class manufacturing and global buyers, ensuring highly competitive pricing and authentic products.
            </li>
            <li>
              <strong>Seamless Communication:</strong> Business knows no borders. We offer robust multilingual support, including fluent Russian and English, ensuring precise understanding of your technical specifications, trade terms, and logistics requirements.
            </li>
            <li>
              <strong>End-to-End Export Service:</strong> From the factory floor to the destination port, we handle the complexities of international trade, freight forwarding, and customs documentation, delivering peace of mind along with your cargo.
            </li>
          </ul>
        </section>

        {/* 创始人寄语 */}
        <section className="bg-gray-50 dark:bg-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold mb-3 italic">Built on Discipline, Driven by Excellence</h2>
          <p className="text-base">
            Behind every successful international transaction is a team that values hard work, continuous learning, and absolute integrity. We believe that a clean, disciplined approach to business—free from distractions and focused entirely on client success—is what builds long-lasting partnerships. When you work with us, you are not just getting a supplier; you are gaining a dedicated partner committed to mutual growth.
          </p>
        </section>

        {/* 底部引导 */}
        <div className="text-center pt-8">
          <p className="text-xl font-bold mb-6">Ready to Equip Your Fleet?</p>
          <a 
            href="/contact" 
            className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded hover:bg-blue-700 transition-colors"
          >
            Contact Us Today
          </a>
        </div>
      </div>
    </div>
  );
}