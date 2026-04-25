export const setCookies = (res, cookiesName, cookiesValue, exp) => {
  res.cookie(cookiesName, cookiesValue, {
    httpOnly: true, // kalau true tidak diakases oleh frontend atau JS
    secure: true, // hanya bisa dipakai oleh https bukan http
    sameSite: "lax",
    maxAge: 60 * 60 * 1000 * exp,
  });
};
