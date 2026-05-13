// MSB Mock Data - in-memory + localStorage backed
// Russian/UZ-language strings to match Figma file ("Мои счета", "Кадры", etc.)

const MSB_DATA = {
  company: {
    name: "OOO 'Demo Company 2'",
    inn: '123456789',
    mfo: '00444',
    code: '12345678',
    director: 'Сидорова Василиса Петровна',
    accountant: 'Сидорова Василиса Петровна',
    address: 'г. Ташкент, ул. Амира Темура, 12',
    plan: 'Бизнес Плюс',
  },

  balance: { total: 1236266153.00, currency: 'UZS' },

  turnover: {
    startBalance: 25883267284,
    endBalance: 25907187284,
    income: 87450000,
    expense: 63530000,
  },

  expenseReport: [
    { name: 'Оплата труда',       day: 0, month: 0, year: 0 },
    { name: 'Финансовые расходы', day: 0, month: 0, year: 0 },
    { name: 'Таможня',            day: 0, month: 0, year: 0 },
    { name: 'Налоги',             day: 0, month: 0, year: 0 },
  ],

  accounts: [
    {
      id: 'acc-01186',
      number: '210114040105400838001',
      code: '01186',
      status: 'unapproved',   // Неутвержден
      balance: 0.00,
      currency: 'UZS',
    },
    {
      id: 'acc-01187',
      number: '210114040105400838002',
      code: '01187',
      status: 'approved',     // Утвержден
      balance: 101000856.00,
      currency: 'UZS',
    },
    {
      id: 'acc-01188',
      number: '210114040105400838003',
      code: '01188',
      status: 'processing',   // В процессе
      balance: 75.00,
      currency: 'UZS',
    },
  ],

  accountStatus: {
    unapproved: { label: 'Неутвержден', color: '#D2222D' },
    approved:   { label: 'Утвержден',   color: '#16A34A' },
    processing: { label: 'В процессе',  color: '#EAB308' },
  },

  transactions: [
    { id: 't1', accountId: 'acc-main', date: '2026-05-13', time: '14:22', counterparty: 'OOO «Alfa Logistics»', type: 'income',  amount: 12500000, status: 'done', category: 'Поступление', description: 'Оплата по договору №24-A' },
    { id: 't2', accountId: 'acc-main', date: '2026-05-13', time: '11:08', counterparty: 'GNK (Налоговый комитет)', type: 'expense', amount: 4250000, status: 'done', category: 'Налоги', description: 'НДС за апрель 2026' },
    { id: 't3', accountId: 'acc-main', date: '2026-05-12', time: '17:45', counterparty: 'Зарплата · 8 сотрудников', type: 'expense', amount: 28400000, status: 'done', category: 'Зарплата', description: 'Зарплатный реестр №15' },
    { id: 't4', accountId: 'acc-main', date: '2026-05-12', time: '09:30', counterparty: 'OOO «Beta Supply»', type: 'income',  amount: 8200000,  status: 'done', category: 'Поступление', description: 'Предоплата 50%' },
    { id: 't5', accountId: 'acc-main', date: '2026-05-11', time: '16:20', counterparty: 'OOO «Beeline»', type: 'expense', amount: 1240000,  status: 'done', category: 'Связь', description: 'Корпоративная связь, май' },
    { id: 't6', accountId: 'acc-main', date: '2026-05-10', time: '13:15', counterparty: 'ИП Назаров Б.К.', type: 'expense', amount: 3700000,  status: 'done', category: 'Услуги', description: 'Аренда офиса, май' },
    { id: 't7', accountId: 'acc-main', date: '2026-05-10', time: '10:02', counterparty: 'OOO «Gamma Retail»', type: 'income',  amount: 18900000, status: 'done', category: 'Поступление', description: 'Оплата по счёту №112' },
    { id: 't8', accountId: 'acc-main', date: '2026-05-09', time: '15:30', counterparty: 'Пенсионный фонд', type: 'expense', amount: 2100000,  status: 'done', category: 'Налоги', description: 'Пенсионные отчисления' },
    { id: 't9', accountId: 'acc-main', date: '2026-05-08', time: '12:00', counterparty: 'OOO «Delta Trade»', type: 'income',  amount: 6500000,  status: 'pending', category: 'Поступление', description: 'Ожидает подтверждения' },
    { id: 't10', accountId: 'acc-main', date: '2026-05-07', time: '11:18', counterparty: 'OOO «Uzbektelecom»', type: 'expense', amount: 380000, status: 'done', category: 'Связь', description: 'Интернет, май' },
    { id: 't11', accountId: 'acc-transit', date: '2026-05-13', time: '13:00', counterparty: 'QR · ID #84212', type: 'income', amount: 1850000, status: 'done', category: 'QR оплата', description: 'Поступление через QR' },
    { id: 't12', accountId: 'acc-transit', date: '2026-05-13', time: '10:45', counterparty: 'QR · ID #84211', type: 'income', amount: 920000,  status: 'done', category: 'QR оплата', description: 'Поступление через QR' },
    { id: 't13', accountId: 'acc-usd', date: '2026-05-09', time: '14:00', counterparty: 'Sigma Imports Inc.', type: 'income', amount: 4200, status: 'done', category: 'Поступление', description: 'Wire transfer SWIFT' },
    { id: 't14', accountId: 'acc-main', date: '2026-05-06', time: '09:00', counterparty: 'OOO «Carbon Logistics»', type: 'expense', amount: 5800000, status: 'done', category: 'Поставки', description: 'Транспортные услуги' },
    { id: 't15', accountId: 'acc-main', date: '2026-05-05', time: '17:00', counterparty: 'OOO «Epsilon Group»', type: 'income', amount: 22100000, status: 'done', category: 'Поступление', description: 'Финальная оплата по контракту' },
  ],

  staff: [
    { id: 'e1', company: 'OOO "Demo Company 1"', name: 'Владислав Николаев', position: 'Менеджер',     phone: '+998 90 111 22 33', email: 'v.nikolaev@dc1.uz' },
    { id: 'e2', company: 'OOO "Demo Company 1"', name: 'Анна Сергеева',     position: 'Дизайнер',     phone: '+998 90 222 33 44', email: 'a.sergeeva@dc1.uz' },
    { id: 'e3', company: 'OOO "Demo Company 1"', name: 'Игорь Петров',       position: 'Разработчик',  phone: '+998 90 333 44 55', email: 'i.petrov@dc1.uz' },
    { id: 'e4', company: 'OOO "Demo Company 2"', name: 'Владислав Николаев', position: 'Менеджер',     phone: '+998 90 444 55 66', email: 'v.nikolaev@dc2.uz' },
    { id: 'e5', company: 'OOO "Demo Company 2"', name: 'Анна Сергеева',     position: 'Дизайнер',     phone: '+998 90 555 66 77', email: 'a.sergeeva@dc2.uz' },
    { id: 'e6', company: 'OOO "Demo Company 2"', name: 'Игорь Петров',       position: 'Разработчик',  phone: '+998 90 666 77 88', email: 'i.petrov@dc2.uz' },
    { id: 'e7', company: 'OOO "Demo Company 2"', name: 'Светлана Иванова',   position: 'Маркетолог',   phone: '+998 90 777 88 99', email: 's.ivanova@dc2.uz' },
    { id: 'e8', company: 'OOO "Demo Company 2"', name: 'Дмитрий Кузнецов',   position: 'Аналитик',     phone: '+998 90 888 99 00', email: 'd.kuznetsov@dc2.uz' },
  ],

  payrolls: [
    { id: 'p15', period: 'Апрель 2026', date: '2026-05-12', total: 28400000, employees: 8, status: 'paid' },
    { id: 'p14', period: 'Март 2026',   date: '2026-04-12', total: 28400000, employees: 8, status: 'paid' },
    { id: 'p13', period: 'Февраль 2026', date: '2026-03-12', total: 26200000, employees: 7, status: 'paid' },
    { id: 'p16', period: 'Май 2026',    date: '2026-06-12', total: 28400000, employees: 8, status: 'draft' },
  ],

  counterparties: [
    { id: 'c1', name: 'OOO «Alfa Logistics»',  type: 'debtor',   balance: 12500000, inn: '301245678', contact: '+998 71 200 12 34', city: 'Ташкент' },
    { id: 'c2', name: 'OOO «Beta Supply»',     type: 'debtor',   balance: 8200000,  inn: '302456789', contact: '+998 71 200 23 45', city: 'Ташкент' },
    { id: 'c3', name: 'OOO «Gamma Retail»',    type: 'debtor',   balance: 18900000, inn: '303567890', contact: '+998 71 200 34 56', city: 'Самарканд' },
    { id: 'c4', name: 'OOO «Carbon Logistics»', type: 'creditor', balance: 5800000,  inn: '304678901', contact: '+998 71 200 45 67', city: 'Ташкент' },
    { id: 'c5', name: 'ИП Назаров Б.К.',       type: 'creditor', balance: 3700000,  inn: '305789012', contact: '+998 71 200 56 78', city: 'Ташкент' },
    { id: 'c6', name: 'OOO «Delta Trade»',     type: 'debtor',   balance: 6500000,  inn: '306890123', contact: '+998 71 200 67 89', city: 'Бухара' },
    { id: 'c7', name: 'OOO «Epsilon Group»',   type: 'debtor',   balance: 0,        inn: '307901234', contact: '+998 71 200 78 90', city: 'Ташкент' },
    { id: 'c8', name: 'Sigma Imports Inc.',    type: 'debtor',   balance: 4200,     inn: 'US-FEIN-22-1', contact: '+1 415 555 0142', city: 'San Francisco', currency: 'USD' },
  ],

  documents: [
    { id: 'd1', title: 'Договор поставки №24-A',   counterparty: 'OOO «Alfa Logistics»', date: '2026-05-10', status: 'signed',   category: 'Договор',    template: false },
    { id: 'd2', title: 'Счёт №112',                counterparty: 'OOO «Gamma Retail»',  date: '2026-05-09', status: 'paid',     category: 'Счёт',       template: false },
    { id: 'd3', title: 'Акт выполненных работ',    counterparty: 'OOO «Beta Supply»',   date: '2026-05-08', status: 'pending',  category: 'Акт',        template: false },
    { id: 'd4', title: 'Счёт-фактура №2026/045',   counterparty: 'OOO «Gamma Retail»',  date: '2026-05-07', status: 'signed',   category: 'Счёт-фактура', template: false },
    { id: 'd5', title: 'Дополнительное соглашение №3', counterparty: 'OOO «Beta Supply»', date: '2026-05-05', status: 'draft',  category: 'Договор',    template: false },
  ],

  templates: [
    { id: 'tpl1', title: 'Приказ о приёме на работу',   category: 'Кадры',  usageCount: 12 },
    { id: 'tpl2', title: 'Приказ об увольнении',         category: 'Кадры',  usageCount: 3 },
    { id: 'tpl3', title: 'Приказ об отпуске',            category: 'Кадры',  usageCount: 18 },
    { id: 'tpl4', title: 'Договор о материальной ответственности', category: 'Кадры',  usageCount: 5 },
    { id: 'tpl5', title: 'Трудовой договор',             category: 'Кадры',  usageCount: 8 },
    { id: 'tpl6', title: 'Должностная инструкция',       category: 'Кадры',  usageCount: 8 },
    { id: 'tpl7', title: 'Счёт-фактура',                 category: 'Учёт',   usageCount: 245 },
    { id: 'tpl8', title: 'Акт сверки',                   category: 'Учёт',   usageCount: 32 },
  ],

  qrCodes: [
    { id: '0081', card: '3267 4287 4298 1234', amount: 499997.00, type: 'dynamic',  status: 'active',     created: '09.29.2025 / 16:27', expiry: 'Бессрочная' },
    { id: '0082', card: '3267 4287 4298 1234', amount: 499997.00, type: 'static',   status: 'used',       created: '09.29.2025 / 16:27', expiry: '09.29.2025 / 16:30' },
    { id: '0083', card: '4278 5123 4387 5678', amount: 375250.00, type: 'static',   status: 'expired',    created: '11.15.2025 / 10:45', expiry: '11.15.2025 / 11:45' },
  ],

  qrStatus: {
    active:  { label: 'Активный',     color: '#16A34A' },
    used:    { label: 'Использовано', color: '#EAB308' },
    expired: { label: 'Истекший',     color: '#D2222D' },
  },
  qrType: {
    dynamic: { label: 'Динамичный', color: '#A855F7' },
    static:  { label: 'Статичный',  color: '#2563EB' },
  },

  payrollContracts: [
    { id: 'pc1', name: 'Зарплата',          balance: 0.00, employees: 10 },
    { id: 'pc2', name: 'Ребята по контракту', balance: 0.00, employees: 5 },
  ],

  payrollRegistries: [
    { id: 'pr1', contractId: 'pc1', name: 'Премия, октябрь', date: '14.10.2024 15:27', status: 'in_progress', amount: 1000000000.00, needsConfirm: true },
    { id: 'pr2', contractId: 'pc1', name: 'Премия, октябрь', date: '14.10.2024 15:27', status: 'in_progress', amount: 1000000000.00, needsConfirm: true },
    { id: 'pr3', contractId: 'pc1', name: 'Аванс, октябрь',  date: '14.10.2024 15:27', status: 'new',         amount: 190900000.00 },
    { id: 'pr4', contractId: 'pc1', name: 'Аванс, октябрь',  date: '14.10.2024 15:27', status: 'ready',       amount: 190900000.00 },
    { id: 'pr5', contractId: 'pc1', name: 'Расчет, сентябрь', date: '30.09.2024 15:27', status: 'completed',   amount: 300153215.02 },
    { id: 'pr6', contractId: 'pc1', name: 'Отпускной',        date: '25.09.2024 00:27', status: 'cancelled',   amount: 15139697.00 },
  ],

  payrollRegistryStatus: {
    in_progress: { label: 'Реестр в процессе', color: '#EAB308' },
    new:         { label: 'Новый реестр',      color: '#2563EB' },
    ready:       { label: 'Готовый реестр',    color: '#2563EB' },
    completed:   { label: 'Завершенный реестр', color: '#16A34A' },
    cancelled:   { label: 'Отмененный реестр', color: '#D2222D' },
    approved:    { label: 'Утвержден',         color: '#16A34A' },
  },

  payrollEmployees: [
    { id: 'pe1', card: '4014 0177 8989 1342', name: 'Алимов Бахром Турсунович',   amount: 11500000 },
    { id: 'pe2', card: '4014 0177 8989 7766', name: 'Каримова Дилфуза Шахобовна', amount: 9200000 },
    { id: 'pe3', card: '4014 0177 8989 6655', name: 'Раджабов Тимур Алишерович', amount: 8400000 },
    { id: 'pe4', card: '4014 0177 8989 5544', name: 'Назарова Лола Икромовна',    amount: 7800000 },
    { id: 'pe5', card: '4014 0177 8989 4433', name: 'Юлдашев Жасур Анварович',    amount: 7200000 },
    { id: 'pe6', card: '4014 0177 8989 3322', name: 'Хасанов Дильшод Рустамович', amount: 6800000 },
    { id: 'pe7', card: '4014 0177 8989 2211', name: 'Усманова Севара Фаридовна',   amount: 6200000 },
    { id: 'pe8', card: '4014 0177 8989 1100', name: 'Гулямов Рустам Бахтиёрович', amount: 5800000 },
    { id: 'pe9', card: '4014 0177 8989 0099', name: 'Ахмедов Жасур Анварович',    amount: 5400000 },
    { id: 'pe10', card: '4014 0177 8989 9988', name: 'Турсунова Зарина Шавкатовна', amount: 4800000 },
  ],

  qrOperations: [
    { id: 'op1', terminal: 'Test',   amount: 499997.00, status: 'pending',    date: '27.03.2024 / 16:08' },
    { id: 'op2', terminal: 'Test',   amount: 499997.00, status: 'pending',    date: '27.03.2024 / 16:08' },
    { id: 'op3', terminal: 'Demo',   amount: 750000.00, status: 'processing', date: '28.03.2024 / 10:15' },
    { id: 'op4', terminal: 'Test',   amount: 499997.00, status: 'credited',   date: '27.03.2024 / 16:08' },
    { id: 'op5', terminal: 'Demo',   amount: 750000.00, status: 'credited',   date: '28.03.2024 / 10:15' },
    { id: 'op6', terminal: 'Sample', amount: 1200000.00, status: 'credited',  date: '29.03.2024 / 12:30' },
  ],

  qrOpStatus: {
    pending:    { label: 'Ожидание',  color: '#EAB308' },
    processing: { label: 'Обработка', color: '#F97316' },
    credited:   { label: 'Зачислено', color: '#16A34A' },
  },

  qrPayments: [
    { id: 'qp1', qrId: 'qr1', amount: 1850000, date: '2026-05-13', time: '13:00', payer: 'Каримов Ф.А.', status: 'done' },
    { id: 'qp2', qrId: 'qr1', amount: 920000,  date: '2026-05-13', time: '10:45', payer: 'Алимова Г.С.', status: 'done' },
    { id: 'qp3', qrId: 'qr1', amount: 540000,  date: '2026-05-12', time: '18:20', payer: 'Юлдашев Р.К.', status: 'done' },
    { id: 'qp4', qrId: 'qr2', amount: 320000,  date: '2026-05-12', time: '14:15', payer: 'Назаров Б.Б.', status: 'done' },
    { id: 'qp5', qrId: 'qr1', amount: 1200000, date: '2026-05-11', time: '16:30', payer: 'Хасанов Д.Т.', status: 'done' },
  ],

  notifications: [
    { id: 'n1', title: 'Поступление 12 500 000 сум', body: 'OOO «Alfa Logistics» · Договор №24-A', date: '2026-05-13', time: '14:22', read: false, icon: '↓' },
    { id: 'n2', title: 'Зарплатный реестр готов', body: 'Реестр №15 на 28 400 000 сум ожидает подтверждения', date: '2026-05-12', time: '17:00', read: false, icon: '👥' },
    { id: 'n3', title: 'Срок уплаты НДС', body: 'До 25 мая необходимо уплатить НДС за апрель', date: '2026-05-12', time: '09:00', read: true, icon: '⏰' },
    { id: 'n4', title: 'Новый документ на подпись', body: 'Акт выполненных работ от OOO «Beta Supply»', date: '2026-05-11', time: '11:30', read: true, icon: '📄' },
  ],
};

if (typeof window !== 'undefined') {
  window.MSB_DATA = MSB_DATA;
}
