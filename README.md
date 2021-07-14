# Local direnv Add-on

This Local Add-on is brought to you by [Gravity Wiz](https://gravitywiz.com), the leading resource for [Gravity Forms](http://gravityforms.com/).

## What does this Add-on do?

While Local offers the ability to "Open Site Shell" by right-clicking on a site in the sidebar to get CLI
access to a Local site, it can sometimes be a workflow interrupting task as it opens a new terminal window. This isn't
ideal if you use `tmux`, have terminal profiles that open on boot, etc.

This Add-on automatically generates an `.envrc` file inside a site's `app` directory. `.envrc` files are small
shell scripts executed by [direnv](https://direnv.net/) that can export variables.

The file will be generated whenever on site start and created events.

## Requirements

* [Local 5.0](https://localwp.com) or newer
* [direnv](https://direnv.net/)

## Usage

### 1. Clone Add-on

Clone the repository into the following directory depending on your platform:

-   macOS: `~/Library/Application Support/Local/addons`
-   Windows: `C:\Users\username\AppData\Roaming\Local\addons`
-   Debian Linux: `~/.config/Local/addons`

*You can replace 'Local' with 'Local Beta' if you want to create the add-on for Local Beta.*

#### Install Add-on Dependencies

`yarn install` or `npm install`

#### Add Add-on to Local

1. Clone repo directly into the add-ons folder (paths described above)
2. `yarn install` or `npm install` (install dependencies)
2. `yarn build` or `npm run build`
3. Open Local and enable add-on

### 2. Allow `.envrc` file

`cd` to the site's `app` directory (or any descent of the directory) and run `direnv allow`. You should be
able to immediately test if the changes took effect by running `wp option get home` and verifying that the URL
matches the Local site's URL.

## Tips

If you use direnv with other projects such as WordPress plugins, you can add `source_up` to extend the `.envrc` in
the ancestor directory rather than replacing the variables that it exports.
