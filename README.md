# npm-package
A generic landing page generator for NPM packages

## Pre requisites

### `Package.json`
You must have `package.json` file at root of the repository with following fields :
- name
- short_description
- description
- repository
- license
- license_url

### `README.md`
You must have a `README.md` file at root of the repository with a `# Usage` section including a code block with usage instructions

## Usage
Redirect the root of your Github Pages to the landing page generator like following code:

```html
	<meta http-equiv="refresh" content="0;URL='https://www.ismailnguyen.com/npm-package/?name=<PACKAGE_NAME>'" />    
```

Replace **<PACKAGE_NAME>** by the package name (which also corresponds to the repository name).


## Demo
[ismailnguyen.com/vue-animated-terminal](https://www.ismailnguyen.com/vue-animated-terminal/)