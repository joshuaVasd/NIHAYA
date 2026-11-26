/* =========================================================
   NIHAYA Admin - Local Dev Auth Example Template
   =========================================================
   Copy this file to `admin/js/local-auth.secret.js` (which is
   ignored by .gitignore) to test admin login locally before
   connecting the real backend authentication API.
   ========================================================= */

window.__NIHAYA_LOCAL_AUTH__ = {
  enabled: false,
  admin: {
    id: 'LOCAL-ADMIN-001',
    fullName: 'Your Admin Name',
    role: 'Admin',
    roleCode: 'admin',
    username: 'your_admin_username',
    email: 'your-admin@example.com',
    mobile: '',
    photo: '',
    password: 'CHANGE_ME_LOCAL_ONLY',
  },
};
