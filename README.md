# NIHAYA

Frontend repository for the NIHAYA storefront and admin portal.

## Structure

```
NIHAYA/
├── customer/           # Customer-facing website
│   ├── index.html
│   ├── shop.html
│   ├── css/
│   ├── js/
│   └── assets/
├── admin/              # Admin website
├── .gitignore
└── README.md
```

## Run locally

Serve either site from its folder:

```bash
# Customer website
cd customer
python3 -m http.server 8000

# Admin website
cd admin
python3 -m http.server 8001
```
