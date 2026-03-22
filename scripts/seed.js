const { PrismaClient } = require('../app/generated/prisma');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const dataPath = path.join(__dirname, '../data/menu.json');
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const menuItems = JSON.parse(rawData);
    
    console.log(`Seeding ${menuItems.length} menu items...`);
    
    for (const item of menuItems) {
      // Check if it already exists to avoid duplicates
      const exists = await prisma.menuItem.findFirst({ where: { nameEn: item.nameEn } });
      if (!exists) {
        await prisma.menuItem.create({
          data: {
            nameEn: item.nameEn,
            nameAr: item.nameAr,
            descriptionEn: item.descriptionEn,
            descriptionAr: item.descriptionAr,
            price: item.price,
            image: item.image,
            category: item.category,
            isVeg: item.isVeg || false,
            isBestseller: item.isBestseller || false,
            isSpicy: item.isSpicy || false,
            rating: item.rating || 5.0,
            reviews: item.reviews || 0,
            badge: item.badge || null,
          }
        });
      }
    }
    console.log('Seeding finished successfully.');
  } else {
    console.log('No menu.json found to seed.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
