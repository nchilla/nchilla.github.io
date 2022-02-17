run eleventy
npx @11ty/eleventy

start live server:
npx @11ty/eleventy --serve


#### FFMPEG golden 1-step command for mov->scaled mp4 saved in video folder:
`for i in *.mov; do ffmpeg -i "$i" -vf "scale=1700:-1" "../video/${i%.*}.mp4"; done`

single:

`ffmpeg -i "pern.mov" -vf "scale=1700:-1" "../video/pern.mp4"`

#### FFMPEG convert videos in a folder to nicely sized good quality webm:
`for i in *.mp4; do ffmpeg -i "$i" -c:v libvpx-vp9 -crf 40 -b:v 0 -b:a 128k -c:a libopus "${i%.*}.webm"; done`

single:

`ffmpeg -i "pern.mp4" -c:v libvpx-vp9 -crf 40 -b:v 0 -b:a 128k -c:a libopus "pern.webm"`

#### FFMPEG get first frame of each mp4 in folder and save it as a jpg
`for i in *.mp4; do ffmpeg -ss 00:00:00 -i "$i" -vframes 1 -q:v 2 "${i%.*}.jpg"; done`

single:

`ffmpeg -ss 00:00:00 -i "pern.mp4" -vframes 1 -q:v 2 "pern.jpg"`
