import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Caminho absoluto para o arquivo JSON dentro da pasta public
    const filePath = path.join(process.cwd(), 'public', 'pages.json');

    // Escreve o arquivo JSON com o novo conteúdo (data)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Arquivo salvo com sucesso!' });
  } catch (error) {
    console.error('Erro ao salvar pages.json:', error);
    return NextResponse.json({ message: 'Erro ao salvar arquivo' }, { status: 500 });
  }
}
