import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';

type Category = 'all' | 'технологии' | 'дизайн' | 'разработка' | 'новости';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Будущее веб-разработки в 2026',
    excerpt: 'Исследуем новые тренды и технологии, которые изменят индустрию в ближайшие годы.',
    category: 'технологии',
    date: '15 января 2026',
    readTime: '5 мин'
  },
  {
    id: 2,
    title: 'Минималистичный дизайн: меньше значит больше',
    excerpt: 'Как создавать элегантные интерфейсы, фокусируясь на главном.',
    category: 'дизайн',
    date: '12 января 2026',
    readTime: '7 мин'
  },
  {
    id: 3,
    title: 'React 19: что нового?',
    excerpt: 'Обзор ключевых изменений и улучшений в новой версии React.',
    category: 'разработка',
    date: '10 января 2026',
    readTime: '6 мин'
  },
  {
    id: 4,
    title: 'VoidGrief запущен',
    excerpt: 'Мы рады представить новую платформу для обмена идеями и знаниями.',
    category: 'новости',
    date: '9 января 2026',
    readTime: '3 мин'
  },
];

const faqs = [
  {
    question: 'Как зайти на сервер?',
    answer: 'Открой Minecraft, нажми "Мультиплеер" и добавь IP сервера. Свяжись с нами в Telegram для получения IP.'
  },
  {
    question: 'Какие режимы есть?',
    answer: 'У нас есть выживание, PvP арена, мини-игры и строительный режим. Постоянно добавляем новые!'
  },
  {
    question: 'Сервер бесплатный?',
    answer: 'Да! Играть можно совершенно бесплатно. Привилегии дают дополнительные возможности.'
  },
  {
    question: 'Как купить привилегию?',
    answer: 'Нажми на кнопку "Купить" в разделе Донат. Ты перейдешь в Telegram для оформления покупки.'
  }
];

interface DonatePrivilege {
  name: string;
  price: number;
  oldPrice?: number;
  featured?: boolean;
  color: string;
}

const donatePrivileges: DonatePrivilege[] = [
  { name: 'HERO', price: 39, color: 'from-slate-500 to-slate-600' },
  { name: 'TITAN', price: 89, color: 'from-blue-500 to-blue-600' },
  { name: 'AVENGER', price: 129, color: 'from-green-500 to-green-600' },
  { name: 'OVERLORD', price: 289, color: 'from-purple-500 to-purple-600' },
  { name: 'MAGISTER', price: 589, color: 'from-pink-500 to-pink-600' },
  { name: 'IMPERATOR', price: 999, color: 'from-amber-500 to-amber-600' },
  { name: 'DRAGON', price: 1899, color: 'from-red-500 to-red-600' },
  { name: 'HELPER', price: 6666, color: 'from-cyan-500 to-cyan-600' },
  { name: 'GOD', price: 4444, oldPrice: 7777, featured: true, color: 'from-yellow-400 to-yellow-600' },
  { name: 'PEGAS', price: 2126, oldPrice: 7777, featured: true, color: 'from-indigo-500 to-indigo-700' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'faq' | 'donate' | 'contact'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = saved === 'dark' || (!saved && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const categories: Category[] = ['all', 'технологии', 'дизайн', 'разработка', 'новости'];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">VoidGrief</h1>
            <div className="flex items-center gap-6">
              <button
                onClick={() => setActiveSection('home')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Главная
              </button>
              <button
                onClick={() => setActiveSection('about')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                О проекте
              </button>
              <button
                onClick={() => setActiveSection('faq')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'faq' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                FAQ
              </button>
              <button
                onClick={() => setActiveSection('donate')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'donate' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Донат
              </button>
              <button
                onClick={() => setActiveSection('contact')}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === 'contact' ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                Контакты
              </button>
              <button
                onClick={toggleTheme}
                className="ml-2 p-2 rounded-lg hover:bg-secondary transition-colors"
                aria-label="Переключить тему"
              >
                {isDark ? (
                  <Icon name="Sun" className="h-5 w-5" />
                ) : (
                  <Icon name="Moon" className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center space-y-6 py-12">
              <h2 className="text-5xl font-bold tracking-tight">
                Добро пожаловать в VoidGrief
              </h2>
              <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Майнкрафт сервер для настоящих игроков
              </p>
              <div className="flex gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => setActiveSection('donate')}>
                  Донат привилегии
                </Button>
                <Button size="lg" variant="outline" onClick={() => setActiveSection('about')}>
                  Узнать больше
                </Button>
              </div>
            </section>


          </div>
        )}

        {activeSection === 'about' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <h2 className="text-3xl font-bold leading-relaxed">О сервере VoidGrief</h2>
            <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
              <p>
                VoidGrief — это Minecraft сервер, созданный для настоящих игроков.
                Здесь ты найдешь друзей и приключения.
              </p>
              <p>
                Уникальные режимы игры, дружное сообщество и постоянные обновления.
                Присоединяйся к нам прямо сейчас!
              </p>
              <div className="grid md:grid-cols-3 gap-6 pt-8">
                <Card>
                  <CardHeader>
                    <Icon name="Pickaxe" className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base leading-relaxed">Выживание</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Классический режим с уникальными фичами
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="Users" className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base leading-relaxed">Сообщество</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Дружное комьюнити и помощь новичкам
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <Icon name="Zap" className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-base leading-relaxed">Привилегии</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Уникальные возможности для игроков
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Часто задаваемые вопросы</h2>
              <p className="text-muted-foreground">Ответы на популярные вопросы</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}

        {activeSection === 'donate' && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Донат привилегии</h2>
              <p className="text-muted-foreground">Поддержите проект и получите эксклюзивные возможности</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {donatePrivileges.map((privilege) => (
                <Card 
                  key={privilege.name} 
                  className={`relative overflow-hidden transition-all hover:scale-105 ${
                    privilege.featured ? 'ring-2 ring-primary shadow-xl' : 'hover:shadow-lg'
                  }`}
                >
                  {privilege.featured && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                      ХИТ
                    </div>
                  )}
                  <CardHeader className={`bg-gradient-to-br ${privilege.color} text-white pb-8`}>
                    <CardTitle className="text-2xl font-bold text-center">{privilege.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6 space-y-4">
                    <div className="text-center">
                      {privilege.oldPrice && (
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-sm text-muted-foreground line-through">
                            {privilege.oldPrice} ₽
                          </span>
                          <Badge variant="destructive" className="text-xs">
                            СКИДКА
                          </Badge>
                        </div>
                      )}
                      <div className="text-4xl font-bold">{privilege.price} ₽</div>
                    </div>
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        const message = `Привет! Хочу купить привилегию ${privilege.name} за ${privilege.price} ₽`;
                        window.open(`https://t.me/voidgriefinfo?text=${encodeURIComponent(message)}`, '_blank');
                      }}
                    >
                      Купить
                      <Icon name="ShoppingCart" className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Info" className="h-5 w-5 text-primary" />
                  Что дают привилегии?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" />
                  <p>Доступ к эксклюзивным материалам и статьям</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" />
                  <p>Приоритетная поддержка от команды</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" />
                  <p>Уникальный бейдж в профиле</p>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Check" className="h-5 w-5 text-primary mt-0.5" />
                  <p>Участие в закрытых мероприятиях сообщества</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <h2 className="text-4xl font-bold">Контакты</h2>
              <p className="text-muted-foreground">Свяжитесь с нами</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
                <CardDescription>Мы ответим в течение 24 часов</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Имя</label>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Сообщение</label>
                  <textarea
                    placeholder="Ваше сообщение..."
                    rows={5}
                    className="w-full px-3 py-2 border rounded-md bg-background resize-none"
                  />
                </div>
                <Button 
                  className="w-full"
                  onClick={() => {
                    window.open('https://t.me/voidgriefinfo', '_blank');
                  }}
                >
                  Написать в Telegram
                  <Icon name="Send" className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <Icon name="Mail" className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-base">Email</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">maximannenkov367@gmail.com</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="MessageCircle" className="h-6 w-6 text-primary mb-2" />
                  <CardTitle className="text-base">Telegram</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">@voidgriefinfo</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 VoidGrief. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;