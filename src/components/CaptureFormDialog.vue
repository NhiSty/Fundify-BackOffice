<script setup>

import {computed, onUpdated, reactive} from 'vue';
import CustomDialog from './CustomDialog.vue';

const props = defineProps({
  transactionDetails: Object,
  createCapture: Function,
  defaultAmount: Number,
  loading: Boolean,
  errored: Boolean,
});

const captureForm = reactive({
  amount: 0,
});

onUpdated(() => {
  captureForm.amount = props.defaultAmount;
});

const captureAmountIsValid = computed(() => {
  const amount = Number(captureForm.amount);
  const captureAmountAvailable = Number(props.transactionDetails.outstandingBalance);
  return amount > 0 && amount <= captureAmountAvailable;
});

</script>

<template>
  <CustomDialog v-if="['authorized', 'partial_captured'].includes(transactionDetails.status) && transactionDetails.outstandingBalance !== 0">
    <template #openButton="{ openDialog }">
      <v-btn
          color="primary"
          @click="openDialog"
      >
        Ajouter un paiement
      </v-btn>
    </template>
    <template #title>
      <h3 class="text-xl font-bold">Ajout d'un paiement</h3>
    </template>
    <template #content>
      <v-form>
        <v-text-field
            class="text-field-amount"
            v-model="captureForm.amount"
            :rules="[captureAmountIsValid || 'Montant incorrect, le montant doit être supérieur à 0 et inférieur au montant restant à régler']"
            label="Montant"
            type="number"
            variant="outlined"
            required
        />
      </v-form>
    </template>

    <template #actions="{ closeDialog }">
      <v-btn
          color="inherit"
          @click="closeDialog"
      >
        Abandonner
      </v-btn>
      <v-btn
          color="primary"
          @click="() => createCapture(captureForm.amount, closeDialog)"
          :disabled="!captureAmountIsValid"
          :loading="loading && !errored"
      >
        Ajouter
      </v-btn>
    </template>

  </CustomDialog>
</template>

<style scoped>

</style>
