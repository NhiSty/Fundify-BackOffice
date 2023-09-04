<script setup>
const props = defineProps(['operationStatus']);

const getStatusColor = () => {
  switch (props.operationStatus) {
    case 'created':
      return 'blue';
    case 'processing':
      return 'orange';
    case 'done':
      return 'green';
    case 'failed':
      return 'red';
    default:
      return 'gray';
  }
};

const getLabel = () => {
  switch (props.operationStatus) {
    case 'created':
      return 'Opération créée';
    case 'processing':
      return 'En cours de traitement';
    case 'waiting_refund':
      return 'Opération effectuée';
    case 'done':
      return 'Opération effectuée';
    case 'failed':
      return 'Opération échouée';
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
