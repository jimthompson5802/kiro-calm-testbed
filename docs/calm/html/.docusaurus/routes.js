import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', '5ff'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', '5ba'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'a2b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'c3c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', '156'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '88c'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '000'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '044'),
    exact: true
  },
  {
    path: '/',
    component: ComponentCreator('/', 'bab'),
    routes: [
      {
        path: '/',
        component: ComponentCreator('/', 'da4'),
        routes: [
          {
            path: '/',
            component: ComponentCreator('/', 'd79'),
            routes: [
              {
                path: '/flows/credit-card-payment-flow',
                component: ComponentCreator('/flows/credit-card-payment-flow', '01d'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/flows/refund-processing-flow',
                component: ComponentCreator('/flows/refund-processing-flow', '29b'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/administrator',
                component: ComponentCreator('/nodes/administrator', 'd02'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/audit-log-store',
                component: ComponentCreator('/nodes/audit-log-store', '70c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/customer',
                component: ComponentCreator('/nodes/customer', 'e62'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/external-payment-provider',
                component: ComponentCreator('/nodes/external-payment-provider', '8d8'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/notification-service',
                component: ComponentCreator('/nodes/notification-service', '659'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/payment-api-gateway',
                component: ComponentCreator('/nodes/payment-api-gateway', '618'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/payment-database',
                component: ComponentCreator('/nodes/payment-database', '497'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/payment-processor',
                component: ComponentCreator('/nodes/payment-processor', '7b2'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/nodes/redis-cache',
                component: ComponentCreator('/nodes/redis-cache', '8fc'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/administrator-to-gateway',
                component: ComponentCreator('/relationships/administrator-to-gateway', 'f2c'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/customer-to-gateway',
                component: ComponentCreator('/relationships/customer-to-gateway', '786'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/gateway-to-processor',
                component: ComponentCreator('/relationships/gateway-to-processor', '679'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/processor-to-audit',
                component: ComponentCreator('/relationships/processor-to-audit', 'e82'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/processor-to-cache',
                component: ComponentCreator('/relationships/processor-to-cache', '9dd'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/processor-to-database',
                component: ComponentCreator('/relationships/processor-to-database', 'adb'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/processor-to-external-provider',
                component: ComponentCreator('/relationships/processor-to-external-provider', '2fa'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/relationships/processor-to-notifications',
                component: ComponentCreator('/relationships/processor-to-notifications', 'e73'),
                exact: true,
                sidebar: "docs"
              },
              {
                path: '/',
                component: ComponentCreator('/', 'bea'),
                exact: true,
                sidebar: "docs"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
