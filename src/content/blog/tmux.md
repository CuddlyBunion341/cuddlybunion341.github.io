---
title: "2 Simple Configurations to Supercharge your TMUX Setup!"
publishedAt: 2024-04-14
description: "Transform your terminal workflow with these two game-changing tmux configurations: automatic pane resizing and intelligent dimming of inactive panes. Learn how to use tmux hooks and commands to create a seamless, modern terminal multiplexer experience that rivals integrated solutions like iTerm2 and Warp. Includes practical examples, configuration snippets, and tips for optimizing your development environment."
heroImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F8xfd3ae514xhra5nnpt3.jpg"
tags: ["tmux", "terminal"]
---

Tmux is a terminal multiplexer. It is a tool for managing multiple shells inside a single terminal window. It is integrated into most modern terminal emulators like Iterm2 or Warp. In this blog article, I will show you two simple configurations that drastically improved my tmux experience.

## Autoresizing panes

The main problem I had with tmux when starting out was that panes were not automatically resized as I was used from Warp:

![Managing window panes in tmux with auto-resizing not configured.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qjyfdlwmxlsb9bkqhxfv.gif)

Don't get confused by the remapped tmux prefix. The main thing to notice here is that I am using `<PREFIX> + E` to spread the panes out evenly.

**What we now need is:**

1. The command to resize the windows
2. The hook(s) for executing the command
3. Update the tmux configuration with the hook and the command.

### Part1: Finding the command

According to the manual entry for tmux:

```man
select-layout [-Enop] [-t target-pane] [layout-name]
							 (alias: selectl)
				 Choose a specific layout for a window.  If layout-name is not given, the last preset layout used (if any) is
				 reapplied.  -n and -p are equivalent to the next-layout and previous-layout commands.  -o applies the last
				 set layout if possible (undoes the most recent layout change).  -E spreads the current pane and any panes
				 next to it out evenly.
```

We can use the `select-layout -E` command to spread the panes evenly.

### Part2: Finding the hooks

The first part is done. Now we need the hooks.

Unsurprisingly, this can also be found in the manual entry:

```man
%window-pane-changed window-id pane-id
	 The active pane in the window with ID window-id changed to the pane with ID pane-id.

...

window-resized          Run when a window is resized.  This may be after the client-resized hook is run.
```

### Part3: Updating the configuration file

If you [haven't moved](https://unix.stackexchange.com/questions/644819/is-it-possible-to-move-tmux-conf-to-config-folder) the `.tmux.conf` to `.config`, you can find the default configuration file for MacOS at `~/.tmux.conf`.

To execute the command on the resize and pane changed hooks, we can add these lines to the tmux configuration:

```bash
# .tmux.conf
...
set-hook -g window-pane-changed 'select-layout -E'
set-hook -g client-resized 'select-layout -E'
...
```

This is how the panes behave after adjusting the configuration:

![Creating window panes in tmux with auto-resizing configured.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u4pg3e849imrdnyf78q7.gif)

According to the manual entry, we can also shorten the command to the following:

```bash
set-hook -g window-pane-changed 'selectl -E'
set-hook -g client-resized 'selectl -E'
```

## Dimming Inactive Panes

Next to automatically resizing windows, we can also automatically dim panes that aren't active by using the following configuration:

```bash
set-hook -g pane-focus-out 'select-pane -P bg=colour233,fg=colour10'
set-hook -g pane-focus-in 'select-pane -P bg=default,fg=default'
```

![Switching panes in tmux with dimming enabled.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5kgr00agqsw70mb5qrau.gif)

Now, this is a much nicer alternative than the active border color. If you are wondering how I got rid of it, I used this configuration:

```bash
set -g pane-active-border-style "bg=#000000,fg=white"
set -g pane-border-style "bg=#000000,fg=white"
```

Remember that `black` and `#000000` are not the same thing when configuring your terminal, as the color names are defined by your color scheme.

## Conclusion

While tmux isn't as usable/powerful out of the box as the integrated tmux in Iterm or Warp, with some simple configuration, it can be significantly improved. The manual page for tmux is the go to source for looking up commands and events and will save a lot of time googling.

**Tools and Sources**

- Screen recorder: [CleanShotX](https://cleanshot.com/)
- Keystroke recorder: [KeyCastr](https://github.com/keycastr/keycastr)
- Terminal Emulator: [Alacritty](https://github.com/alacritty/alacritty)
- Other configuration: [My Dotfiles](https://github.com/CuddlyBunion341/dotfiles)
