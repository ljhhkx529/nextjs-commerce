

import { getDictionary } from 'lib/getDictionary';
// 这里统一管理团队成员数据，以后修改只需改这里

export default async function TeamSection() {
    const dict = await getDictionary();
  return (
    // 使用深色背景色匹配你的截图
    <section className="bg-[#111111] py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* 大标题 */}
        <h2 className="text-white text-4xl md:text-5xl font-normal text-center mb-16">
          {dict.team.title}
        </h2>
        
        {/* 成员网格：手机端1列，平板2列，电脑端3列 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {dict.teamMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center">
              
              {/* 圆形头像 */}
              <div className="w-48 h-48 mb-6 rounded-full overflow-hidden bg-gray-800">
                <img 
                  src={member.imageUrl} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* 红色姓名牌 */}
              <div className="bg-[#cc3333] text-[#111] font-semibold text-lg px-8 py-2 rounded-sm mb-4 w-64 shadow-md">
                {member.name}
              </div>
              
              {/* 职位描述 */}
              <p className="text-[#999999] text-base w-60 leading-relaxed">
                {member.role}
              </p>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}