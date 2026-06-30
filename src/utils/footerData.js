export const footer_content = [
  {
    id: '100',
    title: 'Company',
    data: [
      'About',
      'Careers',
      'Team',
      'BiteSwift One',
      'BiteSwift Instamart',
      'BiteSwift Express',
    ],
  },
  {
    id: '101',
    title: 'Contact Us',
    data: ['Help & Support', 'Partner with us', 'Deliver with us'],
  },
  {
    id: '102',
    title: 'Legal',
    data: [
      'Terms & Conditions',
      'Cookie Policy',
      'Privacy Policy',
      'Investor Relations',
    ],
  },
]

export const support_data = [
  {
    type: 'general',
    title: 'General Issues',
    description:
      'Covers general issues faced by customers, restaurant partners, and delivery partners on the BiteSwift platform.',
    data: [
      {
        id: 11500,
        title: 'What is BiteSwift Customer Care?',
        description:
          'We value your time, so we use a comprehensive chat-based support system instead of a single phone number. Just search for your issue in the Help section and start a chat — a support executive will be assigned to you promptly.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 206,
        title: 'I have a query related to placing an order',
        description: null,
        isLeaf: false,
        isResolutionNode: false,
        options: [
          {
            type: 'chat',
            phoneNumber: null,
            provider: 'chatengine',
            waitTime: 'Wait time under 2 min(s)',
            emailId: null,
          },
        ],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 212,
        title: 'I am unable to log in to BiteSwift',
        description: null,
        isLeaf: false,
        isResolutionNode: false,
        options: [
          {
            type: 'chat',
            phoneNumber: null,
            provider: 'chatengine',
            waitTime: 'Wait time under 2 min(s)',
            emailId: null,
          },
        ],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 215,
        title: 'I have a payment or refund related query',
        description: null,
        isLeaf: false,
        isResolutionNode: false,
        options: [
          {
            type: 'chat',
            phoneNumber: null,
            provider: 'chatengine',
            waitTime: 'Wait time under 2 min(s)',
            emailId: null,
          },
        ],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 223,
        title: 'I have a coupon or offer related query',
        description: null,
        isLeaf: false,
        isResolutionNode: false,
        options: [
          {
            type: 'chat',
            phoneNumber: null,
            provider: 'chatengine',
            waitTime: 'Wait time under 2 min(s)',
            emailId: null,
          },
        ],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 228,
        title: 'I want to unsubscribe from BiteSwift communications',
        description:
          'Email us mentioning which channels you would like to opt out from. We will process your request and confirm within 24–48 hours.',
        isLeaf: true,
        isResolutionNode: false,
        options: [
          {
            type: 'email',
            phoneNumber: null,
            provider: null,
            waitTime: 'We will revert within 24–48 hrs',
            emailId: 'support@biteswift.in',
          },
        ],
        hyperLinkText: null,
        hyperLink: null,
      },
    ],
  },
  {
    type: 'partner-onboarding',
    title: 'Partner Onboarding',
    description:
      'Everything you need to know about listing your restaurant or becoming a delivery partner on BiteSwift.',
    data: [
      {
        id: 492,
        title: 'I want to partner my restaurant with BiteSwift',
        description: null,
        isLeaf: false,
        isResolutionNode: true,
        options: [
          {
            type: 'email',
            phoneNumber: null,
            provider: null,
            waitTime: 'We will revert within 24–48 hrs',
            emailId: 'partnersupport@biteswift.in',
          },
        ],
        hyperLinkText: 'Partner with us',
        hyperLink: null,
      },
      {
        id: 100175,
        title: 'What documents are needed to list my restaurant on BiteSwift?',
        description:
          'The following documents are mandatory:\n- FSSAI Licence or FSSAI Acknowledgement\n- PAN Card\n- GSTIN Certificate\n- Cancelled Cheque or Bank Passbook\n- Menu',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100176,
        title: 'How long does it take for my restaurant to go live after submission?',
        description:
          'After all mandatory documents have been received and verified, it takes up to 7–10 working days for onboarding to be completed and your restaurant to go live.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100177,
        title: 'What is the one-time onboarding fee?',
        description:
          'This is a one-time fee covering system and admin costs during onboarding. It is deducted from your weekly payouts after you begin receiving orders on BiteSwift.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100178,
        title: 'Who can I contact for help with onboarding?',
        description:
          'You can reach Partner Support by writing to onboarding@biteswift.in. Our team will respond within 24–48 hours.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100179,
        title: 'How much commission does BiteSwift charge?',
        description:
          'Commission rates vary by city and restaurant category. You will see the applicable rate once your preliminary onboarding details have been submitted.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100180,
        title: "I don't have an FSSAI licence yet. Can I still onboard?",
        description:
          "FSSAI registration is mandatory per government policy. However, if your licence is pending, you may proceed with the FSSAI Acknowledgement number you received upon registration.",
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
    ],
  },
  {
    type: 'legal',
    title: 'Legal, Terms & Conditions',
    description:
      'Legal policies, terms of use, and data practices for all BiteSwift stakeholders.',
    data: [
      {
        id: 100043,
        title: 'Terms of Use',
        description:
          'These Terms of Use govern your use of the BiteSwift website and mobile application (collectively, the "Services"). By installing, downloading, or using the Services you agree to be bound by these Terms. If you do not agree, please do not use the Services.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: 'Read More',
        hyperLink: null,
      },
      {
        id: 100044,
        title: 'Privacy Policy',
        description:
          'BiteSwift is committed to protecting your privacy. This policy describes what personal information we collect, how we use it, and with whom we share it. By using BiteSwift you consent to the practices described here.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: 'Read More',
        hyperLink: null,
      },
      {
        id: 100045,
        title: 'Cancellations and Refunds',
        description:
          "You may cancel an order within 1 minute of placing it. After that, a cancellation fee of up to 100% of the order value may apply to compensate restaurant and delivery partners. BiteSwift reserves the right to deny refunds based on prior cancellation history.",
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: 'Read More',
        hyperLink: null,
      },
      {
        id: 100046,
        title: 'Cookie Policy',
        description:
          'BiteSwift uses cookies and similar technologies to improve your experience, remember preferences, and analyse platform usage. You can manage cookie preferences in your browser settings at any time.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: 'Read More',
        hyperLink: null,
      },
    ],
  },
  {
    type: 'faq',
    title: 'FAQs',
    description: 'Frequently asked questions about ordering, payments, delivery, and your BiteSwift account.',
    data: [
      {
        id: 100047,
        title: 'Can I edit my order?',
        description:
          'Orders can be edited only before the restaurant confirms them. Click Help → "I want to modify items in my order" and a support agent will assist you.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100048,
        title: 'How do I cancel my order?',
        description:
          "Go to Help → 'I want to cancel my order'. Cancellation fees may apply to compensate restaurant and delivery partners.",
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100050,
        title: 'Is there a minimum order value?',
        description:
          'BiteSwift has no platform-wide minimum order value. Individual restaurants may set their own minimums, which are shown at checkout.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100051,
        title: 'Do you charge a delivery fee?',
        description:
          'Delivery fees vary by city and restaurant. If a delivery fee applies it will be clearly shown on the Review Order page before you pay.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100052,
        title: 'How long does delivery take?',
        description:
          'Estimated delivery time is shown for each restaurant based on your location and current conditions. Most orders arrive within 30–45 minutes.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100053,
        title: 'What are your delivery hours?',
        description:
          'Delivery hours depend on restaurant availability in your area. Most restaurants on BiteSwift operate from 8 AM to midnight.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100054,
        title: 'Can I order from any location?',
        description:
          'BiteSwift delivers from any restaurant listed in your search results. Enable GPS so the app can detect your location and show nearby options.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100055,
        title: 'Can I order from multiple restaurants in one order?',
        description:
          'Currently each order is fulfilled by one restaurant. You can place separate orders from different restaurants.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100057,
        title: 'Can I schedule an order in advance?',
        description:
          'Yes — tap the delivery time selector to choose a future slot. Scheduled ordering is available in select cities.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100058,
        title: 'Can I change the delivery address after placing an order?',
        description:
          'Minor changes (flat number, landmark) are allowed. Major address changes are not possible after the order is placed. Contact support or call your delivery partner directly.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100060,
        title: "I didn't receive my referral reward",
        description:
          'Referral rewards are credited after the referred person completes their first successful transaction. If you still have not received it, email support@biteswift.in within 48 hours.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100061,
        title: 'How do I deactivate my account?',
        description:
          'Write to us at support@biteswift.in to request account deactivation. We will process it within 7 working days.',
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100074,
        title: 'Will BiteSwift be accountable for food quality or quantity?',
        description:
          "Quality and quantity are the restaurant's responsibility. If you experience an issue, submit feedback through the app and we will relay it to the restaurant.",
        isLeaf: true,
        isResolutionNode: false,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
    ],
  },
  {
    type: 'biteswift-one-faq',
    title: 'BiteSwift One FAQs',
    description:
      'Everything about BiteSwift One — our membership plan with free deliveries, exclusive discounts, and more.',
    data: [
      {
        id: 100229,
        title: 'Are BiteSwift One benefits available at all restaurants?',
        description:
          'Free delivery applies to all food delivery restaurants within 10 km of your location. Member-only discounts of up to 30% are available at select partner restaurants, on top of regular offers.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100228,
        title: 'Is there a limit on free deliveries?',
        description:
          'No. BiteSwift One members get unlimited free deliveries on all restaurants within 10 km for all orders above ₹149, throughout the membership period.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100223,
        title: 'Can I club BiteSwift One discounts with other offers?',
        description:
          'Yes. BiteSwift One extra discounts are applied on top of regular restaurant offers. There is no upper cap on savings.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100227,
        title: 'How do I renew my membership?',
        description:
          'You can purchase a new plan after your current one expires. Early renewal is not available yet.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100225,
        title: 'Can I cancel, pause, or transfer my membership?',
        description:
          'Currently, cancellation, pausing, or transfer of BiteSwift One memberships is not supported. We are working to offer this in the future.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100233,
        title: 'On which platforms can I use BiteSwift One benefits?',
        description:
          'BiteSwift One benefits are available on Android, iOS, and mobile web. Desktop is not currently supported.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
      {
        id: 100265,
        title: 'Is BiteSwift One available in all cities?',
        description:
          'BiteSwift One is currently available in select cities. We are expanding to more cities soon.',
        isLeaf: true,
        isResolutionNode: true,
        options: [],
        hyperLinkText: null,
        hyperLink: null,
      },
    ],
  },
]
