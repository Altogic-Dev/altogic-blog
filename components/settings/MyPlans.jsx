import React, { useState, useLayoutEffect, useRef } from 'react';
import { RadioGroup } from '@headlessui/react';
import { classNames } from '@/utils/utils';

const plans = [
  {
    name: 'Monthly',
    price: '$5',
    cycle: 'month',
    icons: <Monthly className="h-6 w-6" />,
  },
  {
    name: 'Annual',
    price: '$50',
    cycle: 'year (save $10)',
    icons: <Annual className="h-6 w-6" />,
  },
];
const people = [
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
  {
    date: 'Dec 22',
    amount: 'USD $10.00',
    plan: 'Basic plan',
  },
];

export default function MyPlans() {
  const [selected, setSelected] = useState(plans[0]);
  const [selectedPeople, setSelectedPeople] = useState([]);
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const checkbox = useRef();
  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : people);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }
  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < people.length;
    setChecked(selectedPeople.length === people.length);
    setIndeterminate(isIndeterminate);
    checkbox.current.indeterminate = isIndeterminate;
  }, [selectedPeople]);

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
          <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
            <div className="space-y-2">
              {plans.map((plan) => (
                <RadioGroup.Option
                  key={plan.name}
                  value={plan}
                  className={({ checked }) =>
                    `
                  ${checked ? 'bg-purple-50 border-purple-700' : 'bg-white'}
                    relative flex cursor-pointer rounded-lg px-5 py-4 border border-slate-200 focus:outline-none`
                  }
                >
                  {({ checked }) => (
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex items-center gap-1">
                          <span className="inline-flex items-center justify-center w-10 h-10 bg-purple-100 text-purple-700 mr-4 rounded-full ring-4 ring-purple-50">
                            {plan.icons}
                          </span>
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? 'text-purple-700' : 'text-slate-700'
                            }`}
                          >
                            {plan.name}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="span"
                            className={`inline-flex ${
                              checked ? 'text-purple-700' : 'text-slate-500'
                            }`}
                          >
                            <span>
                              {plan.price}/{plan.cycle}
                            </span>{' '}
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-purple-700">
                          <CheckIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </div>
          </RadioGroup>
        </div>
      </div>
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
                  {selectedPeople.length > 0 && (
                    <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Bulk edit
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Delete all
                      </button>
                    </div>
                  )}
                  <table className="min-w-full table-fixed divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="relative w-12 px-6 sm:w-16 sm:px-8"
                        >
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 sm:left-6"
                            ref={checkbox}
                            checked={checked}
                            onChange={toggleAll}
                          />
                        </th>
                        <th
                          scope="col"
                          className="min-w-[12rem] py-3.5 pr-6 text-left text-sm font-medium text-slate-500"
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
                      {people.map((person) => (
                        <tr
                          key={person.email}
                          className={
                            selectedPeople.includes(person)
                              ? 'bg-gray-50'
                              : undefined
                          }
                        >
                          <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                            {selectedPeople.includes(person) && (
                              <div className="absolute inset-y-0 left-0 w-0.5 bg-purple-600" />
                            )}
                            <input
                              type="checkbox"
                              className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 sm:left-6"
                              value={person.email}
                              checked={selectedPeople.includes(person)}
                              onChange={(e) =>
                                setSelectedPeople(
                                  e.target.checked
                                    ? [...selectedPeople, person]
                                    : selectedPeople.filter((p) => p !== person)
                                )
                              }
                            />
                          </td>
                          <td
                            className={classNames(
                              'whitespace-nowrap py-4 pr-6 text-sm font-medium',
                              selectedPeople.includes(person)
                                ? 'text-purple-600'
                                : 'text-slate-900'
                            )}
                          >
                            {person.date}
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
                              Paid
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {person.amount}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                            {person.plan}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-purple-600 hover:text-purple-900"
                            >
                              Download
                              <span className="sr-only">, {person.name}</span>
                            </a>
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
    </div>
  );
}
function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="currentColor" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Monthly(props) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.33301 9.66663L7.76116 12.8807C7.84862 12.9244 7.89234 12.9463 7.93821 12.9549C7.97883 12.9625 8.02052 12.9625 8.06114 12.9549C8.10701 12.9463 8.15073 12.9244 8.23819 12.8807L14.6663 9.66663M1.33301 6.3333L7.76116 3.11922C7.84862 3.07549 7.89234 3.05363 7.93821 3.04502C7.97883 3.0374 8.02052 3.0374 8.06114 3.04502C8.10701 3.05363 8.15073 3.07549 8.23819 3.11922L14.6663 6.3333L8.23819 9.54737C8.15073 9.5911 8.10701 9.61296 8.06114 9.62157C8.02052 9.62919 7.97883 9.62919 7.93821 9.62157C7.89234 9.61296 7.84862 9.5911 7.76116 9.54737L1.33301 6.3333Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function Annual(props) {
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
