// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        'nuxt-icon',
        '@nuxtjs/tailwindcss',
        '@nuxtjs/google-fonts'
    ],
    css: ["~/assets/style.css"],
    googleFonts: {
        families: {
            Karla: true
        }
    }
})
