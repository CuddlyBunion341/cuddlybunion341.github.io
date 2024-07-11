#!/bin/bash

projects=$(cat "projects.json" | jq -c '.[]')

echo "${projects}" | while read project
do
    name=$(echo "${project}" | jq -r '.name')
    slug=$(echo "${project}" | jq -r '.slug')
    description=$(echo "${project}" | jq -r '.description')
    tags=$(echo "${project}" | jq -r '.tags | join(", ")')
    filename="../content/projects/${slug}.md"

  if [ ! -f "${filename}" ]; then
      touch "${filename}"
  fi

    content="---
name: \"${name}\"
description: \"${description}\"
tags: [${tags}]
heroImage: \"/src/assets/projects/${slug}.webp\"
github: \"https://github.com/CuddlyBunion341/${slug}\"
---
There is no description for this project yet.
"

  echo "${content}" > "${filename}"
done
