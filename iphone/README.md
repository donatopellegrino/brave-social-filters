# iPhone filters for Brave

These lists target the mobile websites in Brave for iOS. Install the iPhone variant instead of the corresponding Android list in the repository root.

| Website | iPhone list |
| --- | --- |
| YouTube | [`duration-filter-grey.txt`](duration-filter-grey.txt) |
| Instagram | [`instagram-for-you-grey.txt`](instagram-for-you-grey.txt) |
| X | [`x-filters.txt`](x-filters.txt) |

Open a list on GitHub, select **Raw**, and copy its URL. In Brave, open **Settings → Shields & Privacy → Content Filtering → Add Filter By URL** and add that URL. Disable older subscriptions and remove manually pasted rules for the same site, then reload the site. Only use URLs from the branch containing these files; they are unavailable on the default branch until the pull request is merged.

The intended behavior is the same as the corresponding [Android lists](../README.md): grey short YouTube Home cards, grey Instagram Home For you and central Reels feeds, and grey X Home For you with a locked full-screen video viewer. Following, profiles, search, and supported playback remain outside those masks as described there.

## Why separate iPhone lists

Brave iOS applies `:style(...)` actions by marking matching elements. In the tested build, those marks remain after the selector stops matching during navigation. The Android Instagram rules reproduced a grey mask stuck on Home Following until a reload.

The iPhone variants attach native nested CSS rules to `html`. WebKit evaluates the nested selectors continuously, so the style applies only while the page matches. This also lets the browser handle YouTube's `::after` title replacement, rather than querying a pseudo-element as a DOM element.

## Validation

Test environment: iPhone 17 simulator, iOS 26.5, source-built Brave iOS tag `v1.100.49` (`e78647444c4e1b168bb1b2ff382cc9bf019344f7`), tested on 2026-11-06. This is simulator evidence for that build; an App Store release and a physical iPhone have not been checked.

The Instagram candidate was saved in Brave's custom-filter editor with the original subscription disabled. Verified Home For you masking; Home Following becoming visible without reloading and scrolling normally; Favorites displaying its empty state; returning Home restoring the mask; Explore and profile navigation; central Reels masking and swipe blocking; and an unmasked profile-selected reel with playback advancing. Browser Back returned to the profile grid, and Forward restored the playable reel.

YouTube checks confirmed redacted short Home cards, normal long cards, visible search results, watch-page playback, channel navigation, and browser Back to Home. After enabling YouTube History in this logged-out test browser's cookie consent, watching a search result populated Home recommendations. A later Home preview exposed a navigation overlay with its own pointer events; the added preview-container hiding and descendant pointer rule still require a saved-rule retest. X navigation validation is incomplete. Do not treat either list as fully verified on iPhone yet.

These are visual filters. Hidden content might still download. The selectors depend on current site markup and English labels.
