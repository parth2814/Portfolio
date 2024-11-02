---
title: "CTF Challenge Writeups 2024"
subtitle: "A Journey Through Security Challenges: From OSINT to OT"
date: "2024-08-11"
views: 237
---

# Welcome

Overview of challenge categories ahead:
![Image-1](image/kpmg_image/6.png)

Target flag location:
![Image-2](image/kpmg_image/7.png)

---

# OSINT Investigation

Initial target identification screen:
![Screenshot 2024-08-11 121938.png](image/kpmg_image/30.png)

This journey started with a name: **Raghava Sai Sarva**. Right away, a LinkedIn link popped up—sweet! But wait, there’s more. Scrolling down, I found a Base64 hash cleverly hidden in the description. And what does a cyber sleuth do with a hash? Decode it, of course! 🕶️:
```plaintext
TmV2ZXlgZ29ubmEgZ212ZSB5b3UgdXAKTmV2ZXlgZ29ubmEgbGVOlHlvdSBkb3duCk51dmVylGdvbm5hlHJ1 bmQgYW5klGRlc2VydCB5b3UKTmV2ZXlgZ29ubmEgbWFrZSB5b3UgY3J5Ck51dmVylGdvbm5hlHNheSBnb29kYnllCk51dmVylGdvbm5hlHRlbGwgYSBsaWUgYW5klGh 1 cnQgeW91 CgpodHRwczovBBhc3RlYmluLmNvbS9uWm1 ibkJRMyAtlG 1 lb3c=
```

LinkedIn profile analysis:
![Screenshot 2024-08-11 122125.png](image/kpmg_image/57.png)

After some tinkering in CyberChef, I found a **Pastebin link**. So, I jumped in to see what secrets lay hidden.:
![Screenshot 2024-08-11 122141.png](image/kpmg_image/25.png)

The Pastebin contained another lead—a LinkedIn link, but it also told me to check out a Discord account, **eren_meow**. Intrigued, I dived into Discord.:
![Screenshot 2024-08-11 122210.png](image/kpmg_image/14.png)

Found a **Base58 hash**! :
![8.png](image/kpmg_image/8.png)

Encoded content location:
![image.png](image/kpmg_image/9.png)

What next? Time to visit Pastebin again, but—plot twist—it’s password-protected! Lucky for me, Discord had the hint: **meowsaurabh123!** 🐱✨:
![image.png](image/kpmg_image/10.png)

Account analysis phase 1:
![image.png](image/kpmg_image/11.png)

Account analysis phase 2:
![image.png](image/kpmg_image/12.png)

Password verification:
![Screenshot 2024-08-11 122922.png](image/kpmg_image/15.png)

Final LinkedIn elements:
![Screenshot 2024-08-11 122959.png](image/kpmg_image/16.png)
![image.png](image/kpmg_image/13.png)

Target acquisition confirmed:
![Screenshot 2024-08-11 123047.png](image/kpmg_image/39.png)

# Cloud Security Challenges

## AWS S3 Investigation

Initial challenge parameters:
![Screenshot 2024-08-11 122031.png](image/kpmg_image/1.png)

**website link** with no obvious clues. Time to roll up the sleeves and inspect the source code!:
![Screenshot 2024-08-11 121823.png](image/kpmg_image/2.png)

Source code examination:
![Screenshot 2024-08-11 121832.png](image/kpmg_image/21.png)

Jackpot! The source code revealed an **AWS Access Key** and a **bucket name**: `ctf2k24-best`. With no **secret key**, though, AWS CLI wasn’t an option. So I went on a reconnaissance deep-dive, uncovering a hidden **robots.txt** file, brimming with goodies.

Extracted AWS credentials:
```plaintext
Access Key: AKIA33VJAWOZJLLBCU2A
Bucket: ctf2k24-best
```

Directory enumeration results:
![Screenshot 2024-08-11 121909.png](image/kpmg_image/20.png)

URL construction parameters:
```plaintext
Bucket: ctf2k24-best
Access Key: AKIA33VJAWOZJLLBCU2A
Expiry: 604800
Date: 20240808T094405Z
Region: us-east-1
Signature: 5625d8f847a29410e05b91df5628d6d2fa8146eed792c0ae048279798853d1b9
```

I pasted the updated link, and BOOM! Flag secured! 🏆:
![Screenshot 2024-08-11 121954.png](image/kpmg_image/46.png)

![Screenshot 2024-08-11 122009.png](image/kpmg_image/3.png)

## Secondary S3 Analysis
Challenge parameters:
![Screenshot 2024-08-11 122022.png](image/kpmg_image/51.png)

This one started with a tantalizing description and a publicly accessible bucket named **kpmg-ctf1**. Without an AWS account, I needed a workaround. Time to get creative!:
![4.png](image/kpmg_image/4.png)

Using `curl`, I grabbed the file with some serious swagger. 🍰 Piece of cake!:
![image.png](image/kpmg_image/5.png)

# Web Exploitation

Session manipulation challenge:
![Screenshot 2024-08-11 122059.png](image/kpmg_image/56.png)

This challenge began with a **login page**. Naturally, I peeked at the source code. Always check the source! And guess what? There were test credentials right there. Feeling like a secret agent, I logged in, only to land on a welcome page.:
![Screenshot 2024-08-11 121108.png](image/kpmg_image/17.png)

Here’s where the **session cookie** caught my eye—it looked like an **MD5 hash**. After cracking it online, I found it matched the **username**. But wait, what if we use the **admin** MD5 hash as the session key? Yup, that worked like a charm. 💫:
![Screenshot 2024-08-11 121212.png](image/kpmg_image/36.png)

