export default function formatBRL(value: number): string {
  // Format currency 
  const formattedNumber = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

  return formattedNumber;
}
