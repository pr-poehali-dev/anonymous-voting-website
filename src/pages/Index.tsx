import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  totalVotes: number;
  createdAt: Date;
  isActive: boolean;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'polls' | 'voting'>('home');
  const [selectedPollId, setSelectedPollId] = useState<string | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set());
  const [anonymousId] = useState(() => `user-${Math.random().toString(36).substring(2, 11)}`);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  const [newPollQuestion, setNewPollQuestion] = useState('');
  const [newPollOptions, setNewPollOptions] = useState(['', '', '']);

  const [polls, setPolls] = useState<Poll[]>([
    {
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
      createdAt: new Date('2024-01-15'),
      isActive: true,
    },
    {
      id: 'poll-2',
      question: 'Какие инструменты для удалённой работы вы считаете наиболее эффективными?',
      options: [
        { id: 'opt-6', text: 'Видеоконференции', votes: 67 },
        { id: 'opt-7', text: 'Мессенджеры', votes: 89 },
        { id: 'opt-8', text: 'Таск-менеджеры', votes: 54 },
        { id: 'opt-9', text: 'Общие документы', votes: 43 },
      ],
      totalVotes: 253,
      createdAt: new Date('2024-01-18'),
      isActive: true,
    },
  ]);

  const handleVote = (pollId: string) => {
    if (!selectedOption) return;
    
    setPolls(prev => prev.map(p => 
      p.id === pollId 
        ? {
            ...p,
            options: p.options.map(opt =>
              opt.id === selectedOption ? { ...opt, votes: opt.votes + 1 } : opt
            ),
            totalVotes: p.totalVotes + 1,
          }
        : p
    ));
    
    setVotedPolls(prev => new Set(prev).add(pollId));
    setSelectedOption('');
  };

  const handleCreatePoll = () => {
    const validOptions = newPollOptions.filter(opt => opt.trim() !== '');
    
    if (!newPollQuestion.trim() || validOptions.length < 2) {
      return;
    }

    const newPoll: Poll = {
      id: `poll-${Date.now()}`,
      question: newPollQuestion,
      options: validOptions.map((text, idx) => ({
        id: `opt-${Date.now()}-${idx}`,
        text,
        votes: 0,
      })),
      totalVotes: 0,
      createdAt: new Date(),
      isActive: true,
    };

    setPolls(prev => [newPoll, ...prev]);
    setNewPollQuestion('');
    setNewPollOptions(['', '', '']);
    setIsCreateDialogOpen(false);
  };

  const addNewOptionField = () => {
    setNewPollOptions(prev => [...prev, '']);
  };

  const updateOptionField = (index: number, value: string) => {
    setNewPollOptions(prev => prev.map((opt, idx) => idx === index ? value : opt));
  };

  const removeOptionField = (index: number) => {
    if (newPollOptions.length > 2) {
      setNewPollOptions(prev => prev.filter((_, idx) => idx !== index));
    }
  };

  const getPercentage = (votes: number, total: number) => {
    return total > 0 ? ((votes / total) * 100).toFixed(1) : '0';
  };

  const selectedPoll = polls.find(p => p.id === selectedPollId);
  const hasVotedInCurrentPoll = selectedPollId ? votedPolls.has(selectedPollId) : false;

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
                onClick={() => setCurrentView('polls')}
              >
                <Icon name="Vote" size={24} className="mr-2" />
                Перейти к опросам
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

  if (currentView === 'polls') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <header className="bg-white border-b border-slate-200 shadow-sm">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="ShieldCheck" size={32} className="text-primary" />
                <h1 className="text-2xl font-bold text-secondary">SecurePoll</h1>
              </div>
              <div className="flex items-center space-x-3">
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Icon name="Plus" size={20} className="mr-2" />
                      Создать опрос
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Создание нового опроса</DialogTitle>
                      <DialogDescription>
                        Заполните вопрос и варианты ответов для анонимного голосования
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="question">Вопрос опроса</Label>
                        <Textarea
                          id="question"
                          placeholder="Введите вопрос для голосования..."
                          value={newPollQuestion}
                          onChange={(e) => setNewPollQuestion(e.target.value)}
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Варианты ответов (минимум 2)</Label>
                        {newPollOptions.map((option, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <Input
                              placeholder={`Вариант ${index + 1}`}
                              value={option}
                              onChange={(e) => updateOptionField(index, e.target.value)}
                            />
                            {newPollOptions.length > 2 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeOptionField(index)}
                              >
                                <Icon name="X" size={18} />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          onClick={addNewOptionField}
                          className="w-full"
                        >
                          <Icon name="Plus" size={18} className="mr-2" />
                          Добавить вариант
                        </Button>
                      </div>
                      <div className="flex justify-end space-x-2 pt-4">
                        <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                          Отмена
                        </Button>
                        <Button onClick={handleCreatePoll}>
                          Создать опрос
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost" onClick={() => setCurrentView('home')}>
                  <Icon name="Home" size={20} className="mr-2" />
                  На главную
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-secondary mb-2">Активные опросы</h2>
              <p className="text-muted-foreground">
                Всего опросов: {polls.filter(p => p.isActive).length}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {polls.filter(p => p.isActive).map((poll) => (
                <Card key={poll.id} className="hover-scale border-2 border-slate-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg pr-4">{poll.question}</CardTitle>
                      {votedPolls.has(poll.id) && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          <Icon name="CheckCircle2" size={14} className="mr-1" />
                          Проголосовано
                        </Badge>
                      )}
                    </div>
                    <CardDescription>
                      Участников: {poll.totalVotes} • Создан: {poll.createdAt.toLocaleDateString('ru-RU')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {poll.options.slice(0, 3).map((option) => (
                        <div key={option.id} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground truncate">{option.text}</span>
                            <span className="text-primary font-medium">
                              {getPercentage(option.votes, poll.totalVotes)}%
                            </span>
                          </div>
                          <Progress value={parseFloat(getPercentage(option.votes, poll.totalVotes))} />
                        </div>
                      ))}
                      {poll.options.length > 3 && (
                        <p className="text-xs text-muted-foreground">
                          +{poll.options.length - 3} вариантов
                        </p>
                      )}
                    </div>
                    <Button
                      className="w-full mt-4"
                      variant={votedPolls.has(poll.id) ? 'outline' : 'default'}
                      onClick={() => {
                        setSelectedPollId(poll.id);
                        setCurrentView('voting');
                      }}
                    >
                      {votedPolls.has(poll.id) ? (
                        <>
                          <Icon name="BarChart3" size={18} className="mr-2" />
                          Смотреть результаты
                        </>
                      ) : (
                        <>
                          <Icon name="Vote" size={18} className="mr-2" />
                          Участвовать
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {polls.filter(p => p.isActive).length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Icon name="ClipboardList" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Пока нет активных опросов</h3>
                  <p className="text-muted-foreground mb-4">
                    Создайте первый опрос для получения анонимной обратной связи
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)}>
                    <Icon name="Plus" size={18} className="mr-2" />
                    Создать опрос
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    );
  }

  if (!selectedPoll) {
    setCurrentView('polls');
    return null;
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
            <Button variant="ghost" onClick={() => setCurrentView('polls')}>
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              К списку опросов
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue={hasVotedInCurrentPoll ? 'results' : 'vote'} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vote" disabled={hasVotedInCurrentPoll}>
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
                  <CardTitle className="text-2xl">{selectedPoll.question}</CardTitle>
                  <CardDescription>
                    Ваш голос полностью анонимен • ID: {anonymousId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                      {selectedPoll.options.map((option) => (
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
                        onClick={() => handleVote(selectedPoll.id)} 
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
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Результаты голосования</CardTitle>
                  <CardDescription>
                    Всего участников: {selectedPoll.totalVotes}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {hasVotedInCurrentPoll && (
                    <div className="mb-6 text-center py-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center justify-center space-x-2">
                        <Icon name="CheckCircle2" size={20} className="text-green-600" />
                        <p className="font-medium text-green-800">Спасибо за участие в голосовании!</p>
                      </div>
                    </div>
                  )}

                  <div className="space-y-6">
                    {selectedPoll.options.map((option) => (
                      <div key={option.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label className="text-base font-medium">{option.text}</Label>
                          <span className="text-sm font-semibold text-primary">
                            {getPercentage(option.votes, selectedPoll.totalVotes)}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Progress value={parseFloat(getPercentage(option.votes, selectedPoll.totalVotes))} className="flex-1" />
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
