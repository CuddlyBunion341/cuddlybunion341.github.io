---
title: "My Take on AI"
publishedAt: Null
description: "AI can refactor and rewrite, but it also steals the struggle, the learning, and the joy. This is my take on using AI without losing pride in code."
tags: ["programming", "craftsmanship", "renuo", "generative-ai"]
---

It was only a matter of time before I joined the hype train and started writing this blog article about AI. AI tools are everywhere. They promise productivity, faster iterations, and better code. But using them comes with tradeoffs. Over the last months, I have reflected on where they help, where they hurt, and what that means for how we write software.

## My Hot Take

My hot take on AI is that it can be used to improve code instead of sloppify it if used properly. I mostly see AI being used to generate cheap, “working” code. What I generally notice is a lack of effort and craftsmanship when people rely on generated code.

## Code Quality vs Learning

AI shines when it comes to fast refactorings. Code rewrites and restructurings that would normally take hours are done in minutes. This drives up code quality because iterations are cheap. For new projects, prototypes, or rewrites, this is fantastic.

But if you are learning to code, relying on AI is the wrong move. You need to write code to learn. Watching fitness videos does not make you fit, and reading AI generated code does not make you a programmer.

DHH put it well:

> “It’s absolutely not enough to learn how to have AI generate your code. Not if you want to …”

The other day, I struggled with writing a simple POST request using the fetch API without AI or Google. That kind of struggle is valuable. It shows what you do not yet understand. Syntax pain forces you to learn.

## The Wrong Tradeoff

Maybe it is a wrong approach for me, but I care about the journey in programming more than the destination. I do not care too much about the final product. What brings me joy are the technical challenges behind it, the act of programming itself. Others have different opinions: We are not code monkeys, churning out features. We are creators, problem solvers, craftsmen.

AI is often good at the things I want to do myself. Formulating complex database queries, writing detailed validation logic, or designing models and data structures—that is the work I enjoy. What I want it to do is the opposite: generate the boilerplate, write the stylesheets, or come up with translation keys.

Instead, it tends to steal the joy from the parts of coding that are satisfying.

As DHH said:

> “Programming should be a vibe! It should be fun! It should resemble English closely enough that line noise doesn’t obscure the underlying ideas and decisions.”

Solving katas on Codewars used to be meaningful. I solved over a hundred before AI. Now, it is a single prompt. We risk getting dumber if we let it think for us.

## How I Use AI

As these tools grow more powerful, I also see programming becoming less fun. The risk is that AI can take over the parts of coding that make it enjoyable.
I rely on AI for specific tasks where it saves time without taking away the essence of programming. It is useful for refactorings, rewrites, improving tests, wording, and translations.

One concrete example is transforming imperative XML building code into a cleaner ERB template.

Before:

```php
$senderNode = $xml->addChild('sender');
$senderNode->addChild('name', 'Fahrländer Partner AG');
$senderNode->addChild('openimmo_anid', OPENIMMO_ANID);
$senderNode->addChild('datum', date('Y-m-d'));
$senderNode->addChild('makler_id', 'fpre');
```

After:

```erb
<sender>
  <name>Fahrländer Partner AG</name>
  <% if OpenImmoFeedbackGenerator::OPENIMMO_ANID.present? %>
  <openimmo_anid><%= OpenImmoFeedbackGenerator::OPENIMMO_ANID %></openimmo_anid>
  <% end %>
  <datum><%= Date.current.strftime("%Y-%m-%d") %></datum>
  <makler_id>fpre</makler_id>
</sender>
```

This is the kind of rewrite that would be tedious to do by hand but trivial with AI. It handles the mechanical transformation so I can focus on the structure and intent.

What I enjoy is not just rewriting, but tackling complex database queries, formulating complex validation logic, and designing models and data structures. That is where craftsmanship shows.

But for core business logic I rarely trust AI. That part matters most in correctness, design, and intent. I want to own it.

