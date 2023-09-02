## 🚀  راه‌اندازی ورکر

### راه‌اندازی خودکار

شما می‌توانید این ورکر را به حساب کلادفلیر خود به صورت خودکار و یک کلیک با استفاده از دکمه زیر اجرا کنید.

[![راه‌اندازی کلودفلیر ورکر](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/user/bepass-worker)

### راه‌اندازی دستی

برای راه‌اندازی دستی ورکر:

1. در [صفحه ثبت‌نام کلودفلیر](https://www.cloudflare.com/sign-up) ثبت‌نام کنید.
2. از نوار منوی اصلی، **Workers & Pages** را انتخاب کنید.
3. دکمه **Create Application** را بزنید.
4. دکمه **Create Worker** را بزنید.
5. محتوای فایل [worker.js](https://github.com/uoosef/bepass-worker/blob/main/dist/worker.js) را از این مخزن کپی کنید.
6. یک نام برای ورکر خود وارد کرده و دکمه **Deploy** را بزنید.
7. دکمه **Quick Edit** را بزنید.
8. محتوای کپی شده را جایگزین کد پیش‌فرض ورکر کنید.
9. دکمه **Save and Deploy** را بزنید.
10. آدرس جدیدی که ورکر ایجاد شده است را یادداشت کنید، معمولاً شبیه به **[name].[username].workers.dev** خواهد بود.
11. تنظیمات Bepass خود را به **https://[name].[username].workers.dev/dns-query** تغییر دهید.