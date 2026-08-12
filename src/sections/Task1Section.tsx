import React, { useState } from 'react';
import ChartExample from '../components/ChartExample';

interface ChartType {
  id: string;
  name: string;
  icon: string;
  description: string;
  overviewTemplate: string;
  detailTemplates: string[];
  vocabulary: string[];
  example: {
    question: string;
    overview: string;
    body: string;
  };
}

const chartTypes: ChartType[] = [
  {
    id: 'line',
    name: 'Line Graph · 线图',
    icon: '📈',
    description: '展示数据随时间变化的趋势，重点关注上升、下降、波动和稳定',
    overviewTemplate: 'Overall, [主体] experienced [总体趋势] over the period shown, with [显著变化]. While [类别A] [趋势A], [类别B] [趋势B].',
    detailTemplates: [
      '[主体] [上升/下降] [ sharply / gradually / steadily ] from [起始值] in [起始时间] to [结束值] in [结束时间].',
      'There was a [ dramatic / slight ] [ increase / decrease ] in [主体], [reaching a peak of / falling to a low of] [数值] in [时间].',
      '[主体] remained relatively [ stable / constant ] at around [数值] throughout the period, with only minor fluctuations.',
      'After [an initial rise / a period of decline], [主体] [plateaued / recovered] and [后续趋势].',
    ],
    vocabulary: [
      '动词：rise, fall, increase, decrease, grow, decline, soar, plunge, fluctuate, stabilize',
      '副词：sharply, dramatically, significantly, steadily, gradually, slightly, moderately',
      '名词：a rise in, a fall in, an upward trend, a downward trend, a peak, a low point',
      '时间表达：at the beginning of, throughout the period, by the end of, over the following years',
    ],
    example: {
      question: 'The graph below shows the proportion of the population aged 65 and over between 1940 and 2040 in three different countries.',
      overview: 'Overall, the proportion of elderly people increased in all three countries over the period shown, with Japan experiencing the most dramatic change. While the USA and Sweden saw gradual rises, Japan started with the lowest percentage but is projected to overtake the others by 2040.',
      body: 'In 1940, the USA had the highest proportion of people aged 65 and over, at approximately 9%, compared to about 7% in Sweden and only 5% in Japan. Over the next 50 years, the figures for the USA and Sweden rose gradually, reaching around 15% and 14% respectively by 1990, while Japan\'s proportion remained relatively stable at about 5% until the late 1980s.\n\nHowever, after 1990, Japan saw a sharp increase in its elderly population, rising dramatically to roughly 10% by 2020 and projected to reach nearly 27% by 2040. This figure is expected to be significantly higher than Sweden (around 20%) and the USA (approximately 23%) by the end of the period.',
    }
  },
  {
    id: 'bar',
    name: 'Bar Chart · 柱状图',
    icon: '📊',
    description: '比较不同类别的数据，可展示静态对比或动态变化（多个年份）',
    overviewTemplate: 'Overall, [最高值类别] had the [highest/lowest] [指标], while [最低值类别] recorded the [lowest/highest] figure. [动态图补充：Over the period, [类别] saw the most significant [change].]',
    detailTemplates: [
      '[类别A] [had / recorded / accounted for] [数值], which was [significantly / slightly] [higher/lower] than [类别B] at [数值].',
      'The figure for [类别] [rose/fell] from [数值] in [时间] to [数值] in [时间], representing a [change] of [数值].',
      '[类别] was [the leading / the least popular] [项目], at [数值], compared to [对比项] at [数值].',
      'While [类别A] [increased/decreased] by [数值], [类别B] experienced [a more modest / a steeper] [rise/fall] over the same period.',
    ],
    vocabulary: [
      '比较：significantly higher than, slightly lower than, nearly double, roughly half',
      '占比：accounted for, represented, constituted, made up',
      '排名：ranked first, came second, was in last place',
      '变化：experienced a growth, witnessed a decline, saw an increase',
    ],
    example: {
      question: 'The chart below shows the amount of money per week spent on fast foods in Britain. The graph shows the trends in consumption of fast foods.',
      overview: 'Overall, hamburgers were the most popular fast food among high and average income groups, while fish and chips remained the preferred choice for those with lower incomes. Over the period shown, hamburger and pizza consumption increased dramatically, whereas the popularity of fish and chips declined.',
      body: 'In terms of weekly spending, hamburgers were the most popular among high-income earners, who spent approximately 43 pence per person per week on this food. This figure was significantly higher than the amounts spent by average-income (33 pence) and low-income (14 pence) groups. Pizza, on the other hand, was most popular among average-income earners at 13 pence, compared to just 8 pence for both high and low-income groups. Fish and chips was the least expensive option overall, with low-income earners spending 18 pence on average.\n\nLooking at consumption trends over the 20-year period, hamburgers saw the most dramatic increase, rising from about 20 grams consumed per person in 1970 to over 500 grams by 1990. Pizza consumption also grew substantially, from approximately 50 grams to roughly 280 grams over the same period. In contrast, fish and chips experienced a steady decline, falling from 300 grams in 1970 to around 200 grams by 1990.',
    }
  },
  {
    id: 'pie',
    name: 'Pie Chart · 饼图',
    icon: '🥧',
    description: '展示各部分占总体的比例关系，通常用于静态数据',
    overviewTemplate: 'Overall, [最大占比项] constituted the [largest/smallest] proportion of [总量], at [百分比], while [其他主要项] accounted for [百分比] and [百分比] respectively.',
    detailTemplates: [
      '[项目A] [accounted for / made up / represented] [百分比] of [总量], which was [nearly / approximately] [倍数] [that of / the figure for] [项目B].',
      'At [百分比], [项目] was [the largest / the second largest] category, [followed by / compared to] [项目] at [百分比].',
      'The remaining [百分比] was [divided between / shared by] [项目C] and [项目D], at [百分比] and [百分比] respectively.',
      '[项目] comprised [just / merely / only] [百分比] of the total, making it [the smallest / the least significant] category.',
    ],
    vocabulary: [
      '占比：accounted for, constituted, represented, comprised, made up',
      '比例：the majority, a significant proportion, a small fraction, the remainder',
      '比较：in contrast, by comparison, whereas, while',
      '强调：by far the largest, merely, only, just over',
    ],
    example: {
      question: 'The pie charts below show the percentage of five kinds of books sold by a bookseller between 1970 and 1990.',
      overview: 'Overall, adult fiction was consistently the best-selling category over the two decades, while biography sales experienced the most significant growth. In contrast, the popularity of children\'s books declined noticeably during this period.',
      body: 'In 1970, adult fiction accounted for the largest proportion of sales at 30%, followed by children\'s books at 25%. Other fiction represented 20% of total sales, while biography and travel books each constituted 15% and 10% respectively.\n\nBy 1990, the distribution had changed considerably. Adult fiction remained the dominant category, though its share decreased slightly to 25%. Biography sales saw a dramatic rise, increasing from 15% to 25% and becoming the second most popular category. Other fiction also grew to 22%. In contrast, children\'s books experienced a significant decline, falling from 25% to just 12%. Travel books remained the smallest category, though their share increased marginally from 10% to 16%.',
    }
  },
  {
    id: 'table',
    name: 'Table · 表格',
    icon: '📋',
    description: '展示多维度数据对比，需要选择关键数据进行描述',
    overviewTemplate: 'Overall, [总体趋势/最高值]. [补充说明主要对比关系]. It is also noticeable that [另一个显著特征].',
    detailTemplates: [
      '[主体] had the [highest/lowest] [指标] at [数值], compared to [对比主体] which [recorded/stood at] [数值].',
      'There was considerable variation in [指标], ranging from [最低值] in [主体A] to [最高值] in [主体B].',
      '[主体A] [指标] was [倍数] that of [主体B] ([数值] versus [数值]).',
      'While [主体A] saw [increased/decreased] from [数值] to [数值], [主体B] experienced [the opposite trend / a similar pattern].',
    ],
    vocabulary: [
      '极值：the highest figure, the lowest amount, the top/bottom ranked',
      '范围：ranged from...to..., varied between...and...',
      '对比：in contrast to, compared with, whereas, while',
      '比例：approximately, roughly, just over, slightly under',
    ],
    example: {
      question: 'The table below gives information on consumer spending on different items in five different countries in 2002.',
      overview: 'Overall, food, drinks and tobacco accounted for the largest proportion of consumer spending in all five countries, while leisure and education represented the smallest category. Turkey and Ireland had the highest overall percentages in the first category, whereas Italy and Sweden spent more on clothing and footwear.',
      body: 'Food, drinks and tobacco constituted the largest proportion of spending in all countries. Turkey had the highest figure in this category at 32.14%, followed by Ireland at nearly 29% and Spain at 18.8%. Italy and Sweden recorded significantly lower percentages, at 16.36% and 15.77% respectively.\n\nClothing and footwear showed a different pattern. Italy spent the highest proportion on this category at 9%, while Sweden, Turkey and Spain had similar figures ranging from 5.4% to 6.63%. Ireland had the lowest percentage at 6.43%.\n\nLeisure and education was the smallest spending category across all countries. Turkey allocated 4.35% of spending to this area, which was the highest figure, while Italy spent the least at just 3.2%. Spain, Ireland and Sweden had comparable figures of around 2-3%.',
    }
  },
  {
    id: 'process',
    name: 'Process Diagram · 流程图',
    icon: '⚙️',
    description: '展示某个过程的步骤或循环，用被动语态和顺序连接词',
    overviewTemplate: 'Overall, the process consists of [number] main stages, beginning with [第一步] and ending with [最后一步]. [如果是循环图：It is a cyclical process that repeats continuously.]',
    detailTemplates: [
      'The process begins with [第一步], in which [详细说明].',
      'In the [first/second/next/final] stage, [主体] is/are [动词过去分词], [using/by means of] [工具/方法].',
      'Following this, [下一步动作] takes place, [where/which] [补充说明].',
      'Once [某步骤完成], [后续步骤] can [occur/begin/be carried out].',
      'The final stage involves [最后一步], [resulting in/producing] [最终产物].',
    ],
    vocabulary: [
      '顺序：first, initially, subsequently, following this, in the next stage, finally',
      '被动：is heated, are mixed, is converted into, are transported',
      '过程：the process involves, this stage entails, this step requires',
      '工具/方式：using, by means of, through, via, with the help of',
    ],
    example: {
      question: 'The diagram below shows the process of producing cement and how cement is used to make concrete for building purposes.',
      overview: 'Overall, the production of cement involves five main stages, beginning with the crushing of raw materials and ending with the packaging of the final product. This cement is then combined with other materials to produce concrete, which involves a simpler two-step process.',
      body: 'The first stage of cement production involves the crushing of limestone and clay into powder in a crusher. This powder is then mixed thoroughly in a mixer before being fed into a rotating heater, where it is heated at high temperatures. The resulting mixture is subsequently ground in a grinder to produce cement, which is finally packaged in bags.\n\nTo produce concrete, cement is combined with water, sand, and gravel in a concrete mixer. These ingredients are added in specific proportions—15% cement, 10% water, 25% sand, and 50% gravel. The mixer rotates to blend all the components together, and the resulting concrete is then ready for use in construction.',
    }
  },
  {
    id: 'map',
    name: 'Map · 地图题',
    icon: '🗺️',
    description: '描述某个地区的变化（过去vs现在）或比较两个区域',
    overviewTemplate: 'Overall, the area [underwent significant changes / remained largely unchanged] between [时间A] and [时间B]. The most notable [development/change] was [主要变化], while [次要变化].',
    detailTemplates: [
      'In [年份], [地点] was [形容词描述], whereas by [年份], it had been [transformed into / replaced by] [新用途].',
      '[新建筑/设施] was [constructed/built/added] in [位置], [where previously there had been / replacing] [原有建筑].',
      'The [道路/河流/区域] was [expanded/reduced/relocated] from [原位置] to [新位置].',
      'To the [north/south/east/west] of [地标], a new [设施] was developed, [serving as/providing] [功能].',
    ],
    vocabulary: [
      '方位：in the north, to the southeast, on the eastern side, adjacent to',
      '变化：was transformed into, was replaced by, was demolished, was constructed',
      '设施：residential area, commercial district, recreational facilities, infrastructure',
      '描述：significant expansion, noticeable reduction, newly established, completely removed',
    ],
    example: {
      question: 'The maps below show the changes that took place in a coastal town called Seaville between 1980 and 2010.',
      overview: 'Overall, Seaville underwent significant development between 1980 and 2010, transforming from a quiet fishing village into a bustling tourist resort. The most notable changes were the construction of new accommodation and entertainment facilities, while the traditional fishing industry declined.',
      body: 'In 1980, Seaville was a small fishing village with a harbour in the north and a residential area to the south. The eastern part of the town consisted mainly of fishing facilities, including a fish market and several boat storage areas. There was also a small cafe near the harbour.\n\nBy 2010, the area had been completely transformed. The fishing facilities in the east were replaced by a large hotel and a swimming pool, while the fish market was demolished to make way for a restaurant. The boat storage areas were converted into a car park. To the south of the hotel, a new golf course was developed on what had previously been unused land. The residential area expanded westward, and the small cafe near the harbour was replaced by a larger shopping complex.',
    }
  }
];

