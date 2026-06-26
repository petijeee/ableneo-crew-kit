# ableneo Crew — manuál pre kolegov

Toto je AI crew na tvorbu ableneo výstupov. Píšeš zadania bežnou rečou, špecializovaní
agenti exekvujú a všetci čerpajú z jedného spoločného knowledge (brand, voice, positioning).

## 1. Setup (raz, 5 minút)

1. Nainštaluj Claude Code: https://claude.com/claude-code
2. Naklonuj repo a otvor ho v Claude Code:
   ```
   git clone https://github.com/petijeee/ableneo-crew-kit
   cd ableneo-crew-kit
   claude
   ```
3. Hotovo. Pri štarte sa sám načíta brand kontext (voice, farby, positioning).

## 2. Čo môžeš robiť hneď (netreba žiadne kľúče)

| Chcem | Povedz napríklad |
|---|---|
| LinkedIn post, carousel copy, event text | „napíš LinkedIn post o [téme]" |
| Skontrolovať text na brand a voice | „skontroluj tento draft" alebo `/brand-check` |
| Prepísať text do ableneo voice | „prepíš toto do nášho tónu" alebo `/rewrite-voice` |
| Deck / prezentáciu | „sprav deck o [téme] pre [publikum]" alebo `/new-deck` |
| Vizuál, farby, štýl | „naštýluj toto podľa brandu" |
| Positioning, „je to on-strategy?" | „je tento smer správny pre ableneo?" |
| Social klipy z nahrávky eventu | „z tejto nahrávky sprav 9:16 klipy + captiony" |
| AI produktové video (b-roll cez ComfyUI) | „sprav explainer o [téme]" (b-roll potrebuje Comfy kľúč) |

Píš normálne, správny agent sa ozve sám. Príklad reťazca: požiadaš o post, content-linkedin
ho napíše, brand-guardian ho skontroluje proti pravidlám.

## 3. Pravidlá tónu (povinné, agenti ich strážia)

- Konkrétne čísla namiesto prídavných mien. Reálne dáta alebo nič, nikdy vymyslené.
- Žiadne em dashes. Žiadne „nerobíme X, robíme Y" cez dve vety.
- Bez hype a korporátnych fráz. Calm, confident, precise, human.
- Pred odoslaním čohokoľvek von pusti `/brand-check`.

## 4. Kde je čo

- `ableneo/knowledge/` — zdroj pravdy (brand, voice, positioning, audience, offering, ESSA).
  Začni v `ableneo/knowledge/README.md`.
- `ableneo/ABLENEO.md` — operating manuál pre agentov (kto rieši čo).
- `ableneo/outputs/` — sem sa ukladajú výstupy (`YYYY-MM-DD-ableneo-*`).

## 5. Čo je len u Petra (vyžaduje kľúče, nie je v repe)

Tieto veci bežia v Peterovom prostredí, lebo potrebujú prístupové kľúče:

- **Publikovanie na LinkedIn** (cez Buffer/Publora) — vždy len po Peterovom schválení.
- **Performance reporty s impressions** (Buffer) a **úpravy webu ableneo.com** (WordPress).
- **Týždenné automatické routines** (research sweep, performance pull).

Ty pripravíš a odladíš obsah, finálny publish a metriky idú cez Petra.

## 6. Zlaté pravidlo

Píš zadania normálne, crew exekvuje na spoločnom knowledge, **človek schvaľuje, čo ide von.**
Keď sa zmení nejaká pravda o firme (číslo, klient, positioning), uprav ju v
`ableneo/knowledge/` a commitni, aby ju mali všetci.
