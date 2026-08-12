import React, { useState } from 'react';

const categories = [
  { id: 'connectors', name: '连接词 & 过渡词', icon: '🔗' },
  { id: 'academic', name: '学术替换词', icon: '🎓' },
  { id: 'topic', name: '话题词汇', icon: '📚' },
  { id: 'sentence', name: '高分句型', icon: '✨' },
  { id: 'opinion', name: '观点表达', icon: '💭' },
];

const vocabularyData: Record<string, { title: string; items: { phrase: string; meaning: string; example?: string; memorize?: 'must' | 'should' }[] }[]> = {
  connectors: [
    {
      title: '开头段引入',
      items: [
        { phrase: 'It is often argued that...', meaning: '人们常争论……（题型3/5开头）', example: 'It is often argued that space exploration is a waste of money.', memorize: 'must' },
        { phrase: 'There is no doubt that...', meaning: '毫无疑问……（题型4开头）', example: 'There is no doubt that technology has transformed our lives.', memorize: 'must' },
        { phrase: 'With the boom of...', meaning: '随着……的兴起', example: 'With the boom of artificial intelligence, significant attention has been drawn to...', memorize: 'must' },
        { phrase: 'In recent years,...', meaning: '近年来……（题型6开头）', example: 'In recent years, rapid urbanization has brought a series of issues...', memorize: 'must' },
        { phrase: 'People hold different views about...', meaning: '人们对……持有不同观点（题型1开头）', example: 'People hold different views about the impact of social media.', memorize: 'must' },
        { phrase: 'It is true that...', meaning: '确实……（题型5/6开头）', example: 'It is true that traditional foods are being replaced by fast food.', memorize: 'must' },
        { phrase: 'Whether or not... has sparked considerable debate.', meaning: '是否……引发了相当大的争论', example: 'Whether or not students should wear uniforms has sparked considerable debate.', memorize: 'should' },
      ]
    },
    {
      title: '主体段过渡',
      items: [
        { phrase: 'First and foremost,...', meaning: '首先，最重要的是……', example: 'First and foremost, the primary reason for my perspective lies in...', memorize: 'must' },
        { phrase: 'Secondly, another compelling reason is that...', meaning: '其次，另一个有力的原因是……', example: 'Secondly, another compelling reason is that education shapes future generations.', memorize: 'must' },
        { phrase: 'Moreover, / Furthermore, / In addition,', meaning: '此外', example: 'Moreover, this policy can reduce traffic congestion significantly.', memorize: 'must' },
        { phrase: 'On the one hand,... On the other hand,...', meaning: '一方面……另一方面……', example: 'On the one hand, technology improves efficiency. On the other hand, it reduces face-to-face interaction.', memorize: 'must' },
        { phrase: 'By contrast, / In contrast,', meaning: '相比之下', example: 'By contrast, those who exercise regularly enjoy better health.', memorize: 'should' },
        { phrase: 'However, / Nevertheless, / Nonetheless,', meaning: '然而', example: 'However, this argument overlooks the long-term benefits.', memorize: 'must' },
        { phrase: 'Admittedly,...', meaning: '诚然……（让步开头）', example: 'Admittedly, opponents of this policy would argue that...', memorize: 'must' },
        { phrase: 'To be more specific,', meaning: '更具体地说', example: 'To be more specific, this means investing in renewable energy sources.', memorize: 'should' },
        { phrase: 'For instance, / For example,', meaning: '例如', example: 'For instance, Scandinavian countries have successfully implemented this model.', memorize: 'must' },
        { phrase: 'As a result, / Consequently,', meaning: '因此', example: 'As a result, air quality has improved dramatically.', memorize: 'should' },
      ]
    },
    {
      title: '结尾段收束',
      items: [
        { phrase: 'In conclusion, I firmly believe that...', meaning: '总之，我坚信……', example: 'In conclusion, I firmly believe that education is the key to social mobility.', memorize: 'must' },
        { phrase: 'I still maintain the view that...', meaning: '我仍然坚持认为……', example: 'I still maintain the view that prevention is better than cure.', memorize: 'must' },
        { phrase: 'Although..., I still strongly maintain that...', meaning: '尽管……，我仍然强烈认为……', example: 'Although technology has drawbacks, I still strongly maintain that its benefits outweigh the negatives.', memorize: 'must' },
        { phrase: '...creates a win-win situation for both...', meaning: '……为双方都创造了双赢局面', example: 'This creates a win-win situation for both employers and employees.', memorize: 'should' },
        { phrase: 'Over time, this can lead to...', meaning: '随着时间的推移，这可以导致……', example: 'Over time, this can lead to a more sustainable future.', memorize: 'should' },
      ]
    }
  ],
  academic: [
    {
      title: '常用动词替换',
      items: [
        { phrase: 'think → maintain / argue / contend / hold the view that', meaning: '认为（更学术）', example: 'I maintain that this policy is necessary.', memorize: 'must' },
        { phrase: 'say → claim / assert / state / suggest', meaning: '说（更正式）', example: 'Critics claim that this approach is ineffective.', memorize: 'should' },
        { phrase: 'show → demonstrate / illustrate / indicate / reveal', meaning: '表明', example: 'The data demonstrates a clear correlation.', memorize: 'should' },
        { phrase: 'get → obtain / acquire / receive / gain', meaning: '获得', example: 'Students can obtain practical skills through internships.', memorize: 'should' },
        { phrase: 'make → create / produce / generate / construct', meaning: '制造/创造', example: 'The factory produces environmentally friendly products.', memorize: 'should' },
        { phrase: 'help → assist / aid / facilitate / enable', meaning: '帮助', example: 'Technology can facilitate learning in remote areas.', memorize: 'should' },
        { phrase: 'use → utilize / employ / apply / adopt', meaning: '使用', example: 'Many companies have adopted flexible working hours.', memorize: 'should' },
        { phrase: 'keep → maintain / preserve / retain / sustain', meaning: '保持', example: 'It is important to maintain a healthy work-life balance.', memorize: 'should' },
        { phrase: 'increase → rise / grow / expand / escalate / surge', meaning: '增加', example: 'The population has surged in the past decade.', memorize: 'must' },
        { phrase: 'decrease → fall / decline / drop / diminish / dwindle', meaning: '减少', example: 'Traditional crafts have dwindled in popularity.', memorize: 'must' },
      ]
    },
    {
      title: '形容词升级',
      items: [
        { phrase: 'good → beneficial / advantageous / favorable / positive', meaning: '好的', example: 'Regular exercise is highly beneficial.', memorize: 'should' },
        { phrase: 'bad → detrimental / harmful / adverse / negative', meaning: '坏的', example: 'Pollution has adverse effects on health.', memorize: 'should' },
        { phrase: 'big → substantial / considerable / significant / immense', meaning: '大的', example: 'There has been a substantial improvement.', memorize: 'should' },
        { phrase: 'small → marginal / minimal / negligible / minor', meaning: '小的', example: 'The difference is negligible.', memorize: 'should' },
        { phrase: 'important → crucial / vital / essential / imperative', meaning: '重要的', example: 'Education is crucial for national development.', memorize: 'must' },
        { phrase: 'many → numerous / a multitude of / a wide range of / various', meaning: '许多', example: 'Numerous studies support this conclusion.', memorize: 'should' },
        { phrase: 'some → certain / particular / specific / a proportion of', meaning: '一些', example: 'Certain groups are more vulnerable.', memorize: 'should' },
      ]
    }
  ],
  topic: [
    {
      title: '教育 Education',
      items: [
        { phrase: 'academic performance / achievement', meaning: '学业表现/成就' },
        { phrase: 'curriculum / syllabus', meaning: '课程' },
        { phrase: 'extracurricular activities', meaning: '课外活动' },
        { phrase: 'rote learning', meaning: '死记硬背' },
        { phrase: 'critical thinking', meaning: '批判性思维' },
        { phrase: 'holistic development', meaning: '全面发展' },
        { phrase: 'tuition fees', meaning: '学费' },
        { phrase: 'student loan debt', meaning: '学生贷款债务' },
        { phrase: 'gap year', meaning: '间隔年' },
        { phrase: 'vocational training', meaning: '职业培训' },
      ]
    },
    {
      title: '科技 Technology',
      items: [
        { phrase: 'artificial intelligence (AI)', meaning: '人工智能' },
        { phrase: 'automation', meaning: '自动化' },
        { phrase: 'digital literacy', meaning: '数字素养' },
        { phrase: 'cybersecurity', meaning: '网络安全' },
        { phrase: 'remote working / telecommuting', meaning: '远程办公' },
        { phrase: 'social media platforms', meaning: '社交媒体平台' },
        { phrase: 'data privacy', meaning: '数据隐私' },
        { phrase: 'technological advancement', meaning: '技术进步' },
        { phrase: 'screen addiction', meaning: '屏幕成瘾' },
        { phrase: 'digital divide', meaning: '数字鸿沟' },
      ]
    },
    {
      title: '环境 Environment',
      items: [
        { phrase: 'carbon emissions', meaning: '碳排放' },
        { phrase: 'renewable energy', meaning: '可再生能源' },
        { phrase: 'sustainable development', meaning: '可持续发展' },
        { phrase: 'deforestation', meaning: '森林砍伐' },
        { phrase: 'biodiversity loss', meaning: '生物多样性丧失' },
        { phrase: 'climate change', meaning: '气候变化' },
        { phrase: 'greenhouse effect', meaning: '温室效应' },
        { phrase: 'environmental degradation', meaning: '环境退化' },
        { phrase: 'eco-friendly / environmentally friendly', meaning: '环保的' },
        { phrase: 'carbon footprint', meaning: '碳足迹' },
      ]
    },
    {
      title: '健康 Health',
      items: [
        { phrase: 'sedentary lifestyle', meaning: '久坐不动的生活方式' },
        { phrase: 'physical well-being', meaning: '身体健康' },
        { phrase: 'mental health', meaning: '心理健康' },
        { phrase: 'work-life balance', meaning: '工作生活平衡' },
        { phrase: 'preventive healthcare', meaning: '预防性医疗' },
        { phrase: 'obesity epidemic', meaning: '肥胖流行病' },
        { phrase: 'nutritional value', meaning: '营养价值' },
        { phrase: 'healthcare system', meaning: '医疗体系' },
        { phrase: 'public health', meaning: '公共卫生' },
        { phrase: 'stress-related illness', meaning: '压力相关疾病' },
      ]
    },
    {
      title: '城市/交通 Urban & Transport',
      items: [
        { phrase: 'urbanization', meaning: '城市化' },
        { phrase: 'traffic congestion', meaning: '交通拥堵' },
        { phrase: 'public transportation', meaning: '公共交通' },
        { phrase: 'infrastructure', meaning: '基础设施' },
        { phrase: 'housing affordability', meaning: '住房可负担性' },
        { phrase: 'population density', meaning: '人口密度' },
        { phrase: 'green spaces', meaning: '绿地' },
        { phrase: 'commuting time', meaning: '通勤时间' },
        { phrase: 'urban sprawl', meaning: '城市扩张' },
        { phrase: 'smart city', meaning: '智慧城市' },
      ]
    }
  ],
  sentence: [
    {
      title: '万能开头句式',
      items: [
        { phrase: 'It is undeniable that...', meaning: '不可否认的是……', example: 'It is undeniable that technology has reshaped modern education.', memorize: 'must' },
        { phrase: 'There is a growing concern that...', meaning: '人们越来越担心……', example: 'There is a growing concern that social media affects mental health.', memorize: 'should' },
        { phrase: 'The issue of... has been widely debated.', meaning: '……的问题已被广泛争论', example: 'The issue of animal testing has been widely debated.', memorize: 'should' },
        { phrase: 'In an era of..., ...', meaning: '在……的时代，……', example: 'In an era of rapid technological change, adaptability is essential.', memorize: 'should' },
      ]
    },
    {
      title: '主体段加分句式',
      items: [
        { phrase: 'This is largely because...', meaning: '这主要是因为……', example: 'This is largely because education equips people with critical skills.', memorize: 'must' },
        { phrase: 'This can be attributed to the fact that...', meaning: '这可以归因于……', example: 'This can be attributed to the fact that governments have invested heavily.', memorize: 'should' },
        { phrase: 'The root cause of... lies in...', meaning: '……的根本原因在于……', example: 'The root cause of this problem lies in poor urban planning.', memorize: 'should' },
        { phrase: 'One of the main contributing factors is...', meaning: '主要 contributing factors 之一是……', example: 'One of the main contributing factors is the lack of public awareness.', memorize: 'should' },
        { phrase: 'This phenomenon can be explained by...', meaning: '这个现象可以用……来解释', example: 'This phenomenon can be explained by the rise of remote working.', memorize: 'should' },
        { phrase: 'The underlying reason is that...', meaning: '根本原因是……', example: 'The underlying reason is that younger generations prioritize flexibility.', memorize: 'should' },
      ]
    },
    {
      title: '举例论证句式',
      items: [
        { phrase: 'A case in point is...', meaning: '一个恰当的例子是……', example: 'A case in point is the Scandinavian education model.', memorize: 'should' },
        { phrase: 'Take... as an example.', meaning: '以……为例', example: 'Take Finland as an example, where education is free for all.', memorize: 'must' },
        { phrase: 'This is evident in..., where...', meaning: '这在……中很明显，在那里……', example: 'This is evident in Singapore, where bilingual education is mandatory.', memorize: 'should' },
        { phrase: 'According to a recent study by..., ...', meaning: '根据……最近的一项研究，……', example: 'According to a recent study by the WHO, physical inactivity is a leading risk factor.', memorize: 'should' },
      ]
    },
    {
      title: '让步反驳句式',
      items: [
        { phrase: 'While it is true that..., I believe that...', meaning: '虽然确实……，但我认为……', example: 'While it is true that online learning offers flexibility, I believe that face-to-face interaction is irreplaceable.', memorize: 'must' },
        { phrase: 'Despite the fact that..., ...', meaning: '尽管……，……', example: 'Despite the fact that technology has drawbacks, its benefits are undeniable.', memorize: 'must' },
        { phrase: 'Although... may seem..., in reality...', meaning: '虽然……看起来……，但实际上……', example: 'Although banning cars may seem extreme, in reality it is necessary for clean air.', memorize: 'should' },
        { phrase: 'This argument overlooks the fact that...', meaning: '这个观点忽略了……的事实', example: 'This argument overlooks the fact that prevention is more cost-effective than treatment.', memorize: 'must' },
      ]
    },
    {
      title: '结尾升华句式',
      items: [
        { phrase: 'Only by... can we...', meaning: '只有通过……我们才能……', example: 'Only by investing in education can we ensure a prosperous future.', memorize: 'should' },
        { phrase: 'It is imperative that...', meaning: '……是 imperative', example: 'It is imperative that governments take immediate action.', memorize: 'should' },
        { phrase: 'The future of... depends on...', meaning: '……的未来取决于……', example: 'The future of our planet depends on sustainable practices.', memorize: 'should' },
        { phrase: '...is not merely desirable but essential.', meaning: '……不仅是可取的，而且是必不可少的', example: 'Reducing carbon emissions is not merely desirable but essential.', memorize: 'should' },
      ]
    }
  ],
  opinion: [
    {
      title: '表达同意',
      items: [
        { phrase: 'I am in complete agreement with...', meaning: '我完全同意……' },
        { phrase: 'I am strongly inclined to support...', meaning: '我强烈倾向于支持……' },
        { phrase: 'I wholeheartedly endorse...', meaning: '我全心全意支持……' },
        { phrase: 'I am firmly convinced that...', meaning: '我坚信……' },
        { phrase: 'I find myself in full agreement with...', meaning: '我完全同意……' },
      ]
    },
    {
      title: '表达不同意',
      items: [
        { phrase: 'I am strongly opposed to...', meaning: '我强烈反对……' },
        { phrase: 'I find it difficult to agree with...', meaning: '我难以同意……' },
        { phrase: 'I am not convinced that...', meaning: '我不相信……' },
        { phrase: 'I tend to disagree with...', meaning: '我倾向于不同意……' },
        { phrase: 'This perspective fails to account for...', meaning: '这个观点没有考虑到……' },
      ]
    },
    {
      title: '表达部分同意',
      items: [
        { phrase: 'I am partially in agreement with...', meaning: '我部分同意……' },
        { phrase: 'To a certain extent, I agree that...', meaning: '在某种程度上，我同意……' },
        { phrase: 'While I acknowledge that..., I also believe that...', meaning: '虽然我承认……，但我也相信……' },
        { phrase: 'This is a complex issue with merits on both sides.', meaning: '这是一个复杂的问题，双方都有道理。' },
      ]
    }
  ]
};

const VocabularySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('connectors');
  const data = vocabularyData[activeCategory];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-amber-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">高分表达 · 词汇 & 句型</h1>
          <p className="text-amber-100/80 max-w-2xl">
            按功能分类整理的高分词汇、句型和同义替换。背熟这些表达，让你的作文从6分跃升到7分。
          </p>
        </div>
      </div>

      {/* Category Selector */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === c.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        {data.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 bg-amber-100 text-amber-700 rounded-lg flex items-center justify-center text-sm">
                {groupIndex + 1}
              </span>
              {group.title}
            </h3>
            <div className="space-y-3">
              {group.items.map((item, i) => (
                <div key={i} className="template-card hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-serif font-semibold text-slate-900">{item.phrase}</span>
                          {item.memorize === 'must' && (
                            <span className="memorize-must text-xs">必背</span>
                          )}
                          {item.memorize === 'should' && (
                            <span className="memorize-should text-xs">应背</span>
                          )}
                        </div>
                        <p className="text-slate-500 text-sm mt-1">{item.meaning}</p>
                        {item.example && (
                          <p className="text-slate-600 text-sm mt-2 italic font-serif bg-slate-50 rounded-lg p-2">
                            "{item.example}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VocabularySection;
