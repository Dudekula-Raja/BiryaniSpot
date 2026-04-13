import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany();
    return NextResponse.json(items);
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch menu data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newItem = await prisma.menuItem.create({
      data: {
        nameEn: body.nameEn,
        nameAr: body.nameAr,
        descriptionEn: body.descriptionEn,
        descriptionAr: body.descriptionAr,
        price: body.price,
        image: body.image,
        category: body.category,
        isVeg: body.isVeg || false,
        isBestseller: body.isBestseller || false,
        isSpicy: body.isSpicy || false,
        rating: body.rating || 5.0,
        reviews: body.reviews || 0,
        badge: body.badge || null,
      }
    });
    return NextResponse.json(newItem, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: 'Failed to add item', details: err instanceof Error ? err.message : String(err) }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    const updatedItem = await prisma.menuItem.update({
      where: { id: parseInt(id.toString()) },
      data: updateData
    });
    return NextResponse.json(updatedItem);
  } catch (err: unknown) {
    return NextResponse.json({ error: 'Failed to update item' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idStr = searchParams.get('id');

    if (!idStr) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    await prisma.menuItem.delete({
      where: { id: parseInt(idStr) }
    });
    return NextResponse.json({ success: true, deletedId: idStr });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}
