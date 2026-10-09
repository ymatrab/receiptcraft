/**
 * Cadence — Day 2026-10-11, post 1 of 2 (09:30Z). (oct-11.mjs holds the
 * mechanic post, which moved to Oct 7.) Keyword gate checked 2026-10-09:
 * nothing in Sanity or GSC owns "superbill" (0 impressions).
 *   "superbill"           4,400/mo · CPC $23.79 (mostly "what is" intent)
 *   "superbill template"    590/mo · creation intent; SERP holds blog posts
 *                                    (blueprint.ai, superbilled.com) and template pages
 *   -> /templates/medical-receipt
 *
 * The medical receipt template has no CPT/ICD/NPI fields, so the post says so
 * plainly: codes go in the line descriptions and the footer, and practices
 * that issue superbills every week are pointed at their practice software.
 * Codes cited are long-standing AMA CPT / CMS POS / ICD-10-CM codes.
 */

export const OCT_11_SUPERBILL = [
  {
    slug: "superbill-template",
    image: "assets/superbill-template.jpeg",
    category: "how-to",
    publishedAt: "2026-10-11T09:30:00Z",
    title: "Superbill Template: Every Field, With the Codes Explained",
    seoTitle: "Superbill Template: Every Field and Code Explained",
    seoDescription:
      "What a superbill must include for out-of-network reimbursement: provider NPI and tax ID, patient and insurance details, CPT and ICD-10 codes, fees and payment.",
    excerpt:
      "A superbill is the itemized statement a patient sends to their insurer to get money back for out-of-network care. Insurers reject ones with missing codes. Here is every field, what goes in it, and a worked example.",
    body: `**A superbill is an itemized statement from a healthcare provider that a patient submits to their insurance company to claim reimbursement for out-of-network care.** It has to show who provided the care (name, credentials, NPI and tax ID), who received it (name, date of birth, insurance member ID), what was done and why (CPT procedure codes and ICD-10 diagnosis codes), when and where, what it cost, and that it was paid. Insurers process superbills like claims, so a missing code is the most common reason one comes back.

Superbills are most common in therapy, physical therapy, chiropractic and other practices that take payment up front and do not bill insurers directly. The patient pays the full fee, the provider hands over a superbill, and the patient files it with their insurer's member claim form.

## Superbill vs. Receipt vs. Claim

| Document | Who sends it | What it does |
|---|---|---|
| Receipt | Provider to patient | Proves the patient paid |
| Superbill | Provider to patient, patient to insurer | Gives the insurer everything it needs to reimburse the patient |
| Claim (CMS-1500) | Provider to insurer | The provider bills the insurer directly, usually in network |

A superbill does the job of a receipt and carries the coding the insurer needs. A plain receipt without codes is fine for your own records or an HSA, but an insurer will usually ask for more.

## What a Superbill Must Include

### Provider details

| Field | Example |
|---|---|
| Provider name and credentials | Dana Ortiz, LCSW |
| Practice name and address | Lakeside Counseling, 400 Elm St, Madison, WI |
| Phone | (608) 555-0142 |
| NPI (National Provider Identifier) | 10-digit number |
| Tax ID (EIN) | 00-0000000 |
| License number and state | Required by some insurers |

### Patient details

| Field | Why it matters |
|---|---|
| Full name and date of birth | Matches the patient to the policy |
| Address | Where the insurer sends a check |
| Insurance company, member ID and group number | Identifies the policy |
| Policyholder, if different | For a child or spouse on someone else's plan |

### The services

Each session or visit gets its own line with:

- **Date of service**
- **Place of service code**: 11 for an office visit, 10 for telehealth in the patient's home, 02 for telehealth somewhere else
- **CPT code** for the service, with any modifier the insurer requires for telehealth
- **ICD-10 diagnosis code** that justifies it
- **Units** and **fee**

### Payment and signature

The amount paid, the date and how it was paid, any balance still owed, and the provider's signature.

## A Worked Example

| Date | POS | CPT | Description | ICD-10 | Fee |
|---|---|---|---|---|---|
| Oct 2, 2026 | 11 | 90791 | Diagnostic evaluation | F41.1 | $200.00 |
| Oct 9, 2026 | 11 | 90837 | Psychotherapy, 60 min | F41.1 | $160.00 |
| Oct 16, 2026 | 10 | 90834 | Psychotherapy, 45 min | F41.1 | $140.00 |
| | | | **Total paid** | | **$500.00** |

The common psychotherapy codes are 90791 for a first diagnostic evaluation, 90834 for a roughly 45-minute session and 90837 for a session of 53 minutes or more. F41.1 is the ICD-10 code for generalized anxiety disorder. The diagnosis comes from the provider, never the patient.

## How to Submit a Superbill

1. Check your out-of-network benefits first: the deductible, the coinsurance and whether the service is covered at all.
2. Get the superbill from your provider, monthly or after each visit.
3. Fill in your insurer's member claim form, usually found in the member portal.
4. Attach the superbill and submit online or by mail, before the insurer's filing deadline.
5. Watch for the Explanation of Benefits, which shows what was allowed and what you are reimbursed.

The amount reimbursed depends on your plan's allowed amount for the code, not on the fee on the superbill. If you have not met your out-of-network deductible, the claim may be approved and still pay nothing yet, though it counts toward the deductible.

## Making a Superbill

Practices that issue superbills every week usually generate them from their practice software. A provider who only needs one occasionally, or a patient asking for a corrected copy, can lay one out by hand or in a document.

Our [medical receipt template](/templates/medical-receipt) records the payment side cleanly: practice details, each session as a line with its fee, the total and how it was paid. It does not have dedicated CPT, ICD-10 or NPI fields, so put the CPT code and date in each line description, add the NPI, tax ID and diagnosis code in the footer, and check the result against the field list above before it goes to an insurer.`,
    faqs: [
      {
        q: "What is a superbill?",
        a: "An itemized statement from a healthcare provider, with procedure and diagnosis codes, that a patient sends to their insurer to be reimbursed for out-of-network care.",
      },
      {
        q: "What must a superbill include?",
        a: "Provider name, credentials, address, NPI and tax ID; patient name, date of birth, address and insurance member ID; each date of service with its place of service, CPT and ICD-10 codes and fee; the amount paid; and the provider's signature.",
      },
      {
        q: "Is a superbill the same as a receipt?",
        a: "No. A receipt proves payment. A superbill proves payment and also carries the codes an insurer needs to process a claim.",
      },
      {
        q: "Who fills out the superbill, the provider or the patient?",
        a: "The provider. The diagnosis and procedure codes must come from the provider. The patient then completes the insurer's claim form and attaches the superbill.",
      },
      {
        q: "What CPT codes are used on a therapy superbill?",
        a: "Commonly 90791 for a diagnostic evaluation, 90834 for a roughly 45-minute psychotherapy session and 90837 for 53 minutes or more. The provider chooses the code that matches the session.",
      },
      {
        q: "Does a superbill guarantee reimbursement?",
        a: "No. Reimbursement depends on your out-of-network benefits, deductible and the insurer's allowed amount for each code.",
      },
      {
        q: "How long do I have to submit a superbill?",
        a: "Each insurer sets its own filing deadline. Check your plan documents and submit soon after each visit rather than once a year.",
      },
      {
        q: "Can I use a superbill for my HSA or FSA?",
        a: "Yes. It shows the date, service, provider and amount paid, which is what HSA and FSA administrators ask for to substantiate a medical expense.",
      },
      {
        q: "What is a place of service code?",
        a: "A two-digit code for where care happened: 11 for an office, 10 for telehealth in the patient's home, 02 for telehealth elsewhere.",
      },
      {
        q: "Can a provider refuse to give a superbill?",
        a: "Some practices only provide them on request or monthly. Ask before the first session so you know how and when you will receive them.",
      },
    ],
  },
];
