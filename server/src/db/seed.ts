import bcrypt from 'bcryptjs';
import { pool } from './pool';
import { env } from '../config/env';
import { initializeSchema } from './schema';

interface MenuSeed {
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  category: string;
  imageUrl: string;
}

const menuSeed: readonly MenuSeed[] = [
  {
    name: 'مندي لحم ضاني',
    nameEn: 'Lamb Mandi',
    description: 'لحم ضاني طري مطبوخ في التنور على الحجر مع أرز بسمتي معطّر',
    descriptionEn: 'Tender lamb slow-cooked in a stone tandoor with spiced basmati rice',
    price: 320,
    category: 'mandi',
    imageUrl:
      'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مندي دجاج',
    nameEn: 'Chicken Mandi',
    description: 'نصف دجاجة بلدية متبّلة بالبهارات الحضرمية مع أرز المندي',
    descriptionEn: 'Free-range chicken marinated in Hadrami spices with mandi rice',
    price: 180,
    category: 'mandi',
    imageUrl:
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مندي لحم بقري',
    nameEn: 'Beef Mandi',
    description: 'قطع لحم بقري مطهوة ببطء حتى الطراوة مع أرز بسمتي',
    descriptionEn: 'Slow-cooked beef cuts served over fragrant basmati rice',
    price: 260,
    category: 'mandi',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مدفون لحم',
    nameEn: 'Lamb Madhbi',
    description: 'لحم مشوي على الحجر الحار بنكهة مدخّنة مميزة',
    descriptionEn: 'Lamb grilled on hot stone with a distinctive smoky flavour',
    price: 350,
    category: 'madhbi',
    imageUrl:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مدفون دجاج',
    nameEn: 'Chicken Madhbi',
    description: 'دجاج متبّل بالأعشاب والليمون الأسود مشوي على الحجر',
    descriptionEn: 'Chicken marinated with herbs and black lime, stone-grilled',
    price: 200,
    category: 'madhbi',
    imageUrl:
      'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مظلة لحم',
    nameEn: 'Lamb Mathloutha',
    description: 'لحم مطبوخ مع الخضار والبهارات والأرز على الطريقة الحضرمية',
    descriptionEn: 'Lamb cooked with vegetables, spices and rice, Hadrami style',
    price: 300,
    category: 'mathloutha',
    imageUrl:
      'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مظلة دجاج',
    nameEn: 'Chicken Mathloutha',
    description: 'دجاج وأرز بالبهارات الحضرمية مع طبق جانبي من المرق',
    descriptionEn: 'Chicken and rice with Hadrami spices and a side of broth',
    price: 170,
    category: 'mathloutha',
    imageUrl:
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'سلطة حضرموت',
    nameEn: 'Hadramout Salad',
    description: 'خضروات طازجة مع دبس الرمان والليمون',
    descriptionEn: 'Fresh vegetables with pomegranate molasses and lemon',
    price: 45,
    category: 'appetizers',
    imageUrl:
      'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'شوربة عدس',
    nameEn: 'Lentil Soup',
    description: 'شوربة عدس دافئة مع الكمون والليمون',
    descriptionEn: 'Warm lentil soup with cumin and lemon',
    price: 35,
    category: 'appetizers',
    imageUrl:
      'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'سمبوسة لحم',
    nameEn: 'Meat Samosas',
    description: 'ثلاث حبات سمبوسة مقرمشة محشوة باللحم المفروم',
    descriptionEn: 'Three crispy pastries filled with seasoned minced meat',
    price: 60,
    category: 'appetizers',
    imageUrl:
      'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'ليمون بالنعناع',
    nameEn: 'Mint Lemonade',
    description: 'عصير ليمون طازج مع النعناع البلدي',
    descriptionEn: 'Fresh lemon juice blended with mint',
    price: 35,
    category: 'drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'شاي حضرموتي',
    nameEn: 'Hadrami Tea',
    description: 'شاي بالحليب والهيل والقرنفل',
    descriptionEn: 'Black tea brewed with milk, cardamom and cloves',
    price: 20,
    category: 'drinks',
    imageUrl:
      'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'كنافة بالقشطة',
    nameEn: 'Kunafa with Cream',
    description: 'كنافة ذهبية بالقشطة الطازجة والقطر',
    descriptionEn: 'Golden kunafa filled with fresh cream and syrup',
    price: 75,
    category: 'desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'مهلبية حضرمية',
    nameEn: 'Hadrami Muhallebi',
    description: 'مهلبية ناعمة بالفستق والورد',
    descriptionEn: 'Silky milk pudding topped with pistachio and rose',
    price: 40,
    category: 'desserts',
    imageUrl:
      'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
  },
];

export const seedDatabase = async (): Promise<void> => {
  if (env.admin.password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters to seed an admin');
  }

  const [adminRows] = await pool.execute<import('mysql2').RowDataPacket[]>(
    'SELECT id FROM users WHERE email = ? LIMIT 1',
    [env.admin.email.toLowerCase()],
  );

  if (adminRows.length === 0) {
    const passwordHash = await bcrypt.hash(env.admin.password, env.bcryptRounds);
    await pool.execute(
      `INSERT INTO users (name, email, password_hash, phone, role)
       VALUES (?, ?, ?, ?, 'admin')`,
      [env.admin.name, env.admin.email.toLowerCase(), passwordHash, null],
    );
  }

  const [menuCountRows] = await pool.execute<import('mysql2').RowDataPacket[]>(
    'SELECT COUNT(*) AS total FROM menu_items',
  );
  const menuCount = Number(menuCountRows[0]?.total ?? 0);

  if (menuCount === 0) {
    for (const item of menuSeed) {
      await pool.execute(
        `INSERT INTO menu_items
           (name, name_en, description, description_en, price, category, image_url, is_available)
         VALUES (?, ?, ?, ?, ?, ?, ?, TRUE)`,
        [
          item.name,
          item.nameEn,
          item.description,
          item.descriptionEn,
          item.price,
          item.category,
          item.imageUrl,
        ],
      );
    }
  }
};

export const runSeed = async (): Promise<void> => {
  await initializeSchema();
  await seedDatabase();
};

if (require.main === module) {
  void runSeed()
    .then(() => {
      console.log('Database seeded successfully');
      process.exitCode = 0;
    })
    .catch((error: unknown) => {
      console.error('Seeding failed:', error);
      process.exitCode = 1;
    })
    .finally(() => {
      void pool.end();
    });
}
