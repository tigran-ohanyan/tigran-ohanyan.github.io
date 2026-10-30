# tigran-ohanyan.github.io

Personal CV and portfolio: https://tigran-ohanyan.github.io/

- Single static page, no build step: `index.html`, `css/style.css`, `js/main.js`, `js/i18n.js`.
- English and Russian, switchable in the header; the choice is remembered in `localStorage`.
- Dark and light theme, follows the system by default.
- "Save as PDF" uses a print stylesheet to produce a one-column CV.
- Sections: about, experience, games (Dawn of Zombies, Zombie Miner), open-source projects, skills, certificates, education, contact.

## Run locally

```bash
python3 -m http.server 8080
# open http://localhost:8080
```

## Update content

- Texts for both languages live in `js/i18n.js` (keys match `data-i18n` attributes in `index.html`).
- Project cards are plain HTML in the `#projects` section; screenshots are in `assets/img/`.

## License

MIT for the code. Game artwork belongs to Royal Ark.
