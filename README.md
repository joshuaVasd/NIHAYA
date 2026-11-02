# My Website

A simple static website using plain HTML, CSS and JavaScript. No build step needed.

## Structure

```
my-website/
├── index.html        # main page
├── css/style.css     # styles
├── js/main.js        # scripts
├── assets/images/    # put your images here
├── .gitignore
└── README.md
```

## Run locally

Open `index.html` in your browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Put it on GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/my-website.git
git push -u origin main
```

## Deploy for free

- **GitHub Pages:** repo Settings → Pages → deploy from the `main` branch.
- **Netlify or Cloudflare Pages:** connect the repo, leave the build command empty, set the publish directory to `/`.
