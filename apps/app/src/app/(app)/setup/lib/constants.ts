import { msg } from 'gt-next';
import { z } from 'zod';
import { Step } from './types';

export const STORAGE_KEY = 'onboarding_answers';

export const companyDetailsSchema = z.object({
  frameworkIds: z.array(z.string()).min(1, 'Please select at least one framework'),
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  website: z.string().url('Please enter a valid URL'),
  describe: z
    .string()
    .min(1, 'Please provide a brief overview and description of what your company does')
    .max(300, 'Description must be less than 300 characters'),
  industry: z.string().min(1, 'Please select your industry'),
  teamSize: z.string().min(1, 'Please enter your team size'),
  cSuite: z
    .array(
      z.object({
        name: z.string().min(1, 'Name is required'),
        title: z.string().min(1, 'Title is required'),
      }),
    )
    .min(1, 'Please add at least one executive'),
  reportSignatory: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    jobTitle: z.string().min(1, 'Job title is required'),
    email: z.string().email('Please enter a valid email'),
  }),
  software: z.string().min(1, 'Please select software you use'),
  infrastructure: z.string().min(1, 'Please select your infrastructure'),
  dataTypes: z.string().min(1, 'Please select types of data you handle'),
  devices: z.string().min(1, 'Please select device types'),
  authentication: z.string().min(1, 'Please select authentication methods'),
  workLocation: z.string().min(1, 'Please select work arrangement'),
  geo: z.string().min(1, 'Please select where your data is located'),
  shipping: z.object({
    fullName: z.string().min(1, 'Full name is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().min(1, 'Phone number is required'),
  }),
});

export const steps: Step[] = [
  {
    key: 'frameworkIds',
    question: msg('Which compliance frameworks do you need?'),
    placeholder: msg('Select the frameworks that apply to your business'),
  },
  {
    key: 'organizationName',
    question: msg('What is your company name?'),
    placeholder: msg('e.g., Acme Inc.'),
  },
  {
    key: 'website',
    question: msg("What's your company website?"),
    placeholder: msg('example.com'),
  },
  {
    key: 'describe',
    question: msg('Describe your company in a few sentences'),
    placeholder: msg(
      'e.g., We are a software company that builds tools for businesses to manage their employees.'
    ),
  },
  {
    key: 'industry',
    question: msg('What industry is your company in?'),
    placeholder: msg('e.g., SaaS'),
    options: [
      msg('SaaS'),
      msg('FinTech'),
      msg('Healthcare'),
      msg('E-commerce'),
      msg('Education'),
      msg('Other'),
    ],
  },
  {
    key: 'teamSize',
    question: msg('How many employees do you have?'),
    placeholder: msg('e.g., 25'),
    description: msg(
      'We need an approximate count for your compliance reports. You can update this in settings if it changes.'
    ),
  },
  {
    key: 'cSuite',
    question: msg('Who are your C-Suite executives?'),
    placeholder: '',
    description: msg(
      'These names and titles will appear in your compliance reports. You can update this in settings if it changes.'
    ),
  },
  {
    key: 'reportSignatory',
    question: msg('Who will sign off on the final report?'),
    placeholder: '',
    description: msg('This person will be listed as the authorizing signatory on compliance reports.'),
  },
  {
    key: 'devices',
    question: msg('What devices do your team members use?'),
    placeholder: msg('e.g., Company laptops'),
    options: [
      msg('Company-provided laptops'),
      msg('Personal laptops'),
      msg('Company phones'),
      msg('Personal phones'),
      msg('Tablets'),
      msg('Other'),
    ],
  },
  {
    key: 'authentication',
    question: msg('How do your team members sign in to work tools?'),
    placeholder: msg('e.g., Google Workspace'),
    options: [
      msg('Google Workspace'),
      msg('Microsoft 365'),
      msg('Okta'),
      msg('Auth0'),
      msg('Email/Password'),
      msg('Other'),
    ],
  },
  {
    key: 'software',
    question: msg('What software do you use?'),
    placeholder: msg('e.g., Rippling'),
    options: [
      msg('Rippling'),
      msg('Gusto'),
      msg('Salesforce'),
      msg('HubSpot'),
      msg('Slack'),
      msg('Zoom'),
      msg('Notion'),
      msg('Linear'),
      msg('Jira'),
      msg('Confluence'),
      msg('GitHub'),
      msg('GitLab'),
      msg('Figma'),
      msg('Stripe'),
      msg('Other'),
    ],
  },
  {
    key: 'workLocation',
    question: msg('How does your team work?'),
    placeholder: msg('e.g., Remote'),
    options: [msg('Fully remote'), msg('Hybrid (office + remote)'), msg('Office-based')],
  },
  {
    key: 'infrastructure',
    question: msg('Where do you host your applications and data?'),
    placeholder: msg('e.g., AWS'),
    options: [
      msg('AWS'),
      msg('Google Cloud'),
      msg('Microsoft Azure'),
      msg('Heroku'),
      msg('Vercel'),
      msg('Other'),
    ],
  },
  {
    key: 'dataTypes',
    question: msg('What types of data do you handle?'),
    placeholder: msg('e.g., Customer information'),
    options: [
      msg('Customer PII'),
      msg('Payment information'),
      msg('Employee data'),
      msg('Health records'),
      msg('Intellectual property'),
      msg('Other'),
    ],
  },
  {
    key: 'geo',
    question: msg('Where is your data located?'),
    placeholder: msg('e.g., North America'),
    options: [
      msg('North America'),
      msg('Europe (EU)'),
      msg('United Kingdom'),
      msg('Asia-Pacific'),
      msg('South America'),
      msg('Africa'),
      msg('Middle East'),
      msg('Australia/New Zealand'),
    ],
  },
  {
    key: 'shipping',
    question: msg('Where would you like to receive your certificate?'),
    placeholder: '',
  },
];