const Task1Section: React.FC = () => {
  const [activeChart, setActiveChart] = useState('line');
  const [showExample, setShowExample] = useState(false);
  const chart = chartTypes.find(c => c.id === activeChart)!;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">小作文 Task 1 · 图表描述</h1>
          <p className="text-emerald-100/80 max-w-2xl">
            掌握6种图表类型的描述模板，从Overview到细节数据，从词汇到句型，小作文轻松拿高分。
          </p>
        </div>
      </div>

      {/* Chart Selector */}
      <div className="sticky top-16 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {chartTypes.map((c) => (
              <button
                key={c.id}
                onClick={() => { setActiveChart(c.id); setShowExample(false); }}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeChart === c.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span className="mr-1.5">{c.icon}</span>
                {c.name.split('·')[0].trim()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{chart.icon}</span>
            <h2 className="text-2xl font-bold text-slate-900">{chart.name}</h2>
          </div>
          <p className="text-slate-500">{chart.description}</p>
        </div>

        {/* Toggle */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setShowExample(false)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              !showExample ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            模板句式
          </button>
          <button
            onClick={() => setShowExample(true)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showExample ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            完整范文
          </button>
        </div>

        {!showExample ? (
          <div className="space-y-6">
            {/* Overview */}
            <div className="template-card">
              <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                <h3 className="font-bold text-emerald-900">📌 Overview 总述段（必写）</h3>
                <p className="text-emerald-700 text-sm mt-1">不写Overview直接扣1分！必须放在开头段或结尾段。</p>
              </div>
              <div className="p-4">
                <div className="example-box mb-3">{chart.overviewTemplate}</div>
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-3 text-sm">
                  <strong className="text-amber-800">⚠️ 注意：</strong>
                  <span className="text-amber-700 ml-1">Overview 不要出现具体数字，只描述总体趋势和主要对比关系。</span>
                </div>
              </div>
            </div>

            {/* Detail Templates */}
            <div className="template-card">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">📝 细节描述句型</h3>
              </div>
              <div className="p-4 space-y-4">
                {chart.detailTemplates.map((t, i) => (
                  <div key={i} className="example-box">
                    <span className="inline-block w-6 h-6 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold text-center leading-6 mr-2">{i + 1}</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary */}
            <div className="template-card">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">🎯 高分词汇</h3>
              </div>
              <div className="p-4 space-y-2">
                {chart.vocabulary.map((v, i) => (
                  <div key={i} className="flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                    <span className="text-emerald-500 mt-0.5">▸</span>
                    <span className="text-slate-700 text-sm">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Writing Strategy */}
            <div className="template-card bg-gradient-to-br from-slate-50 to-blue-50 border-blue-100">
              <div className="p-4 border-b border-blue-100">
                <h3 className="font-bold text-blue-900">💡 {chart.id === 'line' || chart.id === 'bar' ? '动态图' : chart.id === 'pie' || chart.id === 'table' ? '静态图' : '流程/地图'} 写作策略</h3>
              </div>
              <div className="p-4">
                {chart.id === 'line' || chart.id === 'bar' ? (
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2"><span className="text-blue-500">1.</span>动态图按时间顺序写，每个主体一段</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">2.</span>抓住起点、终点、最高/最低/交叉点</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">3.</span>用"By contrast / Similarly"做对比</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">4.</span>不需要描述每一个数据点，选关键数据</li>
                  </ul>
                ) : chart.id === 'pie' || chart.id === 'table' ? (
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2"><span className="text-blue-500">1.</span>静态图按数据大小顺序写，最大→最小</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">2.</span>多做倍数对比（double, half, triple）</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">3.</span>相近数据可归类描述（group similar figures）</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">4.</span>用"respectively"处理并列数据</li>
                  </ul>
                ) : chart.id === 'process' ? (
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2"><span className="text-blue-500">1.</span>全文用一般现在时+被动语态</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">2.</span>按箭头顺序描述，不要跳步</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">3.</span>用顺序连接词（first, then, following this）</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">4.</span>每个步骤说明输入、过程、输出</li>
                  </ul>
                ) : (
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2"><span className="text-blue-500">1.</span>以地标/参照物为定位基准（north of / adjacent to）</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">2.</span>按顺时针或区域顺序描述变化</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">3.</span>用被动语态描述变化（was replaced by / was converted into）</li>
                    <li className="flex items-start gap-2"><span className="text-blue-500">4.</span>两幅图对比时，用"whereas / while"连接</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <ChartExample type={activeChart as any} />

            <div className="template-card">
              <div className="p-4 border-b border-slate-100 bg-slate-50">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">题目</span>
                <p className="mt-1 font-serif text-slate-800 leading-relaxed">{chart.example.question}</p>
              </div>
            </div>

            <div className="template-card">
              <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-teal-50">
                <h3 className="font-bold text-emerald-900">Overview</h3>
              </div>
              <div className="p-4">
                <p className="font-serif text-slate-700 leading-relaxed">{chart.example.overview}</p>
              </div>
            </div>

            <div className="template-card">
              <div className="p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900">Body Paragraph(s)</h3>
              </div>
              <div className="p-4">
                {chart.example.body.split('\n\n').map((para, i) => (
                  <p key={i} className="font-serif text-slate-700 leading-relaxed mb-4 last:mb-0">{para}</p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task1Section;
