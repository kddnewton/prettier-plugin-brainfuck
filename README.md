<h1 align="center">Prettier for Brainfuck</h1>

<p align="center">
  <a href="https://gitter.im/jlongster/prettier">
    <img alt="Gitter" src="https://img.shields.io/gitter/room/jlongster/prettier.svg?style=flat-square">
  </a>
  <a href="https://github.com/kddnewton/prettier-plugin-brainfuck/actions">
    <img alt="GitHub Actions" src="https://img.shields.io/github/workflow/status/kddnewton/prettier-plugin-brainfuck/workflows/main.yml?branch=main&style=flat-square">
  </a>
  <a href="https://www.npmjs.com/package/prettier-plugin-brainfuck">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/prettier-plugin-brainfuck.svg?style=flat-square">
  </a>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
  <a href="https://twitter.com/PrettierCode">
    <img alt="Follow+Prettier+on+Twitter" src="https://img.shields.io/twitter/follow/prettiercode.svg?label=follow+prettier&style=flat-square">
  </a>
</p>

`prettier-plugin-brainfuck` is a [prettier](https://prettier.io/) plugin for the [Brainfuck](https://en.wikipedia.org/wiki/Brainfuck) programming language. `prettier` is an opinionated code formatter that supports multiple languages and integrates with most editors. The idea is to eliminate discussions of style in code review and allow developers to get back to thinking about code design instead.

## Getting started

To run `prettier` with the XML plugin, you're going to need [`node`](https://nodejs.org/en/download/) (version `8.3` or newer).

If you're using the `npm` CLI, then add the plugin by:

```bash
npm install --save-dev prettier prettier-plugin-brainfuck
```

Or if you're using `yarn`, then add the plugin by:

```bash
yarn add --dev prettier prettier-plugin-brainfuck
```

The `prettier` executable is now installed and ready for use:

```bash
./node_modules/.bin/prettier --write '**/*'
```

## Configuration

Below are the options (from [`src/plugin.js`](src/plugin.js)) that `prettier-plugin-brainfuck` currently supports:

| Name         | Default | Description                                                                                      |
| ------------ | :-----: | ------------------------------------------------------------------------------------------------ |
| `printWidth` |  `80`   | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#print-width)). |
| `tabWidth`   |   `2`   | Same as in Prettier ([see prettier docs](https://prettier.io/docs/en/options.html#tab-width)).   |

Any of these can be added to your existing [prettier configuration
file](https://prettier.io/docs/en/configuration.html). For example:

```json
{
  "printWidth": 100
}
```

Or, they can be passed to `prettier` as arguments:

```bash
prettier --print-width 100 --write '**/*'
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/kddnewton/prettier-plugin-brainfuck.

## License

The package is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