Identified MD5 hashes:
```plaintext
test → 098f6bcd4621d373cade4e832627b4f6
admin → 21232f297a57a5a743894aee4a801fc3
```

Got the flag! 🏆:
![Screenshot 2024-08-11 121457.png](image/kpmg_image/28.png)

![Screenshot 2024-08-11 121506.png](image/kpmg_image/31.png)

# Infrastructure Security

SSH challenge parameters:
![Screenshot 2024-08-11 121950.png](image/kpmg_image/55.png)

Web interface discovery:

![Screenshot 2024-08-11 120328.png](image/kpmg_image/34.png)

With a URL, host, and port, I embarked on my final challenge. After some poking around, I confirmed **SSH was running**. So I accessed the page, scanned the **page source**, and found my clue: username and password for the **Ezio** user. Perfect!:

![Screenshot 2024-08-11 120340.png](image/kpmg_image/53.png)

I connected via SSH and found the flag inside `ezio.txt`. Another successful mission! 😎:
![Screenshot 2024-08-11 120528.png](image/kpmg_image/23.png)

# Cryptography Puzzles

## RSA Challenge
Challenge parameters:
![Screenshot 2024-08-11 122040.png](image/kpmg_image/54.png)

Initial values:
```python
n=124654455290240170438072831687154216330318678151127912274279675542477378324205547190448356708255017687037267403854771170485302392671467974951403923256433631043504787586559727625072674672756729381597771352105733117303538360769540765664178969569213281846028712352533347099724394655235654023223677262377960566427
e=3
c=11127001790949419009337112638492797447460274274218482444358708583659626034144288836997001734324915439994099506833199252902923750945134774986248955381033641128827831707738209340996252344658078512599270181951581644119582075332702905417250405953125
```

Solution implementation:
```python
from decimal import *
from tqdm import tqdm

N = Decimal(124654455290240170438072831687154216330318678151127912274279675542477378324205547190448356708255017687037267403854771170485302392671467974951403923256433631043504787586559727625072674672756729381597771352105733117303538360769540765664178969569213281846028712352533347099724394655235654023223677262377960566427)
e = Decimal(3)
c = Decimal(11127001790949419009337112638492797447460274274218482444358708583659626034144288836997001734324915439994099506833199252902923750945134774986248955381033641128827831707738209340996252344658078512599270181951581644119582075332702905417250405953125)

def int_to_ascii(m):
    m_hex = hex(int(m))[2:-1]
    m_ascii = "".join(
        chr(int(m_hex[i : i + 2], 16)) for i in range(0, len(m_hex), 2)
    )
    return m_ascii

getcontext().prec = 280
padding = 0
for k in tqdm(range(0, 10_000)):
    m = pow(k * N + c, 1 / e)
    m_ascii = int_to_ascii(m)

    if "pico" in m_ascii:
        padding = k
        break

print("Padding: %s" % padding)
getcontext().prec = 700
m = pow(padding * N + c, 1 / e)
m_ascii = int_to_ascii(m)
print("Flag: %s" % m_ascii.strip())
```

## Wall Cryptography Challenge
Challenge interface:
![Screenshot 2024-08-11 122048.png](image/kpmg_image/49.png)

Initial access:
![Screenshot 2024-08-11 121641.png](image/kpmg_image/37.png)

Source analysis:
![Screenshot 2024-08-11 121653.png](image/kpmg_image/35.png)

Decoding process phases:
![Screenshot 2024-08-11 121714.png](image/kpmg_image/33.png)
![Screenshot 2024-08-11 121739.png](image/kpmg_image/26.png)
![Screenshot 2024-08-11 121759.png](image/kpmg_image/58.png)
![Screenshot 2024-08-11 121837.png](image/kpmg_image/45.png)
![Screenshot 2024-08-11 121903.png](image/kpmg_image/43.png)

# Mobile Security

APK analysis interface:
![Screenshot_2024-08-11_122111.png](image/kpmg_image/27.png)

Code examination:
![image.png](image/kpmg_image/42.png)

after rummaging around in **MainActivity**, I stumbled upon something _golden_—the **last part of the flag**! 🎉 But hold up… I still needed the **first part**. :
![image.png](image/kpmg_image/29.png)

Cue the “Aha!” moment 💡: _Where could it be hiding?_ Then it hit me! The **AndroidManifest.xml** file! This trusty ol' file often holds all sorts of secrets, so I dove right in. Sure enough—BAM! The **first part of the flag** was just sitting there, waiting to be discovered.

![image.png](image/kpmg_image/24.png)

![image.png](image/kpmg_image/52.png)

Flag:
![image.png](image/kpmg_image/22.png)

# Operational Technology

## Modbus Protocol Analysis
Protocol interface:
![Screenshot 2024-08-11 121959.png](image/kpmg_image/40.png)

After connecting with nc we get some hex code :
![Screenshot 2024-08-11 121143.png](image/kpmg_image/19.png)
![44.png](image/kpmg_image/44.png)

After taking all the hex i only kept the first two part of the hex:
![image.png](image/kpmg_image/48.png)

After decoding this Hex, I got flag BOOM!!!! 
![image.png](image/kpmg_image/47.png)

## MQTT Analysis
Challenge parameters:
![Screenshot 2024-08-11 122010.png](image/kpmg_image/41.png)

Protocol investigation:
![Screenshot 2024-08-11 120824.png](image/kpmg_image/18.png)

---

*Thanks for following along on this CTF journey! Feel free to reach out with questions or suggestions.*