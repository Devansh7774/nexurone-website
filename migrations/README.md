# Nexuron MySQL Migration

## Run with npm (recommended)

Make sure `.env` has `DATABASE_URL`:

```
DATABASE_URL=mysql://user:password@localhost:3306/nexuron
```

Then run:

```bash
npm run db:migrate
```

## Create super admin (first-time bootstrap)

Copy `.env.example` to `.env` and set SMTP + seed credentials.

```bash
npm run db:migrate

SEED_ADMIN_EMAIL=info@nexurontechnologies.com SEED_ADMIN_PASSWORD='YourStrongPassword12!' npm run seed
```

- Seed only runs when **no super admin** exists yet.
- The super admin is created **pre-verified** (bootstrap account).
- Password must be at least **12 characters**.
- Password is **never** printed to the console.

## Email verification

All users created by the super admin must verify their email before login.

Add Hostinger SMTP to `.env`:

```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=info@nexurontechnologies.com
SMTP_PASS=your-mailbox-password
SMTP_FROM=info@nexurontechnologies.com
SMTP_FROM_NAME=Nexuron Technologies
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Manual SQL (optional)

```bash
mysql -h localhost -u nexuron -p nexuron < migrations/migrate.sql
```
