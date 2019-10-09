# Contributing to Twenty Twenty

Howdy, it’s really great you want to contribute to the new default theme for the WordPress 5.3 release! Before you dive in, here are a few pointers on how to contribute.

## How it works

For early development, Twenty Twenty will remain on GitHub. Once it reaches a usable and stable state, the theme will be moved into WordPress Core and all development will happen in SVN and Trac. Until then, follow this document for guidance.

## Reporting an issue

Twenty Twenty should have all issues reported on GitHub at https://github.com/WordPress/twentytwenty/. We are not using Trac for issue reporting until the theme is moved into WordPress Core.

## Working on an issue

If you begin work on a Pull Request for an issue, please make a comment on the issue in question to let people know. It prevents duplicate work, and if someone else has thoughts on the issue, they can reach out and offer help and input.

## Testing a Pull Request

If you're using Git locally, you can test a pull request by pulling down the associated branch, creating a zip file of the contents, and uploading to your site. This repository includes all compiled files, so it should install just like any other uploaded theme.

If you're not already using Git, you may benefit from installing the [GitHub desktop application](https://desktop.github.com). This will allow you to [download the repository in one click](https://help.github.com/desktop/guides/contributing-to-projects/cloning-a-repository-from-github-to-github-desktop/), keep it in sync, and easily [switch between different pull requests](https://help.github.com/desktop/guides/contributing-to-projects/accessing-a-pull-request-locally/). Once a pull request is selected in the application, create a zip file of the whole repository, and upload it to your site to test.

## Submitting Fixes

To submit a fix, please [fork the repository](https://help.github.com/articles/fork-a-repo/) and submit a [pull request](https://help.github.com/articles/creating-a-pull-request/). In your pull request's  description, please explain your update and reference the associated issue you're fixing.

## Best Practices

Whatever you add, make sure you follow the theme review handbook requirements here: https://make.wordpress.org/themes/handbook/review/required/.

No assets may be added without also including:
Source, such as a link.
Copyright information, license, or public domain declaration.
The assets must be compatible with GPL version 2 or later, with the exception of fonts that may use SIL.

### Commit Messages

Here are some good ideas for commit messages:

- Keep them to a one line summary.
- Keep them short (50 chars or less).
- Make them relevant to the commit.

## Commit Process

All changes happen through a pull request made by contributors, ideally associated with an issue. After you send your proposed changes, one of the committers will review and test. After that, we can merge the changes.

When you add a pull request, please also add in the description your WordPress.org username. We will then add it to CONTRIBUTORS.md. This is a running list of all contributors and essential to giving everyone that has helped make this project props in Core.

## Create Right-To-Left (RTL) CSS file

Twenty Twenty uses [RTLCSS](https://rtlcss.com/) which allows to transform the  Left-To-Right (LTR) files,  into the Right-To-Left (RTL) files.

### Installation instructions

1. Using a command line interface, go to the `twentytwenty` directory `cd /my-compter/local-wordpress-install/wp-content/themes/twentytwenty`.
2. Type `npm install` into the command line and press [return], to install all Node.js dependencies. 
3. The dependencies may take a few minutes to download and once it completes, you’re done.

### Usage instructions

- After making a change to a CSS, which affects RTL or Browser vendor prefixes, run `npm run build` from within the theme directory to build the CSS and RTL CSS files with your changes.
