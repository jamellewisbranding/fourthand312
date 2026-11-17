# The Breakdown: weekly game preview guide

The Breakdown is the game preview on fourthand312.com. It sits right under the
312 Rundown, in `site/index.html` between `<!-- BREAKDOWN:START -->` and
`<!-- BREAKDOWN:END -->`. Replace everything between those two markers each game
week. Touch nothing else on the page. The Rundown has its own guide (RUNDOWN.md)
and its own schedule; never edit the Rundown block from a Breakdown update.

## Schedule and approval

- One edition per game week, previewing the Bears' next game.
- A draft is prepared after the first official injury report of the week.
  For a Sunday or Monday game that is Wednesday. For a Thursday game the
  final report also comes out Wednesday, so the same day works.
- Bye week: no new edition. About 4 hours after kickoff, `site.js` adds the
  "That game is in the books" note and hides the score-call button on its own,
  so an old preview never reads as upcoming.
- Every draft goes on its own branch named `breakdown/YYYY-MM-DD` with a pull
  request into `main`. Netlify builds a preview link for the pull request.
- Nothing merges into `main` until Jamel approves. Merging publishes the site.
- Big late news (a starter ruled out, a QB change) can get a same-week refresh
  on request, using the same branch and pull request steps.

## What goes in

1. Matchup card: week number, both teams with records (away team left, home
   team right, "at" in the middle), date, kickoff time in Central time, TV
   network, stadium.
2. Three numbers: Bears point differential, opponent point differential, and
   the point spread ("Bears favored by" or "Bears getting"). Under them, one
   line explaining point differential with the Bears' points scored and
   allowed, and the date of the line. Add the last meeting between the teams.
3. Keys to the game: exactly 3. Each one is something fans can watch for
   during the game, tied to a real number or injury.
4. Players to watch: 3. Two Bears and one opponent. Label each with team and
   position (for example `Bears RB`, `Saints QB`). Give the opponent player the
   `player--opp` class.
5. Score call: ask fans for their final score on Facebook. Post a matching
   "What's your final score?" post on the Facebook page the same day.
6. Sources: every outlet used, as links in one line.

## Odds rules

- Odds are news, not advice. Show the point spread only, with an "as of" date.
- Use the spread only when two sources agree on it. If they disagree, write the
  range ("double-digit favorites") or leave the tile out and use another stat.
- Never name or link a sportsbook. No picks, no "best bets," no over/under
  advice, no betting tips.

## Sources and fact checks

- Use these outlets: chicagobears.com, the opponent's team site, ESPN, NFL.com,
  AP, Chicago Sun-Times, Chicago Tribune, NBC Chicago, FOX Sports, Yahoo Sports.
  No fan blogs or rumor sites as the link.
- Confirm every number, name, score, injury status, kickoff time, and TV
  network in two separate sources. If two sources disagree, leave the detail
  out or round it in a way both sources support ("about 100 yards a game").
- Write everything in your own words. Never copy sentences from an article.
- Never add team logos, player photos, or game images.

## Voice

- Fan to fan. Written for diehard Bears fans who love to learn the game, and
  for couples and families who watch together. Not an expert page, and never
  out to start a fight.
- Short sentences, about a 3rd to 5th grade reading level. Explain any stat a
  casual fan might not know, in one line.
- Never use the phrases "no noise," "couch talk," or "plain English."
- No em dashes. No buzzwords. No hype words like "massive" or "insane."
- Family friendly. No trash talk about the opponent's fans or players.
- Key titles: 7 words or fewer, an action fans can watch for.

## The block (copy this structure exactly)

`data-kickoff` is the kickoff time with the Central time offset: `-05:00` for
September and October games, `-06:00` from November on.

