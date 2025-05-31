run eleventy
`npx @11ty/eleventy`

start live server:
`npx @11ty/eleventy --serve`


#### Video instructions

1. Screen record...

    - on a computer at 1200 x 800 for desktop videos (use inspector and quicktime modal to get the right dimensions) - should export at 2400x1600, give or take a few px. 

    - on phone with native capture tool for mobile videos 

2. Drop it into `input/assets/raw-video` and run the following applicable “golden” ffmpeg command in that folder to scale and compress to mp4

- You may get the error `height not divisible by 2`, in which case you have to nudge the pixel width used in `scale` around a little by 2s until you find one it takes.

```
<!-- desktop single file -->
ffmpeg -i "[NAME].mov" -vf "scale=1702:-1" "../video/[NAME].mp4"

<!-- desktop whole folder -->
for i in *.mov; do ffmpeg -n -i "$i" -vf "scale=1702:-1" "../video/${i%.*}.mp4"; done

<!-- mobile whole folder () -->
for i in *-mobile.mov; do ffmpeg -i "$i" "../video/${i%.*}.mp4"; done

<!-- single no resize -->
ffmpeg -i "[NAME].mp4" "../video/[NAME].mp4"
```

3. CD into `input/asset/video` and run the following to convert to nicely-sized webm

```
<!-- single -->
ffmpeg -i "[NAME].mp4" -c:v libvpx-vp9 -crf 40 -b:v 0 -b:a 128k -c:a libopus "[NAME].webm"

<!-- whole folder -->
for i in *.mp4; do ffmpeg -n -i "$i" -c:v libvpx-vp9 -crf 40 -b:v 0 -b:a 128k -c:a libopus "${i%.*}.webm"; done
```


4. In the same folder, run the following to create the poster image from the first frame of the video

```
<!-- single -->
ffmpeg -ss 00:00:00 -i "[NAME].mp4" -vframes 1 -q:v 2 "[NAME].jpg"

<!-- whole folder -->
for i in *.mp4; do ffmpeg -ss 00:00:00 -n -i "$i" -vframes 1 -q:v 2 "${i%.*}.jpg"; done
```


5. New step: create `-small` webm and mp4 versions of video, for mobile safari performance. 

TODOS for me:
- do not process video if already smaller than 800, and write template logic to use original in these cases
- write a shell script to do all this stuff automatically instead of my current painful pasting
- change all of these commands to use `-2` instead of `-1` since it deals with the height division for you

```
for i in *.mp4; do ffmpeg -n -i "$i" -vf "scale=800:-2" "${i%.*}-small.mp4"; done

for i in *-small.mp4; do ffmpeg -n -i "$i" -c:v libvpx-vp9 -crf 40 -b:v 0 -b:a 128k -c:a libopus "${i%.*}.webm"; done
```