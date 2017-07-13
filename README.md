# template_generator
A simple tool to generate application template

## Installing

```shell
 $ git clone https://github.com/nanjingboy/template_generator.git
 $ cd ~/template_generator
 $ npm install
```


## Usage

### Android

```shell
  $ ~/template_generator/bin/android -h

  Usage: android [options]

  Options:

    -h, --help                 output usage information
    -V, --version              output the version number
    -n, --name <value>         name of the application
    -p, --packageName <value>  package name of the application
    -o, --output <path>        output path of the application
    -t, --type <value>         type of the application, the value is app or library
    -l, --language <value>     language of the application, the value is java or kotlin

  Examples:

    $ android -n demo -p me.tom.demo -o ~/workspace -t library -l java
    $ android -n demo -p me.tom.demo -o ~/workspace -t app -l kotlin
```

### iOS

```shell
  $ ~/template_generator/bin/ios -h

  Usage: ios [options]

  Options:

    -h, --help           output usage information
    -V, --version        output the version number
    -n, --name <value>   name of the application
    -o, --output <path>  output path of the application

  Examples:

    $ ios -n Demo -o ~/workspace
```

## License
* [MIT](http://www.opensource.org/licenses/MIT)
