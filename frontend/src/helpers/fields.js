export const postFields = {
  author: {
    type: "text",
    name: "author",
    label: "Author",
    required: true,
    placeholder: "What's your name?"
  },
  categories: {
    type: "select",
    name: "category",
    label: "Category",
    placeholder: "Who you're talking about?",
    required: true,
    options: []
  },
  title: {
    type: "text",
    name: "title",
    label: "Title",
    placeholder: "Catch everyone's attention by the title.",
    required: true
  },
  body: {
    type: "textarea",
    name: "body",
    label: "Body",
    placeholder: "Reveal your inner troll in the post's body.",
    required: true
  }
}

export const commentFields = {
  author: {
    type: "text",
    name: "author",
    label: "Author",
    required: true,
    placeholder: "What's your name?"
  },
  body: {
    type: "textarea",
    name: "body",
    label: "Body",
    placeholder: "You sure you gonna say that? You crazy!",
    required: true
  }
}
