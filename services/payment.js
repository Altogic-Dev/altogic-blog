import { endpoint } from '@/utils/altogic';

const PaymentService = {
  async getPrices() {
    return endpoint.get('/prices');
  },
  getMyPlans() {
    return endpoint.get('/plans');
  },
  async getMySubscriptions() {
    return endpoint.get('/subscriptions');
  },
  async subscribe() {
    return endpoint.get('/subscribe');
  },
  cancelSubscription() {
    return endpoint.get('/subscription/cancel');
  },
};
export default PaymentService;
