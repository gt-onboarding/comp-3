import { msg } from 'gt-next';

export const PRICING_FEATURES = {
  starter: [
    msg('Access to all frameworks'),
    msg('Trust & Security Portal'),
    msg('AI Vendor Management'),
    msg('AI Risk Management'),
    msg('Unlimited team members'),
    msg('API access'),
    msg('Community Support'),
  ],
  managed: [
    msg('Any Framework'),
    msg('3rd Party Audit Included'),
    msg('Compliant in 14 Days or Less'),
    msg('Dedicated Success Team'),
    msg('24x7x365 Support & SLA'),
    msg('Slack Channel with Comp AI'),
  ],
} as const;

export const PRICING_DEFAULTS = {
  starter: {
    monthly: 99,
    yearlyTotal: 948, // 20% discount
  },
  managed: {
    monthly: 997,
    yearlyTotal: 9564, // 20% discount
  },
} as const;

export const PLAN_TYPES = {
  starter: 'starter',
  managed: 'done-for-you',
} as const;
