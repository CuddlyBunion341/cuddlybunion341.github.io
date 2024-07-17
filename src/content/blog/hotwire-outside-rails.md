---
title: "Extending Hotwire beyond Ruby on Rails"
publishedAt: 2024-08-03
description: "This is the first post of my new Astro blog."
heroImage: "https://images.unsplash.com/photo-1541358150975-668b4a0531c4?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
tags: ["bunjs", "hotwire", "websockets"]
---

Almost every result you get when you search for Hotwire tutorial on google is about rails. Even the [hotwire guides](https://turbo.hotwired.dev/handbook/streams) use Ruby on Rails as an example on how to implement turbo streams.

There are also numerous references to the [turbo-rails](<[`turbo-rails`](https://github.com/hotwired/turbo-rails)>) gem.

But in the end:

> Hotwire is a collection of JavaScript modules that produce the behavior of an SPA (e.g. dynamic loading) for classical architectural approaches with SSR. Hotwire uses an *HTML-first* approach, so the backend returns *HTML* instead of *JSON*.
> https://www.codecentric.de/wissens-hub/blog/hotwire-new-approach-for-modern-web-applications

In this blog article I want to convince you that Hotwire is not meant to be a rails only framework and that you can use its features, mainly turbo outside of the Ruby on Rails context.

## Goals

In this blog article you will learn:

- Hot to use the Hotwire framework outside of Ruby on Rails
- How to use server broadcasts and WebSockets in Bun
- How to utilize turbo streams to update the frontend asynchronously
- How to implement a simple realtime chatting application
- How to implement a simple stimulus controller and attach it to the DOM

## The plan

The plan for this project is to create a realtime chatting application using a Bun, Turbo and Stimulus. This is the core concept:

![[Pasted image 20240303193438.png]]

## Step 0: Setup a BunJS application

Initially I thought about revolving this blog around Java Spring but it turns out that Websockets are really painful so I decided to stick with a much simpler, TypeScript application.

Firstly we can initialize a new BunJs application:

```zsh
mkdir bunjs-turbo-demo
cd bunjs-turbo-demo
bun init
```

Now we can run the application:

```zsh
bun run index.ts
Hello via Bun!
```

## Step 1: Implement a simple Websocket HTTP Server with Bun

WebSockets are the backbone of almost every realtime web application. In this project we will use the multiple publisher - multiple subscriber pattern as our clients will send messages to the server and the server will broadcast the messages to all open sockets.

The code for the view helpers such as `layoutHTML` and `chatRoomHTML` is not included here becasue I don't think that it adds much value to this blog so keep that in mind.

```ts
const topic = "chatroom";

Bun.serve({
  port: 8080,
  fetch(req, server) {
    const url = new URL(req.url);

    if (url.pathname === "/")
      return new Response(layoutHTML("Chatroom", chatRoomHTML()), {
        headers: {
          "Content-Type": "text/html",
        },
      });

    if (url.pathname === "/subscribe") {
      if (server.upgrade(req)) {
        return;
      }
      return new Response("Couldn't upgrade to a WebSocket connection");
    }

    return new Response("404!");
  },
  websocket: {
    open(ws) {
      console.log("Websocket opened");
      ws.subscribe(topic);
      ws.publishText(topic, messageHTML("Someone joined the chat"));
    },
    message(ws, message) {
      console.log("Websocket received: ", message);
      ws.publishText(topic, messageHTML(`Anonymous: ${message}`));
    },
    close(ws) {
      console.log("Websocket closed");
      ws.publishText(topic, messageHTML("Someone left the chat"));
    },
    publishToSelf: true,
  },
});
```

The application is incomplete with the client which connects to the WebSocket of course! Following the [WebSocket server connection documentation](https://bun.sh/docs/api/websocketsconnect-to-a-websocket-server) connecting to the backend is rather simple:

```ts
const client = new WebSocket("ws://localhost:8080/subscribe");
const form = document.getElementById("chat-form");
const chatFeed = document.getElementById("chat-feed");

client.addEventListener("message", (event) => {
  chatFeed.innerHTML += event.data;
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const message = formData.get("message");
  client.send(message);
  form.reset();
});
```

Don't forget to implement the client JavaScript file response our backend and include a link to the file it inside of the layout.

## The problem

As you can see here, every change in UI needs to be manually implemented. At the moment we are listening to a single event and updating one single element. When the application grows in complexity, the javascript code grows too. What if I told you that we can "almost" completely get rid of the client code by introducing Turbo streams?

## Step 3: Understanding Turbo

Turbo is a JavaScript library, part of the Hotwire Framework:
// TODO

## Step 4: Implementing Turbo

Importing Turbo is as simple as including this snippet of code inside our layout file:

```html
<script type="module">
  import hotwiredTurbo from "https://cdn.jsdelivr.net/npm/@hotwired/turbo@8.0.3/+esm";
</script>
```

In order to use WebSockets for turbo streams in the frontend, we can use the following snippet from the [stream documentation](https://turbo.hotwired.dev/handbook/streams):

```html
<turbo-stream-source src="ws://localhost:8080/subscribe" />
```

In order to update the UI when a message is sent, we broadcast the following HTML through WebSockets:

```html
<turbo-stream action="append" target="chat-feed">
  <template>
    <p class="notice">Anonymous: Hello World!</p>
  </template>
</turbo-stream>
```

I'd say that the HTML does precise what it promises to do:
`Append` a paragraph with the message "Anonymous: Hello World!" to the `chat-feed`.
This eliminates _almost_ all the client side JavaScript.

## Step 5: Form Controller

Before introducing turbo, we added a simple event listener to reset the Form after the data has been sent to the server. We now need to bring the functionality back but without reusing the old code. We could use a turbo-stream to reset the form or even a turbo-frame but rather than using that, I decided to use another library of the Hotwire framework, namely Stimulus:

> Stimulus is a JavaScript framework with modest ambitions. It doesn’t seek to take over your entire front-end—in fact, it’s not concerned with rendering HTML at all. Instead, it’s designed to augment your HTML with just enough behavior to make it shine.
> https://stimulus.hotwired.dev/

This is what the stimulus controller looks like:

```ts
import {
  Application,
  Controller,
} from "https://cdn.jsdelivr.net/npm/stimulus@3.2.2/+esm";

class FormController extends Controller {
  clear() {
    this.element.reset();
  }
}

const application = Application.start();
application.register("form", FormController);
```

This is what the form looks like after the change:

```html
<form
  id="chat-form"
  action="/submit"
  method="post"
  data-controller="form"
  data-action="turbo:submit-end->formclear"
>
  <label for="message-input">Message:</label>
  <input name="message" data-form-target="input" required />
  <input type="hidden" name="clientId" value="${clientId}" />
  <input type="submit" value="Send" />
</form>
```

I thank user [Deepesh on StackOverflow](https://stackoverflow.com/questions/71462885/how-to-clear-form-after-submission-in-rails-using-stimulus-hotwire) for showing me that you can use the turbo:submit-end event to clear the form. Note that you don't even need to specify any targets, as the goal is to reset the entire form on submission. Quite neat indeed!

## Conclusion

Hotwire is a JavaScript framework that helps us make applications more interactive while keeping the JavaScript code to a minimum. The framework itself is backend agnostic and can be thus used without almost any backend.

Turbo streams enable us to update client user interfaces asynchronously without the need forAany (in some cases just very little) frontend code.

Stimulus enables us to add simple JavaScript behavior to our HTML with the use of Stimulus Controllers and `data-` attributes.

https://github.com/CuddlyBunion341/bunjs-turbo-demo
