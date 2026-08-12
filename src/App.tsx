import { useState } from 'react';
import './index.css';
import Navigation from './components/Navigation';
import HomeSection from './sections/HomeSection';
import Task2Section from './sections/Task2Section';
import Task1Section from './sections/Task1Section';
import VocabularySection from './sections/VocabularySection';
import MemorizeSection from './sections/MemorizeSection';

type Section = 'home' | 'task2' | 'task1' | 'vocabulary' | 'memorize';

function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection onNavigate={setActiveSection} />;
      case 'task2':
        return <Task2Section />;
      case 'task1':
        return <Task1Section />;
      case 'vocabulary':
        return <VocabularySection />;
      case 'memorize':
        return <MemorizeSection />;
      default:
        return <HomeSection onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="pt-16">
        {renderSection()}
      </main>
      <footer className="bg-slate-900 text-slate-400 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm">Writing · 雅思作文自我背诵复习模版大全</p>
          <p className="text-xs mt-2 opacity-60">目标分数 6.5–7.0 · 持续更新中</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
