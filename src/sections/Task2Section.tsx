import React, { useState } from 'react';

interface Template {
  type: string;
  topic: string;
  intro: string;
  introNote: string;
  introMemorize: 'must' | 'should' | 'optional';
  body1: string;
  body1Note: string;
  body1Memorize: 'must' | 'should' | 'optional';
  body2: string;
  body2Note: string;
  body2Memorize: 'must' | 'should' | 'optional';
  conclusion: string;
  conclusionNote: string;
  conclusionMemorize: 'must' | 'should' | 'optional';
  example: {
    question: string;
    intro: string;
    body1: string;
    body2: string;
    conclusion: string;
  };
}

const taskTypes = [
  { id: 'type1', name: '题型1 · 双边讨论', color: 'bg-blue-500', desc: 'Discuss both views and give your opinion' },
  { id: 'type2', name: '题型2 · 同意与否', color: 'bg-emerald-500', desc: 'Do you agree or disagree?' },
  { id: 'type3', name: '题型3 · 同意程度', color: 'bg-amber-500', desc: 'To what extent do you agree or disagree?' },
  { id: 'type4', name: '题型4 · 利弊类', color: 'bg-purple-500', desc: 'Do the advantages outweigh the disadvantages?' },
  { id: 'type5', name: '题型5 · 正反利弊', color: 'bg-rose-500', desc: 'Is this a positive or negative development?' },
  { id: 'type6', name: '题型6 · 问题措施', color: 'bg-cyan-500', desc: 'Problems / Dangers + Solutions' },
];

