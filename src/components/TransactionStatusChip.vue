<script setup>
const props = defineProps(['transactionStatus']);

const getStatusColor = () => {
  switch (props.transactionStatus) {
    case 'created':
      return 'pink';
    case 'authorized':
      return 'blue-grey-darken-1';
    case 'partial_captured':
      return 'purple';
    case 'captured':
      return 'green';
    case 'waiting_refund':
      return 'blue';
    case 'partial_refunded':
      return 'orange';
    case 'refunded':
      return 'indigo';
    default:
      return 'bg-gray-400';
  }
};

const getLabel = () => {
  switch (props.transactionStatus) {
    case 'created':
      return 'En attente de paiement';
    case 'authorized':
      return 'Autorisé';
    case 'partial_captured':
      return 'Partiellement payé';
    case 'captured':
      return 'Payé';
    case 'waiting_refund':
      return 'En attente de remboursement';
    case 'partial_refunded':
      return 'Partiellement remboursé';
    case 'refunded':
      return 'Remboursé';
    default:
      return 'Unknown';
  }
};
</script>

<template>
  <v-chip :color="getStatusColor()">
    {{ getLabel() }}
  </v-chip>
</template>

<style scoped>

</style>