## Refactoring and Trust in Tests

When I already have tests and I trust those tests, what can really go wrong with a refactoring? In theory, nothing. The tests should guarantee that behavior remains consistent. That is precisely why AI assisted refactoring feels safe: the safety net is in place.

But there are still pitfalls:

**Incomplete test coverage**: even a comprehensive test suite misses edge cases. AI generated refactorings may change subtle behavior that the tests do not cover.
**Readability and taste**: code can remain functionally correct but become harder to read, less idiomatic, or not aligned with the team’s conventions. AI does not always match your coding style.
**Over abstraction**: AI often adds unnecessary layers or abstractions. The result is technically correct but conceptually bloated.

So while tests make AI driven refactoring safer, they do not guarantee that the outcome is better. This is where human judgment is still essential.

## Pride and Ownership

![Meme about AI as a tool](68e64f01-9706-470b-bc3f-5e8529dadf1b.png)

My problem is that I cannot feel proud about projects I created with AI because I did not create them—an agent like Claude did.

Claude created the [deploio-cli](https://github.com/CuddlyBunion341/deploio-cli). It works well and does the job, but I do not feel proud of it. It is not my work.

The opposite is true for my project [rsmc](https://github.com/CuddlyBunion341/rsmc). The goal was to learn Rust, networking, and a bit of computer graphics—not to create a profitable Minecraft clone. I feel proud of it because it is something that I made, that I understand. Not something Claude did while I just vibed.

Even when reviewing or fighting over AI’s suggestions, I still do not feel proud. Because in the end, it is not my code but AI code.

I think people, especially juniors, should stop being proud of their technological achievements if they were done by “PhD” level agents.

## The Problems

The downsides of AI are real:

Gaslighting when it is wrong.
Confident nonsense.
“Works 100%” claims, followed by silent failures.

It is easy to waste time debugging AI output instead of building.

## Code Quality Debate

Many people say that AI generated code is inherently worse than human written code. The usual arguments are bad code quality and lots of technical debt. From my personal use and many arguments with Claude I can say the opposite is possible. It is not guaranteed, and it is not free, but AI can also raise code quality if used with care.

## Reflections

I see the potential in AI, but I see a lot more negativity with it too. I do not want to be left behind. As the saying goes:

> “AI will not replace you. People using AI will.”

## Competitions and Pride

I am not ignorant in the sense of saying why should I not use AI when it makes me more productive. But there are contexts where I draw a clear line. I am participating in the national web development championships and I will do so with pride, without any generative AI. It will be my work that gets graded.

## Tools and Workflow

I write in Neovim and like the cursor CLI for running AI agents. Reviews are a useful feature, but I still prefer GitHub for that.

## Handmade Software and Shared Values

Context: I work at Renuo. As Alessandro said, programming should be fun. Vibe coding is not there yet. Sometimes I wonder what I am even doing with my life, arguing with agents instead of applying syntax knowledge.

Renuo recently published Handmade Software, a post that resonates with much of what I believe. They describe how despite all the hype, AI generated code is often mediocre, useful for trivial tasks, but ill fit for deeper craftsmanship. ([renuo.ch](https://www.renuo.ch/blog/handmade-software))

We share values: maintaining context, caring about quality, resisting the urge to let tools do everything for us. We are not code monkeys.

Renuo recently published Handmade Software, a post that resonates with much of what I believe. They describe how despite all the hype, AI generated code is often mediocre, useful for trivial tasks, but ill fit for deeper craftsmanship. ([renuo.ch](https://www.renuo.ch/blog/handmade-software))

We share values: maintaining context, caring about quality, resisting the urge to let tools do everything for us. We are not code monkeys.

In the end, AI is a tool. A powerful one. But like every tool, you need to decide what to outsource and what to own.

For me: AI handles the boring parts. I handle the fun parts. That balance keeps coding both productive and satisfying.
