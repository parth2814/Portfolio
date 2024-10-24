---
title: "CTF Challenge Writeups 2024"
subtitle: "Detailed solutions and step-by-step walkthroughs for various CTF challenges"
date: "2024-08-11"
views: 1337
---

# 🚩 Welcome
![Image-1](image/6.png)

You will get the flag from the website:
![Image-2](image/7.png)

 >

# 🔍 OSINT Challenge
## Hacking The Administrators
![Screenshot 2024-08-11 121938.png](image/30.png)

### Phase 1: Initial Reconnaissance
* Located LinkedIn profile for target name `Raghava Sai Sarva`:
![Screenshot 2024-08-11 122125.png](image/57.png)

### Phase 2: Encrypted Message Analysis
**Located Base64 Hash in Description:**
```plaintext
TmV2ZXlgZ29ubmEgZ212ZSB5b3UgdXAKTmV2ZXlgZ29ubmEgbGVOlHlvdSBkb3duCk51dmVylGdvbm5hlHJ1 bmQ
gYW5klGRlc2VydCB5b3UKTmV2ZXlgZ29ubmEgbWFrZSB5b3UgY3J5Ck51dmVylGdvbm5hlHNheSBnb29kYnllCk51dmVylGdvbm5hlHRlbGwgYSBsaWUgYW5klGh 1 cnQgeW91 CgpodHRwczovBBhc3RlYmluLmNvbS9uWm1 ibkJRMyAtlG 1 lb3c=
```

### Phase 3: Decoding Process
Using CyberChef for decryption:
![Screenshot 2024-08-11 122141.png](image/25.png)

### Phase 4: Pastebin Trail
Following the decoded link:
![Screenshot 2024-08-11 122210.png](image/14.png)

### Phase 5: Discord Investigation
* Investigating `eren_meow` account:
![8.png](image/8.png)

* Located Base58 encoded content:
![image.png](image/9.png)

* Found password protected content:
![image.png](image/10.png)

* Discord analysis results:
![image.png](image/11.png)
![image.png](image/12.png)

### Phase 6: Protected Content Access
Successfully accessed using password `meowsaurabh123!`:
![Screenshot 2024-08-11 122922.png](image/15.png)

### Phase 7: Final Steps
* Additional LinkedIn investigation:
![Screenshot 2024-08-11 122959.png](image/16.png)
![image.png](image/13.png)

### 🏆 Flag Obtained
![Screenshot 2024-08-11 123047.png](image/39.png)

 >

# ☁️ Cloud Challenges

## Challenge 1: Presign Rains
![Screenshot 2024-08-11 122031.png](image/1.png)

### Initial Website Analysis
![Screenshot 2024-08-11 121823.png](image/2.png)

### Source Code Investigation
![Screenshot 2024-08-11 121832.png](image/21.png)

### Discovered AWS Credentials
```plaintext
Access Key: AKIA33VJAWOZJLLBCU2A
Bucket: ctf2k24-best
```

### Robots.txt Enumeration
![Screenshot 2024-08-11 121852.png](image/38.png)

### Directory Analysis
![Screenshot 2024-08-11 121909.png](image/20.png)

### AWS URL Construction
**Components Used:**
```plaintext
• Bucket: ctf2k24-best
• Access Key: AKIA33VJAWOZJLLBCU2A
• Expiry: 604800
• Date: 20240808T094405Z
• Region: us-east-1
• Signature: 5625d8f847a29410e05b91df5628d6d2fa8146eed792c0ae048279798853d1b9
```

### Flag Acquisition
![Screenshot 2024-08-11 121954.png](image/46.png)
![32.png](image/32.png)
![Screenshot 2024-08-11 122009.png](image/3.png)

## Challenge 2: Data Vault Duel
![Screenshot 2024-08-11 122022.png](image/51.png)

### AWS S3 Enumeration
```bash
aws s3 ls s3://kpmg-ctf1 --no-sign-request
```

**Results:**
![4.png](image/4.png)

### Direct File Access
```bash
curl -O https://kpmg-ctf1.s3.ap-south-1.amazonaws.com/rituognriteuonhbiorentgbvhuitrhoirtsnbiuort.txt
```

### Flag Obtained
![image.png](image/5.png)

 >

# 🌐 Web Challenge
## Memorandum Dissolve 5
![Screenshot 2024-08-11 122059.png](image/56.png)

### Phase 1: Login Page Analysis
![Screenshot 2024-08-11 121108.png](image/17.png)

### Phase 2: Source Code Review
![Screenshot 2024-08-11 121158.png](image/50.png)

### Phase 3: Session Analysis
![Screenshot 2024-08-11 121212.png](image/36.png)

### Phase 4: MD5 Hash Cracking
```plaintext
Test User Hash:
test → 098f6bcd4621d373cade4e832627b4f6

Admin Hash:
admin → 21232f297a57a5a743894aee4a801fc3
```

