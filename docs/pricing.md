# Pricing & Monetization Strategy (2026)

## Core Philosophy
- **Zero operational cost** is part of our margin. We charge for value (hosting, scalability, monitoring, support) not for raw infrastructure that is free on Cloudflare.
- **Transparency**: client pays a flat monthly/annual fee + usage-based scaling charges.

---

## Cost Breakdown (Monthly, 2026 Estimates)

| Item | Cloudflare Free Tier | Estimated Cost (USD) | Notes |
|------|---------------------|----------------------|-------|
| Workers (CPU, requests) | 100k req/day | $0 | Free tier covers typical e-commerce traffic |
| D1 (SQLite) | 5 GB storage | $0 | First 5 GB free |
| R2 (Object Storage) | 10 GB/month | $0 | First 10 GB free |
| KV (Sessions) | 1 GB | $0 | Free tier |
| Assets (Static) | Unlimited | $0 | Cloudflare Pages/Assets free |
| Custom Domain + SSL | Included | $12/yr (~$1/mo) | Annual renewal |
| **Monitoring & Alerting** | — | **$20/mo** | Uptime, performance, error alerts |
| **WAF / Security** | Included | $0 | Cloudflare free tier |
| **Support (email, 24h SLA)** | — | **$50/mo** | Optional |
| **Development (one-time)** | — | **$800** | MVP setup, CI/CD, docs |

**Total Monthly Operational (excluding dev): ~$71/mo**  
**Annual (excl. dev): ~$852/yr**

---

## Pricing Packages for Clients

### 1. Starter (Ideal for new entrepreneurs)
- **Monthly:** $49 / month
- **Annual:** $490 / year (2 months free)
- **Includes:**
  - Cloudflare-hosted e-commerce (Astro + D1 + R2)
  - Up to 1,000 products
  - 10,000 visits/month
  - Basic monitoring (uptime + daily report)
  - Email support (48h response)
  - Stripe/PayPal integration (fees passed through)

### 2. Growth (Small business scaling)
- **Monthly:** $149 / month
- **Annual:** $1,490 / year
- **Includes Starter +**
  - Up to 10,000 products
  - 100,000 visits/month
  - Advanced monitoring (real-time alerts, performance dashboards)
  - Priority support (12h response)
  - Custom domain + SSL managed
  - Automated backups (daily D1 export to R2)
  - Inventory sync API (for ERP/QuickBooks)

### 3. Enterprise (High volume, custom needs)
- **Monthly:** $499 / month (negotiable)
- **Includes Growth +**
  - Unlimited products & visits
  - Dedicated Cloudflare Workers (paid plan) if limits hit
  - SLA 99.9% uptime with credits
  - Custom feature development (hours included)
  - On-premise / hybrid deployment option
  - Dedicated account manager

---

## Scalability Triggers & Additional Charges

| Trigger | Action | Charge |
|---------|--------|--------|
| Visits > plan limit (e.g., 100k/mo) | Auto-upgrade to next tier | Prorated monthly difference |
| D1 storage > 5 GB | Enable paid D1 ($5/GB/mo) | Pass-through + 20% mgmt |
| R2 egress > 10 GB/mo | Paid R2 egress ($0.01/GB) | Pass-through + 20% mgmt |
| Custom feature request | Scoped estimate | Time & materials |
| Emergency hotfix (outside support hrs) | Per incident | $150/incident |

---

## Revenue Streams (for us)

1. **Recurring SaaS Fee** (packages above)
2. **Transaction Fee** (optional): 1.5% of each sale (if we process payments)
3. **Add-on Services**: SEO audit, custom theme, migration, training
4. **Referral / Affiliate**: 10% of first-year revenue from referred clients

---

## Payment Terms

- **Monthly:** Net 15, auto-renewal, cancel anytime
- **Annual:** Prepaid, 16.6% discount, non-refundable after 30 days
- **Development:** 50% upfront, 50% on delivery

---

## Cost Control for Client

- **No hidden fees**: All Cloudflare usage visible in dashboard
- **Budget alerts**: Email at 80% of plan limits
- **Grace period**: 7 days overage before auto-upgrade
- **Self-service downgrade**: Anytime via portal

---

## Example Scenario (Client sells 200 units/mo @ $25 avg)

| Revenue Stream | Monthly |
|----------------|---------|
| SaaS Fee (Growth) | $149 |
| Transaction Fee (1.5% × $5,000) | $75 |
| **Total to Us** | **$224** |
| Client Net (after Stripe 2.9%+$0.30) | ~$4,700 |

---

## 2026 Cost Assumptions (Inflation-adjusted)

- Cloudflare free tier limits stay same (historically generous)
- USD inflation ~3% YoY → prices reviewed annually
- Labor costs for dev/support ~5% YoY increase

---

## Decision Matrix for Client

| Need | Recommended Package |
|------|---------------------|
| Just testing / < 10 sales/mo | Starter |
| Consistent 50-200 sales/mo | Growth |
| > 500 sales/mo or custom ERP | Enterprise |

---

*Document version: 1.0 (2026-11-24)*