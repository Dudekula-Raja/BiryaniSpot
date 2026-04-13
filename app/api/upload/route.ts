import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No image provided' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename safely
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniqueSuffix}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    
    // Ensure public/uploads directory exists
    const uploadDir = join(process.cwd(), 'public', 'uploads');
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (err) {
      // Ignore if directory already exists
    }

    const filepath = join(uploadDir, filename);
    await writeFile(filepath, buffer);
    
    // Return relative path for client
    return NextResponse.json({ success: true, url: `/uploads/${filename}` });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ success: false, error: 'Failed to upload image' }, { status: 500 });
  }
}
