module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [
    {
      enabled: process.env.NODE_ENV === 'production',
      content: [
        './public/**/*.html',
        './src/**/*.vue'
      ]
    }
  ],
  theme: {
    fontFamily: {
      'body': ['Open Sans'],
      'ptserif': ['"PT Serif"', 'serif'],
      'lora': ['Lora', 'serif'],
      'opensans': ['"Open Sans"', 'sans-serif']

    },
    extend: {
      spacing: {
        '96': '24 rem',
        '128': '32rem'
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
  ],
}
