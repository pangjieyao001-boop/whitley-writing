import React, { useState } from 'react';

interface CheckItem {
  id: string;
  text: string;
  category: string;
  level: 'must' | 'should' | 'optional';
  checked: boolean;
}

const defaultItems: CheckItem[] = [
  // 必背 - 开头段
  { id: 'm1', text: 'People hold different views about... (双边讨论开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm2', text: 'With..., whether or not... has sparked considerable debate. (同意与否开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm3', text: 'It is often argued that... From my perspective, I fully agree... (同意程度开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm4', text: 'There is no doubt that...; therefore, a growing number of... (利弊类开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm5', text: 'It is true that... From my perspective, even though... (正反利弊开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm6', text: 'In recent years,... has brought a series of issues... (问题措施开头)', category: '大作文·开头段', level: 'must', checked: false },
  { id: 'm7', text: 'Overall, [the proportion of...] experienced... (Task1 Overview)', category: '小作文·Overview', level: 'must', checked: false },
  
  // 必背 - 主体段
  { id: 'm8', text: 'First and foremost, the primary reason for my perspective lies in...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm9', text: 'Secondly, another compelling reason is that...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm10', text: 'On the one hand,... On the other hand,...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm11', text: 'Admittedly,... However, I believe this problem can be addressed through...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm12', text: 'To begin with, when it comes to..., numerous stakeholders need to be considered...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm13', text: 'On the one hand, it is crucial for authorities to... On the other hand, individuals should...', category: '大作文·主体段', level: 'must', checked: false },
  { id: 'm14', text: 'Despite the fact that..., there are effective solutions to...', category: '大作文·主体段', level: 'must', checked: false },
  
  // 必背 - 结尾段
  { id: 'm15', text: 'In conclusion, although..., I still maintain the view that...', category: '大作文·结尾段', level: 'must', checked: false },
  { id: 'm16', text: 'In conclusion, I firmly believe that... By..., such a change creates a win-win situation...', category: '大作文·结尾段', level: 'must', checked: false },
  { id: 'm17', text: 'In conclusion, even though..., I still strongly maintain that...', category: '大作文·结尾段', level: 'must', checked: false },
  { id: 'm18', text: 'In conclusion, although there are many... results of..., ... can help significantly alleviate...', category: '大作文·结尾段', level: 'must', checked: false },
  
  // 必背 - 连接词
  { id: 'm19', text: 'Moreover / Furthermore / In addition', category: '连接词', level: 'must', checked: false },
  { id: 'm20', text: 'However / Nevertheless / Nonetheless', category: '连接词', level: 'must', checked: false },
  { id: 'm21', text: 'For instance / For example (后接完整句子)', category: '连接词', level: 'must', checked: false },
  { id: 'm22', text: 'As a result / Consequently', category: '连接词', level: 'must', checked: false },
  { id: 'm23', text: 'By contrast / In contrast', category: '连接词', level: 'must', checked: false },
  
  // 应背 - 开头段
  { id: 's1', text: 'With the boom of..., significant attention has been drawn to...', category: '大作文·开头段', level: 'should', checked: false },
  { id: 's2', text: 'In an era of..., ... has become a topic of widespread concern.', category: '大作文·开头段', level: 'should', checked: false },
  { id: 's3', text: 'There is a growing concern that...', category: '大作文·开头段', level: 'should', checked: false },
  { id: 's4', text: 'Overall, the process consists of... main stages, beginning with... and ending with...', category: '小作文·Overview', level: 'should', checked: false },
  { id: 's5', text: 'Overall, the area underwent significant changes between... and...', category: '小作文·Overview', level: 'should', checked: false },
  
  // 应背 - 主体段
  { id: 's6', text: 'This is largely because...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's7', text: 'This can be attributed to the fact that...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's8', text: 'A case in point is...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's9', text: 'Take... as an example.', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's10', text: 'This argument overlooks the fact that...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's11', text: 'In other words,...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's12', text: 'To be more specific,...', category: '大作文·主体段', level: 'should', checked: false },
  { id: 's13', text: 'There was a dramatic increase in..., reaching a peak of...', category: '小作文·描述', level: 'should', checked: false },
  { id: 's14', text: 'The figure for... fell from... to..., representing a decline of...', category: '小作文·描述', level: 'should', checked: false },
  { id: 's15', text: '[Category] accounted for...%, which was significantly higher than...', category: '小作文·描述', level: 'should', checked: false },
  
  // 应背 - 结尾段
  { id: 's16', text: 'The future of... depends on...', category: '大作文·结尾段', level: 'should', checked: false },
  { id: 's17', text: 'Only by... can we...', category: '大作文·结尾段', level: 'should', checked: false },
  { id: 's18', text: 'It is imperative that...', category: '大作文·结尾段', level: 'should', checked: false },
  { id: 's19', text: 'Over time, this can lead to...', category: '大作文·结尾段', level: 'should', checked: false },
  
  // 应背 - 学术替换
  { id: 's20', text: 'think → maintain / argue / contend / hold the view that', category: '学术词汇', level: 'should', checked: false },
  { id: 's21', text: 'important → crucial / vital / essential / imperative', category: '学术词汇', level: 'should', checked: false },
  { id: 's22', text: 'increase → rise / grow / expand / escalate / surge', category: '学术词汇', level: 'should', checked: false },
  { id: 's23', text: 'decrease → fall / decline / drop / diminish / dwindle', category: '学术词汇', level: 'should', checked: false },
  { id: 's24', text: 'good → beneficial / advantageous / favorable', category: '学术词汇', level: 'should', checked: false },
  { id: 's25', text: 'bad → detrimental / harmful / adverse / negative', category: '学术词汇', level: 'should', checked: false },
  
  // 选背 - 进阶表达
  { id: 'o1', text: 'Notwithstanding the aforementioned points,...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o2', text: 'It is worth noting that...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o3', text: 'This begs the question of whether...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o4', text: 'At first glance,... may seem..., but upon closer examination,...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o5', text: 'It goes without saying that...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o6', text: 'The ramifications of... extend far beyond...', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o7', text: '...is not merely desirable but essential.', category: '进阶表达', level: 'optional', checked: false },
  { id: 'o8', text: 'This perspective is not without merit, yet...', category: '进阶表达', level: 'optional', checked: false },
];

const MemorizeSection: React.FC = () => {
  const [items, setItems] = useState<CheckItem[]>(() => {
    const saved = localStorage.getItem('whitley-memorize');
    return saved ? JSON.parse(saved) : defaultItems;
  });
  const [filter, setFilter] = useState<'all' | 'must' | 'should' | 'optional'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  React.useEffect(() => {
    localStorage.setItem('whitley-memorize', JSON.stringify(items));
  }, [items]);

  const toggleItem = (id: string) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const resetProgress = () => {
    if (confirm('确定要重置所有背诵进度吗？')) {
      setItems(defaultItems.map(i => ({ ...i, checked: false })));
    }
  };

  const categories = ['all', ...Array.from(new Set(items.map(i => i.category)))];

  const filteredItems = items.filter(item => {
    const levelMatch = filter === 'all' || item.level === filter;
    const catMatch = categoryFilter === 'all' || item.category === categoryFilter;
    return levelMatch && catMatch;
  });

  const stats = {
    total: items.length,
    checked: items.filter(i => i.checked).length,
    must: items.filter(i => i.level === 'must'),
    mustDone: items.filter(i => i.level === 'must' && i.checked).length,
    should: items.filter(i => i.level === 'should'),
    shouldDone: items.filter(i => i.level === 'should' && i.checked).length,
  };

  const progress = Math.round((stats.checked / stats.total) * 100);

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-rose-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold font-serif mb-3">背诵清单</h1>
          <p className="text-rose-100/80 max-w-2xl">
            按"必背→应背→选背"三级分类，每天打卡复习。进度自动保存，考前冲刺不慌。
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">总进度</span>
            <span className="text-sm font-bold text-slate-900">{stats.checked} / {stats.total} ({progress}%)</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="text-slate-600">必背: {stats.mustDone}/{stats.must.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="text-slate-600">应背: {stats.shouldDone}/{stats.should.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex gap-2">
            {(['all', 'must', 'should', 'optional'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? f === 'must' ? 'bg-red-500 text-white'
                    : f === 'should' ? 'bg-amber-500 text-white'
                    : f === 'optional' ? 'bg-slate-400 text-white'
                    : 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? '全部' : f === 'must' ? '必背' : f === 'should' ? '应背' : '选背'}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 rounded-lg text-sm bg-slate-100 text-slate-600 border-0 focus:ring-2 focus:ring-rose-500"
            >
              {categories.map(c => (
                <option key={c} value={c}>{c === 'all' ? '全部分类' : c}</option>
              ))}
            </select>
          </div>
          <button
            onClick={resetProgress}
            className="ml-auto px-3 py-1.5 rounded-lg text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
          >
            重置进度
          </button>
        </div>

        {/* List */}
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                item.checked
                  ? 'bg-slate-50 border-slate-200 opacity-60'
                  : 'bg-white border-slate-200 hover:border-rose-300 hover:shadow-sm'
              }`}
            >
              <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                item.checked
                  ? 'bg-emerald-500 border-emerald-500'
                  : 'border-slate-300'
              }`}>
                {item.checked && (
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-sm font-medium ${item.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                    {item.text}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    item.level === 'must' ? 'bg-red-50 text-red-600'
                    : item.level === 'should' ? 'bg-amber-50 text-amber-600'
                    : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.level === 'must' ? '必背' : item.level === 'should' ? '应背' : '选背'}
                  </span>
                </div>
                <span className="text-xs text-slate-400 mt-1 block">{item.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p className="text-lg mb-2">🎉</p>
            <p>该分类下暂无项目</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemorizeSection;
