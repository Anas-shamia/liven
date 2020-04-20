import Vue from "vue";
import VueI18n from "vue-i18n";
import ar from "vee-validate/dist/locale/ar.json";
import en from "vee-validate/dist/locale/en.json";

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en",
  messages: {
    ar: {
      fields: {
        email: "البريد الاليكتروني",
        password: "كلمة السر"
      },
      validation: ar.messages
    },
    en: {
      fields: {
        email: "E-mail",
        password: "Password"
      },
      validation: en.messages
    }
  }
});

// import Vue from 'vue'
// import VueI18n from 'vue-i18n'
// import ar from "vee-validate/dist/locale/ar.json";
// import en from "vee-validate/dist/locale/en.json";
//
// Vue.use(VueI18n)
//
// const i18n = new VueI18n({
//   locale: "en",
//   messages: {
//     ar: {
//       fields: {
//         email: "البريد الاليكتروني",
//         password: "كلمة السر"
//       },
//       validation: ar.messages
//     },
//     en: {
//       fields: {
//         email: "E-mail",
//         password: "Password"
//       },
//       validation: en.messages
//     }
//   }
// });
//
function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'ar',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})

