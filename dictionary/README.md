# Dictionary

This "dictionary" is a tool for working with the textual data in
`english-philosophical-texts`. The goal is to reduce the "noise" of:

1. variant spellings (to make textual searches more effective),
2. different forms of the same lexeme (to make statistical analyses more
   meaningful).

It could also be used to lookup the base lemma for any word in a text,
potentially linking to the corresponding entry in Johnson's dictionary.

It can also be useful for checking the texts for possible typos - showing words
that are not recognised by the dictionary lookup.

## Interface

There are currently just two functions, only partially implemented:

- `getVariants(word)`: returns an array of know variant spellings for the given
  word
- `normalize(text)`: returns the text with all words replaced by their "normal"
  spelling

Planned:

- `getLemma(word)`: returns the base lemma for the given word, possibly with
  metadata (e.g. if it's in Johnson's dictionary, if it's a proper name, etc.)
