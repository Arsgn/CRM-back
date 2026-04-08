import { config } from "dotenv";
config();

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const priceData = [
  {
    name: "Офтальмология",
    services: [
      { name: "Первичный приём офтальмолога", price: 1500 },
      { name: "Повторный приём", price: 700 },
      { name: "Проверка остроты зрения", price: 400 },
      { name: "Подбор очков / линз", price: 900 },
    ],
  },
  {
    name: "Кардиология",
    services: [
      { name: "Первичный приём кардиолога", price: 1200 },
      { name: "Повторный приём", price: 800 },
      { name: "ЭКГ с расшифровкой", price: 600 },
      { name: "Суточное мониторирование ЭКГ", price: 3500 },
    ],
  },
  {
    name: "Гастроэнтерология",
    services: [
      { name: "Первичный приём гастроэнтеролога", price: 1400 },
      { name: "Повторный приём", price: 800 },
      { name: "УЗИ органов брюшной полости", price: 2000 },
      { name: "Гастроскопия (ФГДС)", price: 4500 },
    ],
  },
  {
    name: "Эндокринология",
    services: [
      { name: "Первичный приём эндокринолога", price: 1300 },
      { name: "Повторный приём", price: 700 },
      { name: "Анализ на гормоны щитовидной железы", price: 1800 },
      { name: "УЗИ щитовидной железы", price: 1200 },
    ],
  },
  {
    name: "Дерматология",
    services: [
      { name: "Первичный приём дерматолога", price: 1100 },
      { name: "Повторный приём", price: 600 },
      { name: "Дерматоскопия", price: 800 },
      { name: "Криодеструкция (1 элемент)", price: 500 },
    ],
  },
  {
    name: "Ортопедия",
    services: [
      { name: "Первичный приём ортопеда-травматолога", price: 1500 },
      { name: "Повторный приём", price: 900 },
      { name: "Рентгенография (1 проекция)", price: 700 },
      { name: "Наложение гипсовой повязки", price: 2000 },
    ],
  },
  {
    name: "Педиатрия",
    services: [
      { name: "Первичный приём педиатра", price: 1200 },
      { name: "Повторный приём", price: 700 },
      { name: "Профилактический осмотр", price: 1000 },
      { name: "Вакцинация (без стоимости вакцины)", price: 400 },
    ],
  },
  {
    name: "Психотерапия",
    services: [
      { name: "Первичная консультация", price: 2000 },
      { name: "Индивидуальный сеанс (50 мин)", price: 1800 },
      { name: "Парная / семейная терапия", price: 2500 },
      { name: "Групповое занятие", price: 900 },
    ],
  },
  {
    name: "Стоматология",
    services: [
      { name: "Первичный осмотр", price: 500 },
      { name: "Лечение кариеса (1 зуб)", price: 3000 },
      { name: "Удаление зуба (простое)", price: 1500 },
      { name: "Профессиональная чистка", price: 3500 },
    ],
  },
  {
    name: "Неврология",
    services: [
      { name: "Первичный приём невролога", price: 1400 },
      { name: "Повторный приём", price: 800 },
      { name: "ЭЭГ (электроэнцефалография)", price: 2000 },
      { name: "МРТ головного мозга", price: 5000 },
    ],
  },
  {
    name: "Урология",
    services: [
      { name: "Первичный приём уролога", price: 1300 },
      { name: "Повторный приём", price: 750 },
      { name: "УЗИ почек и мочевого пузыря", price: 1500 },
      { name: "Цистоскопия", price: 3500 },
    ],
  },
  {
    name: "Гинекология",
    services: [
      { name: "Первичный приём гинеколога", price: 1200 },
      { name: "Повторный приём", price: 700 },
      { name: "УЗИ органов малого таза", price: 1200 },
      { name: "Кольпоскопия", price: 1500 },
    ],
  },
  {
    name: "Хирургия",
    services: [
      { name: "Первичный приём хирурга", price: 1300 },
      { name: "Повторный приём", price: 750 },
      { name: "Перевязка", price: 500 },
      { name: "Удаление доброкачественного новообразования", price: 3000 },
    ],
  },
  {
    name: "Косметология",
    services: [
      { name: "Первичный приём косметолога", price: 1000 },
      { name: "Чистка лица", price: 2500 },
      { name: "Мезотерапия (1 зона)", price: 3000 },
      { name: "Пилинг химический", price: 2000 },
    ],
  },
  {
    name: "Физиотерапия",
    services: [
      { name: "Первичный приём физиотерапевта", price: 1000 },
      { name: "Сеанс магнитотерапии", price: 700 },
      { name: "Электрофорез (1 сеанс)", price: 600 },
      { name: "Лазеротерапия (1 сеанс)", price: 800 },
    ],
  },
  {
    name: "Ультразвуковая диагностика",
    services: [
      { name: "УЗИ органов брюшной полости", price: 1500 },
      { name: "УЗИ щитовидной железы", price: 1000 },
      { name: "УЗИ малого таза", price: 1200 },
      { name: "УЗИ сосудов (дуплекс)", price: 2500 },
    ],
  },
  {
    name: "Лечебная физкультура",
    services: [
      { name: "Первичный приём врача ЛФК", price: 1000 },
      { name: "Индивидуальное занятие", price: 1200 },
      { name: "Групповое занятие", price: 600 },
      { name: "Составление программы реабилитации", price: 1500 },
    ],
  },
  {
    name: "Диетология",
    services: [
      { name: "Первичная консультация диетолога", price: 1200 },
      { name: "Повторный приём", price: 700 },
      { name: "Составление плана питания", price: 1500 },
      { name: "Анализ состава тела", price: 800 },
    ],
  },
  {
    name: "Пульмонология",
    services: [
      { name: "Первичный приём пульмонолога", price: 1400 },
      { name: "Повторный приём", price: 800 },
      { name: "Спирометрия", price: 1200 },
      { name: "Бронхоскопия", price: 4000 },
    ],
  },
  {
    name: "Ревматология",
    services: [
      { name: "Первичный приём ревматолога", price: 1400 },
      { name: "Повторный приём", price: 800 },
      { name: "Анализ на ревматоидный фактор", price: 900 },
      { name: "Внутрисуставная инъекция", price: 2000 },
    ],
  },
];

async function main() {
  console.log("🌱 Начинаем заполнение базы данных...");

  for (const categoryData of priceData) {
    const category = await prisma.category.upsert({
      where: { name: categoryData.name },
      update: {},
      create: { name: categoryData.name },
    });

    for (const service of categoryData.services) {
      await prisma.service.upsert({
        where: {
          name_categoryId: {
            name: service.name,
            categoryId: category.id,
          },
        },
        update: {
          price: service.price,
        },
        create: {
          name: service.name,
          price: service.price,
          categoryId: category.id,
        },
      });
    }

    console.log(`✅ ${categoryData.name} обновлена`);
  }

  console.log("🎉 База данных заполнена успешно!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
