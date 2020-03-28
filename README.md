## Start

```
$ git clone https://github.com/KseniaKuntsevich/nodejs-course.git
```
```
$ git checkout caesar-cipher-cli
```
```
$ npm install
```
```
$ cd caesar-cipher-cli
```
## Commands

-s, --shift   number 1-26  
-a, --action  encode/decode  
-i, --input   path  
-o, --output  path  

### Commands description 

**-s, --shift**  
required: yes  
value: num 1-26  
description: sets num of steps to code  

**-a, --action**  
required: yes  
value: encode/decode  
description: sets diraction for coding  

**-i, --input**  
required: no  
value: path to input.txt  
description: takes text from input.txt  

**-o, --output  path**  
required: no  
value: path to output.txt  
description: adds text to output.txt, creating new output.txt if it not existing

## Usage

`--input ./input.txt` can also be `--input './input.txt'` or `--input "./input.txt"`

### Usage with all options
```
$ node app -a encode -s 3 -i ./input.txt -o ./encoded.txt
or
$ node app --action encode --shift 3 --input ./input.txt --output ./encoded.txt
```
> input.txt
> `This is the most secret message!`

> output.txt
> `Wklv lv wkh prvw vhfuhw phvvdjh!`

```
$ node app -a decode -s 3 -i encoded.txt -o plain.txt 
or
$ node app --action decode --shift 3 --input encoded.txt --output plain.txt 
```
> output.txt
> `Wklv lv wkh prvw vhfuhw phvvdjh!`

> plain.txt
> `This is the most secret message!`

### Usage without output or input file
opens console dialogue

**1. Missing --output and --input**
```
$ node app --action encode --shift 5
```
> Enter string  
>  `Hi there!`  
> Mn ymjwj!  
> `Good bye!`  
> Ltti gdj!  

revert (decode)

```
$ node app --action decode --shift 5
```
> Enter string  
> `Mn ymjwj!`  
> Hi there!  
> `Ltti gdj!`  
> Good bye!  

**2. Missing --output**
```
$ node app --action encode --shift 5 --input ./input.txt
```
> input.txt
> `This is the most secret message!`
> console
> `Ymnx nx ymj rtxy xjhwjy rjxxflj!`

**3. Missing --input**
```
$ node app --action encode --shift 5 --output ./encoded.txt
```
> Enter string  
> `Hello from console!'`  
> `Hello one more time!`  
> `And so on...`  

> ./encoded.txt  
`Rovvy pbyw myxcyvo!`  
`Rovvy yxo wybo dswo!`  
`Kxn cy yx...` 
