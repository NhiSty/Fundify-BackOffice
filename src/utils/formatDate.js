export default function formatDate(date) {

  if (!date || typeof date !== 'string') {
    return 'Date inconnue';
  }
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
}