```html
    <!-- BREAKDOWN:START -->
    <section class="breakdown" id="breakdown" aria-labelledby="breakdown-title" data-kickoff="YYYY-MM-DDTHH:MM:00-06:00">
      <div class="wrap breakdown__inner">
        <div class="breakdown__head">
          <h2 id="breakdown-title" class="section-title">The Breakdown</h2>
          <p class="breakdown__date">Updated <time datetime="YYYY-MM-DD">Mon. D, YYYY</time></p>
        </div>
        <p class="breakdown__status" hidden>That game is in the books. This was the preview for the OPPONENT game. The next Breakdown drops during the next game week.</p>
        <p class="breakdown__lede">Two or three sentences: where the Bears stand and why this game matters. End with "Here's what to watch DAY."</p>

        <div class="matchup">
          <p class="matchup__week">Week N</p>
          <p class="matchup__teams">
            <span class="matchup__team"><span class="matchup__name">AWAY</span> <span class="matchup__record">W-L</span></span>
            <span class="matchup__at">at</span>
            <span class="matchup__team matchup__team--home"><span class="matchup__name">HOME</span> <span class="matchup__record">W-L</span></span>
          </p>

          <dl class="matchup__details">
            <div><dt>Date</dt><dd><time datetime="YYYY-MM-DD">Day., Mon. D</time></dd></div>
            <div><dt>Kickoff</dt><dd>12 p.m. CT</dd></div>
            <div><dt>TV</dt><dd>FOX</dd></div>
            <div><dt>Stadium</dt><dd>Soldier Field</dd></div>
          </dl>

          <ul class="matchup__stats" role="list" aria-label="By the numbers">
            <li><span class="matchup__stat-label">Bears point differential</span><span class="matchup__stat-value">+0</span></li>
            <li><span class="matchup__stat-label">OPPONENT point differential</span><span class="matchup__stat-value">&minus;0</span></li>
            <li><span class="matchup__stat-label">Bears favored by</span><span class="matchup__stat-value">0</span></li>
          </ul>
          <p class="matchup__fine">Point differential is points scored minus points allowed. The Bears have scored N and allowed N. The line is from Mon. D and can move before kickoff.</p>
          <p class="matchup__fine">Last meeting: TEAM N, TEAM N (Mon. D, YYYY, at STADIUM)</p>
        </div>

        <div class="breakdown__cols">
          <div class="breakdown__block">
            <h3 class="breakdown__subhead">Keys to the game</h3>
            <ul class="keys" role="list">
              <li class="key">
                <h4 class="key__title">Short key title</h4>
                <p class="key__text">Two or three short sentences with the number or injury behind it.</p>
              </li>
              <!-- exactly 3 keys -->
            </ul>
          </div>

          <div class="breakdown__block">
            <h3 class="breakdown__subhead">Players to watch</h3>
            <ul class="players" role="list">
              <li class="player">
                <p class="player__team">Bears POS</p>
                <h4 class="player__name">Player Name</h4>
                <p class="player__text">One stat and why he matters this week.</p>
              </li>
              <!-- 2 Bears, then 1 opponent with class="player player--opp" -->
            </ul>
          </div>
        </div>

        <div class="breakdown__cta">
          <p class="breakdown__ask">What’s your final score? Drop it on our Facebook page before kickoff.</p>
          <a class="btn" href="https://www.facebook.com/profile.php?id=61596199782213" target="_blank" rel="noopener noreferrer">
            Call it on Facebook<span class="sr-only"> (opens in a new tab)</span>
            <svg class="btn__icon" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M7 4h9v9M16 4 4 16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="square"/></svg>
          </a>
        </div>

        <p class="breakdown__sources">Sources:
          <a href="https://..." target="_blank" rel="noopener noreferrer">Outlet</a>,
          <a href="https://..." target="_blank" rel="noopener noreferrer">Outlet</a>
          <span class="sr-only">(links open in a new tab)</span>
        </p>
      </div>
    </section>
    <!-- BREAKDOWN:END -->
```

Road games: the opponent goes on the right as the home team, and the Bears go
on the left. The "Stadium" value is the opponent's stadium.

## Before opening the pull request

1. Only the lines between the Breakdown markers changed
   (`git diff main -- site/index.html`).
2. `data-kickoff` matches the kickoff time, with the right Central offset.
3. The page renders with no horizontal scroll at 320px, 390px and 1440px wide.
4. Every link opens the right article.
5. No em dashes, and none of the banned phrases, anywhere in the block.
