"""Acquire publisher-authored placement references; preserve media artwork and attribution."""
from pathlib import Path
import urllib.request, re, html, json, subprocess
import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public/media/platforms'
OUT.mkdir(parents=True, exist_ok=True)
def fetch(url):
    return urllib.request.urlopen(urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=40).read()
def save(name, url):
    path = OUT / name
    path.write_bytes(fetch(url))
    print(name, path.stat().st_size)
    return path

research=ROOT/'scratch/platform-research'
research.mkdir(parents=True, exist_ok=True)
kit=research/'zee5-kit-2022.pdf'
if not kit.exists():
    kit.write_bytes(fetch('https://tma-live.s3.ap-south-1.amazonaws.com/media/zee5-app-advertising/media-kit-ZEE5%20Deck%20Mar%2722%20%281%29.pdf'))
reel=research/'sony-reel.mp4'
if not reel.exists():
    # Clear, public advertising reel; copy its first 52 seconds for the 00:45 still.
    base='https://streaming.sonyliv.com/Sony_Liv_Video_Final_tv_1200k_20210105T053157'
    fragments=fetch(base+'init.mp4')
    for i in range(1,14): fragments += fetch(base+f'_{i:09d}.mp4')
    reel.write_bytes(fragments)

save('prime-interactive.jpg', 'https://m.media-amazon.com/images/G/01/AdProductsWebsite/images/guides/gd_Screenshot_body._TTW_.jpg')
save('youtube-instream.gif', 'https://lh3.googleusercontent.com/5PZeggbAP_FAWJl-_8pyAZ5MUR-l-uYvC1irpGvPSoKextn-2-Cghh4PYkTCRrV_9uY=w895')
save('youtube-infeed.svg', 'https://storage.googleapis.com/support-kms-prod/Rwe8QAidjWhs6T2qj8s3sdZ3iOadku5CJk4p')
save('youtube-shorts.svg', 'https://storage.googleapis.com/support-kms-prod/F7OqoadWdOdPhfZGKSeNGQCQIE0TPwo5WgyV')
with Image.open(OUT/'youtube-instream.gif') as im:
    im.seek(0)
    im.convert('RGB').save(OUT/'youtube-instream.webp', 'WEBP', quality=94)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i',str(OUT/'youtube-instream.gif'),'-vf','pad=ceil(iw/2)*2:ceil(ih/2)*2','-pix_fmt','yuv420p','-movflags','+faststart','-y',str(OUT/'youtube-instream.mp4')], check=True)
subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-ss','45','-i',str(reel),'-frames:v','1','-y',str(OUT/'sony-spotlight.png')],check=True)
for format, timestamp in [('pre-roll','5'),('mid-roll','7')]:
    subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-ss',timestamp,'-i',str(ROOT/f'public/media/jiohotstar/{format}.mp4'),'-frames:v','1','-y',str(OUT/f'jiohotstar-{format}.webp')],check=True)
doc=pymupdf.open(kit)
slide=research/'zee5-slide.png'
doc[18].get_pixmap(matrix=pymupdf.Matrix(1.5,1.5)).save(str(slide))
with Image.open(slide) as im: im.save(OUT/'zee5-formats-2022.webp','WEBP',quality=95)

logos=ROOT/'public/brands'
(logos/'jiohotstar-original.png').write_bytes(fetch('https://adtech-ams-video-prod-ap-south-1.s3.ap-south-1.amazonaws.com/selfserve-wordpress/logo/jiohotstar-ebd3c499-bcaa-4560-a5d4-ab3e03221cf6.png'))
(logos/'jiohotstar-on-dark.png').write_bytes(fetch('https://img10.hotstar.com/image/upload/f_auto,q_90,w_384/v1737554969/web-assets/prod/images/rebrand/logo.png'))
(logos/'zee5-navigation.png').write_bytes(fetch('https://akamaividz2.zee5.com/image/upload/navigation/all/home_v1/selected/zee_5_icon_selected'))
(logos/'prime-video-blue.png').write_bytes(fetch('https://assets.aboutamazon.com/26/c7/11fb9c044d14870a3154c90d9bf5/prime-video-landscape-logo-blue-rgb.png'))
(logos/'sonyliv.png').write_bytes(fetch('https://sonypicturesnetworks.com/images/logos/Sony_LIV.png'))
page='https://commons.wikimedia.org/wiki/File:ZEE5_2025.svg'
s=fetch(page).decode()
url=html.unescape(re.search(r'class="fullImageLink".*?<a href="([^"]+)"',s,re.S)[1])
(logos/'zee5-original.svg').write_bytes(fetch(url))
print('ZEE5 vector source:',url)
