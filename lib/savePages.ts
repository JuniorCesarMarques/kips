export async function savePages(pagesData: any) {
  try {
    const response = await fetch('/api/save-json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pagesData),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Salvo com sucesso!');
    } else {
      alert('Erro ao salvar: ' + result.message);
    }
  } catch (err) {
    alert('Erro na conexão: ' + err);
  }
}
