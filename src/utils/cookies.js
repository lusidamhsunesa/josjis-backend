export const setCookies = (res, cookiesName, cookiesValue, exp) => {
  res.cookie(cookiesName, cookiesValue, {
    httpOnly: true, // kalau true tidak diakases oleh frontend atau JS
    secure: true, // hanya bisa dipakai oleh https bukan http
    sameSite: "none",
    maxAge: 60 * 60 * 1000 * exp,
  });
};

export const deleteCookies = (res, cookiesName) => {
  res.clearCookie(cookiesName, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
};
