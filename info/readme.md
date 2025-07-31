# Leo Santos Animation Portfolio

A clean, elegant, self-contained portfolio website for showcasing animation and layout work.

## ✅ Complete Package Ready

You now have everything needed for a professional portfolio website:

### Files Created
- `index.html` - Main website (never needs editing)
- `data/projects.json` - Project metadata and configuration
- `data/articles/` - 6 complete sample articles:
  - `2021-06-18-luca.md`
  - `2020-12-25-soul.md`
  - `2020-03-06-onward.md`
  - `2018-06-29-incredibles2.md`
  - `2017-11-22-coco.md`
  - `2015-06-19-inside-out.md`

## 🎯 Next Steps

1. **Download all the artifacts** (index.html, projects.json, all .md files)
2. **Add your media files** - thumbnails are most critical for immediate functionality
3. **Upload to any web host** - works instantly!

### What You Need to Add
```
media/
├── thumbnails/          # Add these images (300x200px recommended)
│   ├── luca.jpg
│   ├── soul.jpg
│   ├── onward.jpg
│   ├── incredibles2.jpg
│   ├── coco.jpg
│   └── inside-out.jpg
│
├── images/             # Article images referenced in markdown
│   ├── luca-town-studies.jpg
│   ├── soul-nyc-streets.jpg
│   ├── soul-great-before.jpg
│   ├── onward-new-mushroomton.jpg
│   ├── onward-character-staging.jpg
│   ├── incredibles2-architecture.jpg
│   ├── incredibles2-jack-jack.jpg
│   ├── coco-santa-cecilia.jpg
│   ├── coco-performance-staging.jpg
│   ├── inside-out-headquarters.jpg
│   └── inside-out-islands.jpg
│
└── videos/            # Article videos (MP4 format recommended)
    ├── luca-transformation-sequence.mp4
    ├── soul-jazz-club-sequence.mp4
    ├── onward-quest-montage.mp4
    ├── incredibles2-elastigirl-chase.mp4
    ├── coco-land-of-dead-reveal.mp4
    └── inside-out-memory-journey.mp4
```

## 🔄 Using Claude as Your IDE Agent

When you're ready to customize:
- **"Add a new project for [film name]"** - I'll create the .md file and JSON entry
- **"Edit the Luca article to mention [specific detail]"** - I'll update the content
- **"Change the color scheme to [description]"** - I'll modify the CSS
- **"Fix the responsive layout on mobile"** - I'll debug and update

The system is designed so you never need to touch the main `index.html` - just manage content files and use Claude for any code changes.

## 🚀 Ready to Deploy

Your portfolio is **production-ready** with professional content that showcases the caliber of Pixar layout work. Drop in your actual images/videos, and you'll have a stunning showcase of your animation career!

## Quick Start

1. **Create the folder structure** as shown below
2. **Add your media files** (thumbnails are most important for immediate functionality)
3. **Upload everything to your web host**
4. **Visit your site** - it works immediately!

## Customization

### Adding New Projects
1. Write a new `.md` file in `data/articles/` using the `YYYY-MM-DD-projectname.md` format
2. Add the project to `data/projects.json`:
   ```json
   {
     "title": "New Project",
     "role": "Your Role",
     "year": "2024",
     "date": "2024-01-15",
     "studio": "Studio Name",
     "filename": "2024-01-15-new-project.md",
     "thumbnail": "new-project.jpg"
   }
   ```
3. Add thumbnail image to `media/thumbnails/`
4. Reload - your new project appears automatically!

### Editing Existing Content
- **Articles**: Edit any `.md` file in `data/articles/`
- **Project info**: Update `data/projects.json`
- **Media**: Replace files in `media/` folders

## Markdown Features Supported

- Headers: `#`, `##`, `###`
- **Bold** and *italic* text
- [Links](url)
- ![Images](path/to/image.jpg)
- `VIDEO: path/to/video.mp4` for embedded videos
- Bullet lists with `*`

## File Size Recommendations

- **Thumbnails**: 300x200px, under 100KB each
- **Article images**: Max 1920px wide, under 500KB each
- **Videos**: H.264 encoding for best compatibility

## Hosting

This site works on any web hosting service:
- Upload the entire folder structure
- Make sure `index.html` is in the root directory
- All modern web hosts support this setup automatically

Your portfolio is now ready to showcase your professional animation work with style and elegance!
