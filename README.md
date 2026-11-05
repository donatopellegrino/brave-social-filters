# YouTube, Instagram, and X filters for Brave

Custom cosmetic filters for YouTube, Instagram, and X in Brave. Each list has a separate scope.

| Version | Website | Filter subscription URL |
| --- | --- | --- |
| Mobile YouTube | `m.youtube.com` | [Mobile filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/duration-filter-grey.txt) |
| Desktop YouTube | `www.youtube.com` | [Desktop filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/duration-filter-desktop-grey.txt) |
| Mobile Instagram | `www.instagram.com` | [Instagram filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/instagram-for-you-grey.txt) |

Local X filters: [video viewer](x-video-no-scroll.txt) and [For you](x-for-you-grey.txt). These lists have not been published as subscriptions. Paste either file's contents into **Create custom filters**, save, and reload X. They can be used separately or together.

## Install

1. Open `brave://settings/shields/filters` in Brave. On Android, you can also open Settings → Brave Shields & privacy → Content filtering.
2. Under **Add custom filter lists**, paste the appropriate raw subscription URL from the table and add it.
3. Remove older manually pasted versions of the rules for the selected site, then reload that site.

After a repository update, use **Update now** in Brave's filter-list settings and reload the site to fetch the latest version without waiting for a background update.

## YouTube behavior

On Home, regular videos shorter than 15 minutes retain their space and duration badge, but their thumbnail and channel avatar become grey, their title becomes `REDACTED`, their channel name and statistics are removed, and clicking is disabled. Videos of 15 minutes or longer retain their cards' normal behavior.

All Home video previews are visually suppressed, including previews of longer videos. Watch-page playback is unaffected. Search and channel pages are outside the intended filter scope. These lists add no Shorts filtering; manage Shorts separately in Brave.

The rules match English duration labels. They depend on YouTube's page markup and may need updates when YouTube changes its website. Cosmetic filtering does not guarantee that video or preview data will not be downloaded.

## Instagram behavior

On the mobile website, the home **For you** feed and the central **Reels** discovery tab become solid grey boxes. Their feed content cannot be tapped. The top feed selector and bottom navigation remain available.

The home **Following** and **Favorites** feeds and **Explore** stay visible. A specific reel selected from a user's profile remains visible and plays normally; the filter targets the central Reels feed rather than every video.

Verified in Brave Android 1.97.59 on 2026-10-27, using the saved custom-filter engine. Checked switching between home feeds, the central Reels tab, navigation hit targets, swiping, reloading, and playback of a profile-selected reel. Also checked browser Back/Forward, opening and dismissing the Reels selector, and opening then cancelling the post photo picker without selecting media. Other account actions were not submitted. Desktop Instagram is outside the tested scope.

These rules depend on Instagram's mobile markup and may need updates when it changes. They are visual filters and do not guarantee that hidden feed data will not be downloaded.

## X behavior

On the mobile website, `x-video-no-scroll.txt` disables scrolling in the full-screen video viewer. The opened video remains playable and the Close button remains available. Normal feed scrolling is outside this rule's scope.

`x-for-you-grey.txt` replaces the home **For you** feed with a solid grey box while preserving the feed selector and bottom navigation. **Following** remains unmasked. The selector relies on For you being the first home tab and on the English `Home timeline` label.

Verified in Brave Android 1.97.59 on 2026-11-05 using both rules saved in Brave's custom-filter editor, followed by a page reload. Checked the grey feed, switching to Following, normal Following feed scrolling, opening a video from a post, video playback, upward and downward touch scroll gestures, and attempted programmatic scrolling. The video viewer stayed at scroll position zero; playback reached the end without advancing to another video.

These rules depend on X's mobile markup and may need updates when it changes. They do not prevent hidden feed or recommended-video data from downloading and do not block account interactions. Desktop X is outside the tested scope.
