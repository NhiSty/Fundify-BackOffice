<script setup>

import { computed, onUpdated, reactive } from 'vue';
import CustomDialog from './CustomDialog.vue';

const props = defineProps({
  transactionDetails: Object,
  createRefund: Function,
  defaultAmount: Number,
  loading: Boolean,
  errored: Boolean,
});

const refundForm = reactive({
  amount: 0,
});

onUpdated(() => {
  refundForm.amount = props.defaultAmount;
});

const refundAmountIsValid = computed(() => {
  const amount = Number(refundForm.amount);
  const refundAmountAvailable = Number(props.transactionDetails.refundAmountAvailable);
  return amount > 0 && amount <= refundAmountAvailable;
});

</script>

<template>
  <CustomDialog v-if="['partial_refunded', 'captured', 'waiting_refund'].includes(transactionDetails.status) && transactionDetails.refundAmountAvailable !== 0">
    <template #openButton="{ openDialog }">
      <v-btn
          color="primary"
          @click="openDialog"
      >
        Rembourser
      </v-btn>
    </template>
    <template #title>
      <h3 class="text-xl font-bold">Effectuer un remboursement</h3>
    </template>
    <template #content>
      <v-form>
        <v-text-field
            class="text-field-amount"
            v-model="refundForm.amount"
            :rules="[refundAmountIsValid || 'Montant incorrect, le montant doit être supérieur à 0 et inférieur au montant remboursable']"
            label="Montant à rembourser"
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
          @click="() => createRefund(refundForm.amount, closeDialog)"
          :disabled="!refundAmountIsValid"
          :loading="loading && !errored"
      >
        Rembourser
      </v-btn>
    </template>

  </CustomDialog>
</template>

<style scoped>

</style>
