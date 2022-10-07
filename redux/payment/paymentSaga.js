import PaymentService from '@/services/payment';
import { call, put, takeEvery } from 'redux-saga/effects';
import { paymentActions } from './paymentSlice';

function* getMySubscriptionsSaga() {
  try {
    const { data, error } = yield call(PaymentService.getMySubscriptions);
    if (error) {
      throw new Error(error);
    } else {
      yield put(
        paymentActions.getSubscriptionsSuccess(
          data.subscriptionList.data.map((subscription) => ({
            id: subscription.id,
            status: subscription.status,
            priceId: subscription.plan.id,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000
            ),
            plan: subscription.plan.nickname,
            price: `$${
              subscription.plan.amount / 100
            } ${subscription.plan.currency.toUpperCase()}`,
            interval: subscription.plan.interval,
          }))
        )
      );
      yield put(
        paymentActions.getInvoicesSuccess(
          data.invoicesList.data.map((invoice) => ({
            id: invoice.id,
            date: invoice.created,
            amount: `${invoice.total / 100} ${invoice.currency.toUpperCase()}`,
            status: invoice.status,
            customer: invoice.customer,
            plan: invoice.lines.data[0].plan.nickname,
            download: invoice.invoice_pdf,
          }))
        )
      );
    }
  } catch (error) {
    yield put(paymentActions.getSubscriptionsFailure(error));
  }
}
function* getPricesSaga() {
  try {
    const { data, error } = yield call(PaymentService.getPrices);
    if (error) {
      throw new Error(error);
    } else {
      yield put(paymentActions.getPlansSuccess(data));
    }
  } catch (error) {
    yield put(paymentActions.getPlansFailure(error));
  }
}
function* subscribeSaga({ payload }) {
  try {
    const { data, error } = yield call(PaymentService.subscribe, payload);
    if (error) {
      throw new Error(error);
    } else {
      yield put(paymentActions.subscribeSuccess(data));
    }
  } catch (error) {
    yield put(paymentActions.subscribeFailure(error));
  }
}
function* cancelSubscriptionSaga({ payload }) {
  try {
    const { data, error } = yield call(
      PaymentService.cancelSubscription,
      payload
    );
    if (error) {
      throw new Error(error);
    } else {
      yield put(paymentActions.cancelSubscriptionSuccess(data));
    }
  } catch (error) {
    yield put(paymentActions.cancelSubscriptionFailure(error));
  }
}

export default function* paymentSaga() {
  yield takeEvery(
    paymentActions.getSubscriptionsRequest,
    getMySubscriptionsSaga
  );
  yield takeEvery(paymentActions.getPlansRequest, getPricesSaga);
  yield takeEvery(paymentActions.subscribeRequest, subscribeSaga);
  yield takeEvery(
    paymentActions.cancelSubscriptionRequest,
    cancelSubscriptionSaga
  );
}
