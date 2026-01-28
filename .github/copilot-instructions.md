# English Philosophy Repository

This is a monorepo for English philosophical texts and related tooling.

## Project Structure

- **texts/** - Philosophical texts from 17th-18th century English philosophers in .mit format (MarkIt)
  - Authors include Locke, Hume, Berkeley, Hobbes, Reid, and many others
  - Organized by author with each text in custom MarkIt format
  
- **markit/** - Custom markup language compiler
  - Compiles .mit files to structured text format
  - Handles validation and context processing
  
- **dictionary/** - Text normalization and variant handling
  - Manages spelling variants (archaic vs modern)
  - Handles contractions, apostrophes, and historical spellings
  
- **english-philosophical-texts/** - REST API server
  - Provides endpoints for searching and retrieving texts
  - Built with Deno's HTTP server
  
- **english-philosophical-texts-online/** - Web frontend
  - User interface for browsing and searching texts
  - Static site with server-side rendering

- **hume-texts-online/** - Dedicated frontend for Hume's texts
  - Focused on David Hume's works
  - Similar architecture to the main online frontend

- **style** - Shared CSS and components for web frontends
  - Uses manually curated Tailwind-style utility classes

## Tech Stack

- **Runtime:** Deno (not Node.js)
- **Language:** TypeScript
- **Testing:** Deno's built-in test runner
- **Package Manager:** Deno's native module system

## Conventions

- Use Deno-style imports (with .ts extensions)
- Each subproject has its own `deno.json` configuration
- Run tests with `deno task test` in each subproject
- Follow existing patterns within each subproject
- No `node_modules` - pure Deno dependencies

## Important Notes

- This is historical text preservation work
- Text accuracy and fidelity to original sources is critical
- Markit format (.mit) is custom to this project, but similar in spirit to Markdown
