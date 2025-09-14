# Early English Language Philosophy

Early English Language Philosophy is a project to make a broad canon of early
English language philosophical texts freely available online, alongisde tools
for interrogating and analysing those texts programmatically.

Note that this project is very much a work in progress. Only around 10% of the
projected corpus has been imported, and many of those texts are still being
checked and edited.

It consists of:

- [texts](https://github.com/englishphilosophy/englishphilosophy/tree/main/texts):
  The corpus itself, stored in Markit files, along with functions for loading
  the texts into memory.
- [english-philosophical-texts](https://github.com/englishphilosophy/englishphilosophy/tree/main/english-philosophical-texts):
  A server for making the texts available and searchable over HTTP.
- [dictionary](https://github.com/englishphilosophy/englishphilosophy/tree/main/dictionary):
  A set of functions to help with searching and analysing the corpus, e.g. by
  normalizing spelling variants.
- [markit](https://github.com/englishphilosophy/englishphilosophy/tree/main/markit):
  A tool for converting texts from the human-readable format in which they are
  stored to JSON and HTML.
- english-philosohpical-text-online (coming soon): A public-facing website for
  reading, searching, and analysing the texts.
- hume-texts-online (coming soon): A public-facing website for reading and
  searching the works of David Hume, including different editions of his works,
  and tools for comparing them.
