# Namecheap Stellar Plus Deploy Guide

Ei project ekhon Namecheap/cPanel shared hosting-e static site hisebe upload korar jonno ready.

## Build and Package

Windows PowerShell theke repo root-e run korun:

```powershell
corepack pnpm run package:namecheap
```

Eta build kore ei ZIP banabe:

```text
deploy/yallomart-namecheap-upload.zip
```

## Upload to Namecheap

1. Namecheap cPanel open korun.
2. File Manager open korun.
3. Main domain hole `public_html` folder-e jan.
4. Addon domain/subdomain hole cPanel Domains page theke oi domain-er Document Root folder open korun.
5. `yallomart-namecheap-upload.zip` upload korun.
6. ZIP extract korun.
7. Confirm korun `index.html`, `.htaccess`, `assets`, `images`, `favicon.svg`, `robots.txt`, `sitemap.xml` direct document root-er moddhe ache.

Important: cPanel File Manager Settings-e `Show Hidden Files (dotfiles)` on korun, jate `.htaccess` dekha jay.

## Admin

Website footer-er `Admin Login` link-e click korle login page ashbe. Browser address bar-e manually ei path-o deya jabe:

```text
https://your-domain.com/admin
```

Login:

```text
username: admin
password: YalloMart@2026
```

## After Every Update

Code change korar por abar run korun:

```powershell
corepack pnpm run package:namecheap
```

Tarpor new ZIP cPanel-e upload/extract korun.

## Notes

- `.htaccess` React routes support kore, tai `/shop`, `/product/...`, `/admin` direct open korleo site load hobe.
- Upload korar somoy ZIP-er folder-ta public_html-er moddhe folder hisebe rekhe dile site kaj korbe na. ZIP extract kore file-gula direct document root-e rakhte hobe.
- Domain final hole `artifacts/ak-products/index.html`, `public/robots.txt`, and `public/sitemap.xml`-e `https://yallomart.com` replace kore apnar exact domain dile SEO better hobe.
