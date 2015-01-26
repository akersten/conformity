# conformity
A plaintext linter; fixed column width formatter and reflower

## Overview

Conformity is an interactive column length wrapper (think `gq` in vim). It can
operate in two modes, one that preserves existing line breaks (reflowing) and
 one that compacts whitespace (minifying).

## Technologies

Conformity is a web application written in vanilla Javascript, laid out
using modern HTML and styled with Bootstrap 3.3 and some extra CSS.

## Motivation

Something that bothered me a lot was making adjustments to things like
mutli-line code comments or plaintext documents, occasionally lines would get
 longer or shorter than the column limit, and I'd have to manually reformat
 them. Now, this isn't a problem for proper editors and IDEs, but every once
 in a while there's no support for it, or there's a need for a different
 column limit and it's too much work to change settings in the IDE for a
 one-off case.

## Future

This was a quick project, and the following items still need to be explored:

- [ ] Unicode support (it might work just right out of the box - I've got no
idea how good JS's built-in length functions are. I wonder if they properly
count unicode?)
- [ ] Proper test cases (one of my goals is to find the best way of automating
JS testing)

## Contributors

[Alex Kersten](http://kersten.io)