import React from 'react';

type Section = 'home' | 'task2' | 'task1' | 'vocabulary' | 'memorize';

interface HomeSectionProps {
  onNavigate: (section: Section) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  const features = [
    {
      title: '大作文 Task 2',
      description: '6种题型全覆盖：双边讨论、同意与否、同意程度、利弊类、正反利弊、问题措施。每种题型配备完整模板+范文+背诵标注。',
      icon: '✍️',
      color: 'bg-blue-500',
      section: 'task2' as Section,
      tags: ['6种题型', '万能模板', '范文精讲']
    },
    {
      title: '小作文 Task 1',
      description: 'Line Graph · Bar Chart · Pie Chart · Table · Process · Map 全图表类型，配备数据描述模板和动态/静态对比策略。',
      icon: '📊',
      color: 'bg-emerald-500',
      section: 'task1' as Section,
      tags: ['6类图表', '数据描述', '趋势表达']
    },
    {
      title: '高分表达',
      description: '学术连接词、高分句型、话题词汇、同义替换。按话题分类整理，背完直接上考场。',
      icon: '📖',
      color: 'bg-amber-500',
      section: 'vocabulary' as Section,
      tags: ['连接词', '话题词汇', '同义替换']
    },
    {
      title: '背诵清单',
      description: '按"必背""应背""选背"三级标记，每日打卡复习。智能进度追踪，考前冲刺不慌。',
      icon: '📝',
      color: 'bg-rose-500',
      section: 'memorize' as Section,
      tags: ['分级背诵', '进度追踪', '考前冲刺']
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-brand-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              目标分数 Band 6.5–7.0
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6">
              Whitley Writing
            </h1>
            <p className="text-lg md:text-xl text-blue-100/80 mb-8 leading-relaxed">
              雅思作文自我背诵复习模版大全。从题型模板到高分表达，<br className="hidden md:block" />
              为从6分冲刺7分的你，准备的一切。
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => onNavigate('task2')}
                className="px-6 py-3 bg-white text-brand-900 rounded-xl font-semibold hover:bg-blue-50 transition-colors shadow-lg"
              >
                开始复习大作文 →
              </button>
              <button
                onClick={() => onNavigate('task1')}
                className="px-6 py-3 bg-white/10 text-white rounded-xl font-semibold hover:bg-white/20 transition-colors backdrop-blur"
              >
                小作文图表类型
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: '6', label: '大作文题型', color: 'text-blue-600' },
              { number: '6', label: '小作文图表', color: 'text-emerald-600' },
              { number: '50+', label: '万能句型', color: 'text-amber-600' },
              { number: '200+', label: '高分词汇', color: 'text-rose-600' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="section-title">四大核心板块</h2>
          <p className="section-subtitle">覆盖雅思写作全场景，从模板到表达一网打尽</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <button
              key={i}
              onClick={() => onNavigate(feature.section)}
              className="group text-left bg-white rounded-2xl p-6 border border-slate-200/60 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center text-2xl text-white shadow-sm flex-shrink-0`}>
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-700 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-3">
                    {feature.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {feature.tags.map((tag, j) => (
                      <span key={j} className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quick Tips */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">备考小贴士</h2>
            <p className="section-subtitle">掌握这些要点，写作分数再上一层楼</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Task 2 结构为王',
                content: '无论观点如何，四段式结构（Intro + 2 Bodies + Conclusion）是6.5+的基础。先保证结构完整，再追求观点深度。',
                icon: '🏗️'
              },
              {
                title: 'Task 1 数据驱动',
                content: '小作文不需要个人观点，只需要客观描述数据。掌握"overview + 关键数据点"的写法，确保涵盖所有主要趋势。',
                icon: '📈'
              },
              {
                title: '背诵 + 改写',
                content: '模板句型要背到脱口而出，但考场上必须根据题目改写，避免生搬硬套。多练习同义替换是关键。',
                icon: '🔄'
              }
            ].map((tip, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-slate-200/60 shadow-sm">
                <div className="text-3xl mb-4">{tip.icon}</div>
                <h3 className="font-bold text-slate-900 mb-2">{tip.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeSection;
