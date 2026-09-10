# Built By Her — BP-01 interactive lesson

An interactive, mobile-friendly version of Module 1, Lesson 1: **What is my business, who is it for and what problem does it solve?**

## Publish with GitHub Pages

1. Create a GitHub repository and push this project to its default branch.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. The included workflow publishes the `dist` folder.

The live URL can be pasted into a Circle lesson as an embed. A ready-to-copy iframe is included in `CIRCLE-SETUP.md`.

Search engines are asked not to index the lesson. This reduces accidental discovery but is not access control: anyone who knows the GitHub Pages URL can open it.

## Learner data

Answers and progress are stored only in the learner's browser using `localStorage`. No answers are sent to a server. Learners can download a text copy of their work.

## Local preview

Serve the `dist` directory with any static web server, for example:

```bash
python3 -m http.server 8000 --directory dist
```
