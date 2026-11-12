# The 312 Rundown: weekly update guide

The Rundown is the weekly news block on fourthand312.com. It lives in `site/index.html`
between `<!-- RUNDOWN:START -->` and `<!-- RUNDOWN:END -->`. Replace everything
between those two markers each week. Touch nothing else on the page.

## Schedule and approval

- A draft is prepared every Tuesday morning (Central time), after Sunday's game
  and Monday's press conferences.
- Every draft goes on its own branch named `rundown/YYYY-MM-DD` with a pull request
  into `main`. Netlify builds a preview link for the pull request.
- Nothing merges into `main` until Jamel approves. Merging publishes the site.
- Breaking news (trade, major injury, coaching change) can get a same-day edition
  on request, using the same branch and pull request steps.

## Picking the stories

- Up to 3 stories, ranked by impact on the Bears' season. In order of weight:
  game result, injuries to starters, trades and roster moves, coaching news,
  player milestones and records, standings and playoff picture.
- Only news from the past 7 days. If fewer than 3 stories matter, publish fewer.
  If nothing matters (deep offseason), skip the week and say so in the pull request.
- Skip rumors, mock drafts, fantasy advice, betting lines, and opinion columns.

## Sources and fact checks

- Link the official source first: chicagobears.com. Use these when the team site
  has no story: ESPN, NFL.com, AP, Chicago Sun-Times, Chicago Tribune, NBC Chicago,
  Yahoo Sports. No fan blogs or rumor sites as the link.
- Confirm every number, name, score, and injury status in two separate sources.
  If two sources disagree, leave the detail out.
- Write everything in your own words. Never copy sentences from an article.
  Quote at most one word or a short phrase, and only when the exact word is the story.
- Never add team logos, player photos, or game images.

## Voice

- Plain English, short sentences, about a 3rd to 5th grade reading level.
- Confident and direct, like a smart fan explaining the week to a friend.
- Each "why it matters" line answers one question: what does this mean for the Bears?
- No em dashes. No buzzwords. No hype words like "massive" or "insane."
- Headlines: 8 words or fewer, specific, with a number or name when possible.

## The block (copy this structure exactly)

```html
    <!-- RUNDOWN:START -->
    <section class="rundown" id="rundown" aria-labelledby="rundown-title">
      <div class="wrap rundown__inner">
        <div class="rundown__head">
          <h2 id="rundown-title" class="section-title">The 312 Rundown</h2>
          <p class="rundown__date">Updated <time datetime="YYYY-MM-DD">Mon. D, YYYY</time></p>
        </div>

        <ul class="scoreboard" role="list" aria-label="Where the Bears stand">
          <li><span class="scoreboard__label">Record</span><span class="scoreboard__value">W-L</span></li>
          <li><span class="scoreboard__label">NFC North</span><span class="scoreboard__value">1st</span></li>
          <li><span class="scoreboard__label">Next: Opponent</span><span class="scoreboard__value">Mon. D</span></li>
        </ul>

        <ol class="stories" role="list">
          <li class="story">
            <p class="story__tag">Game recap</p>
            <h3 class="story__title">Headline here</h3>
            <p class="story__text">Why it matters, in two or three short sentences.</p>
            <a class="story__source" href="https://www.chicagobears.com/..." target="_blank" rel="noopener noreferrer">Source: Chicago Bears<span class="sr-only"> (opens in a new tab)</span><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M6 3h7v7M13 3 4 12" fill="none" stroke="currentColor" stroke-width="2"/></svg></a>
          </li>
          <!-- up to 3 stories -->
        </ol>
      </div>
    </section>
    <!-- RUNDOWN:END -->
```

Scoreboard notes:
- Third tile: during a bye week use label `Next: Opponent` with the game date.
  On a game week use the opponent and date. In the offseason use the next key
  date (for example `Draft` and `Apr. 22`).
- Division place counts ties as shared (write `T-1st`).

Tags to use: Game recap, Injury, Roster move, Trade, QB watch, Coaching,
Milestone, Standings.

## Before opening the pull request

1. Only the lines between the markers changed (`git diff main -- site/index.html`).
2. The page renders with no horizontal scroll at 390px and 1440px wide.
3. Every link opens the right article.
4. No em dashes anywhere in the block.
