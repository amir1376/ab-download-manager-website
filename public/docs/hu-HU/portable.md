## How to Make the App Portable (Customize Config Directory)

By default, the app stores its configuration files in:

`~/.abdm`

You have two ways to change this:

### Option 1: Use a Local `.abdm` Folder

Create a folder named `.abdm` inside the app’s installation directory.

When this folder exists, the app will automatically use it as the config directory instead of the default location.

### Option 2: Use a `.portable` File

Create a file named `.portable` inside the installation directory.

Inside this file, write the full path to the folder you want to use as the config directory.

The app will read this file and use the specified path for storing configuration data.
