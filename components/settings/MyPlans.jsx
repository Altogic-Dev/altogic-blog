import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { paymentActions } from '@/redux/payment/paymentSlice';
import { DateTime } from 'luxon';
import _ from 'lodash';
import Link from 'next/link';
import Button from '../basic/button';

export default function MyPlans({ currentSubscription, invoices }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(paymentActions.getSubscriptionsRequest());
    dispatch(paymentActions.getPlansRequest());
  }, []);

  return (
    <div id="my-plans" className="mb-16">
      <div className="pb-6 border-b border-gray-200">
        <h3 className="text-3xl font-medium text-slate-800 tracking-[-0.8px]">
          My Plans
        </h3>
        <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
          Plans starting at less than 1/week. Cancel anytime.
        </p>
      </div>
      <div className="py-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
          Account plans
        </h3>
        <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
          Pick an account plan that fits your workflow.
        </p>
      </div>
      {currentSubscription && (
        <div className="flex flex-col md:flex-row gap-8 py-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
              Current plan
            </h3>
            <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
              We’ll credit your account if you need to downgrade during the
              billing cycle.
            </p>
          </div>
          <div className="w-full">
            <div className="space-y-2">
              <div className=" relative flex cursor-pointer rounded-lg px-5 py-4 border border-slate-200 focus:outline-none">
                <div className="w-full">
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-700 mr-4 rounded-full ring-4 ring-purple-50">
                        <BoltIcon className="h-6 w-6" />
                      </span>
                      <div className="flex flex-col">
                        <div className="flex gap-2">
                          <p className="font-medium text-purple-700">
                            {currentSubscription.plan}
                          </p>{' '}
                          <span className="text-slate-500 inline-flex">
                            {currentSubscription.price} /{' '}
                            {`${_.capitalize(currentSubscription.interval)}ly`}
                          </span>
                        </div>
                        <div className="text-left">
                          <span className="text-xs text-slate-500">
                            Renew on :{' '}
                          </span>
                          <span className="text-xs text-slate-500">
                            {DateTime.fromJSDate(
                              currentSubscription.currentPeriodEnd
                            ).toLocaleString(DateTime.DATE_MED)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      <span className="inline-flex items-center justify-center px-[14px] py-2 text-sm font-medium tracking-sm rounded-full bg-green-100 text-green-700">
                        {_.capitalize(currentSubscription.status)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <Button
                        onClick={() => {
                          dispatch(
                            paymentActions.cancelSubscriptionRequest(
                              currentSubscription.id
                            )
                          );
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {invoices.length > 0 && (
        <>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4 py-6 border-b border-gray-200">
            <div>
              <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                Billing and invoicing
              </h3>
              <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                Pick an account plan that fits your workflow.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-[14px] py-2 border border-gray-300 text-sm font-medium tracking-sm rounded-full text-slate-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
            >
              <svg
                className="w-5 h-5 text-slate-700"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.66699 14.1667L10.0003 17.5M10.0003 17.5L13.3337 14.1667M10.0003 17.5V10M16.667 13.9524C17.6849 13.1117 18.3337 11.8399 18.3337 10.4167C18.3337 7.88536 16.2816 5.83333 13.7503 5.83333C13.5682 5.83333 13.3979 5.73833 13.3054 5.58145C12.2187 3.73736 10.2124 2.5 7.91699 2.5C4.46521 2.5 1.66699 5.29822 1.66699 8.75C1.66699 10.4718 2.3632 12.0309 3.48945 13.1613"
                  stroke="currentColor"
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Download all
            </button>
          </div>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8 py-6">
            <div>
              <h3 className="text-lg font-medium text-slate-800 tracking-[-0.8px]">
                Billing history
              </h3>
              <p className="mt-1 text-sm text-slate-500 tracking-[-0.4px]">
                Please reach out to our friendly team via{' '}
                <span className="font-medium">billing@altogic.com</span> with
                questions.
              </p>
            </div>

            <div className="w-full">
              <div>
                <div className="overflow-x-auto">
                  <div className="inline-block align-middle border border-gray-200 rounded-lg">
                    <div className="relative overflow-hidden md:rounded-lg">
                      <table className="min-w-full table-fixed divide-y divide-gray-300">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="min-w-[12rem] py-3.5 px-6 text-left text-sm font-medium text-slate-500"
                            >
                              Invoice
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                            >
                              Status
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                            >
                              Amount
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3.5 text-left text-sm font-medium text-slate-500"
                            >
                              Plan
                            </th>
                            <th scope="col" className="relative py-3.5 px-6">
                              <span className="sr-only">Edit</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {invoices.map((invoice) => (
                            <tr key={invoice.id}>
                              <td className="'whitespace-nowrap py-4 px-6 text-sm font-medium'">
                                {DateTime.fromSeconds(invoice.date).toFormat(
                                  'dd LLL yyyy'
                                )}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-700">
                                  <svg
                                    className="w-3 h-3 text-green-500"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M10 3L4.5 8.5L2 6"
                                      stroke="currentColor"
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  {_.capitalize(invoice.status)}
                                </span>
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                {invoice.amount}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                                {invoice.plan}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                <Link href={invoice.download}>
                                  <a className="text-purple-600 hover:text-purple-900">
                                    Download
                                    <span className="sr-only">
                                      , {invoice.customer}
                                    </span>
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function BoltIcon(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.66625 1.33337L2.72855 8.45861C2.49601 8.73766 2.37974 8.87718 2.37797 8.99502C2.37642 9.09745 2.42207 9.19491 2.50175 9.2593C2.59341 9.33337 2.77503 9.33337 3.13827 9.33337H7.99958L7.33292 14.6667L13.2706 7.54147C13.5032 7.26243 13.6194 7.1229 13.6212 7.00507C13.6227 6.90263 13.5771 6.80517 13.4974 6.74078C13.4058 6.66671 13.2241 6.66671 12.8609 6.66671H7.99958L8.66625 1.33337Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
