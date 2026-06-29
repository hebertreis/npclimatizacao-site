import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { nome, whatsapp, servico, mensagem, metragem } = body

    if (!nome || !whatsapp || !servico) {
      return NextResponse.json({ error: 'Campos obrigatórios faltando' }, { status: 400 })
    }

    // Enviar para o webhook N8N (configurar a URL via variável de ambiente)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL

    if (n8nWebhookUrl) {
      await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          whatsapp,
          servico,
          metragem: metragem || '',
          mensagem: mensagem || '',
          timestamp: new Date().toISOString(),
          origem: 'site-npclimatizacao',
        }),
      })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Erro ao processar lead:', err)
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 })
  }
}