### Phase 5: Flag Acquisition
![Screenshot 2024-08-11 121457.png](image/28.png)
![Screenshot 2024-08-11 121506.png](image/31.png)

 >

# 🔒 Infrastructure Security
## Assassins Brotherhood - 1
![Screenshot 2024-08-11 121950.png](image/55.png)

### Initial Enumeration
* Target: `http://0.cloud.chals.io 27232`
* Service: SSH identified

### Web Interface Analysis
![Screenshot 2024-08-11 120328.png](image/34.png)

### Source Code Review
![Screenshot 2024-08-11 120340.png](image/53.png)

### SSH Access & Flag
![Screenshot 2024-08-11 120528.png](image/23.png)

 >

# 🔐 Cryptography
## Challenge 1: Micro RSA
![Screenshot 2024-08-11 122040.png](image/54.png)

### Initial Values
```python
n=124654455290240170438072831687154216330318678151127912274279675542477378324205547190448356708255017687037267403854771170485302392671467974951403923256433631043504787586559727625072674672756729381597771352105733117303538360769540765664178969569213281846028712352533347099724394655235654023223677262377960566427
e=3
c=11127001790949419009337112638492797447460274274218482444358708583659626034144288836997001734324915439994099506833199252902923750945134774986248955381033641128827831707738209340996252344658078512599270181951581644119582075332702905417250405953125
```

### Solution Script
```python
from decimal import *
from tqdm import tqdm

N = Decimal(124654455290240170438072831687154216330318678151127912274279675542477378324205547190448356708255017687037267403854771170485302392671467974951403923256433631043504787586559727625072674672756729381597771352105733117303538360769540765664178969569213281846028712352533347099724394655235654023223677262377960566427)
e = Decimal(3)
c = Decimal(11127001790949419009337112638492797447460274274218482444358708583659626034144288836997001734324915439994099506833199252902923750945134774986248955381033641128827831707738209340996252344658078512599270181951581644119582075332702905417250405953125)

def int_to_ascii(m):
    # Decode to ascii (from https://crypto.stackexchange.com/a/80346)
    m_hex = hex(int(m))[2:-1]  # Number to hex
    m_ascii = "".join(
        chr(int(m_hex[i : i + 2], 16)) for i in range(0, len(m_hex), 2)
    )  # Hex to Ascii
    return m_ascii

getcontext().prec = 280  # Increase precision
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

## Challenge 2: Crypts Beyond The Wall
![Screenshot 2024-08-11 122048.png](image/49.png)

### Phase 1: Initial Access
![Screenshot 2024-08-11 121641.png](image/37.png)

### Phase 2: Source Analysis
![Screenshot 2024-08-11 121653.png](image/35.png)

### Phase 3: Base64 Decoding
![Screenshot 2024-08-11 121714.png](image/33.png)

### Phase 4: File Access
![Screenshot 2024-08-11 121739.png](image/26.png)

### Phase 5: Cipher Decryption
![Screenshot 2024-08-11 121759.png](image/58.png)

### Phase 6: Flag Acquisition
![Screenshot 2024-08-11 121837.png](image/45.png)
![Screenshot 2024-08-11 121903.png](image/43.png)

 >

# 📱 Mobile
## Android CryptoQuest
![Screenshot_2024-08-11_122111.png](image/27.png)

### Phase 1: APK Analysis
* Decompiled `mobilechall1.apk` using jadx-gui
* Located `example.ctfchall` package

### Phase 2: Code Review
![image.png](image/42.png)

### Phase 3: Base85 Decoding
![image.png](image/29.png)

### Phase 4: Manifest Analysis
![image.png](image/24.png)
![image.png](image/52.png)

### Phase 5: Flag Assembly
![image.png](image/22.png)

 >

# 🏭 Operational Technology
## Challenge 1: Modulus bus Station
![Screenshot 2024-08-11 121959.png](image/40.png)

### Tool Setup
```bash
pip install modbus-cli
```

### Data Collection
![Screenshot 2024-08-11 121143.png](image/19.png)
![44.png](image/44.png)

### Data Processing
1. Hex data extraction
2. ASCII conversion
3. Duplicate removal
4. Data combination

![image.png](image/48.png)

### Flag Decoding
![image.png](image/47.png)

## Challenge 2: mqtt - Master Qutie TT - P1
![Screenshot 2024-08-11 122010.png](image/41.png)

### Tool Installation
```bash
apt-get install mosquitto mosquitto-clients
```

### MQTT Subscription
![Screenshot 2024-08-11 120824.png](image/18.png)

<style>
.section-divider {
    border-bottom: 2px solid #00ff00;
    margin: 40px 0;
    opacity: 0.3;
}
</style>