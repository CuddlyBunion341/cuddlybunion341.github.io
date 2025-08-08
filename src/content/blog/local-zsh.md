---
title: "Local zsh"
publishedAt: 2025-08-08
description: "A short article about zshrc"
tags: ["zsh", "productivity"]
---

Different projects often have different setups.  
Some are started with `bun`, others with `bin/dev` or `bin/start`.  
Some rely entirely on Docker Compose.

Defining global aliases for commands such as `rspec` or `rubocop` can quickly cause conflicts between projects:

```bash
alias rubocop='docker compose exec app bundle exec rubocop -a' 
```

Creating complex Bash functions to detect the correct environment is possible, but usually not worth the time.

## A Very Simple Solution

Let each project define its own aliases and functions in a small `local_zsh` file. Then, have your shell source it when you are in that project.

Example structure:

```tree
├── project_1
│   └── local_zsh
└── project_2
    └── local_zsh
```

In your `.zshrc`:

```bash
[[ -f local_zsh ]] && source local_zsh
```

Whenever you switch to a project, sourcing `.zshrc` loads the correct aliases for that project.

Example `local_zsh`:

```
alias bash='docker compose exec app bash'
alias rc='docker compose exec app rails c'
alias rspec='docker compose exec app bundle exec rspec'
alias rubocop='docker compose exec app bundle exec rubocop -a'
alias erb_lint='docker compose exec app bundle exec erb_lint -a'
```

A small file per project is all that is needed for a more productive setup.
