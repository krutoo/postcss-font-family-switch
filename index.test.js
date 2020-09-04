const postcss = require('postcss');
const plugin = require('./');

async function run (input, output, options) {
  const result = await postcss([plugin(options)]).process(input, { from: undefined });

  expect(result.css).toEqual(output);
  expect(result.warnings()).toHaveLength(0);
}

it('should not add large "font-family" declaration', async () => {
  await run(
    'div { font-size: 16px; font-family: sans-serif }',
    'div { font-size: 16px; font-family: sans-serif }',
    { largeFamily: 'SomethingFont' }
  );
});

it('should add large "font-family" declaration', async () => {
  await run(
    'a { font-size: 16px; }',
    'a { font-size: 16px;font-family: SomethingFont; }',
    { largeFamily: 'SomethingFont' }
  );
});

it('should add small "font-family" declaration', async () => {
  await run(
    'span { font-size: 12px; } button { cursor: pointer }',
    'span { font-size: 12px;font-family: ReallySmall; } button { cursor: pointer }',
    { largeFamily: 'SomethingFont', smallFamily: 'ReallySmall' }
  );
});
