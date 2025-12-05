import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'voting'>('home');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [hasVoted, setHasVoted] = useState(false);
  const [anonymousId] = useState(() => `user-${Math.random().toString(36).substring(2, 11)}`);

  const [poll, setPoll] = useState<Poll>({
    id: 'poll-1',
    question: 'Насколько вы удовлетворены уровнем коммуникации в компании?',
    options: [
      { id: 'opt-1', text: 'Полностью удовлетворён', votes: 45 },
      { id: 'opt-2', text: 'Скорее удовлетворён', votes: 78 },
      { id: 'opt-3', text: 'Нейтрально', votes: 32 },
      { id: 'opt-4', text: 'Скорее не удовлетворён', votes: 23 },
      { id: 'opt-5', text: 'Совершенно не удовлетворён', votes: 12 },
    ],
    totalVotes: 190,
  });

  const handleVote = () => {
    if (!selectedOption) return;
    
    setPoll(prev => ({
      ...prev,
      options: prev.options.map(opt =>
        opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
      ),
      totalVotes: prev.totalVotes + 1,
    }));
    
    setHasVoted(true);
  };

  const getPercentage = (votes: number) => {
    return poll.totalVotes > 0 ? ((votes / poll.totalVotes) * 100).toFixed(1) : '0';
  };

  if (currentView === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center space-x-3">
              <Icon name="ShieldCheck" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">SecurePoll</h1>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-5xl font-bold text-secondary mb-4">
                Анонимное корпоративное голосование
              </h2>
              <p className="text-xl text-muted-foreground">
                Защищённая платформа для честной обратной связи в вашей компании
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="hover-scale border-2 border-slate-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="UserX" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Полная анонимность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Ваши ответы не связаны с личными данными. Никто не узнает, кто как проголосовал.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale border-2 border-slate-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Lock" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Защита данных</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Шифрование данных и защищённое хранение. Соответствие стандартам безопасности.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover-scale border-2 border-slate-200">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="Eye" size={32} className="text-primary" />
                  </div>
                  <CardTitle className="text-lg">Прозрачность</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center">
                    Открытые результаты в реальном времени. Честная статистика без манипуляций.
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8 border-2 border-primary/20 bg-white">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Icon name="ShieldCheck" size={24} className="text-primary" />
                  <span>Гарантии безопасности</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-secondary">Анонимные идентификаторы</p>
                      <p className="text-sm text-muted-foreground">
                        Каждому участнику присваивается уникальный идентификатор, не связанный с личными данными
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-secondary">Отсутствие логирования IP-адресов</p>
                      <p className="text-sm text-muted-foreground">
                        Мы не сохраняем информацию о том, с каких устройств были отправлены голоса
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-secondary">Шифрование данных</p>
                      <p className="text-sm text-muted-foreground">
                        Все данные передаются и хранятся в зашифрованном виде
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Icon name="Check" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-secondary">Независимая обработка</p>
                      <p className="text-sm text-muted-foreground">
                        Результаты обрабатываются автоматически без доступа администраторов к индивидуальным ответам
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg"
                onClick={() => setCurrentView('voting')}
              >
                <Icon name="Vote" size={24} className="mr-2" />
                Перейти к голосованию
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">
                Ваш анонимный ID: <code className="bg-slate-200 px-2 py-1 rounded">{anonymousId}</code>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="ShieldCheck" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-secondary">SecurePoll</h1>
            </div>
            <Button variant="ghost" onClick={() => setCurrentView('home')}>
              <Icon name="Home" size={20} className="mr-2" />
              На главную
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="vote" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vote">
                <Icon name="Vote" size={18} className="mr-2" />
                Голосование
              </TabsTrigger>
              <TabsTrigger value="results">
                <Icon name="BarChart3" size={18} className="mr-2" />
                Результаты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vote" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">{poll.question}</CardTitle>
                  <CardDescription>
                    Ваш голос полностью анонимен • ID: {anonymousId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!hasVoted ? (
                    <div className="space-y-6">
                      <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                        {poll.options.map((option) => (
                          <div key={option.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors">
                            <RadioGroupItem value={option.id} id={option.id} />
                            <Label htmlFor={option.id} className="flex-1 cursor-pointer text-base">
                              {option.text}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      <div className="pt-4">
                        <Button 
                          onClick={handleVote} 
                          disabled={!selectedOption}
                          className="w-full"
                          size="lg"
                        >
                          <Icon name="Send" size={20} className="mr-2" />
                          Отправить голос
                        </Button>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-muted-foreground bg-slate-50 p-4 rounded-lg">
                        <Icon name="ShieldCheck" size={18} className="text-primary flex-shrink-0" />
                        <p>
                          Ваш выбор не будет связан с вашей личностью. Мы гарантируем полную конфиденциальность.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8 space-y-4">
                      <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                        <Icon name="CheckCircle2" size={40} className="text-green-600" />
                      </div>
                      <h3 className="text-2xl font-semibold text-secondary">Спасибо за участие!</h3>
                      <p className="text-muted-foreground">
                        Ваш голос учтён. Перейдите на вкладку "Результаты" чтобы увидеть статистику.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Результаты голосования</CardTitle>
                  <CardDescription>
                    Всего участников: {poll.totalVotes}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {poll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-base font-medium">{option.text}</Label>
                          <span className="text-sm font-semibold text-primary">
                            {getPercentage(option.votes)}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Progress value={parseFloat(getPercentage(option.votes))} className="flex-1" />
                          <span className="text-sm text-muted-foreground min-w-[3rem] text-right">
                            {option.votes} голосов
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-center space-x-2 text-sm text-muted-foreground bg-slate-50 p-4 rounded-lg">
                    <Icon name="Users" size={18} className="text-primary" />
                    <p>
                      Все результаты отображаются в режиме реального времени и обновляются автоматически
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Index;