const templates: Record<string, Template> = {
  type1: {
    type: '双边讨论',
    topic: '通用',
    intro: 'People hold different views about [话题/技术名称及其影响]. Some argue that [反方观点改述], while others believe that [正方观点改述]. This essay will discuss both perspectives and present my opinion that [自己的立场].',
    introNote: '注意：题型1必须①讨论双方观点+②亮明自己立场，缺一不可。',
    introMemorize: 'must',
    body1: 'On the one hand, opponents of [技术/观点] would argue that [反方担忧]. They believe that [反方论据]. This perspective is undoubtedly reasonable to some extent. However, this argument overlooks [反驳角度]. In reality, studies show that [事实依据], which means [结论].',
    body1Note: '技巧：先承认反方合理性，再用 "However, this argument overlooks..." 进行反驳，体现批判性思维。',
    body1Memorize: 'should',
    body2: 'On the other hand, no one can deny that [正方核心优势]. For example, [具体举例1]. Furthermore, [具体举例2]. In contrast, those who [反向情况] will significantly [负面后果].',
    body2Note: '技巧：用 "no one can deny that" 强调正方观点的不可辩驳性，举例后用 "In contrast" 做反面论证。',
    body2Memorize: 'should',
    conclusion: 'In conclusion, although [让步——承认潜在问题], I still maintain the view that [最终立场——点题].',
    conclusionNote: '技巧：用 "although... I still maintain the view that..." 让步转折结构既亮明立场又显示全面思考。',
    conclusionMemorize: 'must',
    example: {
      question: 'Some people think that the best way to reduce crime is to give longer prison sentences. Others believe there are better alternatives. Discuss both views and give your opinion.',
      intro: 'People hold different views about how to effectively reduce crime rates in society. Some argue that extending prison sentences is the most effective deterrent, while others believe that rehabilitation and community-based programs offer better solutions. This essay will discuss both perspectives and present my opinion that a combination of longer sentences for serious crimes and rehabilitation for minor offenders is the most balanced approach.',
      body1: 'On the one hand, opponents of longer prison sentences would argue that this approach fails to address the root causes of criminal behavior. They believe that simply locking people up for extended periods does not equip them with the skills needed to reintegrate into society. This perspective is undoubtedly reasonable to some extent, as research has shown that many prisoners reoffend upon release. However, this argument overlooks the fact that longer sentences serve as a powerful deterrent for potential criminals. In reality, studies show that countries with stricter sentencing guidelines often experience lower crime rates, which means that punishment does play a crucial role in maintaining social order.',
      body2: 'On the other hand, no one can deny that rehabilitation programs offer significant advantages over pure incarceration. For example, educational and vocational training within prisons can equip offenders with marketable skills, significantly reducing their likelihood of returning to crime. Furthermore, community service and restorative justice programs allow offenders to make amends while remaining connected to their families and communities. In contrast, those who are subjected to excessively long sentences without any support often become institutionalized and find it extremely difficult to adapt to normal life upon release.',
      conclusion: 'In conclusion, although longer prison sentences may not be the perfect solution for every offender, I still maintain the view that they are necessary for serious crimes while rehabilitation should be prioritized for less dangerous individuals.',
    }
  },
  type2: {
    type: '同意与否（不带程度）',
    topic: '工作/生活',
    intro: 'With [宏观背景——如 the rapid pace of technological development and rising work-related stress], whether or not [题目核心问题改写] has sparked considerable debate. From my perspective, I totally agree with this view, as [预告两个核心理由].',
    introNote: '技巧：①不需要程度副词——直接 "totally agree" / "completely disagree"；② "With + [背景], whether or not + [题目改写] has sparked considerable debate" 是题型2 首段背景引入固化模板；③ "From my perspective, I totally agree with this view, as + [理由预告]" 是题型2 立场表态固化句。',
    introMemorize: 'must',
    body1: 'First and foremost, the primary reason for my perspective lies in [论点 1]. [现象描述], which may cause [严重后果], especially in [高风险行业]. By contrast, [正面情形], which allows them to better maintain [积极价值]. For instance, [具体场景举例], making them more likely to [积极结果].',
    body1Note: '技巧：① "the primary reason for my perspective lies in + [论点名词短语]" 主题句 — "lies in + 名词短语" 比 "is that + 从句" 更地道；② "By contrast, ... which allows them to..." 用对比+定语从句一句话覆盖两面。',
    body1Memorize: 'must',
    body2: 'Secondly, another compelling reason is that [论点 2], particularly in [特定领域]. To be more specific, [机制阐述] and thus enable them to [行业价值]. Additionally, take [国家/地区案例] as an example: many of those that have introduced [具体政策] reported that [具体结果]. Moreover, [长期效益], which can reduce [成本节约] in the long run.',
    body2Note: '技巧：① "Secondly, another compelling reason is that..." 保持跨题型一致；②举例句式可固化为 "take X as an example: many of those that have introduced Y reported that..." 和 "in the long run"（长期效益固化短语）。',
    body2Memorize: 'must',
    conclusion: 'In conclusion, I firmly believe that [动名词改述题目命题] is a positive development. By [回扣 Body 1，V-ing] and [回扣 Body 2，V-ing], such a change ultimately creates a win-win situation for both [双方] in the modern workplace.',
    conclusionNote: '技巧：① "I firmly believe that + [动名词并列改述题目命题] is a positive development" 是题型2 结尾立场重申固化句；② "By + V-ing and V-ing, such a change ultimately creates a win-win situation for both + [双方]" 是工作话题结尾升华固化模板。',
    conclusionMemorize: 'must',
    example: {
      question: 'In many countries, traditional foods are being replaced by international fast food. This is having a negative effect on families and communities. To what extent do you agree or disagree?',
      intro: 'With the rapid pace of globalization and changing lifestyles, whether or not the replacement of traditional foods by international fast food has a negative effect on families and communities has sparked considerable debate. From my perspective, I totally agree with this view, as fast food consumption weakens family bonds and damages local community structures.',
      body1: 'First and foremost, the primary reason for my perspective lies in its negative impact on family relationships. Regular family meals have traditionally served as a crucial time for communication and bonding, which may be severely compromised when families opt for quick, individual fast food meals instead. By contrast, preparing and sharing traditional home-cooked dishes allows family members to better maintain strong emotional connections. For instance, cooking together provides opportunities for parents to teach children about cultural heritage and healthy eating habits, making them more likely to develop lifelong positive relationships with food and family.',
      body2: 'Secondly, another compelling reason is that the dominance of international fast food chains threatens local community structures, particularly in small towns and neighborhoods. To be more specific, when multinational fast food corporations replace family-run restaurants, the unique character of local communities is gradually eroded and thus enables them to create homogeneous high streets indistinguishable from anywhere else in the world. Additionally, take many Asian cities as an example: many of those that have introduced strict regulations on fast food advertising near schools reported that childhood obesity rates stabilized. Moreover, communities may benefit from preserving their traditional food markets and local eateries, which can reduce economic leakage to foreign corporations in the long run.',
      conclusion: 'In conclusion, I firmly believe that limiting the spread of international fast food and promoting traditional cuisine is a positive development. By strengthening family bonds through shared meals and preserving the unique character of local communities, such a change ultimately creates a win-win situation for both families and neighborhoods in the modern world.',
    }
  },
  type3: {
    type: '同意程度（To what extent）',
    topic: '科技/生活',
    intro: 'With the boom of [相关科技/行业趋势], significant attention has been drawn to [题目话题核心]. It is often argued that [题目核心观点的改写]. From my perspective, I fully agree with this statement, and the following essay will elaborate on the reasons for my view.',
    introNote: '技巧：①科技话题首句常用 "With the boom of X, significant attention has been drawn to..."；② "It is often argued that..." + "From my perspective, I fully agree with this statement..." 是题型3 首段三件套固定模板；③必须用 fully/strongly/partially 表达程度。',
    introMemorize: 'must',
    body1: 'First and foremost, it is undeniable that [论点 1]. For instance, thanks to [科技工具/现象] now widely used in [领域/场景], [主体] are able to [具体动作], with [具体效益/指标]. Moreover, [主体] can use [科技方法] to [具体任务], thereby [进一步价值].',
    body1Note: '技巧：举例时连词用 "For instance" / "For example" 引出完整句子——避免 such as / as well as 后接完整从句；举例句式可固化为 "thanks to + N" / "with + N" / "X can help us..., while Y can help us..." 三种。',
    body1Memorize: 'must',
    body2: 'Secondly, another compelling reason is that [论点 2]. To be more specific, [现象描述]. As a result, [结果陈述]. For instance, [具体例证]. Moreover, [补充论证], which greatly improves our [领域] in both work and study.',
    body2Note: '技巧："Secondly, another compelling reason is that..." 是题型3 的固定模板；用 "As a result" 承接现象与结果，逻辑清晰。',
    body2Memorize: 'must',
    conclusion: 'In conclusion, even though [让步——承认另一面的合理性], I still strongly maintain the view that [主立场——重申题目核心命题] remain the primary and ultimate aim of [题目主体].',
    conclusionNote: '技巧："In conclusion, even though..., I still strongly maintain the view that..." 是题型3 结尾固定模板；避免 "even though... but also..."（让步-转折错配）。',
    conclusionMemorize: 'must',
    example: {
      question: 'Space exploration is a waste of money and time. To what extent do you agree or disagree?',
      intro: 'With the boom of aerospace technology and increasing government investment, significant attention has been drawn to the value of space exploration. It is often argued that spending money on space missions is a waste of resources that could be better used on Earth. From my perspective, I fully disagree with this statement, and the following essay will elaborate on the reasons for my view.',
      body1: 'First and foremost, it is undeniable that space exploration drives technological innovation that benefits everyday life. For instance, thanks to satellite technology now widely used in weather forecasting and navigation systems, ordinary people are able to plan their daily activities with unprecedented accuracy, with tangible improvements in travel safety and agricultural productivity. Moreover, scientists can use materials developed for space missions to create more efficient medical devices and sustainable energy solutions, thereby improving public health and environmental conditions across the globe.',
      body2: 'Secondly, another compelling reason is that space exploration inspires younger generations to pursue careers in science and engineering. To be more specific, when children witness astronauts conducting experiments on the International Space Station or see images from Mars rovers, their curiosity about the universe is ignited. As a result, enrollment in STEM subjects tends to increase following major space missions. For instance, the Apollo program in the 1960s led to a dramatic surge in engineering degrees in the United States. Moreover, the international cooperation required for space projects fosters peaceful collaboration between nations, which greatly improves our prospects for solving global challenges in both work and study.',
      conclusion: 'In conclusion, even though space exploration requires substantial financial investment that could alternatively fund immediate social needs, I still strongly maintain the view that advancing our understanding of the universe and developing cutting-edge technologies remain the primary and ultimate aim of scientific endeavor.',
    }
  },
  type4: {
    type: '利弊类',
    topic: '教育/社会',
    intro: 'There is no doubt that [题目背景陈述/现象改写]; therefore, a growing number of [主体：人/国家/机构] have [动作] [该现象/做法], in order to [该做法的目的]. Having said that, I believe the benefits of [题目主语] outweigh the downsides, especially in terms of [优势点1] and [优势点2].',
    introNote: '注意：题型4需①改写题目背景 + ②明确表态利大于弊 + ③预告两个优势点，三者缺一不可。',
    introMemorize: 'must',
    body1: 'Admittedly, opponents of [题目现象] would argue that [反方担忧], which could make it harder for them to [反方预警后果]. This perspective is undoubtedly reasonable to some extent. However, I believe this problem can be addressed through [反驳解决方案]. In contrast, [题目主体] could give [对象] more opportunities to achieve [优势1]. In other words, [具体阐述], such as [具体举例]. There will be less [负面因素1] and fewer [负面因素2], giving [对象] more opportunities to develop themselves and express their ideas, which will make them more competitive in their future careers.',
    body1Note: '技巧：题型4 常用"让步反驳+优势"的 3 段式变体——主体段 1 先承认反方意见再给出反驳+优势 1。用 "rather than" / "As a result" / "Over time" 形成"说明—对比—结果—升华"四层推进。',
    body1Memorize: 'should',
    body2: 'Another compelling reason is that [优势2 论点]. To be more specific, [具体场景说明]. [进一步对比/阐述], students are more likely to concentrate on [积极方向] rather than on [消极方向]. As a result, this often leads to [直接结果]. Over time, this supportive environment can shape [长期积极影响].',
    body2Note: '技巧：主体段 2 专注优势 2，用 "rather than" 做对比，"As a result" 引结果，"Over time" 做长期升华。',
    body2Memorize: 'should',
    conclusion: 'In conclusion, although [让步——承认另一面], their advantages of offering opportunities for [优势1 总结] and enhancing [优势2 总结] are more significant. Therefore, I still maintain that the advantages of [题目主体] outweigh its drawbacks.',
    conclusionNote: '技巧：用 "although..., their advantages of offering... and enhancing... are more significant" 并列动名词保持优势点结构平行。',
    conclusionMemorize: 'must',
    example: {
      question: 'In some countries, young people are encouraged to work or travel for a year between finishing high school and starting university studies. Discuss the advantages and disadvantages for young people who decide to do this.',
      intro: 'There is no doubt that taking a gap year has become increasingly popular among high school graduates; therefore, a growing number of students have chosen to work or travel for a year before starting university, in order to gain real-world experience and clarify their career goals. Having said that, I believe the benefits of a gap year outweigh the downsides, especially in terms of personal growth and academic motivation.',
      body1: 'Admittedly, opponents of the gap year would argue that it disrupts the natural academic progression, which could make it harder for students to readjust to structured learning environments. This perspective is undoubtedly reasonable to some extent, as some gap-year students do struggle to return to study mode after prolonged absence. However, I believe this problem can be addressed through proper planning and setting clear academic goals before the break. In contrast, a well-structured gap year could give young people more opportunities to achieve maturity and self-awareness. In other words, working in a professional environment or traveling independently exposes them to diverse cultures and responsibilities, such as a student who volunteers abroad and learns to manage their own budget. There will be less academic burnout and fewer instances of students changing majors repeatedly, giving them more opportunities to develop themselves and express their ideas, which will make them more competitive in their future careers.',
      body2: 'Another compelling reason is that students who take a gap year often demonstrate greater academic motivation upon entering university. To be more specific, having experienced the realities of the working world or gained perspective through travel, these students typically have a clearer understanding of why they are pursuing higher education. Unlike their peers who enter university directly from high school without clear goals, gap-year students are more likely to concentrate on their chosen field of study rather than on partying or switching majors. As a result, this often leads to higher graduation rates and better academic performance. Over time, this supportive environment of self-directed learning can shape more resilient and adaptable professionals.',
      conclusion: 'In conclusion, although taking a gap year may delay academic progress and require additional financial resources, their advantages of offering opportunities for personal growth and enhancing academic motivation are more significant. Therefore, I still maintain that the advantages of a well-planned gap year outweigh its drawbacks.',
    }
  },
  type5: {
    type: '正反利弊（Positive/Negative）',
    topic: '教育/社会',
    intro: 'It is true that [题目现象改写]. From my perspective, even though [让步——承认潜在问题], it is a [positive/negative] development because [核心原因1] and [核心原因2].',
    introNote: '注意：题型5需要①明确表态 positive/negative + ②让步承认另一面 + ③预告两个论点。',
    introMemorize: 'must',
    body1: 'To begin with, [核心论点——该现象带来的主要好处/坏处]. To be more specific, [进一步解释]. For example, [具体场景举例]. In contrast, [反面论证——没有该现象时的情况].',
    body1Note: '技巧："To begin with" 开头，用 "For example" 举例，"In contrast" 做反面论证，形成完整的论证闭环。',
    body1Memorize: 'should',
    body2: 'Moreover, [次要论点——该现象的另一个好处/坏处]. [补充解释]. For instance, [具体例子].',
    body2Note: '技巧："Moreover" 递进，补充第二个论点，举例用 "For instance"。',
    body2Memorize: 'should',
    conclusion: 'In conclusion, although [让步——承认问题/另一面], the [opportunity/benefit] it provides for [好处总结] makes it a largely [positive/negative] trend.',
    conclusionNote: '技巧：用 "although... the opportunity it provides for... makes it..." 让步+总结结构收束全文，与开头呼应。',
    conclusionMemorize: 'must',
    example: {
      question: 'In many countries, traditional foods are being replaced by international fast food. This is having a negative effect on families and communities. To what extent do you agree or disagree?',
      intro: 'It is true that international fast food chains have become increasingly dominant in high streets around the world. From my perspective, even though fast food offers undeniable convenience and affordability, it is a negative development because it erodes family dining traditions and undermines local community structures.',
      body1: 'To begin with, the rise of fast food seriously damages family bonding opportunities. To be more specific, traditional family meals have always served as essential occasions for communication and relationship-building across generations. For example, in many Asian cultures, the preparation and sharing of dinner is a daily ritual where parents discuss their day with children and elders pass down family stories. In contrast, when families increasingly rely on quick, individual fast food meals consumed in front of screens, these precious moments of connection are gradually lost.',
      body2: 'Moreover, the proliferation of multinational fast food outlets poses a significant threat to local community identity. When global chains replace family-owned restaurants that have served neighborhoods for decades, the unique culinary character of an area is homogenized. For instance, historic food markets in European cities that once showcased regional specialties are now increasingly dominated by familiar fast food brands. This not only eliminates employment opportunities for local business owners but also removes gathering places where community members have traditionally interacted.',
      conclusion: 'In conclusion, although fast food provides convenient and affordable dining options for busy modern lifestyles, the damage it inflicts on family relationships and community structures makes it a largely negative trend.',
    }
  },
  type6: {
    type: '问题措施（Problems + Solutions）',
    topic: '环境/社会',
    intro: 'In recent years, [宏观背景——如 the rapid urbanization of the world] has brought a series of issues to [对象——our planet / our society]. It is true that [题目核心现象改写]. In my opinion, there are numerous factors contributing to these problems, and I will also explore potential solutions in the following paragraphs.',
    introNote: '注意：题型6开头段必须①宏观背景 + ②题目现象改写 + ③预告"既分析危害/原因，也探讨对策"双任务。"In my opinion, there are numerous factors contributing to..., and I will also explore potential solutions" 是固化高分句，跨话题通用。',
    introMemorize: 'must',
    body1: 'To begin with, when it comes to [问题], numerous stakeholders need to be considered, from [对象A] to [对象B]. Firstly, [第一层危害]. For example, [具体场景], ultimately [负面结果]. Furthermore, [第二层危害], resulting in [连锁后果1] and intensifying [连锁后果2], which also affects [对人类生活的影响].',
    body1Note: '技巧：①"when it comes to..., numerous stakeholders need to be considered, from A to B" 是高分话题句；②用 "Firstly... Furthermore..." 分层论述危害，"resulting in... and intensifying..." 形成因果链。',
    body1Memorize: 'should',
    body2: 'Despite the fact that the issues are severe, there are effective solutions to mitigate them and create a better environment for both humans and [受影响对象]. On the one hand, it is crucial for authorities to implement effective measures, such as [官方对策]. On the other hand, individuals should also raise their awareness of [意识领域]. For instance, people can [个人具体行为], such as [更具体举例], in order to [最终目的].',
    body2Note: '技巧："On the one hand (authorities) / On the other hand (individuals)" 双层次对策结构，既全面又清晰，任何"问题措施"题都能套用；"in order to + 终极目的" 收束句式让对策闭环。',
    body2Memorize: 'must',
    conclusion: 'In conclusion, although there are many [dangerous/negative] results of [题目现象], ranging from [危害1] to [危害2], [对策1——官方层面] and [对策2——个人层面] can help significantly alleviate these problems and bring us [美好愿景].',
    conclusionNote: '技巧：结尾用"ranging from A to B"承接上文危害，再用"X and Y can help significantly alleviate these problems"回扣双层次对策，最后升华为共同愿景。',
    conclusionMemorize: 'must',
    example: {
      question: 'In many cities, the quality of the air is becoming worse. What are the causes of this problem? What can be done to solve it?',
      intro: 'In recent years, the rapid industrialization and urbanization of the world has brought a series of issues to our planet. It is true that air quality in many major cities has deteriorated to alarming levels. In my opinion, there are numerous factors contributing to these problems, and I will also explore potential solutions in the following paragraphs.',
      body1: 'To begin with, when it comes to air pollution, numerous stakeholders need to be considered, from industrial corporations to individual commuters. Firstly, the heavy reliance on fossil fuels for energy production and transportation releases massive quantities of harmful pollutants into the atmosphere. For example, coal-burning power plants and diesel vehicles emit sulfur dioxide and nitrogen oxides that contribute to smog formation, ultimately causing respiratory diseases and reduced visibility. Furthermore, the rapid expansion of manufacturing industries without adequate environmental regulations results in the release of toxic chemicals and particulate matter into the air and intensifies the accumulation of greenhouse gases, which also affects crop yields and ecosystem health in surrounding rural areas.',
      body2: 'Despite the fact that the issues are severe, there are effective solutions to mitigate them and create a better environment for both humans and wildlife. On the one hand, it is crucial for authorities to implement effective measures, such as enforcing stricter emissions standards for factories and promoting the transition to renewable energy sources like solar and wind power. On the other hand, individuals should also raise their awareness of environmental responsibility. For instance, people can practise a low-carbon lifestyle, such as using public transportation or cycling to work rather than driving private cars, in order to reduce their personal carbon footprint and improve overall air quality.',
      conclusion: 'In conclusion, although there are many dangerous results of air pollution, ranging from public health crises to environmental degradation, stricter government regulations and increased individual environmental awareness can help significantly alleviate these problems and bring us cleaner, healthier cities for future generations.',
    }
  }
};

