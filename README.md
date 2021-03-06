# PostCSS Font Family Switch

[PostCSS] plugin that append font-family when font-size value is larger than target value.

[PostCSS]: https://github.com/postcss/postcss

**Input:**

```css
.foo {
  font-size: 12px;
}

.bar {
  font-size: 16px;
}
```

**Output:**

```css
.foo {
  font-size: 12px;
}

.bar {
  font-size: 16px;
  font-family: YourLargeFontFamily;
}
```

## Usage

**Step 1:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 2:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-font-family-switch')({ largeFamily: 'MyLargeFont' }),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage
