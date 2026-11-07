# Brave social filters

Filters for YouTube, Instagram, and X in Brave.

Supports English, German, Italian, Spanish, and French interfaces.

| Platform | Setup |
| --- | --- |
| Android | [Android filters](android/README.md) |
| iPhone | [iPhone filters](iphone/README.md) |
| Desktop | [YouTube filter](https://raw.githubusercontent.com/donatopellegrino/youtube-filters/main/youtube-filter-desktop.txt) |

On desktop, open `brave://settings/shields/filters` and add the YouTube filter URL under **Add custom filter lists**. Remove older pasted rules for the same site and reload it.

If Brave keeps an old version, remove the subscription and add its URL with `?v=2` at the end, then reload the site. Use a new number for each later refresh.

## What the filters do

- **YouTube:** On Home, videos shorter than 15 minutes have grey thumbnails and avatars, a `REDACTED` title, hidden channel details, and disabled clicks. Longer videos stay usable. All Home previews are hidden. Search, channel pages, and watch-page playback stay available. Shorts are not filtered.
- **Instagram:** The mobile Home **For you** feed and central **Reels** feed become grey and cannot be tapped or swiped through. Home **Following**, **Favorites**, **Explore**, profiles, and reels opened from a profile stay available.
- **X:** The mobile Home **For you** feed becomes grey. **Following**, profiles, search, and posts stay available. In the full-screen video viewer, the opened video plays, but scrolling to other videos is blocked. The Close button stays available.

Use only the list for your platform for each site. These filters target the websites, not the Instagram, YouTube, or X apps. They rely on site layouts, so website changes can break them. Hidden content might still download.
