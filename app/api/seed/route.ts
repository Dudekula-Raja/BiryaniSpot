import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'menu.json');
    if (!fs.existsSync(dataPath)) {
      return NextResponse.json({ error: 'No menu.json found' }, { status: 404 });
    }
    
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const menuItems = JSON.parse(rawData);
    
    let count = 0;
    for (const item of menuItems) {
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
        count++;
      }
    }
    return NextResponse.json({ success: true, seeded: count });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
