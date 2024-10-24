---
title: "CTF Challenge Writeups 2024"
subtitle: "A Journey Through Security Challenges: From OSINT to OT"
date: "2024-08-11"
views: 237
---

# Welcome

Overview of challenge categories ahead:
![Image-1](image/6.png)

Target flag location:
![Image-2](image/7.png)

---

# OSINT Investigation

Initial target identification screen:
![Screenshot 2024-08-11 121938.png](image/30.png)

Located Base64 encoded message in target's LinkedIn profile:
```plaintext
TmV2ZXlgZ29ubmEgZ212ZSB5b3UgdXAKTmV2ZXlgZ29ubmEgbGVOlHlvdSBkb3duCk51dmVylGdvbm5hlHJ1 bmQgYW5klGRlc2VydCB5b3UKTmV2ZXlgZ29ubmEgbWFrZSB5b3UgY3J5Ck51dmVylGdvbm5hlHNheSBnb29kYnllCk51dmVylGdvbm5hlHRlbGwgYSBsaWUgYW5klGh 1 cnQgeW91 CgpodHRwczovBBhc3RlYmluLmNvbS9uWm1 ibkJRMyAtlG 1 lb3c=
```

LinkedIn profile analysis:
![Screenshot 2024-08-11 122125.png](image/57.png)

Decoding process:
![Screenshot 2024-08-11 122141.png](image/25.png)

Pastebin discovery:
![Screenshot 2024-08-11 122210.png](image/14.png)

Discord account identification:
![8.png](image/8.png)

Encoded content location:
![image.png](image/9.png)

Protected content discovery:
![image.png](image/10.png)

Account analysis phase 1:
![image.png](image/11.png)

Account analysis phase 2:
![image.png](image/12.png)

Password verification:
![Screenshot 2024-08-11 122922.png](image/15.png)

Final LinkedIn elements:
![Screenshot 2024-08-11 122959.png](image/16.png)
![image.png](image/13.png)

Target acquisition confirmed:
![Screenshot 2024-08-11 123047.png](image/39.png)

# Cloud Security Challenges

## AWS S3 Investigation

Initial challenge parameters:
![Screenshot 2024-08-11 122031.png](image/1.png)

Website analysis results:
![Screenshot 2024-08-11 121823.png](image/2.png)

Source code examination:
![Screenshot 2024-08-11 121832.png](image/21.png)

Extracted AWS credentials:
```plaintext
Access Key: AKIA33VJAWOZJLLBCU2A
Bucket: ctf2k24-best
```

Directory enumeration results:
![Screenshot 2024-08-11 121909.png](image/20.png)

URL construction parameters:
```plaintext
Bucket: ctf2k24-best
Access Key: AKIA33VJAWOZJLLBCU2A
Expiry: 604800
Date: 20240808T094405Z
Region: us-east-1
Signature: 5625d8f847a29410e05b91df5628d6d2fa8146eed792c0ae048279798853d1b9
```

Access confirmation:
![Screenshot 2024-08-11 121954.png](image/46.png)
![32.png](image/32.png)
![Screenshot 2024-08-11 122009.png](image/3.png)

## Secondary S3 Analysis
Challenge parameters:
![Screenshot 2024-08-11 122022.png](image/51.png)

Bucket enumeration:
![4.png](image/4.png)

Flag acquisition:
![image.png](image/5.png)

# Web Exploitation

Session manipulation challenge:
![Screenshot 2024-08-11 122059.png](image/56.png)

Authentication interface:
![Screenshot 2024-08-11 121108.png](image/17.png)

Source code analysis:
![Screenshot 2024-08-11 121158.png](image/50.png)

Session investigation:
![Screenshot 2024-08-11 121212.png](image/36.png)

Identified MD5 hashes:
```plaintext
test → 098f6bcd4621d373cade4e832627b4f6
admin → 21232f297a57a5a743894aee4a801fc3
```

Access confirmation:
![Screenshot 2024-08-11 121457.png](image/28.png)
![Screenshot 2024-08-11 121506.png](image/31.png)

# Infrastructure Security

SSH challenge parameters:
![Screenshot 2024-08-11 121950.png](image/55.png)

Web interface discovery:
![Screenshot 2024-08-11 120328.png](image/34.png)

Code analysis:
![Screenshot 2024-08-11 120340.png](image/53.png)

Flag confirmation:
![Screenshot 2024-08-11 120528.png](image/23.png)

# Cryptography Puzzles

## RSA Challenge
Challenge parameters:
![Screenshot 2024-08-11 122040.png](image/54.png)

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
![Screenshot 2024-08-11 122048.png](image/49.png)

Initial access:
![Screenshot 2024-08-11 121641.png](image/37.png)

Source analysis:
![Screenshot 2024-08-11 121653.png](image/35.png)

Decoding process phases:
![Screenshot 2024-08-11 121714.png](image/33.png)
![Screenshot 2024-08-11 121739.png](image/26.png)
![Screenshot 2024-08-11 121759.png](image/58.png)
![Screenshot 2024-08-11 121837.png](image/45.png)
![Screenshot 2024-08-11 121903.png](image/43.png)

# Mobile Security

APK analysis interface:
![Screenshot_2024-08-11_122111.png](image/27.png)

Code examination:
![image.png](image/42.png)

Manifest analysis:
![image.png](image/29.png)
![image.png](image/24.png)
![image.png](image/52.png)

Flag construction:
![image.png](image/22.png)

# Operational Technology

## Modbus Protocol Analysis
Protocol interface:
![Screenshot 2024-08-11 121959.png](image/40.png)

Data collection:
![Screenshot 2024-08-11 121143.png](image/19.png)
![44.png](image/44.png)

Results analysis:
![image.png](image/48.png)
![image.png](image/47.png)

## MQTT Analysis
Challenge parameters:
![Screenshot 2024-08-11 122010.png](image/41.png)

Protocol investigation:
![Screenshot 2024-08-11 120824.png](image/18.png)

---

*Thanks for following along on this CTF journey! Feel free to reach out with questions or suggestions.*