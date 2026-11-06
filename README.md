# Brave social filters

Custom cosmetic filters for YouTube, Instagram, and X in Brave. Each list has a separate scope. The existing mobile lists target Android; iPhone variants are in [`iphone/`](iphone/README.md).

| Version | Website | Filter subscription URL |
| --- | --- | --- |
| Android YouTube | `m.youtube.com` | [Mobile filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/duration-filter-grey.txt) |
| Desktop YouTube | `www.youtube.com` | [Desktop filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/duration-filter-desktop-grey.txt) |
| Android Instagram | `www.instagram.com` | [Instagram filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/instagram-for-you-grey.txt) |
| Android X | `x.com` | [X filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/x-filters.txt?v=2) |

## Install

For iPhone setup and validation limits, see [`iphone/README.md`](iphone/README.md). Use one platform variant per site; keeping an Android list enabled alongside its iPhone replacement can preserve incorrect styles.

1. Open `brave://settings/shields/filters` in Brave. On Android, you can also open Settings → Brave Shields & privacy → Content filtering.
2. Under **Add custom filter lists**, paste the appropriate raw subscription URL from the table and add it.
3. Remove older manually pasted versions of the rules for the selected site, then reload that site.

On desktop, use **Update now** in Brave's filter-list settings and reload the site after a repository update.

In Brave Android 1.97.59, the **UPDATE** button updates built-in lists rather than forcing custom subscriptions to refresh. To force a custom-list refresh, tap the pencil icon in **Content filtering**, delete the old subscription with its trash icon, then add the subscription URL again. For the X profile fix, use the `?v=2` URL in the table to request a fresh subscription, then open X in a new tab. Remove the previous X subscription first; keeping the old list enabled can retain its old rules.

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

On the mobile website, `x-filters.txt` disables scrolling in the full-screen video viewer. The opened video remains playable and the Close button remains available. Normal feed scrolling is outside this rule's scope.

The same list replaces the home **For you** feed with a solid grey box while preserving the feed selector and bottom navigation. **Following** remains unmasked. Both grey rules require the exact canonical URL `https://x.com/home`, so profiles and other pages that reuse the same timeline markup stay visible. The selector also relies on For you being the first home tab and on the English `Home timeline` label.

Verified in Brave Android 1.97.59 on 2026-11-05 using both rules saved in Brave's custom-filter editor, followed by a page reload. Checked the grey feed, switching to Following, normal Following feed scrolling, opening a video from a post, video playback, upward and downward touch scroll gestures, and attempted programmatic scrolling. The video viewer stayed at scroll position zero; playback reached the end without advancing to another video.

After correcting the home-page scope, reproduced the original profile masking and verified the saved fix on two profiles, profile Posts/Replies/Media tabs, Explore, search results, and post details. Checked Home-to-profile Back/Forward navigation, Following scrolling, and reloaded For you. Those pages stayed visible; the grey mask applied only to Home with For you selected. Rechecked video playback, the swipe lock, and Close.

These rules depend on X's mobile markup and may need updates when it changes. They do not prevent hidden feed or recommended-video data from downloading and do not block account interactions. Desktop X is outside the tested scope.
