<script setup>
const props = defineProps(['operationType']);

const getStatusColor = () => {
  switch (props.operationType) {
    case 'capture':
      return 'green';
    case 'refund':
      return 'orange';
    case 'authorization':
      return 'blue';
    default:
      return 'gray';
  }
};

const getLabel = () => {
  switch (props.operationType) {
    case 'capture':
      return 'Paiement';
    case 'refund':
      return 'Remboursement';
    case 'authorization':
      return 'Autorisation';
    default:
      return 'Unknown';
  }
};
</script>

<template>
  <v-chip :color="getStatusColor()" variant="elevated">
    {{ getLabel() }}
  </v-chip>
</template>

<style scoped>

</style>
