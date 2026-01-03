module.exports = {
    docs: [
        {
            type: 'doc',
            id: 'index',
            label: 'Home',
        },
        {
            type: 'category',
            label: 'Nodes',
            items: [
                'nodes/payment-api-gateway',
                'nodes/payment-processor',
                'nodes/payment-database',
                'nodes/redis-cache',
                'nodes/external-payment-provider',
                'nodes/notification-service',
                'nodes/audit-log-store',
                'nodes/administrator',
                'nodes/customer'
            ],
        },
        {
            type: 'category',
            label: 'Relationships',
            items: [
                'relationships/gateway-to-processor',
                'relationships/processor-to-database',
                'relationships/processor-to-cache',
                'relationships/processor-to-external-provider',
                'relationships/processor-to-notifications',
                'relationships/processor-to-audit',
                'relationships/administrator-to-gateway',
                'relationships/customer-to-gateway'
            ],
        },
        {
            type: 'category',
            label: 'Flows',
            items: [
                'flows/credit-card-payment-flow',
                'flows/refund-processing-flow'
            ],
        }
    ]
};