const MemorizeBadge: React.FC<{ level: 'must' | 'should' | 'optional' }> = ({ level }) => {
  const config = {
    must: { text: '必背', class: 'memorize-must' },
    should: { text: '应背', class: 'memorize-should' },
    optional: { text: '选背', class: 'memorize-optional' },
  };
  const c = config[level];
  return <span className={c.class}>{c.text}</span>;
};

const Task2Section: React.FC = () => {
  const [activeType, setActiveType] = useState('type1');
  const [showExample, setShowExample] = useState(false);
  const template = templates[activeType];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">大作文 Task 2 · 写作模板</h1>
          <p className="text-blue-100/80 max-w-2xl">
            雅思大作文共6种题型，每种题型配备完整的开头段、主体段、结尾段模板。红色标记为必背，橙色为应背。
          </p>
        </div>
      </div>

      {/* Type Selector */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {taskTypes.map((t) => (
              <button
                key={t.id}
                onClick={() => { setActiveType(t.id); setShowExample(false); }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeType === t.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-1.5">{t.name.split('·')[0].trim()}</span>
                <span className="opacity-60 text-xs">{t.desc}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Type Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className={`w-3 h-3 rounded-full ${taskTypes.find(t => t.id === activeType)?.color}`} />
            <h2 className="text-2xl font-bold text-slate-900">{template.type}</h2>
          </div>
          <p className="text-slate-500">{taskTypes.find(t => t.id === activeType)?.desc}</p>
        </div>

        {/* Toggle Example */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowExample(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !showExample ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            模板句式
          </button>
          <button
            onClick={() => setShowExample(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showExample ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            完整范文
          </button>
        </div>

        {!showExample ? (
          <div className="space-y-6">
            {/* Intro */}
            <div className="template-card">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">开头段模板</h3>
                <MemorizeBadge level={template.introMemorize} />
              </div>
              <div className="p-4">
                <div className="example-box mb-3">{template.intro}</div>
                <div className="highlight-box text-sm">
                  <strong className="text-brand-800">💡 技巧提示：</strong>
                  <span className="text-slate-700 ml-1">{template.introNote}</span>
                </div>
              </div>
            </div>

            {/* Body 1 */}
            <div className="template-card">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">主体段 1 模板</h3>
                <MemorizeBadge level={template.body1Memorize} />
              </div>
              <div className="p-4">
                <div className="example-box mb-3">{template.body1}</div>
                <div className="highlight-box text-sm">
                  <strong className="text-brand-800">💡 技巧提示：</strong>
                  <span className="text-slate-700 ml-1">{template.body1Note}</span>
                </div>
              </div>
            </div>

            {/* Body 2 */}
            <div className="template-card">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">主体段 2 模板</h3>
                <MemorizeBadge level={template.body2Memorize} />
              </div>
              <div className="p-4">
                <div className="example-box mb-3">{template.body2}</div>
                <div className="highlight-box text-sm">
                  <strong className="text-brand-800">💡 技巧提示：</strong>
                  <span className="text-slate-700 ml-1">{template.body2Note}</span>
                </div>
              </div>
            </div>

            {/* Conclusion */}
            <div className="template-card">
              <div className="flex items-center justify-between p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">结尾段模板</h3>
                <MemorizeBadge level={template.conclusionMemorize} />
              </div>
              <div className="p-4">
                <div className="example-box mb-3">{template.conclusion}</div>
                <div className="highlight-box text-sm">
                  <strong className="text-brand-800">💡 技巧提示：</strong>
                  <span className="text-slate-700 ml-1">{template.conclusionNote}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="template-card">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">题目</span>
                <p className="mt-1 font-serif text-slate-800 leading-relaxed">{template.example.question}</p>
              </div>
            </div>

            {[
              { title: '开头段', text: template.example.intro },
              { title: '主体段 1', text: template.example.body1 },
              { title: '主体段 2', text: template.example.body2 },
              { title: '结尾段', text: template.example.conclusion },
            ].map((section, i) => (
              <div key={i} className="template-card">
                <div className="p-4 border-b border-slate-100">
                  <h3 className="font-bold text-slate-900">{section.title}</h3>
                </div>
                <div className="p-4">
                  <p className="font-serif text-slate-700 leading-relaxed">{section.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Task2Section;
